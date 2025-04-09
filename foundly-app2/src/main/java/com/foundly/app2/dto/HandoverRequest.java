package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HandoverRequest {
    private Integer itemId;                // ID of the item being handed over
    private Integer requesterId;       // ID of the user handing over the item
    private boolean handoverToSecurity;     // true if handed to security, false if kept with finder
    private String securityId;              // ID of the security personnel (if applicable)
    private String securityName;            // Name of the security personnel (if applicable)
    private String pickupMessage;           // Message for the claimant (if kept with the finder)
    private String photo;                   // URL or base64 string of the photo being handed over
    private String description; 
}