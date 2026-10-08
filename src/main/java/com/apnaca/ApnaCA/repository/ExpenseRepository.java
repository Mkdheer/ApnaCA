package com.apnaca.ApnaCA.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.apnaca.ApnaCA.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{
	
	@Query("""
		    SELECT
		        COALESCE(SUM(CASE WHEN e.transaction_type = 'RECEIVED' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.transaction_type = 'SENT' THEN e.amount ELSE 0 END), 0)
		    FROM Expense e
		    WHERE e.expenseDate >= :startDate
		      AND e.expenseDate < :endDate
		""")
		Object[] getMonthlySummary(
		        @Param("startDate") LocalDate startDate,
		        @Param("endDate") LocalDate endDate
		);
	
}
