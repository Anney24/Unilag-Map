import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { astar } from './astar';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Node {
    name: string;
    position: { lat: number; lng: number };
}

// Replace with real latitude and longitude values
const locations: Node[] = [
    { name: "Unilag Gate", position: { lat: 6.517603, lng: 3.384832 } },
    { name: "Lagoon Front", position: { lat: 6.5215812, lng: 3.3976202 } },
    { name: "Faculty of Education", position: { lat: 6.5167688, lng: 3.3853987 } },
    { name: "Faculty of Environmental Sciences", position: { lat: 6.5179747, lng: 3.3870283 } },
    { name: "Nithub Unilag", position: { lat: 6.5164389, lng: 3.391422 } },
    { name: "New Hall", position: { lat: 6.5191716, lng: 3.3817231 } },
    { name: "Faculty of Social Sciences", position: { lat: 6.5158892, lng: 3.391666 } },
    { name: "Unilag DLI", position: { lat: 6.5119483, lng: 3.3921009 } },
    { name: "Senate Building", position: { lat: 6.5194683, lng: 3.3987129 } },
    { name: "Unilag Sports Center", position: { lat: 6.5166212, lng: 3.384385 } },
    { name: "Moremi Hostel", position: { lat: 6.5179703, lng: 3.3971292 } },
    { name: "Queen Amina Hall", position: { lat: 6.514955, lng: 3.38557 } },
    { name: "Unilag Islamic Centre", position: { lat: 6.5190757, lng: 3.3901443 } },
    { name: "Chapel Of Christ Our Light", position: { lat: 6.5183311, lng: 3.3896108 } },
    { name: "Ecobank", position: { lat: 6.5190553, lng: 3.3948186 } },
    { name: "Guaranty Trust Bank, GTB", position: { lat: 6.5170985, lng: 3.3956694 } },
    { name: "Access Bank Plc", position: { lat: 6.5183311, lng: 3.3896108 } },
    { name: "Wema Bank", position: { lat: 6.5171425, lng: 3.3846842 } },
    { name: "First Bank", position: { lat: 6.5171425, lng: 3.3846842 } },
    { name: "Unilag Microfinance Bank", position: { lat: 6.5171425, lng: 3.3846842 } },
    { name: "Unilag Petrol Station", position: { lat: 6.5183097, lng: 3.3770824 } },
    { name: "Nord Unilag", position: { lat: 6.5188534, lng: 3.3903225 } },
    { name: "Unilag Main Auditorium", position: { lat: 6.5190242, lng: 3.3988869 } },
    { name: "Unilag Amphitheatre", position: { lat: 6.517929, lng: 3.3878201 } },
    { name: "Jelili Adebisi Omotola Hall (UNILAG Multi-Purpose Hall)", position: { lat: 6.5165865, lng: 3.3851311 } },
    { name: "Staff Quarters", position: { lat: 6.5167741, lng: 3.3950731 } },
    { name: "OYEWUSI IBIDAPO OBE HOUSE (ZENITH BANK AND UNILAG ALUMNI BUILDING)", position: { lat: 6.5138625, lng: 3.385744 } },
    { name: "Dept. of Mass Communication, Unilag", position: { lat: 6.5183677, lng: 3.3966342 } },
    { name: "Guest House Swimming Pool", position: { lat: 6.5188367, lng: 3.3973638 } },
    { name: "Faculty Of Engineering", position: { lat: 6.5181305, lng: 3.3994649 } },
    { name: "Faculty Of Management Science", position: { lat: 6.5215478, lng: 3.3984994 } },
    { name: "Unilag 2nd gate", position: { lat: 6.5111718, lng: 3.3859333 } },
    // Add all other locations with actual lat/lng coordinates
];

const Map: React.FC = () => {
    const [startLocation, setStartLocation] = useState<Node | null>(null);
    const [endLocation, setEndLocation] = useState<Node | null>(null);
    const [path, setPath] = useState<Node[]>([]);

    const handleSearch = () => {
        if (startLocation && endLocation) {
            const resultPath = astar(startLocation, endLocation, locations);
            setPath(resultPath);
        }
    };

    return (
        <div>
            <h1>University of Lagos Map with A* Search</h1>
            <div>
                <label htmlFor="start">Start: </label>
                <select id="start" onChange={(e) => setStartLocation(locations.find(loc => loc.name === e.target.value) || null)}>
                    <option value="">Select Start Location</option>
                    {locations.map(loc => (
                        <option key={loc.name} value={loc.name}>{loc.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="end">End: </label>
                <select id="end" onChange={(e) => setEndLocation(locations.find(loc => loc.name === e.target.value) || null)}>
                    <option value="">Select End Location</option>
                    {locations.map(loc => (
                        <option key={loc.name} value={loc.name}>{loc.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleSearch}>Find Path</button>

            <MapContainer center={[6.515759,3.3872698]} zoom={17} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map(loc => (      
                    <Marker key={loc.name} position={[loc.position.lat, loc.position.lng]} icon={new L.Icon.Default()}>
                        <Popup>{loc.name}</Popup>
                    </Marker>
                ))}
                {path.length > 0 && (
                    <Polyline 
                        positions={path.map(node => [node.position.lat, node.position.lng])} 
                        color="red"
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
