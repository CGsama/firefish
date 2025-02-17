import type Koa from "koa";
import { config } from "@/config.js";
import { genId } from "backend-rs";
import { getIpHash } from "@/misc/get-ip-hash.js";
import { redisClient } from "@/db/redis.js";

export default async (ctx: Koa.Context) => {
	ctx.set("Access-Control-Allow-Origin", config.url);
	ctx.set("Access-Control-Allow-Credentials", "true");

	const body = ctx.request.body as any;
	const username = body["username"];

    

    const nonce = `${username}@${config.host}-login-nonce-${getIpHash(ctx.ip)}-${genId()}`
    await redisClient.set(`${username}-login-nonce`, nonce, 'EX', 60);
	ctx.status = 200;
    ctx.body = {
        name: username,
        nonce: nonce,
    };
    return;
};
