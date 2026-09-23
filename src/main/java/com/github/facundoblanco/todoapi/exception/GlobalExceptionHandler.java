package com.github.facundoblanco.todoapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// catches exceptions thrown by any @RestController and turns them into a clean JSON response
@RestControllerAdvice
public class GlobalExceptionHandler {

    // task doesn't exist -> 404 Not Found
    @ExceptionHandler(TaskNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(TaskNotFoundException exc) {
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), exc.getMessage());
    }

    // @Valid failed (e.g. empty title) -> 400 Bad Request
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException exc) {
        String message = exc.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .reduce((a, b) -> a + ", " + b)
                .orElse("invalid request");
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), message);
    }
}
