package com.github.facundoblanco.todoapi.exception;

// the JSON body we send back when something goes wrong, e.g. {"status":404,"message":"..."}
public record ErrorResponse(int status, String message) {
}
