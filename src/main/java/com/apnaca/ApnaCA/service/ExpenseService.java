package com.apnaca.ApnaCA.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.apnaca.ApnaCA.entity.Expense;
import com.apnaca.ApnaCA.repository.ExpenseRepository;

@Service
public class ExpenseService {
	
	private final ExpenseRepository expenseRepo;
	
	public ExpenseService(ExpenseRepository expenseRepo) {
		this.expenseRepo = expenseRepo;
	}
	
	public ResponseEntity<Expense> addExpense(Expense expense) {
		Map<String, String> m = new HashMap<>();
		
		if(expense == null) {
			m.put("msg", "Something went wrong");
			m.put("status", "404");
			return ResponseEntity.badRequest().build();
		}
		
		Expense ex = expenseRepo.save(expense);
		return ResponseEntity.ok(ex);
	}
	
	public ResponseEntity<Map> getMonthlyExpense() {

	    LocalDate startDate = LocalDate.now().withDayOfMonth(1);
	    LocalDate endDate = startDate.plusMonths(1);


	    Object[] result = expenseRepo.getMonthlySummary(startDate, endDate);


	    Object[] values = (Object[]) result[0];

	    Double totalReceived = ((Number) values[0]).doubleValue();
	    Double totalSent = ((Number) values[1]).doubleValue();

	    Double netAmount = totalReceived - totalSent;

	    Map<String, String> m = new HashMap<>();

	    m.put("total_recieve", "" + totalReceived);
	    m.put("total_sent", "" + totalSent);
	    m.put("net_amt", "" + netAmount);

	    return ResponseEntity.ok(m);
	}
	 
}
