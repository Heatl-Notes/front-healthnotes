import React from 'react';
import Modal from 'react-modal';


import { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/config';



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
        const eventData = await fetchEventsByDate(date);
        setEvents(eventData);

        const newCaregiverNames = await getCaregiverNamesForEvents(eventData);
        setCaregiverNames(newCaregiverNames);
    };

    const getCaregiverNamesForEvents = async (events) => {
        const namesMap = {};
        
        const caregiverIds = events.map(event => event.caregiverId);
        const uniqueCaregiverIds = [...new Set(caregiverIds)]; // Remove IDs duplicados
        
        await Promise.all(uniqueCaregiverIds.map(async (id) => {
            const name = await fetchCaregiverNameById(id);
            namesMap[id] = name;
        }));
        
        return namesMap;
    };

    const fetchEventsByDate = async (date) => {
        try {
            const response = await fetch(`${apiUrl}/patient/${patientId}/calendar/${date}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    };

    const fetchCaregiverNameById = async (caregiverId) => {
        try {
            const response = await fetch(`${apiUrl}/caregiver/${caregiverId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error fetching caregiver name:', error);
            return [];
        }
    }


    useEffect(() => {
        selectCurrentDate();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openAddEventModal = () => {setIsModalOpen(true);};
    const closeAddEventModal = () => {setIsModalOpen(false);};

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
        }));
    };

    const addEvent = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/patient/${patientId}/add-schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    ...newEvent,
                    date: selectedDate
                })
            });

            if (response.ok) {
                updateEventsByDate(selectedDate);
                closeAddEventModal();
            } else {
                console.error('Erro ao adicionar evento');
            }
        } catch (error) {
            console.error('Erro na solicitação POST:', error);
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
                <form onSubmit={addEvent}>
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

