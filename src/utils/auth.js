// import apiUrl from './config';


export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Retorna true se o token existir, caso contrário, retorna false
};
  
