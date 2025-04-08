package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HandoverRequest {
    private Integer initiatorUserId;  // ID of the user handing over the item
    private String securityId;         // ID of the security personnel (if applicable)
    private String securityName;       // Name of the security personnel (if applicable)
    private String pickupMessage;      // Message for the claimant (if kept with the finder)
    private String photo;              // URL or base64 string of the photo being handed over
}