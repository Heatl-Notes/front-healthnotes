// const apiUrl = 'https://health-notes-47645d4f2894.herokuapp.com';


// const apiUrl = 'http://localhost:8080';
const apiUrl = 'https://ec2-107-22-21-93.compute-1.amazonaws.com:8080';

export const isAuthenticated = false;

// FUNÇÕES DE AUTH

export const fetchLogin = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    } catch (err) {
        alert(err.message);
    }
}

export const fetchRegister = async (newUser) => {
    try {
        const response = await fetch(`${apiUrl}/cadastro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        return response;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }
};



// FUNÇÕES DA API DO CAREGIVER

export const fetchCaregiverById = async (caregiverId) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching caregiver:', error);
        localStorage.clear();
        return [];
    }
}

export const fetchUpdateCaregiver = async (caregiverId, caregiverUpdated) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(caregiverUpdated),
        });
        // const data = await response.json();
        // return data;
        return response;
    } catch (error) {
        console.error('Error update caregiver:', error);
        return [];
    }
}

export const fetchPatients = async () => {
    try {
        const response = await fetch(`${apiUrl}/patient`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
    }
};

export const fetchNumberPatients = async (caregiverId) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}/number-patients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching number patients:', error);
        return [];
    }
}

export const fetchRendaMensal = async (caregiverId) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}/monthly-cost`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching number patients:', error);
        return [];
    }
}

export const fetchAppointmentsForDay = async (caregiverId, dayName) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}/appointments?dayName=${dayName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching number patients:', error);
        return [];
    }
}


// FUNÇÕES DA API DO PATIENT

export const fetchAddPatient = async (caregiverId, newPatient) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}/patient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(newPatient),
        });
        return response;
    } catch (error) {
        console.error('Erro ao adicionar paciente:', error);
    }
};

export const fetchPatientById = async (patientId) => {
    try {
        const response = await fetch(`${apiUrl}/patient/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching patient:', error);
        return [];
    }
};

export const fetchUpdatePatient = async (patientDTO) => {
    try {
        const response = await fetch(`${apiUrl}/patient`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(patientDTO)

        });
        // const data = await response.json();
        // return data;
        return response;
    } catch (error) {
        console.error('Error update patient:', error);
        return [];
    }
};


export const fetchPatientEventsByDate = async (patientId, date) => {
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

export const fetchPatientAddEvent = async (patientId, newEvent) => {
    try {
        const response = await fetch(`${apiUrl}/patient/${patientId}/add-schedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(newEvent)
        });
        return response;

    } catch (error) {
        console.error('Erro na solicitação POST:', error);
    }
};

export const fetchPatientChecklistItems = async (patientId) => {
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

export const fetchPatientAddChecklistItem = async (patientId, newChecklistItem) => {
    try {
        const response = await fetch(`${apiUrl}/patient/${patientId}/checklist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(newChecklistItem)
        });
        return response;
    } catch (error) {
        console.error('Erro na solicitação POST para add nova checklist:', error);
    }
};

export const fetchPatientUpdateChecklistItem = async (patientId, itemId) => {
    try {
        const response = await fetch(`${apiUrl}/patient/${patientId}/checklist/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        return response;
    } catch (error) {
        console.error('Erro na solicitação POST para remover checklistItem:', error);
    }
};

export const fetchPatientDeleteChecklistItem = async (patientId, itemId) => {
    try {
        const response = await fetch(`${apiUrl}/patient/${patientId}/checklist/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        return response;
    } catch (error) {
        console.error('Erro na solicitação POST para remover checklistItem:', error);
    }
};

