package com.apnaca.ApnaCA.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.apnaca.ApnaCA.entity.Expense;

public class ExpenseSpecification {
	
	public static Specification<Expense> hasCategory(String category) {
        return (root, query, cb) ->
                cb.equal(root.get("category"), category);
    }
	
	public static Specification<Expense> hasTransactionType(
	        String transactionType) {

	    return (root, query, cb) ->
	            cb.equal(root.get("transactionType"), transactionType);
	}
	
	public static Specification<Expense> amountGreaterThanOrEqual(Double minAmount) {
	    return (root, query, cb) ->
	            cb.greaterThanOrEqualTo(root.get("amount"), minAmount);
	}

	public static Specification<Expense> amountLessThanOrEqual(Double maxAmount) {
	    return (root, query, cb) ->
	            cb.lessThanOrEqualTo(root.get("amount"), maxAmount);
	}

	public static Specification<Expense> hasPaymentMethod(String paymentMethod) {
	    return (root, query, cb) ->
	            cb.equal(root.get("paymentMethod"), paymentMethod);
	}

	public static Specification<Expense> dateOnOrAfter(LocalDate startDate) {
	    return (root, query, cb) ->
	            cb.greaterThanOrEqualTo(root.get("expenseDate"), startDate);
	}

	public static Specification<Expense> dateOnOrBefore(LocalDate endDate) {
	    return (root, query, cb) ->
	            cb.lessThanOrEqualTo(root.get("expenseDate"), endDate);
	}
	
}
