package com.apnaca.ApnaCA.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity.badRequest().body(errors);
    }

	@ExceptionHandler(ExpenseNotFoundException.class)
	public ResponseEntity<Map<String, String>> handleExpenseNotFound(
	        ExpenseNotFoundException ex) {
	
	    Map<String, String> error = new HashMap<>();
	    error.put("error", ex.getMessage());
	
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}
	

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<Map<String, String>> handleMalformedJson(
	        HttpMessageNotReadableException ex) {
	
	    Map<String, String> error = new HashMap<>();
	    error.put("error", "Invalid or malformed JSON request");
	
	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(error);
	}
	

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<Map<String, String>> handleTypeMismatch(
	        MethodArgumentTypeMismatchException ex) {
	
	    Map<String, String> error = new HashMap<>();
	    error.put("error", "Invalid value for parameter: " + ex.getName());
	
	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(error);
	}



	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, String>> handleGeneralException(
	        Exception ex) {
	
	    Map<String, String> error = new HashMap<>();
	    error.put("error", "An unexpected error occurred");
	
	    return ResponseEntity
	            .status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body(error);
	}


}
