import { useEffect, useState, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address, lat, lng }) {
  const mapRef = useRef(null);
  const [google, setGoogle] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

  const geocoder = useMemo(() => google && new google.maps.Geocoder(), [google]);

  const drowDirections = (latitude, longitude) => {
    if (geocoder) {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: lat, lng: lng },
            zoom: 15,
          });

          // Directions API
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
          directionsRenderer.setMap(map);

          const end = new google.maps.LatLng(lat, lng);
          const start = new google.maps.LatLng(latitude, longitude);

          const request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            }
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyA41BspaP5NSIjB-_OOPRglkkg84X4XFgM", // Replace with your Google Maps API key
      version: "weekly",
    });

    loader.load().then(async () => {
      setGoogle(window.google);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log({ latitude, longitude });
            setCurrentPosition({ lat: latitude, lng: longitude });
            drowDirections(latitude, longitude);
          },
          (error) => {
            console.error("Error getting current position:", error);
          }
        );
      } else {
        console.log("Geolocation is not available.");
      }

      // Access the google object here
    });
  }, [address, geocoder]);

  return <div style={{ height: "400px" }} ref={mapRef} />;
}

export default Map;
