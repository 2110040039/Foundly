package com.foundly.app2.repository;

import com.foundly.app2.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {

    // Custom query method to find Transactions by TransactionStatus
    List<Transactions> findByTransactionStatus(Transactions.TransactionStatus transactionStatus);
}
