package com.apnaca.ApnaCA.service;

import com.apnaca.ApnaCA.entity.Expense;
import com.apnaca.ApnaCA.exception.ExpenseNotFoundException;
import com.apnaca.ApnaCA.repository.ExpenseRepository;
import com.apnaca.ApnaCA.service.ExpenseService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import static org.mockito.Mockito.never;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepo;

    @InjectMocks
    private ExpenseService expenseService;

    @Test
    void addExpense_shouldSaveAndReturnExpense() {

        // Arrange: prepare test data
        Expense expense = new Expense();
        expense.setAmount(250.0);
        expense.setCategory("Food");
        expense.setPaymentMethod("UPI");

        when(expenseRepo.save(expense)).thenReturn(expense);

        // Act: call the service method
        ResponseEntity<Expense> response =
                expenseService.addExpense(expense);

        // Assert: verify the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertSame(expense, response.getBody());

        // Verify that the repository was called
        verify(expenseRepo).save(expense);
    }
    

	@Test
	void addExpense_whenNull_shouldReturnBadRequest() {
	
	    ResponseEntity<Expense> response =
	            expenseService.addExpense(null);
	
	    assertEquals(
	            HttpStatus.BAD_REQUEST,
	            response.getStatusCode()
	    );
	
	    verify(expenseRepo, never()).save(
	            org.mockito.ArgumentMatchers.any(Expense.class)
	    );
	}

	@Test
	void deleteExpense_whenExists_shouldDeleteExpense() {

	    Expense expense = new Expense();
	    expense.setId(1L);

	    when(expenseRepo.findById(1L))
	            .thenReturn(Optional.of(expense));

	    expenseService.deleteExpense(1L);

	    verify(expenseRepo).findById(1L);
	    verify(expenseRepo).deleteById(1L);
	}

	// Test 2: Deleting a missing expense
	@Test
	void deleteExpense_whenNotFound_shouldThrowException() {

	    when(expenseRepo.findById(999L))
	            .thenReturn(Optional.empty());

	    assertThrows(
	            ExpenseNotFoundException.class,
	            () -> expenseService.deleteExpense(999L)
	    );

	    verify(expenseRepo).findById(999L);
	    verify(expenseRepo, never()).deleteById(999L);
	}
	

	@Test
	void updateExpense_whenExists_shouldUpdateAndSave() {
	
	    Expense existing = new Expense();
	    existing.setId(1L);
	    existing.setAmount(100.0);
	    existing.setCategory("Food");
	
	    Expense updated = new Expense();
	    updated.setAmount(500.0);
	    updated.setCategory("Shopping");
	    updated.setDescription("New purchase");
	
	    when(expenseRepo.findById(1L))
	            .thenReturn(Optional.of(existing));
	
	    when(expenseRepo.save(existing))
	            .thenReturn(existing);
	
	    ResponseEntity<Expense> response =
	            expenseService.updateExpense(1L, updated);
	
	    assertEquals(HttpStatus.OK, response.getStatusCode());
	    assertEquals(500.0, response.getBody().getAmount());
	    assertEquals("Shopping", response.getBody().getCategory());
	
	    verify(expenseRepo).findById(1L);
	    verify(expenseRepo).save(existing);
	}
	

	@Test
	void updateExpense_whenNotFound_shouldThrowException() {
	
	    Expense updated = new Expense();
	    updated.setAmount(500.0);
	    updated.setCategory("Shopping");
	
	    when(expenseRepo.findById(999L))
	            .thenReturn(Optional.empty());
	
	    assertThrows(
	            ExpenseNotFoundException.class,
	            () -> expenseService.updateExpense(999L, updated)
	    );
	
	    verify(expenseRepo).findById(999L);
	    verify(expenseRepo, never()).save(
	            org.mockito.ArgumentMatchers.any(Expense.class)
	    );
	}
	

	@Test
	void findExpense_whenExists_shouldReturnExpense() {
	    Expense expense = new Expense();
	    expense.setId(1L);
	    expense.setAmount(250.0);
	    expense.setCategory("Food");
	
	    when(expenseRepo.findById(1L))
	            .thenReturn(Optional.of(expense));
	
	    ResponseEntity<Expense> response =
	            expenseService.findExpense(1L);
	
	    assertEquals(HttpStatus.OK, response.getStatusCode());
	    assertSame(expense, response.getBody());
	    assertEquals(250.0, response.getBody().getAmount());
	
	    verify(expenseRepo).findById(1L);
	}
	
	@Test
	void findExpense_whenNotFound_shouldThrowException() {
	    when(expenseRepo.findById(999L))
	            .thenReturn(Optional.empty());
	
	    assertThrows(
	            ExpenseNotFoundException.class,
	            () -> expenseService.findExpense(999L)
	    );
	
	    verify(expenseRepo).findById(999L);
	}


	@Test
	void getExpenses_shouldReturnRequestedPage() {
	    Expense expense = new Expense();
	    expense.setId(1L);
	    expense.setAmount(250.0);
	
	    Pageable pageable = PageRequest.of(
	            0,
	            10,
	            Sort.by(Sort.Direction.DESC, "transactionType")
	                    .and(Sort.by(Sort.Direction.DESC, "id"))
	    );
	
	    Page<Expense> expectedPage =
	            new PageImpl<>(List.of(expense), pageable, 1);
	
	    when(expenseRepo.findAll(any(Pageable.class)))
	            .thenReturn(expectedPage);
	
	    Page<Expense> response =
	            expenseService.getExpenses(0, 10);
	
	    assertEquals(1, response.getTotalElements());
	    assertEquals(10, response.getSize());
	    assertEquals(0, response.getNumber());
	    assertSame(expense, response.getContent().get(0));
	
	    verify(expenseRepo).findAll(any(Pageable.class));
	}


	@Test
	void getExpenses_withFilters_shouldReturnFilteredPage() {
	    Expense expense = new Expense();
	    expense.setId(2L);
	    expense.setAmount(500.0);
	    expense.setCategory("Food");
	    expense.setPaymentMethod("UPI");
	    expense.setTransactionType("SENT");
	
	    Pageable pageable = PageRequest.of(
	            0, 10, Sort.by(Sort.Direction.DESC, "id")
	    );
	
	    Page<Expense> expectedPage =
	            new PageImpl<>(List.of(expense), pageable, 1);
	
	    when(expenseRepo.findAll(
	            any(Specification.class),
	            any(Pageable.class)
	    )).thenReturn(expectedPage);
	
	    Page<Expense> response = expenseService.getExpenses(
	            "Food",
	            "SENT",
	            100.0,
	            1000.0,
	            "UPI",
	            LocalDate.of(2026, 10, 1),
	            LocalDate.of(2026, 10, 31),
	            0,
	            10
	    );
	
	    assertEquals(1, response.getTotalElements());
	    assertEquals("Food", response.getContent().get(0).getCategory());
	    assertEquals("SENT", response.getContent().get(0).getTransactionType());
	
	    verify(expenseRepo).findAll(
	            any(Specification.class),
	            any(Pageable.class)
	    );
	}


//	@Test
//	void getMonthlyExpense_shouldReturnMonthlyTotals() {
//	    Object[] summaryValues = {1200.0, 400.0};
//	    Object[] queryResult = {summaryValues};
//	
//	    when(expenseRepo.getMonthlySummary(
//	            any(LocalDate.class),
//	            any(LocalDate.class)
//	    )).thenReturn(queryResult);
//	
//	    ResponseEntity<Map> response =
//	            expenseService.getMonthlyExpense();
//	
//	    assertEquals(HttpStatus.OK, response.getStatusCode());
//	
//	    Map body = response.getBody();
//	
//	    assertNotNull(body);
//	    assertEquals("1200.0", body.get("total_recieve"));
//	    assertEquals("400.0", body.get("total_sent"));
//	    assertEquals("800.0", body.get("net_amt"));
//	
//	    verify(expenseRepo).getMonthlySummary(
//	            any(LocalDate.class),
//	            any(LocalDate.class)
//	    );
//	}

}

