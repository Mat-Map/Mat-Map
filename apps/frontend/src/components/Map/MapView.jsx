'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import {
  MapContainer,
  MapCanvas,
  LocateButton,
  MapOverlayBadge,
  VehiclePulse,
  VehicleBadge,
  VehicleDot,
} from './MapView.styles';
import StageMarker from './StageMarker';
import RoutePolyline from './RoutePolyline';

const DEFAULT_THIKA_CENTER = { lat: -1.215, lng: 36.890 };
const DEFAULT_ZOOM = 12;

export default function MapView({
  stages = [],
  routes = [],
  selectedRouteId = null,
  selectedStageId = null,
  onSelectRoute = () => {},
  onSelectStage = () => {},
}) {
  const theme = useTheme();
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [googleMaps, setGoogleMaps] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.google && window.google.maps) {
      setGoogleMaps(window.google.maps);
      setMapLoaded(true);
      return;
    }

    if (!apiKey || apiKey.includes('<your own')) {
      // Fallback mode without live browser key
      setMapLoaded(false);
      return;
    }

    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.google && window.google.maps) {
          setGoogleMaps(window.google.maps);
          setMapLoaded(true);
        }
      };

      script.onerror = () => {
        setMapLoaded(false);
      };

      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
      setGoogleMaps(window.google.maps);
      setMapLoaded(true);
    }
  }, [apiKey]);

  useEffect(() => {
    if (mapLoaded && googleMaps && mapRef.current && !mapInstance) {
      const map = new googleMaps.Map(mapRef.current, {
        center: DEFAULT_THIKA_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: theme.colors.background }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: theme.colors.background }] },
          { elementType: 'labels.text.fill', stylers: [{ color: theme.colors.onBackground }] },
        ],
      });
      setMapInstance(map);
    }
  }, [mapLoaded, googleMaps, mapRef, mapInstance, theme]);

  const handleLocateMe = () => {
    if (navigator.geolocation && mapInstance) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          mapInstance.panTo({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          mapInstance.setZoom(14);
        },
        () => {
          mapInstance.panTo(DEFAULT_THIKA_CENTER);
        }
      );
    }
  };

  return (
    <MapContainer>
      <MapOverlayBadge>
        {mapLoaded ? 'LIVE THIKA ROAD MAP' : 'THIKA ROAD CORRIDOR MAP (DEMO)'}
      </MapOverlayBadge>

      <MapCanvas ref={mapRef} id="map-canvas">
        {!mapLoaded && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            style={{ background: theme.colors.surfaceVariant }}
          >
            {/* Seeded Corridor Lines */}
            <line x1="20" y1="250" x2="380" y2="50" stroke="#1D9E75" strokeWidth="6" opacity="0.8" />
            <line x1="20" y1="270" x2="380" y2="70" stroke="#378ADD" strokeWidth="4" opacity="0.8" />
            <line x1="20" y1="230" x2="380" y2="30" stroke="#D85A30" strokeWidth="4" opacity="0.8" />

            {/* Stage Nodes */}
            {stages.map((st, idx) => {
              const x = 30 + (idx * 300) / Math.max(stages.length - 1, 1);
              const y = 250 - (idx * 200) / Math.max(stages.length - 1, 1);
              const isSelected = selectedStageId === st.id;
              return (
                <g key={st.id || idx} onClick={() => onSelectStage(st)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 5}
                    fill={isSelected ? theme.colors.matatuYellow : theme.colors.inkBlack}
                    stroke={theme.colors.paperWhite}
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y - 10}
                    fontSize="9"
                    fill={theme.colors.onBackground}
                    textAnchor="middle"
                    fontFamily="IBM Plex Mono"
                  >
                    {st.name?.split(' ')[0] || st.slug}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </MapCanvas>

      {/* Render Google Maps Polylines when SDK is loaded */}
      {mapLoaded &&
        mapInstance &&
        googleMaps &&
        routes.map((route) => (
          <RoutePolyline
            key={route.id}
            mapInstance={mapInstance}
            googleMaps={googleMaps}
            route={route}
            isSelected={selectedRouteId === route.id}
            hasActiveSelection={Boolean(selectedRouteId)}
            onSelectRoute={onSelectRoute}
          />
        ))}

      {/* Pulsing Live Vehicle Indicators */}
      <VehiclePulse style={{ top: '35%', left: '30%' }} onClick={() => onSelectRoute(routes[0])}>
        <VehicleBadge $color={routes[0]?.color || '#1D9E75'}>237</VehicleBadge>
        <VehicleDot $color={routes[0]?.color || '#1D9E75'} />
      </VehiclePulse>

      <VehiclePulse style={{ top: '55%', left: '60%' }} onClick={() => onSelectRoute(routes[1])}>
        <VehicleBadge $color={routes[1]?.color || '#378ADD'}>44</VehicleBadge>
        <VehicleDot $color={routes[1]?.color || '#378ADD'} />
      </VehiclePulse>

      <LocateButton onClick={handleLocateMe} title="Locate Me">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
      </LocateButton>
    </MapContainer>
  );
}
