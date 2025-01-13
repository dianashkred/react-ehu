import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
//import { UserProvider } from './context/UserContext';
import { Provider } from 'react-redux';
import { store } from './store';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);








/*
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
      <UserProvider>
        <App />
    </UserProvider>
  </React.StrictMode>
);
*/
//Refactor all  existing code to use redux for managing state of an application and work with data.
//  Ты выполнил полностью это задание? То есть состояния управляются через редакс и работа с данными тоже происходит через редакс?