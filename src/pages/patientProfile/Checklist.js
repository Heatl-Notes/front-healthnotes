import React from 'react';

import { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/config';


import './PatientProfile.css';


const Checklist = ({ patientId }) => {

    // const initialItems = [
    //     { id: 1, text: 'Tomar vitamina C', marked: false },
    //     { id: 2, text: 'Verificar diabetes', marked: false },
    //     { id: 3, text: 'Praticar atividade física', marked: false },
    //     ];
    const [checklistItems, setChecklistItems] = useState([]);
    const handleCheckboxChange = (itemId) => {
        setChecklistItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, marked: !item.marked } : item
            )
        );
    };

    const updatechecklistItems = async () => {
        const checklistItemsAux = await fetchchecklistItems();
        setChecklistItems(checklistItemsAux);
    };

    const [newChecklistText, setNewChecklistText] = useState('');
    const fetchAddChecklist = async () => {
        if (newChecklistText.trim() !== '') {
            const newItem = {
                description: newChecklistText,
                marked: false,
            };
            try {
                const response = await fetch(`${apiUrl}/patient/${patientId}/checklist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                    body: JSON.stringify(newItem)
                });
    
                if (response.ok) {
                    updatechecklistItems();
                    setNewChecklistText('');
                } else {
                    console.error('Erro ao adicionar checklist');
                }
            } catch (error) {
                console.error('Erro na solicitação POST para add nova checklist:', error);
            }
        }
      };

    const fetchchecklistItems = async () => {
        try {
            const response = await fetch(`${apiUrl}/patient/${patientId}/checklist`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching checklist:', error);
            return [];
        }
    };




    const fetchDeleteItem = async (itemId) => {

        try {
            const response = await fetch(`${apiUrl}/patient/${patientId}/checklist/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                updatechecklistItems();
            } else {
                console.error('Erro ao remover checklistItem');
            }
        } catch (error) {
            console.error('Erro na solicitação POST para remover checklistItem:', error);
        }
        const updatedChecklistItems = checklistItems.filter((item) => item.id !== itemId);
        setChecklistItems(updatedChecklistItems);
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
                <button onClick={fetchAddChecklist}>Adicionar</button>
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
                    <button className="checklist__delete-button"onClick={() => fetchDeleteItem(item.id)}>X</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Checklist;

