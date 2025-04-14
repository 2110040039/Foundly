package com.foundly.app2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemReports item;

    @ManyToOne
    @JoinColumn(name = "reporter_user_id", nullable = false)
    private User reporter; // The user who reported the item

    @ManyToOne
    @JoinColumn(name = "requester_user_id", nullable = false)
    private User requester; // The person claiming or receiving the item

    @Column(name = "employee_id")
    private String employeeId; // Employee ID of the requester

    @Column(name = "requester_name")
    private String requesterName; // Name of the requester

    @Column(name = "security_id")
    private String securityId; // ID of the security personnel (if applicable)

    @Column(name = "security_name")
    private String securityName; // Name of the security personnel (if applicable)

    @Column(name = "handed_over_to_security")
    private boolean handedOverToSecurity; // Indicates if the item was handed over to security

    @Column(name = "pickup_message")
    private String pickupMessage; // Message for the claimant

    @Column(name = "photo", columnDefinition = "LONGTEXT") // Supports large base64 strings
    private String photo; // Base64-encoded string of the proof of ownership photo

    @Column(name = "description") // New field for the claim description
    private String description; // Description of the claim

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType; // Type of transaction (e.g., CLAIM, HANDOVER)

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_status", nullable = false)
    private TransactionStatus transactionStatus = TransactionStatus.REQUESTED; // Current status of the transaction

    @Column(name = "date_updated")
    private LocalDateTime dateUpdated; // Timestamp for the last update
    
    public enum UserActionStatus {
        PENDING, SUBMITTED, COLLECTED
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "requester_status")
    private UserActionStatus requesterStatus = UserActionStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "reporter_status")
    private UserActionStatus reporterStatus = UserActionStatus.PENDING;



    public enum TransactionType {
        CLAIM, HANDOVER
    }

    public enum TransactionStatus {
        REQUESTED, COMPLETED, PENDING_COMPLETION // Added PENDING_COMPLETION status
    }
}