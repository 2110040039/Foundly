package com.foundly.app.entity;

import com.foundly.app.entity.enums.MatchStatus;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "match_table")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchID;

    @ManyToOne
    @JoinColumn(name = "lostItemID", nullable = false)
    private ItemReport lostItem;

    @ManyToOne
    @JoinColumn(name = "foundItemID", nullable = false)
    private ItemReport foundItem;

    @Column(nullable = false)
    private int matchScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status;

    @Column(nullable = false, updatable = false)
    private Timestamp matchedAt;

    public Match() {
        this.status = MatchStatus.PENDING;
        this.matchedAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getMatchID() {
        return matchID;
    }

    public void setMatchID(Long matchID) {
        this.matchID = matchID;
    }

    public ItemReport getLostItem() {
        return lostItem;
    }

    public void setLostItem(ItemReport lostItem) {
        this.lostItem = lostItem;
    }

    public ItemReport getFoundItem() {
        return foundItem;
    }

    public void setFoundItem(ItemReport foundItem) {
        this.foundItem = foundItem;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }

    public MatchStatus getStatus() {
        return status;
    }

    public void setStatus(MatchStatus status) {
        this.status = status;
    }

    public Timestamp getMatchedAt() {
        return matchedAt;
    }

    public void setMatchedAt(Timestamp matchedAt) {
        this.matchedAt = matchedAt;
    }
}
