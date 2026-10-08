package com.apnaca.ApnaCA.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apnaca.ApnaCA.entity.Expense;
import com.apnaca.ApnaCA.service.ExpenseService;

@RestController()
@RequestMapping("/api/expenses")
public class ExpenseController {

	private final ExpenseService expenseSer;
	
	public ExpenseController (ExpenseService expenseSer) {
		this.expenseSer = expenseSer;
	}
	
	@PostMapping("/addExpense")
	public ResponseEntity<Expense> addExpense(@RequestBody Expense expense){
		return expenseSer.addExpense(expense);
	}
	
	@GetMapping("/getMonthExpense")
	public ResponseEntity<Map> getMonthlyExpense(){
		return expenseSer.getMonthlyExpense();
	}
	
	
}
