import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const FindOrders = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBoJXxxWOMKdexaiud8ImxzzkaHtEIYtds',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError('Unable to retrieve your location.');
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleConfirmLocation = () => {
    console.log('Confirmed Location:', location);
    // You can send this location to backend to find nearby orders
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-lg font-bold">Find Orders Near You</h2>

      {location ? (
        <div className="text-gray-700 text-sm">
          📍 <strong>Your Location:</strong><br />
          Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
        </div>
      ) : (
        <p className="text-red-500">{locationError || 'Fetching your location...'}</p>
      )}

      {isLoaded && location && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
          onClick={(e) => {
            setLocation({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }}
        >
          <Marker
            position={location}
            draggable={true}
            onDragEnd={(e) => {
              setLocation({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
            }}
          />
        </GoogleMap>
      )}

      {location && (
        <button
          onClick={handleConfirmLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm Location
        </button>
      )}
    </div>
  );
};

export default FindOrders;
