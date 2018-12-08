import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
        startAdress: '',
        destinationAdress: '',
        suggestion: '',
    }
    };

    changeStart = e => {
        this.setState({
            startAdress: e
        });
    };

  changeDestination = e => {
    this.setState({
      destinationAdress: e
    });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleEnter = address => {
    this.setState({
      suggestion: address
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
          <div>
            <PlacesAutocomplete
              value={this.state.startAdress}
              onChange={e => this.changeStart(e)}
              onSelect={this.handleSelect & this.handleEnter}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input value={this.state.suggestion}
                    {...getInputProps({
                      placeholder: 'Startpunkt',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <PlacesAutocomplete
              value={this.state.destinationAdress}
              onChange={e => this.changeDestination(e)}
              onSelect={this.handleSelect & this.handleEnter}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Zielpunkt',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <button onClick = {e => this.onSubmit(e)}>Submit</button>
          </div>

        );

    }

}