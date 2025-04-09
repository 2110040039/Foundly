package com.foundly.app2.service;

import com.foundly.app2.entity.Transactions;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.User;
import com.foundly.app2.repository.TransactionsRepository;
import com.foundly.app2.repository.ItemReportsRepository;
import com.foundly.app2.repository.UserRepository;
import com.foundly.app2.dto.ClaimRequest;
import com.foundly.app2.dto.HandoverRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionsService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private ItemReportsRepository itemReportsRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all transactions
    public List<Transactions> getAllTransactions() {
        return transactionsRepository.findAll();
    }

    // Get a transaction by ID
    public Optional<Transactions> getTransactionById(Integer transactionId) {
        return transactionsRepository.findById(transactionId);
    }

    // Claim an item
    public Transactions claimItem(ClaimRequest request) {
        // Fetch the item being claimed
        ItemReports item = itemReportsRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Fetch the requester user
        User requester = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        // Create a new transaction for claiming the item
        Transactions transaction = new Transactions();
        transaction.setItem(item);
        transaction.setRequester(requester); // Set the requester as the claimer
        transaction.setReporter(item.getUser ()); // Set the reporter user from the item

        // Set employeeId from the requester
        transaction.setEmployeeId(requester.getEmployeeId());

        // Set additional fields from the claim request
        transaction.setRequesterName(request.getName()); // Set the name from the request
        transaction.setPhoto(request.getPhoto()); // Set the photo from the request
        transaction.setDescription(request.getDescription()); // Set the description from the request

        // Set other transaction details
        transaction.setTransactionType(Transactions.TransactionType.CLAIM);
        transaction.setTransactionStatus(Transactions.TransactionStatus.REQUESTED);
        transaction.setDateUpdated(LocalDateTime.now());

        // Save the new transaction
        return transactionsRepository.save(transaction);
    }
    // Handover an item
    public Transactions handoverItem(HandoverRequest request) {
        // Fetch the item being handed over
        ItemReports item = itemReportsRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Fetch the requester user
        User requester = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        // Create a new transaction for handing over the item
        Transactions transaction = new Transactions();
        transaction.setItem(item);
        transaction.setRequester(requester); // Set the requester as the user handing over
        transaction.setReporter(item.getUser ()); // Set the reporter user from the item

        // Set employeeId from the requester
        transaction.setEmployeeId(requester.getEmployeeId());

        // Set additional fields from the handover request
        transaction.setRequesterName(requester.getName()); // Set the name from the requester
        transaction.setPhoto(request.getPhoto()); // Set the photo from the request
        transaction.setDescription(request.getDescription()); // Set the description from the request

        // Set other transaction details
        transaction.setTransactionType(Transactions.TransactionType.HANDOVER);
        transaction.setTransactionStatus(Transactions.TransactionStatus.REQUESTED);
        transaction.setDateUpdated(LocalDateTime.now());

        // Save the new transaction
        return transactionsRepository.save(transaction);
    }

    // Additional methods for handling transaction status updates can be added here
}