import { useState, useEffect } from 'react';
import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import PatientProfile from './PatientProfile';

import './style.css';


const Patient = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {setSidebarOpen(true);};
  const closeSideBar = () => {setSidebarOpen(false);};

  const [selectedDate, setSelectedDate] = useState('');
  useEffect(() => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;
      setSelectedDate(currentDate);
  }, []);
  
  const [events, setEvents] = useState([]);
  const handleDateChange = (e) => {
      setSelectedDate(e.target.value);

      // Aqui você deve fazer uma chamada para obter os eventos da API com base na data selecionada
      // e definir os eventos no estado usando setEvents.
      // Exemplo:
      // fetchEventsByDate(e.target.value).then((data) => setEvents(data));
  };

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
  
  

  const [modoEdicao, setModoEdicao] = useState(false);
  const sairModoEdicao = () => {setModoEdicao(false);};
  const abrirModoEdicao = () => {setModoEdicao(true);};

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />

      <main>
          <div className="main__container">
            <div className="main__title">
              <img class="patient_image" src="data:image/png;base64,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"></img>
              <div className="main_greeting">
                <h1>Painel do paciente José Silva</h1>
              </div>
            </div>


            <PatientProfile/>



            <div className="charts">
                
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
                                    <p className="event__description">{event.description}</p>
                                    <p className="event__caretaker">{event.caretaker}</p>
                                </div>
                            ))}

                            <div className="event">
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
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="checklist__container">
                    <div className="checklist__container__title">
                        <div>
                        <h1>Check List</h1>
                        </div>
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

            </div>
          </div>
        </main>

      <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
    </div>
  );
}

export default Patient;
