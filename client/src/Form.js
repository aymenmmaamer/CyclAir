//import React from 'react';
import React, { Component } from 'react'; // importieren von react componenten
//export default Form;

export default class Form extends React.Component { // export the expention function + function of Form.js
    state = {
        startAdress: '',
        destinationAdress: ' ',
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault(); 
        this.props.onSubmit(this.state);
        this.setState({
            startAdress: '',
            destinationAdress: ' ',
        });
    };

    render() {
        return (
            <form>
                <input 
                    name = 'startAdress'
                    placeholder ='Start Adresse'
                    value={this.state.startAdress} 
                    onChange={e => this.change(e)}
                />
                <br />
                <input 
                    name = 'destinationAdress'
                    type='text'
                    placeholder='Ziel Adresse' //placeholder does not work
                    value={this.state.destinationAdress} 
                    onChange={e => this.change(e)}
                />
                <br />
                <button onClick = {e => this.onSubmit(e)}>Submit</button>
            </form>

        );

    }

}