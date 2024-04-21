use crate::config::CONFIG;
use crate::database::redis_conn;
use redis::{Commands, RedisError};

#[derive(strum::Display)]
pub enum Stream {
    #[strum(serialize = "internal")]
    Internal,
    #[strum(serialize = "broadcast")]
    Broadcast,
    #[strum(to_string = "adminStream:{user_id}")]
    Admin { user_id: String },
    #[strum(to_string = "user:{user_id}")]
    User { user_id: String },
    #[strum(to_string = "channelStream:{channel_id}")]
    Channel { channel_id: String },
    #[strum(to_string = "noteStream:{note_id}")]
    Note { note_id: String },
    #[strum(serialize = "notesStream")]
    Notes,
    #[strum(to_string = "userListStream:{list_id}")]
    UserList { list_id: String },
    #[strum(to_string = "mainStream:{user_id}")]
    Main { user_id: String },
    #[strum(to_string = "driveStream:{user_id}")]
    Drive { user_id: String },
    #[strum(to_string = "antennaStream:{antenna_id}")]
    Antenna { antenna_id: String },
    #[strum(to_string = "messagingStream:{sender_user_id}-{receiver_user_id}")]
    Chat {
        sender_user_id: String,
        receiver_user_id: String,
    },
    #[strum(to_string = "messagingStream:{group_id}")]
    GroupChat { group_id: String },
    #[strum(to_string = "messagingIndexStream:{user_id}")]
    MessagingIndex { user_id: String },
}

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("Redis error: {0}")]
    RedisError(#[from] RedisError),
    #[error("Value error: {0}")]
    ValueError(String),
}

pub fn publish_to_stream(
    stream: &Stream,
    kind: Option<&str>,
    value: Option<String>,
) -> Result<(), Error> {
    let message = if let Some(kind) = kind {
        format!(
            "{{ \"type\": \"{}\", \"body\": {} }}",
            kind,
            value.unwrap_or("null".to_string()),
        )
    } else {
        value.ok_or(Error::ValueError("Invalid streaming message".to_string()))?
    };

    redis_conn()?.publish(
        &CONFIG.host,
        format!(
            "{{ \"channel\": \"{}\", \"message\": {} }}",
            stream, message,
        ),
    )?;

    Ok(())
}

#[cfg(test)]
mod unit_test {
    use super::Stream;
    use pretty_assertions::assert_eq;

    #[test]
    fn channel_to_string() {
        assert_eq!(Stream::Internal.to_string(), "internal");
        assert_eq!(Stream::Broadcast.to_string(), "broadcast");
        assert_eq!(
            Stream::Admin {
                user_id: "9tb42br63g5apjcq".to_string()
            }
            .to_string(),
            "adminStream:9tb42br63g5apjcq"
        );
    }
}
