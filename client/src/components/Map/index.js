import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import style from './index.module.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class Form extends React.Component {
  state = {
    lat: 52.459095,
    lng: 13.523768,
    zoom: 10.8,
  };



  componentDidMount() {
    if(this.props.value !== null){
      this.setState({
        lat: this.props.value.points.coordinates[0][1],
        lng: this.props.value.points.coordinates[0][0]
      },() =>
        {

          const { lng, lat, zoom } = this.state;

          const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
          });

          map.on("load" , () => {

            map.addLayer({
              "id": "tour" ,
              "type": "line",
              "source": {
                "type": "geojson",
                "data": this.props.value.points

              },
              "layout": {
                "line-join": "round",
                "line-cap": "round"
              },
              "paint": {
                "line-color": {type: 'identity', property: 'stroke'},
                "line-opacity": {type: 'identity', property: 'stroke-opacity'},
                "line-width": 2
              }
            });
          });

          map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
              lng: lng.toFixed(4),
              lat: lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });

          });
        })
    }
    else{

      const { lng, lat, zoom } = this.state;

      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [lng, lat],
        zoom
      });

      map.on('move', () => {
        const { lng, lat } = map.getCenter();

        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });

      });
    }
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div ref={el => this.mapContainer = el} className={style.map}/>
        </div>

    );

  }

}