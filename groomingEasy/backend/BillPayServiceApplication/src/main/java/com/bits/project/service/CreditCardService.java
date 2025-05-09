package com.bits.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.project.model.CreditCard;
import com.bits.project.repository.CreditCardRepository;

@Service
public class CreditCardService {

	@Autowired
	private CreditCardRepository creditCardRepository;

	public CreditCard addCreditCard(CreditCard card) {
		return creditCardRepository.save(card);
	}

	public Optional<CreditCard> getCreditCardByCardNumber(String cardNumber) {
		return creditCardRepository.findByCardNumber(cardNumber);
	}

	public void deleteCreditCardByCardNumber(String cardNumber) {
		Optional<CreditCard> card = creditCardRepository.findByCardNumber(cardNumber);
		card.ifPresent(creditCardRepository::delete);
	}
	
	public Optional<CreditCard> getCreditCardByCardNumberById(String cardNumber) {
		return creditCardRepository.findByCardNumber(cardNumber);
	}

	public List<CreditCard> getAllCreditCards() {
		return creditCardRepository.findAll();
	}
}
