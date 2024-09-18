package com.maarcus.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardResponse<T> {
	
	private HttpStatus status;
	private String message;
	private T data;
}
