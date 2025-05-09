package com.bits.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bits.project.model.NetBanking;

public interface NetBankingRepository extends JpaRepository<NetBanking, Long> {
	Optional<NetBanking> findByAccountNumber(String accountNumber);
}

