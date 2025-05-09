package com.bits.project.saloon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bits.project.saloon.model.Salon;

public interface SalonRepository extends JpaRepository<Salon, Long> {
	Optional<Salon> findBySalonLoginId(String salonLoginId);
}
