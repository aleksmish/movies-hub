import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';
import * as L from "leaflet"
import 'leaflet/dist/leaflet.css'
import { Coordinates } from '../types/coordinates';
import { useState } from 'react';

type MapProps = {
  height?: string;
  onClick: (coordinates: Coordinates) => void;
  coordinates: Coordinates[];
}

let defaultIcon = L.icon({
  iconUrl: "/images/marker.png",
  iconAnchor: [16, 32],
  iconSize: [40, 40],
})

L.Marker.prototype.options.icon = defaultIcon;

const DEFAULT_CENTER_POSITION: L.LatLngTuple = [52.822682, -6.767578];

const Map = (props: MapProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates[]>(props.coordinates);
  return (
    <MapContainer
      style={{height: props.height || "500px"}}
      center={coordinates.length ? [coordinates[0].lat, coordinates[0].lng] : DEFAULT_CENTER_POSITION} zoom={10}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClick setCoordinates={coordinates => {
        setCoordinates([coordinates]);
        props.onClick(coordinates)
      }} />
      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={{lat: coordinate.lat, lng: coordinate.lng}}/>
      ))}
    </MapContainer>
  )
}

type MapClickProps = {
  setCoordinates: (coordinates: Coordinates) => void;
}

const MapClick = ({setCoordinates}: MapClickProps) => {
  useMapEvent('click', e => {
    setCoordinates({lat: e.latlng.lat, lng: e.latlng.lng})
  })
  return null;
}

export default Map
