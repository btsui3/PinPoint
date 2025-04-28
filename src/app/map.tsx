"use client";

import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  pins: {
    id: string;
    lng: number;
    lat: number;
    note: string;
  }[];
  addPin: (lng: number, lat: number) => void;
}

export const Map: React.FC<MapProps> = ({pins, addPin}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const lng = -70.9;
  const lat = 42.35;
  const zoom = 9;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    // Check if the access token is available
    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token is missing. Please set the NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN environment variable.");
      return;
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('click', (e) => {
      addPin(e.lngLat.lng, e.lngLat.lat);
    });
  }, [addPin, lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) return;

    pins.forEach((pin) => {
      // Check if a marker with the same ID already exists
      if (map.current && !document.getElementById(`marker-${pin.id}`)) {
        const marker = new mapboxgl.Marker({color: '#008080'})
          .setLngLat([pin.lng, pin.lat])
          .addTo(map.current!)
          .getElement()
          .id = `marker-${pin.id}`; // Set the ID for the marker element
      }
    });
  }, [pins]);

  return (
    <div ref={mapContainer} className="map-container flex-1" style={{height: '100%'}}/>
  );
};
