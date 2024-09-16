package com.maarcus.backend.payload.response;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response<T>{
    HttpStatus statusCode;
    String message;
    T data;
}