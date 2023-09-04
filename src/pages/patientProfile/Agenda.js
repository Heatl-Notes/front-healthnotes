import React from 'react';
import Modal from 'react-modal';


import { useState, useEffect } from 'react';
import { fetchCaregiverById, fetchPatientEventsByDate, fetchPatientAddEvent } from '../../services/api';



import './PatientProfile.css';


const Agenda = ({ patientId }) => {

    const [selectedDate, setSelectedDate] = useState('');
    const [events, setEvents] = useState([]);
    const [caregiverNames, setCaregiverNames] = useState({});


    const selectCurrentDate = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const currentDate = `${year}-${month}-${day}`;

        updateEventsByDate(currentDate);
    };

    const handleDateChange = async (e) => {
        updateEventsByDate(e.target.value);
    };

    const updateEventsByDate = async (date) => {
        setSelectedDate(date);
        const eventData = await fetchPatientEventsByDate(patientId, date);
        setEvents(eventData);

        const newCaregiverNames = await getCaregiverNamesForEvents(eventData);
        setCaregiverNames(newCaregiverNames);
    };

    const getCaregiverNamesForEvents = async (events) => {
        const namesMap = {};

        const caregiverIds = events.map(event => event.caregiverId);
        const uniqueCaregiverIds = [...new Set(caregiverIds)]; // Remove IDs duplicados

        await Promise.all(uniqueCaregiverIds.map(async (id) => {
            const caregiver = await fetchCaregiverById(id);
            namesMap[id] = caregiver.name;
        }));

        return namesMap;
    };

    useEffect(() => {
        selectCurrentDate();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openAddEventModal = () => { setIsModalOpen(true); };
    const closeAddEventModal = () => { setIsModalOpen(false); };

    const [newEvent, setnewEvent] = useState({
        date: '',
        time: '',
        description: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setnewEvent((prevData) => ({
            ...prevData,
            [name]: value,
            date: selectedDate
        }));
    };

    const handleAddEvent = async (event) => {
        event.preventDefault();

        const response = await fetchPatientAddEvent(patientId, newEvent);
        if (response.ok) {
            updateEventsByDate(selectedDate);
            closeAddEventModal();
        } else {
            console.error('Erro ao adicionar evento');
        }
    };

    return (
        <div className="agenda__container">
            <div className="agenda__container__title">
                <div>
                    <h1>Agenda</h1>
                </div>

                <div className="date__selector">
                    <label htmlFor="selectDate">Escolha um dia:</label>
                    <input
                        className="agenda-input"
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            <div className="agenda__container__events">
                <div className="events__list">
                    <div className="event__columns">
                        <p className="event__column">Horário</p>
                        <p className="event__column">Descrição</p>
                        <p className="event__column">Cuidador</p>
                    </div>

                    {events.map((event, index) => (
                        <div className="event" key={index}>
                            <p className="event__time">{event.time}</p>
                            <p className="event__description">{event.description}</p>
                            <p className="event__caretaker">{caregiverNames[event.caregiverId]}</p>
                        </div>
                    ))}

                </div>
            </div>

            <div className="agenda__add__event">
                <button className="agenda__add__event-button" onClick={() => openAddEventModal()}>Adicionar Evento</button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeAddEventModal}
                contentLabel="Adicionar Evento"
                className="modal"
                appElement={document.getElementById('root')}
            >
                <h2>Adicionar Evento</h2>
                <form onSubmit={handleAddEvent}>
                    <label htmlFor="time">Horário:</label>
                    <input type="time" id="time" name="time" onChange={handleInputChange} />

                    <label htmlFor="description">Descrição:</label>
                    <textarea id="description" name="description" onChange={handleInputChange} />

                    <button type="submit">Adicionar</button>
                </form>
            </Modal>
        </div>
    );
}

export default Agenda;

