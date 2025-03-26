package com.foundly.app.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageID;

    @ManyToOne
    @JoinColumn(name = "senderID", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiverID", nullable = false)
    private User receiver;

    @Column(name = "message_text", nullable = false)
    private String content;



    @Column(nullable = false, updatable = false)
    private Timestamp sentAt;

    public Message() {
        this.sentAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getMessageID() {
        return messageID;
    }

    public void setMessageID(Long messageID) {
        this.messageID = messageID;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getSentAt() {
        return sentAt;
    }

    public void setSentAt(Timestamp sentAt) {
        this.sentAt = sentAt;
    }
}
