package com.apnaca.ApnaCA.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Arrays;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.apnaca.ApnaCA.dto.MonthlyChartDTO;
import com.apnaca.ApnaCA.entity.Expense;
import com.apnaca.ApnaCA.exception.ExpenseNotFoundException;
import com.apnaca.ApnaCA.repository.ExpenseRepository;
import com.apnaca.ApnaCA.specification.ExpenseSpecification;

@Service
public class ExpenseService {
	
	private final ExpenseRepository expenseRepo;
	
	public ExpenseService(ExpenseRepository expenseRepo) {
		this.expenseRepo = expenseRepo;
	}
	

	private Expense findExpenseById(Long id) {
	    return expenseRepo.findById(id)
	            .orElseThrow(() -> new ExpenseNotFoundException(id));
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
	

		public ResponseEntity<Map<String, Double>> getMonthlyExpense(
		        String startDate,
		        String endDate,
		        String transactionType,
		        String category,
		        String paymentMethod) {
		
		    LocalDate startDate1 = LocalDate.parse(startDate);
		    LocalDate endDate1 = LocalDate.parse(endDate);
		    System.out.println("2. Dates parsed: " + startDate1 + " to " + endDate1);
		
		    // Convert ALL into null for optional filters
		    transactionType = "ALL".equals(transactionType) ? null : transactionType;
		    category = "ALL".equals(category) ? null : category;
		    paymentMethod = "ALL".equals(paymentMethod) ? null : paymentMethod;

		
		    Object[] result = expenseRepo.getMonthlySummary(
		            startDate1,
		            endDate1.plusDays(1),
		            transactionType,
		            category,
		            paymentMethod
		    );
		
		    Object[] values = (Object[]) result[0];

		    Double totalReceived = ((Number) values[0]).doubleValue();
		    Double totalSent = ((Number) values[1]).doubleValue();

		    Double netAmount = totalReceived - totalSent;
		    Map<String, Double> response = new HashMap<>();
		
		    response.put("total_recieve", totalReceived);
		    response.put("total_sent", totalSent);
		    response.put("net_amt", netAmount);
		
		    return ResponseEntity.ok(response);
}

	 
	public ResponseEntity<Expense> findExpense(Long id) {
		Map<String, String> m = new HashMap<>();
		Expense ex = findExpenseById(id);
		return ResponseEntity.ok(ex);
	}
	
	public ResponseEntity<Map<String,Double>> getMonthlyExpenseByCategory(
			String startDate,
	        String endDate,
	        String transactionType,
	        String category,
	        String paymentMethod
	        ){
		Map<String, Double> hm = new HashMap<>();
		
		LocalDate startDate1 = LocalDate.parse(startDate);
	    LocalDate endDate1 = LocalDate.parse(endDate);
	    transactionType = "ALL".equals(transactionType) ? null : transactionType;
	    category = "ALL".equals(category) ? null : category;
	    paymentMethod = "ALL".equals(paymentMethod) ? null : paymentMethod;
	    Object[] result = expenseRepo.getMonthlySummaryByCategory(startDate1, endDate1, transactionType, category, paymentMethod);
	    Object[] values = (Object[]) result[0];
	    
	    hm.put("food", ((Number) values[0]).doubleValue());
	    hm.put("fashion", ((Number) values[1]).doubleValue());
	    hm.put("emi", ((Number) values[2]).doubleValue());
	    hm.put("travel", ((Number) values[3]).doubleValue());
	    hm.put("rent", ((Number) values[4]).doubleValue());
	    hm.put("shopping", ((Number) values[5]).doubleValue());
	    hm.put("other", ((Number) values[6]).doubleValue());
	    
		return ResponseEntity.ok(hm);
	}
	
	public ResponseEntity<Expense> updateExpense(Long id, Expense ex){
		
		Expense expense = findExpenseById(id);
		
		expense.setAmount(ex.getAmount());
		expense.setCategory(ex.getCategory());
		expense.setDescription(ex.getDescription());
		expense.setExpenseDate(ex.getExpenseDate());
		expense.setExpenseTime(ex.getExpenseTime());
		expense.setPaymentMethod(ex.getPaymentMethod());
		expense.setSource(ex.getSource());
		expense.setTransactionType(ex.getTransactionType());
		
		return ResponseEntity.ok(expenseRepo.save(expense));
	}
	
	public ResponseEntity<List<MonthlyChartDTO>> getSixMonthlyExpense(){
				
		List<MonthlyChartDTO> li = new ArrayList<>();
		LocalDate endDate = LocalDate.now().withDayOfMonth(1).plusMonths(1);
	    LocalDate startDate = endDate.minusMonths(6);
		List<Object[]> result = expenseRepo.getSixMonthlySummary(startDate, endDate);
		Map<String, MonthlyChartDTO> monthlyMap = new HashMap<>();
		
		for( Object[] eachRow : result) {   
			 MonthlyChartDTO dto = new MonthlyChartDTO(
		                ((Number) eachRow[0]).intValue(),
		                ((Number) eachRow[1]).intValue(),
		                ((Number)(eachRow[2])).doubleValue(),
		                ((Number)(eachRow[3])).doubleValue(),
		                ((Number)(eachRow[4])).doubleValue()
		        );
			 	
			 	String key = dto.getYear() + "-" + dto.getMonth();
		        monthlyMap.put(key, dto);
		 }
		
		for(int i= 0; i<6 ;i++) {
			LocalDate date = startDate.plusMonths(i);

	        String key = date.getYear() + "-" + date.getMonthValue();

	        MonthlyChartDTO dto = monthlyMap.get(key);

	        if (dto == null) {
	            dto = new MonthlyChartDTO(
	                    date.getYear(),
	                    date.getMonthValue(),
	                    0.0,
	                    0.0,
	                    0.0
	            );
	        }

	        li.add(dto);
		}
		
		return ResponseEntity.ok(li);
	}
	
	@GetMapping
	public Page<Expense> getExpenses(int page, int size){
		
		 Pageable pageable = PageRequest.of(
			        page,
			        size,
			        Sort.by(Sort.Direction.DESC, "transactionType")
			            .and(Sort.by(Sort.Direction.DESC, "id"))
			    );
		return expenseRepo.findAll(pageable);
	}
	
	public Page<Expense> getExpenses(
			String category,
			String transactionType,
			Double minAmount,
			Double maxAmount,
			String paymentMethod,
			LocalDate startDate,
			LocalDate endDate,
			int page,
			int size) {

	    Specification<Expense> spec =
	            Specification.unrestricted();

	    if (category != null && !category.isBlank()) {
	        spec = spec.and(
	                ExpenseSpecification.hasCategory(category));
	    }

	    if (transactionType != null && !transactionType.isBlank()) {
	        spec = spec.and(
	                ExpenseSpecification.hasTransactionType(transactionType));
	    }
	    
	    if (minAmount != null) {
	        spec = spec.and(
	                ExpenseSpecification.amountGreaterThanOrEqual(minAmount));
	    }

	    if (maxAmount != null) {
	        spec = spec.and(
	                ExpenseSpecification.amountLessThanOrEqual(maxAmount));
	    }

	    if (paymentMethod != null && !paymentMethod.isBlank()) {
	        spec = spec.and(
	                ExpenseSpecification.hasPaymentMethod(paymentMethod));
	    }

	    if (startDate != null) {
	        spec = spec.and(
	                ExpenseSpecification.dateOnOrAfter(startDate));
	    }

	    if (endDate != null) {
	        spec = spec.and(
	                ExpenseSpecification.dateOnOrBefore(endDate));
	    }


	    Pageable pageable = PageRequest.of(
	            page,
	            size,
	            Sort.by(Sort.Direction.DESC, "id")
	    );

	    return expenseRepo.findAll(spec, pageable);
	}	
	
	

	public void deleteExpense(Long id) {
		Expense expense = findExpenseById(id);
	    expenseRepo.deleteById(expense.getId());
	}

	
	
	
	

}
