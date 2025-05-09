package com.bits.project.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.bits.project.model.Appointment;
import com.bits.project.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Create a new appointment
    public Appointment createAppointment(Appointment appointment) {
    	if(!ObjectUtils.isEmpty(appointment))
    	{
    		String uuid = UUID.randomUUID().toString();
    		appointment.setAppointmentId(uuid.replace("-", "").substring(0, 5));
    	}
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get a single appointment by appointmentId
    public Optional<Appointment> getAppointmentByAppointmentId(String appointmentId) {
        return appointmentRepository.findByAppointmentId(appointmentId);
    }

    // Update an appointment by appointmentId
    public Optional<Appointment> updateAppointmentByAppointmentId(String appointmentId, Appointment updatedAppointment) {
        return appointmentRepository.findByAppointmentId(appointmentId).map(appointment -> {
            appointment.setCustomerName(updatedAppointment.getCustomerName());
            appointment.setAppointmentDate(updatedAppointment.getAppointmentDate());
            appointment.setServiceType(updatedAppointment.getServiceType());
            appointment.setServiceName(updatedAppointment.getServiceName());
            appointment.setSalonRegistrationNo(updatedAppointment.getSalonRegistrationNo());
            appointment.setNotes(updatedAppointment.getNotes());
            return appointmentRepository.save(appointment);
        });
    }

    // Delete an appointment by appointmentId
    public boolean deleteAppointmentByAppointmentId(String appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findByAppointmentId(appointmentId);
        if (appointment.isPresent()) {
            appointmentRepository.delete(appointment.get());
            return true;
        }
        return false;
    }
}
