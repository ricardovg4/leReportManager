import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/UserContext';
import App from './App';
import './fontAwesome';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
