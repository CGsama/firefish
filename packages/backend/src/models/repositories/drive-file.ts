import { db } from "@/db/postgre.js";
import { DriveFile } from "@/models/entities/drive-file.js";
import type { User } from "@/models/entities/user.js";
import { toPuny } from "backend-rs";
import { awaitAll } from "@/prelude/await-all.js";
import type { Packed } from "@/misc/schema.js";
import { config } from "@/config.js";
import { query, appendQuery } from "@/prelude/url.js";
import { Users, DriveFolders } from "../index.js";
import { deepClone } from "@/misc/clone.js";
import { fetchMeta } from "backend-rs";
import { redisClient } from "@/db/redis.js";
import { v4 as uuid } from "uuid";
import * as crypto from "node:crypto";

type PackOptions = {
	detail?: boolean;
	self?: boolean;
	withUser?: boolean;
};

export const DriveFileRepository = db.getRepository(DriveFile).extend({
	validateFileName(name: string): boolean {
		return (
			name.trim().length > 0 &&
			name.length <= 200 &&
			name.indexOf("\\") === -1 &&
			name.indexOf("/") === -1 &&
			name.indexOf("..") === -1
		);
	},

	getPublicProperties(file: DriveFile): DriveFile["properties"] {
		if (file.properties.orientation != null) {
			const properties = deepClone(file.properties);
			if (file.properties.orientation >= 5) {
				[properties.width, properties.height] = [
					properties.height,
					properties.width,
				];
			}
			properties.orientation = undefined;
			return properties;
		}

		return file.properties;
	},

	getPublicUrl(file: DriveFile, thumbnail = false): string | null {
		//if(file.userHost != null){
		//	return file.uri;
		//}

		const calcProxyAddr = (pubUrl: string) => {
			const life = file.userHost != null ? 60 : 86400;
			const min = Math.round(Date.now() / (1000 * life));
			const otk = crypto.createHash('md5').update(`${min}-${pubUrl}`).digest('hex').toString();
			const hostFileMd5 = crypto.createHash('md5').update(`${file.userHost || config.host}`).digest('hex').toString().substring(0, 8) + file.md5.substring(0, 8);
			const hash =  [...otk].reduce((s,x,i)=>`${s.substring(0,i*2)}${x}${hostFileMd5.substring(i)}`, "")
			const oneTimeKey = `${hash.substring(0,8)}-${hash.substring(8,12)}-${hash.substring(12,16)}-${hash.substring(16,20)}-${hash.substring(20,32)}`;
			redisClient.set(`proxyOneTimeKey:${oneTimeKey}`, pubUrl, "EX", life);
			return `${config.url}/proxy/remoteFile?${query({ id: oneTimeKey })}`
		}


		// リモートかつメディアプロキシ
		if (
			file.uri != null &&
			file.userHost != null &&
			config.mediaProxy != null
		) {
			return appendQuery(
				config.mediaProxy,
				query({
					url: file.uri,
					thumbnail: thumbnail ? "1" : undefined,
				}),
			);
		}

		// リモートかつ期限切れはローカルプロキシを試みる
		if (file.uri != null && file.isLink && config.proxyRemoteFiles) {
			const key = thumbnail ? file.thumbnailAccessKey : file.webpublicAccessKey;

			if (key && !key.match("/")) {
				// 古いものはここにオブジェクトストレージキーが入ってるので除外
				const pubUrl = `${config.url}/files/${key}`;

				return calcProxyAddr(pubUrl);
			}
		}

		const isImage =
			file.type &&
			[
				"image/png",
				"image/apng",
				"image/gif",
				"image/jpeg",
				"image/webp",
				"image/svg+xml",
				"image/avif",
			].includes(file.type);

		const pubUrl =  thumbnail
			? file.thumbnailUrl || (isImage ? file.webpublicUrl || file.url : null)
			: file.webpublicUrl || file.url;

		return calcProxyAddr(pubUrl);

	},

	async calcDriveUsageOf(
		user: User["id"] | { id: User["id"] },
	): Promise<number> {
		const id = typeof user === "object" ? user.id : user;

		const { sum } = await this.createQueryBuilder("file")
			.where("file.userId = :id", { id: id })
			.andWhere("file.isLink = FALSE")
			.select("SUM(file.size)", "sum")
			.getRawOne();

		return parseInt(sum, 10) || 0;
	},

	async calcDriveUsageOfHost(host: string): Promise<number> {
		const { sum } = await this.createQueryBuilder("file")
			.where("file.userHost = :host", { host: toPuny(host) })
			.andWhere("file.isLink = FALSE")
			.select("SUM(file.size)", "sum")
			.getRawOne();

		return parseInt(sum, 10) || 0;
	},

	async calcDriveUsageOfLocal(): Promise<number> {
		const { sum } = await this.createQueryBuilder("file")
			.where("file.userHost IS NULL")
			.andWhere("file.isLink = FALSE")
			.select("SUM(file.size)", "sum")
			.getRawOne();

		return parseInt(sum, 10) || 0;
	},

	async calcDriveUsageOfRemote(): Promise<number> {
		const { sum } = await this.createQueryBuilder("file")
			.where("file.userHost IS NOT NULL")
			.andWhere("file.isLink = FALSE")
			.select("SUM(file.size)", "sum")
			.getRawOne();

		return parseInt(sum, 10) || 0;
	},

	async pack(
		src: DriveFile["id"] | DriveFile,
		options?: PackOptions,
	): Promise<Packed<"DriveFile">> {
		const opts = Object.assign(
			{
				detail: false,
				self: false,
			},
			options,
		);

		const file =
			typeof src === "object" ? src : await this.findOneByOrFail({ id: src });

		return await awaitAll<Packed<"DriveFile">>({
			id: file.id,
			createdAt: file.createdAt.toISOString(),
			name: file.name,
			type: file.type,
			md5: file.md5,
			size: file.size,
			isSensitive: file.isSensitive,
			usageHint: file.usageHint,
			blurhash: file.blurhash,
			properties: opts.self ? file.properties : this.getPublicProperties(file),
			url: opts.self ? file.url : this.getPublicUrl(file, false),
			thumbnailUrl: this.getPublicUrl(file, true),
			comment: file.comment,
			folderId: file.folderId,
			folder:
				opts.detail && file.folderId
					? DriveFolders.pack(file.folderId, {
							detail: true,
						})
					: null,
			userId: opts.withUser ? file.userId : null,
			user: opts.withUser && file.userId ? Users.pack(file.userId) : null,
		});
	},

	async packNullable(
		src: DriveFile["id"] | DriveFile,
		options?: PackOptions,
	): Promise<Packed<"DriveFile"> | null> {
		const opts = Object.assign(
			{
				detail: false,
				self: false,
			},
			options,
		);

		const file =
			typeof src === "object" ? src : await this.findOneBy({ id: src });
		if (file == null) return null;

		return await awaitAll<Packed<"DriveFile">>({
			id: file.id,
			createdAt: file.createdAt.toISOString(),
			name: file.name,
			type: file.type,
			md5: file.md5,
			size: file.size,
			isSensitive: file.isSensitive,
			usageHint: file.usageHint,
			blurhash: file.blurhash,
			properties: opts.self ? file.properties : this.getPublicProperties(file),
			url: opts.self ? file.url : this.getPublicUrl(file, false),
			thumbnailUrl: this.getPublicUrl(file, true),
			comment: file.comment,
			folderId: file.folderId,
			folder:
				opts.detail && file.folderId
					? DriveFolders.pack(file.folderId, {
							detail: true,
						})
					: null,
			userId: opts.withUser ? file.userId : null,
			user: opts.withUser && file.userId ? Users.pack(file.userId) : null,
		});
	},

	async packMany(
		files: (DriveFile["id"] | DriveFile)[],
		options?: PackOptions,
	): Promise<Packed<"DriveFile">[]> {
		const items = await Promise.all(
			files.map((f) => this.packNullable(f, options)),
		);
		return items.filter((x): x is Packed<"DriveFile"> => x != null);
	},

	async getFinalUrl(url: string): Promise<string> {
		if (!config.proxyRemoteFiles) return url;
		if (!url.startsWith("https://") && !url.startsWith("http://")) return url;
		if (url.startsWith(`${config.url}/files`)) return url;
		if (url.startsWith(`${config.url}/static-assets`)) return url;
		if (url.startsWith(`${config.url}/identicon`)) return url;
		if (url.startsWith(`${config.url}/avatar`)) return url;

		const instanceMeta = await fetchMeta();
		const baseUrl = instanceMeta
			? instanceMeta.objectStorageBaseUrl ??
				`${instanceMeta.objectStorageUseSsl ? "https" : "http"}://${
					instanceMeta.objectStorageEndpoint
				}${instanceMeta.objectStoragePort ? `:${instanceMeta.objectStoragePort}` : ""}/${
					instanceMeta.objectStorageBucket
				}`
			: null;
		if (baseUrl !== null && url.startsWith(baseUrl)) return url;

		return `${config.url}/proxy/${encodeURIComponent(
			new URL(url).pathname,
		)}?${query({ url: url })}`;
	},

	async getFinalUrlMaybe(url?: string | null): Promise<string | null> {
		if (url == null) return null;
		return this.getFinalUrl(url);
	},
});
