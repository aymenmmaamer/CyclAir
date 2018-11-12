import React, { Component } from 'react';
import logo from './img/wheel.png';
import './App.css';

class App extends Component {
  state = {
    response: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/graphhopper');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Logo-Case">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </header>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
