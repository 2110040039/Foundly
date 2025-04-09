package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClaimRequest {
    private Integer requesterId;  // ID of the user claiming the item
    private String employeeId;     // Employee ID of the requester
    private String name;           // Name of the requester
    private String photo;          // Photo of the proof of ownership
    private String description;     // Small description of the claim
    private Integer itemId;        // ID of the item being claimed
}