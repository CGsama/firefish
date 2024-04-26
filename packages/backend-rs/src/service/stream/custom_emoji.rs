use crate::service::stream::{publish_to_stream, Error, Stream};
use serde::{Deserialize, Serialize};

// TODO: define schema type in other place
#[derive(Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
#[crate::export(object)]
pub struct PackedEmoji {
    pub id: String,
    pub aliases: Vec<String>,
    pub name: String,
    pub category: Option<String>,
    pub host: Option<String>,
    pub url: String,
    pub license: Option<String>,
    pub width: Option<i32>,
    pub height: Option<i32>,
}

#[crate::export(js_name = "publishToBroadcastStream")]
pub fn publish(emoji: &PackedEmoji) -> Result<(), Error> {
    publish_to_stream(
        &Stream::CustomEmoji,
        Some("emojiAdded".to_string()),
        Some(format!("{{\"emoji\":{}}}", serde_json::to_string(emoji)?)),
    )
}
