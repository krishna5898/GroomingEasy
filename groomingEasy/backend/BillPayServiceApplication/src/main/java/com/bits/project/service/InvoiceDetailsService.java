package com.bits.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.project.model.InvoiceDetails;
import com.bits.project.repository.InvoiceDetailsRepository;

@Service
public class InvoiceDetailsService {

    @Autowired
    private InvoiceDetailsRepository invoiceDetailsRepository;

    public InvoiceDetails addInvoiceDetails(InvoiceDetails invoiceDetails) {
        return invoiceDetailsRepository.save(invoiceDetails);
    }

    public List<InvoiceDetails> getAllInvoiceDetails() {
        return invoiceDetailsRepository.findAll();
    }

    public InvoiceDetails getInvoiceDetailsByInvoiceNumber(String invoiceNumber) {
        return invoiceDetailsRepository.findByInvoiceNumber(invoiceNumber)
            .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public void deleteInvoiceDetailsByInvoiceNumber(String invoiceNumber) {
        Optional<InvoiceDetails> invoiceDetails = invoiceDetailsRepository.findByInvoiceNumber(invoiceNumber);
        invoiceDetails.ifPresent(invoiceDetailsRepository::delete);
    }
}

