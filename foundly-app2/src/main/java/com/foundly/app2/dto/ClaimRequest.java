package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClaimRequest {
    private Integer initiatorUserId;  // ID of the user claiming the item
    private Integer itemId;            // ID of the item being claimed
    private String proofOfOwnership;    // Proof of ownership details (e.g., image URL)
    private String description;          // Small description of the claim
}