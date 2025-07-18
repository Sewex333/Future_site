import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ locations }) {
  const position = [53.4285, 14.5528]; // Centrum Szczecina
  return (
    <MapContainer center={position} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.coordinates}>
          <Popup>{location.name}<br />{location.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;