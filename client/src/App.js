import React, { Component } from 'react';
import logo from './img/wheel.png';
import './App.css';
import Form from './Form'; // Form.js is embedded here
import Map from './components/Map'

class App extends Component {
  state = {
    response: null,
    address: null
  };
  //     Wilhelminenhofstraße 75A, 12459 Berlin, Germany
  //     Treskowallee 8, 10318 Berlin, Germany

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
            "street": this.state.address.startAdress,
          },
          {
            "street": this.state.address.destinationAdress,
          }
        ]
      })
    });
    const body = await request.json();
    if (request.status !== 200) throw Error(body.message);
    return body;
  }

  onSubmit = (fields) => { // for the Developper to see that the entered Words were submitted
    this.setState({ address: fields }, () => {
      this.postRequest()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    });

  };
  // Commented here because it doesn't word behind the Form: Form is insert and refers to Form.js
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Logo-Case">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </header>
        <Form onSubmit={fields => this.onSubmit(fields)}> 
        </Form>
        <div>
        { this.state.response !== null &&
          <div>{`Mit dem Fahrrad sind es ${this.state.response.distance} Meter`}
            <Map value={this.state.response}/> </div>
        }
       <div>
        { this.state.response !== null &&
          <div>{` ${this.state.response.distance} Meter`}
            <Map value={this.state.response}/> </div>
        { this.state.response === null &&
          <Map value={this.state.response}/>
        }
        </div>
      </div>
    );
  }
}

export default App;
