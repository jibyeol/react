import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName : 'Harper',
    lastName : 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}
    </h1>
);

function getGreeting(user) {
    if(user) {
        return <h1>Hello, {formatName(user)}!</h1>
    }
    return <h1>Hello, Stranger!</h1>
}

ReactDOM.render(
    getGreeting(user),
    document.getElementById('root')
);

registerServiceWorker();
