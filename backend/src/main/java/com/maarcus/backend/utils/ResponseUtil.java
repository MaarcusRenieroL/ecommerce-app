package com.maarcus.backend.utils;

import com.maarcus.backend.payload.response.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ResponseUtil {
	public <T> ResponseEntity<StandardResponse<T>> buildSuccessResponse(HttpStatus status, String message, T data) {
		return ResponseEntity.status(status).body(new StandardResponse<>(status, message, data));
	}
	
	public <T> ResponseEntity<StandardResponse<T>> buildErrorResponse(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new StandardResponse<>(status, message, null));
	}
}
