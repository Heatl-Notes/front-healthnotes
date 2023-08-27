import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import { isAuthenticated } from './auth';

const PrivateRoute = ({ filho }) => {

    const authenticated = true;
    // const [authenticated, setAuthenticated] = useState(false);

    // useEffect(() => {
    //     const getAuthenticated = async () => {
    //         const authenticatedAux = await isAuthenticated();
    //         setAuthenticated(authenticatedAux);
    //     };
    //     getAuthenticated();
    // }, []);
    
    return authenticated ? filho : (<Navigate to="/" />);
};

export default PrivateRoute;

        {/* <Route 
          path="/main" 
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
       />
      
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
       />
        <Route 
          path="/patients" 
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
       />
       <Route 
          path="/patient/:patientId" 
          element={
            <PrivateRoute>
              <PatientProfile />
            </PrivateRoute>
          }
       />
       <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
       /> */}