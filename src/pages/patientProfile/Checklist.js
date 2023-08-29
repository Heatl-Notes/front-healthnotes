import React from 'react';

import { useState, useEffect } from 'react';
import { fetchPatientChecklistItems, fetchPatientDeleteChecklistItem, fetchPatientAddChecklistItem } from '../../services/api';


import './PatientProfile.css';


const Checklist = ({ patientId }) => {

    const [checklistItems, setChecklistItems] = useState([]);
    const handleCheckboxChange = (itemId) => {
        setChecklistItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, marked: !item.marked } : item
            )
        );
    };

    const updatechecklistItems = async () => {
        const checklistItemsAux = await fetchPatientChecklistItems(patientId);
        setChecklistItems(checklistItemsAux);
    };

    const [newChecklistText, setNewChecklistText] = useState('');
    const handleAddChecklistItem = async () => {
        if (newChecklistText.trim() !== '') {
            const newItem = {
                description: newChecklistText,
                marked: false,
            };
            const response = await fetchPatientAddChecklistItem(patientId, newItem);
            if (response.ok) {
                updatechecklistItems();
                setNewChecklistText('');
            } else {
                console.error('Erro ao adicionar checklist');
            }
        }
    };

    const handleDeleteChecklistItem = async (itemId) => {
        const response = await fetchPatientDeleteChecklistItem(patientId, itemId);
        if (response.ok) {
            updatechecklistItems();
        } else {
            console.error('Erro ao remover checklistItem');
        }
    };

    useEffect(() => {
        updatechecklistItems();
    }, []);

    return (
        <div className="checklist__container">


            <div className="checklist__container__title">
                <div>
                    <h1>Check List</h1>
                </div>
                <i className="fas fa-tasks fa-2x text-green"></i>
            </div>

            <div className="checklist__new">
                <input
                    type="text"
                    placeholder="Nova checklist"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                />
                <button onClick={handleAddChecklistItem}>Adicionar</button>
            </div>

            <div className="checklist__items">
                {checklistItems.map((item) => (
                    <div className="checklist__item" key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.marked}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        <span className={item.marked ? 'completed' : ''}>{item.description}</span>
                        <button className="checklist__delete-button" onClick={() => handleDeleteChecklistItem(item.id)}>X</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Checklist;

