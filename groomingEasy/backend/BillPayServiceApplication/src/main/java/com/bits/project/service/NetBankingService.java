package com.bits.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.project.model.NetBanking;
import com.bits.project.repository.NetBankingRepository;

@Service
public class NetBankingService {

    @Autowired
    private NetBankingRepository netBankingRepository;

    public NetBanking addNetBanking(NetBanking account) {
        return netBankingRepository.save(account);
    }

    public Optional<NetBanking> getNetBankingByAccountNumber(String accountNumber) {
        return netBankingRepository.findByAccountNumber(accountNumber);
    }
    
    public Optional<NetBanking> getNetBankingByAccountNumberById(String accountNumber) {
        return netBankingRepository.findByAccountNumber(accountNumber);
    }

    public void deleteNetBankingByAccountNumber(String accountNumber) {
        Optional<NetBanking> account = netBankingRepository.findByAccountNumber(accountNumber);
        account.ifPresent(netBankingRepository::delete);
    }
    
    public List<NetBanking> getAllNetBankingAccounts() {
		return netBankingRepository.findAll();
	}
}
