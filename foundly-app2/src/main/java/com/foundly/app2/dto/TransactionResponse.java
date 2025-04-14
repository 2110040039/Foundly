package com.foundly.app2.dto;

import com.foundly.app2.entity.Transactions.TransactionStatus;
import com.foundly.app2.entity.Transactions.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Integer transactionId;
    private Integer itemId;
    private String itemName;
    private String itemType;
    private String category;
    private String location;
    private TransactionType transactionType;
    private TransactionStatus transactionStatus;
    private String description;
    private String photo;
    private boolean handedOverToSecurity;
    private String pickupMessage;
    private String securityId;
    private String securityName;
}
