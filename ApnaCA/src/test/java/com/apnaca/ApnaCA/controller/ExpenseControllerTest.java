
package com.apnaca.ApnaCA.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.apnaca.ApnaCA.entity.Expense;
import com.apnaca.ApnaCA.service.ExpenseService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.never;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ExpenseController.class)
class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ExpenseService expenseSer;

    // 1. GET expense by ID
    @Test
    void fetchDataById_shouldReturnExpense() throws Exception {

        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(250.0);
        expense.setCategory("Food");

        when(expenseSer.findExpense(1L))
                .thenReturn(ResponseEntity.ok(expense));

        mockMvc.perform(get("/api/expenses/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.amount").value(250.0))
                .andExpect(jsonPath("$.category").value("Food"));

        verify(expenseSer).findExpense(1L);
    }

    // 2. POST create expense

@Test
void addExpense_shouldReturnCreatedExpense() throws Exception {

    Expense expense = new Expense();
    expense.setAmount(250.0);
    expense.setCategory("Food");
    expense.setPaymentMethod("UPI");
    expense.setExpenseDate(LocalDate.of(2026, 10, 11));
    expense.setExpenseTime(java.time.LocalTime.of(12, 30));
    expense.setTransactionType("SENT");
    expense.setDescription("Lunch");
    expense.setSource("Google Pay");

    when(expenseSer.addExpense(any(Expense.class)))
            .thenReturn(ResponseEntity.ok(expense));

    String requestBody = """
        {
            "amount": 250.0,
            "category": "Food",
            "paymentMethod": "UPI",
            "expenseDate": "2026-10-11",
            "expenseTime": "12:30:00",
            "transactionType": "SENT",
            "description": "Lunch",
            "source": "Google Pay"
        }
        """;

    mockMvc.perform(post("/api/expenses/addExpense")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.amount").value(250.0))
            .andExpect(jsonPath("$.category").value("Food"))
            .andExpect(jsonPath("$.paymentMethod").value("UPI"))
            .andExpect(jsonPath("$.transactionType").value("SENT"));

    verify(expenseSer).addExpense(any(Expense.class));
}


    // 3. GET all expenses with default pagination
    @Test
    void fetchDataAll_shouldReturnPaginatedExpenses() throws Exception {

        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(250.0);
        expense.setCategory("Food");

        Page<Expense> expenses = new PageImpl<>(
                List.of(expense),
                PageRequest.of(0, 10),
                1
        );

        when(expenseSer.getExpenses(
                null, null, null, null, null, null, null, 0, 10
        )).thenReturn(expenses);

        mockMvc.perform(get("/api/expenses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].category").value("Food"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.number").value(0));

        verify(expenseSer).getExpenses(
                null, null, null, null, null, null, null, 0, 10
        );
    }

    // 4. GET expenses with filters
    @Test
    void fetchDataAll_shouldApplyFilters() throws Exception {

        LocalDate startDate = LocalDate.of(2026, 10, 1);
        LocalDate endDate = LocalDate.of(2026, 10, 31);

        Page<Expense> expenses = new PageImpl<>(List.of());

        when(expenseSer.getExpenses(
                "Food", "SENT", 100.0, 500.0,
                "UPI", startDate, endDate, 0, 10
        )).thenReturn(expenses);

        mockMvc.perform(get("/api/expenses")
                .param("category", "Food")
                .param("transactionType", "SENT")
                .param("minAmount", "100")
                .param("maxAmount", "500")
                .param("paymentMethod", "UPI")
                .param("startDate", "2026-10-01")
                .param("endDate", "2026-10-31")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(0));

        verify(expenseSer).getExpenses(
                "Food", "SENT", 100.0, 500.0,
                "UPI", startDate, endDate, 0, 10
        );
    }

    // 5. PUT update expense
    @Test
    void updateExpense_shouldReturnUpdatedExpense() throws Exception {

        Expense updatedExpense = new Expense();
        updatedExpense.setId(1L);
        updatedExpense.setAmount(400.0);
        updatedExpense.setCategory("Shopping");

        when(expenseSer.updateExpense(
                org.mockito.ArgumentMatchers.eq(1L),
                any(Expense.class)
        )).thenReturn(ResponseEntity.ok(updatedExpense));

        String requestBody =
                "{\"amount\":400.0,\"category\":\"Shopping\"}";

        mockMvc.perform(put("/api/expenses/update/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.amount").value(400.0))
                .andExpect(jsonPath("$.category").value("Shopping"));

        verify(expenseSer).updateExpense(
                org.mockito.ArgumentMatchers.eq(1L),
                any(Expense.class)
        );
    }

    // 6. DELETE expense
    @Test
    void deleteExpense_shouldReturnNoContent() throws Exception {

        mockMvc.perform(delete("/api/expenses/1"))
                .andExpect(status().isNoContent());

        verify(expenseSer).deleteExpense(1L);
    }

//    // 7. GET monthly expense summary
//    @Test
//    void getMonthlyExpense_shouldReturnSummary() throws Exception {
//
//        Map<String, Object> summary = Map.of(
//                "received", 1000.0,
//                "sent", 400.0,
//                "balance", 600.0
//        );
//
//        when(expenseSer.getMonthlyExpense(null, null, null, null, null))
//                .thenReturn(ResponseEntity.ok(summary));
//
//        mockMvc.perform(get("/api/expenses/getMonthExpense"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.received").value(1000.0))
//                .andExpect(jsonPath("$.sent").value(400.0))
//                .andExpect(jsonPath("$.balance").value(600.0));
//
//        verify(expenseSer).getMonthlyExpense(null, null, null, null, null);
//    }

    // 8. GET with an invalid ID format
    @Test
    void fetchDataById_withInvalidId_shouldReturnBadRequest()
            throws Exception {

        mockMvc.perform(get("/api/expenses/abc"))
                .andExpect(status().isBadRequest());

        verify(expenseSer, never()).findExpense(any());
    }

    // 9. POST with malformed JSON
    @Test
    void addExpense_withMalformedJson_shouldReturnBadRequest()
            throws Exception {

        mockMvc.perform(post("/api/expenses/addExpense")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{"))
                .andExpect(status().isBadRequest());

        verify(expenseSer, never()).addExpense(any(Expense.class));
    }
}
