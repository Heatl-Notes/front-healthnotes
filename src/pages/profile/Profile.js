import React from 'react';

import { useState, useEffect } from 'react';
import { fetchCaregiverById, fetchUpdateCaregiver } from '../../services/api';

import hello from '../../assets/hello.jpg';

import './Profile.css';


const Profile = () => {
    const [modoEdicao, setModoEdicao] = useState(false);
    const sairModoEdicao = () => { setModoEdicao(false); };
    const abrirModoEdicao = () => { setModoEdicao(true); };

    const caregiverId = localStorage.getItem('userCpf');
    const [caregiver, setCaregiver] = useState({});

    const getcaregiver = async () => {
        const caregiverAux = await fetchCaregiverById(caregiverId);
        setCaregiver(caregiverAux);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCaregiver({
            ...caregiver,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const response = await fetchUpdateCaregiver(caregiverId, {
            name: caregiver.name,
            lastname: caregiver.lastname,
            email: caregiver.email
        });
        if (response.ok) {
            console.log('Cuidador atualizado com sucesso!');
        } else {
            console.error('Erro ao atualizar cuidador');
        }
    };

    useEffect(() => {
        getcaregiver();
    }, []);

    useEffect(() => {
        console.log(caregiver)
    }, [caregiver]);



    return (
        <div className="profile__container">

            <div className="profile__title">
                <div className="profile_greeting">
                    <h1>Perfil do Cuidador</h1>
                </div>
            </div>

            {modoEdicao ? (
                <div className="profile__card">
                    <button className="profile__card__edit__link" onClick={sairModoEdicao}>Cancelar</button>
                    <img src={hello} alt="hello" />

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Nome: </label>
                            <input type="text" id="name" name="name" defaultValue={caregiver.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Sobrenome: </label>
                            <input type="text" id="lastname" name="lastname" defaultValue={caregiver.lastname} onChange={handleInputChange} />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" id="email" name="email" defaultValue={caregiver.email} onChange={handleInputChange} />
                        </div> */}

                        <button className="edit-button" type='submit'>Salvar</button>

                    </form>
                </div>
            ) : (
                <div className="profile__card">
                    <button className="profile__card__edit__link" onClick={abrirModoEdicao}>Editar</button>
                    <img src={hello} alt="hello" />
                    <h1>{caregiver.name} {caregiver.lastname}</h1>
                    <p><span className="font-bold">Email:</span> {caregiver.email}</p>
                    <p><span className="font-bold">Cpf:</span> {caregiver.cpf}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;
