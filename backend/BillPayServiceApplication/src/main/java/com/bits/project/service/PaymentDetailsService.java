package com.bits.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.project.model.PaymentDetails;
import com.bits.project.repository.PaymentDetailsRepository;

@Service
public class PaymentDetailsService {

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    public PaymentDetails addPaymentDetails(PaymentDetails paymentDetails) {
        return paymentDetailsRepository.save(paymentDetails);
    }

    public List<PaymentDetails> getAllPaymentDetails() {
        return paymentDetailsRepository.findAll();
    }

    public PaymentDetails getPaymentDetailsByTransactionId(String transactionId) {
        return paymentDetailsRepository.findByTransactionId(transactionId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public void deletePaymentDetailsByTransactionId(String transactionId) {
        Optional<PaymentDetails> paymentDetails = paymentDetailsRepository.findByTransactionId(transactionId);
        paymentDetails.ifPresent(paymentDetailsRepository::delete);
    }
}
