package com.bits.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bits.project.model.PaymentDetails;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {
    Optional<PaymentDetails> findByTransactionId(String transactionId);
}

