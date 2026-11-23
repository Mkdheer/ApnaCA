	package com.apnaca.ApnaCA.controller;
	
	import java.time.LocalDate;
	import java.util.List;
	import java.util.Map;
	
	import org.springframework.data.domain.Page;
	import org.springframework.format.annotation.DateTimeFormat;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.DeleteMapping;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.PutMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	import org.springframework.web.bind.annotation.RestController;

import com.apnaca.ApnaCA.dto.MonthlyChartDTO;
import com.apnaca.ApnaCA.entity.Expense;
	import com.apnaca.ApnaCA.service.ExpenseService;
	
	import jakarta.validation.Valid;
	
	@RestController()
	@RequestMapping("/api/expenses")
	public class ExpenseController {
	
		private final ExpenseService expenseSer;
		
		public ExpenseController (ExpenseService expenseSer) {
			this.expenseSer = expenseSer;
		}
		
		@PostMapping("/addExpense")
		public ResponseEntity<Expense> addExpense( @Valid  @RequestBody Expense expense){
			return expenseSer.addExpense(expense);
		}
		
		@GetMapping("/getMonthExpense")
		public ResponseEntity<Map<String,Double>> getMonthlyExpense(
				@RequestParam String startDate, 
				@RequestParam String endDate,
				@RequestParam (required = false) String transactionType,
				@RequestParam (required = false) String category,
				@RequestParam (required = false) String paymentMethod
				){
			return expenseSer.getMonthlyExpense(startDate, endDate, transactionType, category, paymentMethod);
		}
		
		@GetMapping("/getMonthExpenseByCategory")
		public ResponseEntity<Map<String,Double>> getMonthlyExpenseByCategory(
				@RequestParam String startDate, 
				@RequestParam String endDate,
				@RequestParam (required = false) String transactionType,
				@RequestParam (required = false) String category,
				@RequestParam (required = false) String paymentMethod
				){
			return expenseSer.getMonthlyExpenseByCategory(startDate, endDate, transactionType, category, paymentMethod);
		}
		@GetMapping("/getSixMonthExpense")
		public ResponseEntity<List<MonthlyChartDTO>> getSixMonthlyExpense(){
			return expenseSer.getSixMonthlyExpense();
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Expense> fetchDataById(@PathVariable Long id){
			return expenseSer.findExpense(id);
		}
		
		@PutMapping("/update/{id}")
		public ResponseEntity<Expense> update(
				@PathVariable Long id,
				@RequestBody Expense expense){
			return expenseSer.updateExpense(id,expense);
		}
		
		
		@GetMapping
		public ResponseEntity<Page<Expense>> fetchDataAll(
				@RequestParam(required = false) String category,
				@RequestParam(required = false) String transactionType,
				@RequestParam(required = false) Double minAmount,
				@RequestParam(required = false) Double maxAmount,
				@RequestParam(required = false) String paymentMethod,
				@RequestParam(required = false)
				@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
				LocalDate startDate,
				@RequestParam(required = false)
				@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
				LocalDate endDate,
				@RequestParam(defaultValue = "0") int page,
				@RequestParam(defaultValue = "10") int size) {
	
		    Page<Expense> result =
		            expenseSer.getExpenses(category,transactionType,minAmount,maxAmount,
		            		paymentMethod,startDate,endDate,page, size);
	
		    return ResponseEntity.ok(result);
		}
		
	
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
			expenseSer.deleteExpense(id);
			return ResponseEntity.ok().build();
		}
	
		
	}
