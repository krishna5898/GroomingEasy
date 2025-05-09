package com.bits.project.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String paymentMethod; // e.g., "Credit Card", "Debit Card", "Net Banking"

    @Column(nullable = false)
    private String transactionId; // Unique transaction identifier

    @Column(nullable = false)
    private Double amount; // Payment amount

    @Column(nullable = false)
    private LocalDateTime paymentDateTime; // Timestamp for the payment

    private String status; // e.g., "Success", "Pending", "Failed"

    // Getters and Setters
}
