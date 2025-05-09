package com.bits.project.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bits.project.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	 Optional<Appointment> findByAppointmentId(String appointmentId);
}
