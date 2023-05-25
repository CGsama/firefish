//! `SeaORM` Entity. Generated by sea-orm-codegen 0.11.3

use super::sea_orm_active_enums::NoteVisibilityEnum;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "note")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: DateTimeWithTimeZone,
    #[sea_orm(column_name = "replyId")]
    pub reply_id: Option<String>,
    #[sea_orm(column_name = "renoteId")]
    pub renote_id: Option<String>,
    #[sea_orm(column_type = "Text", nullable)]
    pub text: Option<String>,
    pub name: Option<String>,
    pub cw: Option<String>,
    #[sea_orm(column_name = "userId")]
    pub user_id: String,
    #[sea_orm(column_name = "localOnly")]
    pub local_only: bool,
    #[sea_orm(column_name = "renoteCount")]
    pub renote_count: i16,
    #[sea_orm(column_name = "repliesCount")]
    pub replies_count: i16,
    #[sea_orm(column_type = "JsonBinary")]
    pub reactions: Json,
    pub visibility: NoteVisibilityEnum,
    pub uri: Option<String>,
    pub score: i32,
    #[sea_orm(column_name = "fileIds")]
    pub file_ids: Vec<String>,
    #[sea_orm(column_name = "attachedFileTypes")]
    pub attached_file_types: Vec<String>,
    #[sea_orm(column_name = "visibleUserIds")]
    pub visible_user_ids: Vec<String>,
    pub mentions: Vec<String>,
    #[sea_orm(column_name = "mentionedRemoteUsers", column_type = "Text")]
    pub mentioned_remote_users: String,
    pub emojis: Vec<String>,
    pub tags: Vec<String>,
    #[sea_orm(column_name = "hasPoll")]
    pub has_poll: bool,
    #[sea_orm(column_name = "userHost")]
    pub user_host: Option<String>,
    #[sea_orm(column_name = "replyUserId")]
    pub reply_user_id: Option<String>,
    #[sea_orm(column_name = "replyUserHost")]
    pub reply_user_host: Option<String>,
    #[sea_orm(column_name = "renoteUserId")]
    pub renote_user_id: Option<String>,
    #[sea_orm(column_name = "renoteUserHost")]
    pub renote_user_host: Option<String>,
    pub url: Option<String>,
    #[sea_orm(column_name = "channelId")]
    pub channel_id: Option<String>,
    #[sea_orm(column_name = "threadId")]
    pub thread_id: Option<String>,
    #[sea_orm(column_name = "updatedAt")]
    pub updated_at: Option<DateTimeWithTimeZone>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::antenna_note::Entity")]
    AntennaNote,
    #[sea_orm(
        belongs_to = "super::channel::Entity",
        from = "Column::ChannelId",
        to = "super::channel::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    Channel,
    #[sea_orm(has_many = "super::channel_note_pining::Entity")]
    ChannelNotePining,
    #[sea_orm(has_many = "super::clip_note::Entity")]
    ClipNote,
    #[sea_orm(has_many = "super::muted_note::Entity")]
    MutedNote,
    #[sea_orm(
        belongs_to = "Entity",
        from = "Column::ReplyId",
        to = "Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    SelfRef2,
    #[sea_orm(
        belongs_to = "Entity",
        from = "Column::RenoteId",
        to = "Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    SelfRef1,
    #[sea_orm(has_many = "super::note_edit::Entity")]
    NoteEdit,
    #[sea_orm(has_many = "super::note_favorite::Entity")]
    NoteFavorite,
    #[sea_orm(has_many = "super::note_reaction::Entity")]
    NoteReaction,
    #[sea_orm(has_many = "super::note_unread::Entity")]
    NoteUnread,
    #[sea_orm(has_many = "super::note_watching::Entity")]
    NoteWatching,
    #[sea_orm(has_many = "super::notification::Entity")]
    Notification,
    #[sea_orm(has_one = "super::poll::Entity")]
    Poll,
    #[sea_orm(has_many = "super::poll_vote::Entity")]
    PollVote,
    #[sea_orm(has_one = "super::promo_note::Entity")]
    PromoNote,
    #[sea_orm(has_many = "super::promo_read::Entity")]
    PromoRead,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    User,
    #[sea_orm(has_many = "super::user_note_pining::Entity")]
    UserNotePining,
}

impl Related<super::antenna_note::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::AntennaNote.def()
    }
}

impl Related<super::channel::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Channel.def()
    }
}

impl Related<super::channel_note_pining::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ChannelNotePining.def()
    }
}

impl Related<super::clip_note::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ClipNote.def()
    }
}

impl Related<super::muted_note::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::MutedNote.def()
    }
}

impl Related<super::note_edit::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::NoteEdit.def()
    }
}

impl Related<super::note_favorite::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::NoteFavorite.def()
    }
}

impl Related<super::note_reaction::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::NoteReaction.def()
    }
}

impl Related<super::note_unread::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::NoteUnread.def()
    }
}

impl Related<super::note_watching::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::NoteWatching.def()
    }
}

impl Related<super::notification::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Notification.def()
    }
}

impl Related<super::poll::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Poll.def()
    }
}

impl Related<super::poll_vote::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::PollVote.def()
    }
}

impl Related<super::promo_note::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::PromoNote.def()
    }
}

impl Related<super::promo_read::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::PromoRead.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl Related<super::user_note_pining::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::UserNotePining.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
