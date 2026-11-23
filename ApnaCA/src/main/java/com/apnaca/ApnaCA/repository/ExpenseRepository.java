package com.apnaca.ApnaCA.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.apnaca.ApnaCA.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense>{
	
		
		@Query("""
		    SELECT
		        COALESCE(SUM(CASE
		            WHEN e.transactionType = 'RECEIVED'
		            THEN e.amount ELSE 0 END), 0),
		
		        COALESCE(SUM(CASE
		            WHEN e.transactionType = 'SENT'
		            THEN e.amount ELSE 0 END), 0)
		
		    FROM Expense e
		
		    WHERE e.expenseDate >= :startDate
		      AND e.expenseDate < :endDate
		
		      AND (:transactionType IS NULL
		           OR e.transactionType = :transactionType)
		
		      AND (:category IS NULL
		           OR e.category = :category)
		
		      AND (:paymentMethod IS NULL
		           OR e.paymentMethod = :paymentMethod)
		    """)
		Object[] getMonthlySummary(
		    @Param("startDate") LocalDate startDate,
		    @Param("endDate") LocalDate endDate,
		    @Param("transactionType") String transactionType,
		    @Param("category") String category,
		    @Param("paymentMethod") String paymentMethod
		);


		@Query("""
		    SELECT
		        COALESCE(SUM(CASE WHEN e.category = 'Food' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.category = 'Fashion' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.category = 'EMI' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.category = 'Travel' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.category = 'Rent' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.category = 'Shopping' THEN e.amount ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN e.category = 'Other' THEN e.amount ELSE 0 END), 0)
		
		    FROM Expense e
		
		    WHERE e.expenseDate >= :startDate
		      AND e.expenseDate <= :endDate
		
		      AND (:transactionType IS NULL
		           OR :transactionType = ''
		           OR e.transactionType = :transactionType)
		
		      AND (:category IS NULL
		           OR :category = ''
		           OR e.category = :category)
		
		      AND (:paymentMethod IS NULL
		           OR :paymentMethod = ''
		           OR e.paymentMethod = :paymentMethod)
		    """)
		Object[] getMonthlySummaryByCategory(
		        @Param("startDate") LocalDate startDate,
		        @Param("endDate") LocalDate endDate,
		        @Param("transactionType") String transactionType,
		        @Param("category") String category,
		        @Param("paymentMethod") String paymentMethod
		);

	
	
	@Query("""
		    SELECT
		        YEAR(e.expenseDate) AS year,
		        MONTH(e.expenseDate) AS month,
		        SUM(CASE WHEN e.transactionType = 'RECEIVED'
		            THEN e.amount ELSE 0 END) AS received,
		        SUM(CASE WHEN e.transactionType = 'SENT'
		            THEN e.amount ELSE 0 END) AS spent,
		        SUM(CASE
		            WHEN e.transactionType = 'RECEIVED' THEN e.amount
		            WHEN e.transactionType = 'SENT' THEN -e.amount
		            ELSE 0
		        END) AS net
		    FROM Expense e
		    WHERE e.expenseDate >= :startDate
		      AND e.expenseDate < :endDate
		    GROUP BY YEAR(e.expenseDate), MONTH(e.expenseDate)
		    ORDER BY YEAR(e.expenseDate), MONTH(e.expenseDate)
		    """)
	List<Object[]> getSixMonthlySummary(
			@Param("startDate") LocalDate startDate,
	        @Param("endDate") LocalDate endDate
			);
}
