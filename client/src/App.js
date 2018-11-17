import React, { Component } from 'react';
import logo from './img/wheel.png';
import './App.css';

class App extends Component {
  state = {
    response: '',
  };
  componentDidMount() {
    this.postRequest()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  /* callApi = async () => {
    const response = await fetch('/api/graphhopper');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }; */

  postRequest = async () => {
    const request = await fetch('/api/graphhopper-post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address : [
          {
            "street": "Wilhelminenhofstraße",
            "number": "75A",
            "zip": 12459,
            "place": "Berlin",
            "country": "Germany"
          },
          {
            "street": "Treskowallee",
            "number": "8",
            "zip": 10318,
            "place": "Berlin",
            "country": "Germany"
          }
        ]
      })
    })
    const body = await request.json();
    if (request.status !== 200) throw Error(body.message);
    return body;
  }

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
