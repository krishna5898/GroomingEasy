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
public class InvoiceDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String invoiceNumber; // Unique invoice number

    @Column(nullable = false)
    private Double totalAmount; // Total amount on the invoice

    @Column(nullable = false)
    private LocalDateTime invoiceDateTime; // Timestamp for invoice generation

    private String paymentMethod; // e.g., "Credit Card", "Debit Card", "Net Banking"

    private String transactionId; // Associated transaction ID
}
