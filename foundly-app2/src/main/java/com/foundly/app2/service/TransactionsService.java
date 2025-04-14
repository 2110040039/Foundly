package com.foundly.app2.service;

import com.foundly.app2.entity.Transactions;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.User;
import com.foundly.app2.repository.TransactionsRepository;
import com.foundly.app2.repository.ItemReportsRepository;
import com.foundly.app2.repository.UserRepository;
import com.foundly.app2.dto.ClaimRequest;
import com.foundly.app2.dto.HandoverRequest;
import com.foundly.app2.dto.TransactionResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
 // Claim an item
    public Transactions claimItem(ClaimRequest request) {
        // Fetch item
        ItemReports item = itemReportsRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Fetch user
        User requester = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        // Determine transaction status based on itemStatus
        Transactions.TransactionStatus status;
        if (item.getItemStatus() == ItemReports.ItemStatus.WITH_SECURITY) {
            status = Transactions.TransactionStatus.PENDING_COMPLETION;
        } else if (item.getItemStatus() == ItemReports.ItemStatus.WITH_FINDER) {
            status = Transactions.TransactionStatus.REQUESTED;
        } else {
            throw new IllegalStateException("Item is not available for claiming");
        }

        // Build transaction
        Transactions transaction = new Transactions();
        transaction.setItem(item);
        transaction.setRequester(requester);
        transaction.setReporter(item.getUser());
        transaction.setEmployeeId(request.getEmployeeId());
        transaction.setRequesterName(request.getName());
        transaction.setPhoto(request.getPhoto());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionType(Transactions.TransactionType.CLAIM);
        transaction.setTransactionStatus(status);
        transaction.setRequesterStatus(Transactions.UserActionStatus.PENDING);
        transaction.setReporterStatus(Transactions.UserActionStatus.PENDING);
        transaction.setDateUpdated(LocalDateTime.now());

        return transactionsRepository.save(transaction);
    }

    // Handover an item
    public Transactions handoverItem(HandoverRequest request) {
        ItemReports item = itemReportsRepository.findById(request.getItemId())
            .orElseThrow(() -> new RuntimeException("Item not found"));

        User requester = userRepository.findById(request.getRequesterId())
            .orElseThrow(() -> new RuntimeException("Requester not found"));

        Transactions transaction = new Transactions();
        transaction.setItem(item);
        transaction.setRequester(requester);
        transaction.setReporter(item.getUser());
        transaction.setEmployeeId(requester.getEmployeeId());
        transaction.setRequesterName(requester.getName());
        transaction.setPhoto(request.getPhoto());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionType(Transactions.TransactionType.HANDOVER);
        transaction.setRequesterStatus(Transactions.UserActionStatus.PENDING);
        transaction.setReporterStatus(Transactions.UserActionStatus.PENDING);
        transaction.setDateUpdated(LocalDateTime.now());

        if (request.isHandoverToSecurity()) {
            item.setItemStatus(ItemReports.ItemStatus.WITH_SECURITY);
            transaction.setTransactionStatus(Transactions.TransactionStatus.PENDING_COMPLETION);
            transaction.setHandedOverToSecurity(true);
            transaction.setSecurityId(request.getSecurityId());
            transaction.setSecurityName(request.getSecurityName());
        } else {
            item.setItemStatus(ItemReports.ItemStatus.WITH_FINDER);
            transaction.setTransactionStatus(Transactions.TransactionStatus.REQUESTED);
            transaction.setHandedOverToSecurity(false);
            transaction.setPickupMessage(request.getPickupMessage());
        }

        itemReportsRepository.save(item);
        return transactionsRepository.save(transaction);
    }




    public List<TransactionResponse> getClaimsByUserId(Long userId) {
        List<Transactions> transactions = transactionsRepository.findByRequesterUserIdAndTransactionType(userId, Transactions.TransactionType.CLAIM);
        return transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TransactionResponse> getHandoversByUserId(Long userId) {
        List<Transactions> transactions = transactionsRepository.findByRequesterUserIdAndTransactionType(userId, Transactions.TransactionType.HANDOVER);
        return transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private TransactionResponse mapToResponse(Transactions transaction) {
        return new TransactionResponse(
            transaction.getTransactionId(),
            transaction.getItem().getItemId(),
            transaction.getItem().getItemName(),
            transaction.getItem().getType().toString(),
            transaction.getItem().getCategory().getCategoryName(),
            transaction.getItem().getLocation(),
            transaction.getTransactionType(),
            transaction.getTransactionStatus(),
            transaction.getDescription(),
            transaction.getPhoto(),
            transaction.isHandedOverToSecurity(),
            transaction.getPickupMessage(),
            transaction.getSecurityId(),
            transaction.getSecurityName()
        );
    }
    public Transactions updateReporterStatus(Integer transactionId, Transactions.UserActionStatus newStatus) {
        Transactions transaction = transactionsRepository.findById(transactionId)
            .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setReporterStatus(newStatus);

        if (transaction.getRequesterStatus() == Transactions.UserActionStatus.SUBMITTED &&
            transaction.getReporterStatus() == Transactions.UserActionStatus.COLLECTED) {
            transaction.setTransactionStatus(Transactions.TransactionStatus.COMPLETED);
            transaction.getItem().setItemStatus(ItemReports.ItemStatus.RECEIVED);
            itemReportsRepository.save(transaction.getItem());
        }

        transaction.setDateUpdated(LocalDateTime.now());
        return transactionsRepository.save(transaction);
    }
    public Transactions updateRequesterStatus(Integer transactionId, Transactions.UserActionStatus newStatus) {
        Transactions transaction = transactionsRepository.findById(transactionId)
            .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setRequesterStatus(newStatus);

        if (transaction.getRequesterStatus() == Transactions.UserActionStatus.SUBMITTED &&
            transaction.getReporterStatus() == Transactions.UserActionStatus.COLLECTED) {
            transaction.setTransactionStatus(Transactions.TransactionStatus.COMPLETED);
            transaction.getItem().setItemStatus(ItemReports.ItemStatus.RECEIVED);
            itemReportsRepository.save(transaction.getItem());
        }

        transaction.setDateUpdated(LocalDateTime.now());
        return transactionsRepository.save(transaction);
    }





    // Additional methods for handling transaction status updates can be added here
}