import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

//ReactDOM.render(
//    getGreeting(user),
//    document.getElementById('root')
//);

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date : new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date : new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    };
}

//ReactDOM.render(
//    <Clock />, 
//    document.getElementById('root')
//);

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App(){
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

//ReactDOM.render(
//    <App />,
//    document.getElementById('root')
//);

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn : true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn : !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);

registerServiceWorker();
