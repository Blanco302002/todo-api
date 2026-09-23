# todo-api

API REST de tareas (To-Do) hecha con Spring Boot, Spring Data JPA y H2.

## Tecnologías

- Java 25
- Spring Boot 4 (Web, Data JPA, Validation)
- H2 (base de datos en archivo, en `./data`)

## Cómo correrlo

```bash
./mvnw spring-boot:run
```

La app queda en `http://localhost:8080`.

- Consola de H2: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/testdb`
  - Usuario: `sa`, contraseña vacía

## Endpoints

| Método | URL               | Qué hace              | Respuesta            |
|--------|-------------------|-----------------------|----------------------|
| GET    | `/api/tasks`      | Lista todas las tareas | 200                 |
| GET    | `/api/tasks/{id}` | Devuelve una tarea    | 200 / 404            |
| POST   | `/api/tasks`      | Crea una tarea        | 201 / 400            |
| PUT    | `/api/tasks/{id}` | Edita una tarea       | 200 / 400 / 404      |
| DELETE | `/api/tasks/{id}` | Borra una tarea       | 204 / 404            |

Ejemplo de body para POST y PUT:

```json
{
  "title": "Estudiar Spring",
  "description": "Terminar la sección de REST"
}
```

El `title` es obligatorio. Si falta, la API responde 400 con el motivo.

## Probar con Postman

Importá la colección `postman/todoapi.postman_collection.json` en Postman.
