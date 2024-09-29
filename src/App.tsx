// src/App.tsx
import React from 'react';
import Map from './Map';
import './App.css'; // Optional CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

const App: React.FC = () => {
    return (
        <div>
            <Map />
        </div>
    );
};

export default App;
