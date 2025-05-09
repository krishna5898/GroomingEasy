import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import '../App.css';


export default function AppointmentDetails() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        loadAppointments();
        console.log("Grooming Easy Application Development is in progress");
    }, []);

    const loadAppointments = async () => {
        try {
            const appointmentDetailsFromBe = await axios.get("http://localhost:9191/appointments");
            setAppointments(appointmentDetailsFromBe.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    return (

        <div className="container mt-5">
            <div className="py-4">
                <h2 className="text-center mb-4 text-primary">Appointment Details</h2>
                <table className="table table-hover table-bordered rounded shadow-sm">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Appointment ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Service Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((indAppointment, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{indAppointment.id}</td>
                                    <td>{indAppointment.customer.name}</td>
                                    <td>{indAppointment.customer.email}</td>
                                    <td>{indAppointment.service.name}</td>
                                    <td>{indAppointment.service.price}</td>
                                    <td>{indAppointment.dateTime}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No Appointments Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}