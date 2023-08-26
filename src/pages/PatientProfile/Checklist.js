import { useState } from 'react';
import React from 'react';



import './style.css';


const Checklist = () => {

    const initialItems = [
        { id: 1, text: 'Tomar vitamina C', completed: false },
        { id: 2, text: 'Verificar diabetes', completed: false },
        { id: 3, text: 'Praticar atividade física', completed: false },
        ];
    const [checklistItems, setChecklistItems] = useState(initialItems);
    const handleCheckboxChange = (itemId) => {
        setChecklistItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        );
    };
    const [newChecklistText, setNewChecklistText] = useState('');
    const handleAddChecklist = () => {
        if (newChecklistText.trim() !== '') {
            const newItem = {
                id: Date.now(), // Gerar um ID único (você pode usar uma biblioteca de geração de IDs)
                text: newChecklistText,
                completed: false,
            };
            setChecklistItems([...checklistItems, newItem]);
            setNewChecklistText('');
        }
      };
    function handleDeleteItem(itemId) {
        const updatedChecklistItems = checklistItems.filter((item) => item.id !== itemId);
        setChecklistItems(updatedChecklistItems);
    }



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
                <button onClick={handleAddChecklist}>Adicionar</button>
            </div>

            <div className="checklist__items">
                {checklistItems.map((item) => (
                    <div className="checklist__item" key={item.id}>
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span className={item.completed ? 'completed' : ''}>{item.text}</span>
                    <button className="checklist__delete-button"onClick={() => handleDeleteItem(item.id)}>X</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Checklist;

