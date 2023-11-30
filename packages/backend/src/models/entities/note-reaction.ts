import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";
import { id } from "../id.js";
import { Note } from "./note.js";
import { User } from "./user.js";

@Entity()
@Index(["userId", "noteId"], { unique: true })
export class NoteReaction {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column("timestamp with time zone", {
		comment: "The created date of the NoteReaction.",
	})
	public createdAt: Date;

	@Index()
	@Column(id())
	public userId: User["id"];

	@ManyToOne((type) => User, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	public user?: User | null;

	@Index()
	@Column(id())
	public noteId: Note["id"];

	@ManyToOne((type) => Note, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	public note?: Note | null;

	// TODO: 対象noteのuserIdを非正規化したい(「受け取ったリアクション一覧」のようなものを(JOIN無しで)実装したいため)

	@Column("varchar", {
		length: 260,
	})
	public reaction: string;
}
