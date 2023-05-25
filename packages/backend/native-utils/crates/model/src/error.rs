#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("Failed to parse string")]
    ParseError(#[from] parse_display::ParseError),
    #[error("Failed to get database connection")]
    DatabaseConnectionError(#[from] database::error::Error),
    #[error("Database operation error: {0}")]
    DatabaseOperationError(#[from] sea_orm::DbErr),
}
