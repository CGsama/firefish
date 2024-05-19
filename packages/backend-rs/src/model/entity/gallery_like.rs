//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.15

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
#[sea_orm(table_name = "gallery_like")]
#[cfg_attr(
    feature = "napi",
    napi_derive::napi(object, js_name = "GalleryLike", use_nullable = true)
)]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: DateTimeWithTimeZone,
    #[sea_orm(column_name = "userId")]
    pub user_id: String,
    #[sea_orm(column_name = "postId")]
    pub post_id: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::gallery_post::Entity",
        from = "Column::PostId",
        to = "super::gallery_post::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    GalleryPost,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    User,
}

impl Related<super::gallery_post::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::GalleryPost.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
