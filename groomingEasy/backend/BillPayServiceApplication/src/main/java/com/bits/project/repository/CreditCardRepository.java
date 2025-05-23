package com.bits.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bits.project.model.CreditCard;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
	
	Optional<CreditCard> findByCardNumber(String cardNumber);
}

