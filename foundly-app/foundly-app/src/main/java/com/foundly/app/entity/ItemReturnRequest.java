package com.foundly.app.entity;

import com.foundly.app.entity.enums.RequestType;
import com.foundly.app.entity.enums.VerificationStatus;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "item_return_request")
public class ItemReturnRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemReport item;

    @ManyToOne
    @JoinColumn(name = "requester_user_id", nullable = false)
    private User requester;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(20)")
    private RequestType requestType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String proofOfOwnership;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, columnDefinition = "VARCHAR(20)")
    private VerificationStatus verificationStatus;

    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    public ItemReturnRequest() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ItemReport getItem() {
        return item;
    }

    public void setItem(ItemReport item) {
        this.item = item;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public RequestType getRequestType() {
        return requestType;
    }

    public void setRequestType(RequestType requestType) {
        this.requestType = requestType;
    }

    public String getProofOfOwnership() {
        return proofOfOwnership;
    }

    public void setProofOfOwnership(String proofOfOwnership) {
        this.proofOfOwnership = proofOfOwnership;
    }

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }
}
