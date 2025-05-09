package com.bits.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.project.model.CreditCard;
import com.bits.project.model.InvoiceDetails;
import com.bits.project.model.NetBanking;
import com.bits.project.model.PaymentDetails;
import com.bits.project.service.CreditCardService;
import com.bits.project.service.InvoiceDetailsService;
import com.bits.project.service.NetBankingService;
import com.bits.project.service.PaymentDetailsService;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    private NetBankingService netBankingService;
    
    @Autowired
    private PaymentDetailsService paymentDetailsService;
    
    @Autowired
    private InvoiceDetailsService invoiceDetailsService;

    // Credit Card Endpoints
    @PostMapping("/add_card")
    public CreditCard addCreditCard(@RequestBody CreditCard card) {
        return creditCardService.addCreditCard(card);
    }

    @GetMapping("/fetch/cards")
    public List<CreditCard> getAllCreditCards() {
        return creditCardService.getAllCreditCards();
    }
    
    @GetMapping("/fetch/cards/{id}")
    public CreditCard getCreditCard(@PathVariable String id) {
        return creditCardService.getCreditCardByCardNumberById(id).get();
    }

    @DeleteMapping("/remove/card/{id}")
    public void deleteCreditCard(@PathVariable String id) {
        creditCardService.deleteCreditCardByCardNumber(id);
    }

    // Net Banking Endpoints
    @PostMapping("/add_bank")
    public NetBanking addNetBanking(@RequestBody NetBanking account) {
        return netBankingService.addNetBanking(account);
    }

    @GetMapping("/fetch/banks")
    public List<NetBanking> getAllNetBankingAccounts() {
        return netBankingService.getAllNetBankingAccounts();
    }
    
    @GetMapping("/fetch/bank/{id}")
    public NetBanking getNetBankingAccount(@PathVariable String id) {
        return netBankingService.getNetBankingByAccountNumberById(id).get();
    }

    @DeleteMapping("/remove/bank/{id}")
    public void deleteNetBankingAccount(@PathVariable String id) {
        netBankingService.deleteNetBankingByAccountNumber(id);
    }
    
 // PaymentDetails Endpoints
    @PostMapping("/add_payment_details")
    public PaymentDetails addPaymentDetails(@RequestBody PaymentDetails paymentDetails) {
        return paymentDetailsService.addPaymentDetails(paymentDetails);
    }

    @GetMapping("/fetch/payments")
    public List<PaymentDetails> getAllPaymentDetails() {
        return paymentDetailsService.getAllPaymentDetails();
    }

    @GetMapping("/fetch/payments/{transactionId}")
    public PaymentDetails getPaymentByTransactionId(@PathVariable String transactionId) {
        return paymentDetailsService.getPaymentDetailsByTransactionId(transactionId);
    }

    @DeleteMapping("/remove/payments/{transactionId}")
    public void deletePaymentDetails(@PathVariable String transactionId) {
        paymentDetailsService.deletePaymentDetailsByTransactionId(transactionId);
    }

    // InvoiceDetails Endpoints
    @PostMapping("/add_invoice")
    public InvoiceDetails addInvoiceDetails(@RequestBody InvoiceDetails invoiceDetails) {
        return invoiceDetailsService.addInvoiceDetails(invoiceDetails);
    }

    @GetMapping("/fetch/invoices")
    public List<InvoiceDetails> getAllInvoiceDetails() {
        return invoiceDetailsService.getAllInvoiceDetails();
    }

    @GetMapping("/fetch/invoices/{invoiceNumber}")
    public InvoiceDetails getInvoiceByInvoiceNumber(@PathVariable String invoiceNumber) {
        return invoiceDetailsService.getInvoiceDetailsByInvoiceNumber(invoiceNumber);
    }

    @DeleteMapping("/remove/invoices/{invoiceNumber}")
    public void deleteInvoiceDetails(@PathVariable String invoiceNumber) {
        invoiceDetailsService.deleteInvoiceDetailsByInvoiceNumber(invoiceNumber);
    }
}
