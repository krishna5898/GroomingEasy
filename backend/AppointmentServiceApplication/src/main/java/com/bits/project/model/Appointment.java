package com.bits.project.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String appointmentId;
	private String customerName;
	private String customerId;
	private LocalDateTime appointmentDate;
	private String serviceType;
	private String serviceName;
	private String salonRegistrationNo;
	private String notes;
	private String stylistName;
	private String stylistId;
}
