import React from 'react';

import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';



import './style.css';


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

            <div className="events__container">
                <div className="events__list">
                    <div className="event__columns">
                        <p className="event__column">Horário</p>
                        <p className="event__column">Descrição</p>
                        <p className="event__column">Cuidador</p>
                    </div>

                    {events.map((event, index) => (
                        <div className="event" key={index}>
                            <p className="event__time">{event.time}</p>
                            <p className="event__description">{event.observation}</p>
                            <p className="event__caretaker">{caregiverNames[event.caregiverId]}</p>
                        </div>
                    ))}

                    {/* <div className="event">
                        <p className="event__time">09:00 AM</p>
                        <p className="event__description">Reunião de equipe</p>
                        <p className="event__caretaker">João Silva</p>
                    </div>
                    <div className="event">
                        <p className="event__time">02:30 PM</p>
                        <p className="event__description">Apresentação do projeto</p>
                        <p className="event__caretaker">Maria Oliveira</p>
                    </div>
                    <div className="event">
                        <p className="event__time">05:00 PM</p>
                        <p className="event__description">Ligar para cliente</p>
                        <p className="event__caretaker">Carlos Santos</p>
                    </div> */}
                    
                </div>
            </div>
        </div>
    );
}

export default Agenda;

