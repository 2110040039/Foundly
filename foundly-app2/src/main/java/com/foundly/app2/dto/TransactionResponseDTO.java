package com.foundly.app2.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDTO {
    private Integer transactionId;
    private String itemName;
    private String requesterName;
    private String description;
    private String transactionStatus;
    private String transactionType;
    private LocalDateTime dateUpdated;
}
