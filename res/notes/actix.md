# Actix Web Notes

## Responders
- Actix provides JSON (actix_web::web::Json)
- You can do different stuff with the url
```rust
#[get(url_path)]
fn asdf() -> Json<String>
```

## Extractors
- Getting at different parts of the request
    - From within handler function
- Used by:
    - Adding parameters to handler function
- Valid type if implements `From` trait
- URL path functions are found in `actix_web::web::Path`

```rust
#[derive(Deserialize, Serialize)]
pub struct TaskIdentifier {
    task_global_id: String,
}

#[get("/task/task_global_id")]
pub async fn get_task(task_identifier: Path<TaskIdentifier>, body: Json) -> Json<String> {
    Json(task_identifier.into_inner().task_global_id)
}
```

## Actix JSON Notes
- Json<T> is a template that can JSON-ify types that implement... Serialize?
- Structs can be easily serialized/deserialized with the `#[derive(Serialize, Deserialize)]` macro header
- Json can easily translate structs to Json and back

## Database Notes
