mod api;

use api::task::{
    get_task
}; // more will be added here later

use actix_web::{
    HttpServer,
    App,
    
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    HttpServer::new(move || {
        let logger = Logger::default();
        App::new()
        .wrap(logger)
        .app_data()
        .service(get_task)
    })
}
