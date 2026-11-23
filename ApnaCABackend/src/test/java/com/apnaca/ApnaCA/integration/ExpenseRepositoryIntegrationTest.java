package com.apnaca.ApnaCA.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.apnaca.ApnaCA.entity.Expense;
import com.apnaca.ApnaCA.repository.ExpenseRepository;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ExpenseRepositoryIntegrationTest {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Test
    void shouldSaveAndFindExpense() {
        Expense expense = createExpense(
                250.0, "Food", "SENT",
                LocalDate.of(2026, 10, 11));

        Expense saved = expenseRepository.saveAndFlush(expense);

        assertNotNull(saved.getId());

        Expense found = expenseRepository.findById(saved.getId())
                .orElseThrow();

        assertEquals("Food", found.getCategory());
        assertEquals(250.0, found.getAmount());
        assertEquals("SENT", found.getTransactionType());
    }

//    @Test
//    void shouldCalculateMonthlySummary() {
//        expenseRepository.saveAndFlush(
//                createExpense(1200.0, "Salary", "RECEIVED",
//                        LocalDate.of(2026, 10, 5)));
//
//        expenseRepository.saveAndFlush(
//                createExpense(400.0, "Food", "SENT",
//                        LocalDate.of(2026, 10, 10)));
//
//		Object[] result = expenseRepository.getMonthlySummary(
//		        LocalDate.of(2026, 10, 1),
//		        LocalDate.of(2026, 11, 1));
//		
//		assertNotNull(result);
//		
//		// Handle a nested Object[] result if the provider returns one.
//		Object[] totals = result;
//		if (result.length == 1 && result[0] instanceof Object[]) {
//		    totals = (Object[]) result[0];
//		}
//		
//		assertEquals(1200.0, ((Number) totals[0]).doubleValue());
//		assertEquals(400.0, ((Number) totals[1]).doubleValue());
//
//    }

    private Expense createExpense(
            double amount,
            String category,
            String transactionType,
            LocalDate date) {

        Expense expense = new Expense();
        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setPaymentMethod("UPI");
        expense.setExpenseDate(date);
        expense.setExpenseTime(LocalTime.of(12, 30));
        expense.setTransactionType(transactionType);
        expense.setDescription("Integration test");
        expense.setSource("Google Pay");

        return expense;
    }
}
