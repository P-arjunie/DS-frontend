import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const OrderTracking = () => {
  const { state } = useLocation();
  const {
    order,
    driverLocation: initialDriverLocation,
    restaurantLocation,
    coustomerLocation, // original typo kept if needed
  } = state || {};

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBoJXxxWOMKdexaiud8ImxzzkaHtEIYtds',
  });

  const [driverLocation, setDriverLocation] = useState(initialDriverLocation);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [pickedUp, setPickedUp] = useState(false);

  // Convert restaurant and customer location to proper Google Maps LatLngLiteral format
  const restaurantLatLng = restaurantLocation && {
    lat: parseFloat(restaurantLocation.latitude),
    lng: parseFloat(restaurantLocation.longitude),
  };

  const customerLatLng = coustomerLocation && {
    lat: parseFloat(coustomerLocation.latitude),
    lng: parseFloat(coustomerLocation.longitude),
  };

  const updateRoute = (from, to) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const route = result.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  };

  useEffect(() => {
    if (isLoaded && driverLocation && restaurantLatLng && !pickedUp) {
      updateRoute(driverLocation, restaurantLatLng);
    }

    if (isLoaded && pickedUp && driverLocation && customerLatLng) {
      updateRoute(driverLocation, customerLatLng);
    }
  }, [isLoaded, driverLocation, restaurantLatLng, customerLatLng, pickedUp]);

  const handlePickupClick = async () => {
    try {
      setIsUpdating(true);
      setUpdateMessage('');

      await axios.patch(
        `https://ordermanagementservice.onrender.com/api/orders/${order._id}/update-status`,
        { status: 'Pending' }
      );

      setDriverLocation(restaurantLatLng);
      setPickedUp(true);
      setUpdateMessage('Order picked up. Routing to customer.');
    } catch (error) {
      console.error('Failed to update status:', error);
      setUpdateMessage('Failed to update order status.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!order || !driverLocation || (!restaurantLatLng && !pickedUp)) {
    return <p className="text-center mt-8 text-red-500">No tracking data available.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Your Order Tracking</h2>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={driverLocation}
          zoom={14}
        >
          <Marker position={driverLocation} label="You" />
          {!pickedUp && restaurantLatLng && (
            <Marker position={restaurantLatLng} label="R" />
          )}
          {pickedUp && customerLatLng && (
            <Marker position={customerLatLng} label="C" />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true }}
            />
          )}
        </GoogleMap>
      )}

      <div className="mt-6 p-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-200">
        <h3 className="text-xl font-bold text-indigo-600 mb-4 border-b pb-2">Order Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Order ID:</span>
            <span className="text-right">{order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Customer:</span>
            <span className="text-right">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Restaurant:</span>
            <span className="text-right">{order.resturantId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Estimated Time:</span>
            <span className="text-right">{duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Distance:</span>
            <span className="text-right">{distance}</span>
          </div>
        </div>

        {!pickedUp && (
          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handlePickupClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Pickup'}
            </button>
            {updateMessage && <p className="mt-2 text-sm text-green-600">{updateMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
