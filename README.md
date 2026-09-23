# todo-api

To-Do REST API built with Spring Boot, Spring Data JPA and H2.

## Tech stack

- Java 25
- Spring Boot 4 (Web, Data JPA, Validation)
- H2 (file-based database, stored in `./data`)

## How to run

```bash
./mvnw spring-boot:run
```

The app runs at `http://localhost:8080`.

- H2 console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/testdb`
  - User: `sa`, empty password

## Endpoints

| Method | URL               | Description        | Response        |
|--------|-------------------|--------------------|-----------------|
| GET    | `/api/tasks`      | List all tasks     | 200             |
| GET    | `/api/tasks/{id}` | Get one task       | 200 / 404       |
| POST   | `/api/tasks`      | Create a task      | 201 / 400       |
| PUT    | `/api/tasks/{id}` | Update a task      | 200 / 400 / 404 |
| DELETE | `/api/tasks/{id}` | Delete a task      | 204 / 404       |
