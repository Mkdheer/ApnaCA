package com.apnaca.ApnaCA.entity;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "expenses")
public class Expense {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull(message = "Amount is required")
	@Positive(message = "Amount must be greater than zero")
	private Double amount;
	@NotBlank(message = "Category is required")
	private String category;
	@NotBlank(message = "Payment method is required")
	private String paymentMethod;
	@NotNull(message = "Expense date is required")
	private LocalDate expenseDate;
	@NotNull(message = "Expense time is required")
    private LocalTime expenseTime;
    private String description;
    private String source;
    @NotBlank(message = "Transaction type is required")
   @Column(name = "transaction_type") 
    private String transactionType;

    public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public Expense() {
	    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public LocalDate getExpenseDate() {
		return expenseDate;
	}

	public void setExpenseDate(LocalDate expenseDate) {
		this.expenseDate = expenseDate;
	}

	public LocalTime getExpenseTime() {
		return expenseTime;
	}

	public void setExpenseTime(LocalTime expenseTime) {
		this.expenseTime = expenseTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}
    
    
}
