package com.bits.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bits.project.model.InvoiceDetails;

public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Long> {
    Optional<InvoiceDetails> findByInvoiceNumber(String invoiceNumber);
}

