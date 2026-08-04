'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';

export default function RoutePolyline({
  mapInstance,
  googleMaps,
  route,
  isSelected,
  hasActiveSelection,
  onSelectRoute,
}) {
  const theme = useTheme();
  const polylineRef = useRef(null);

  const routeColor =
    route?.color || theme?.colors?.fallbackRouteColor || '#78776f';

  // Create the polyline once, tied to this mapInstance + route's stage path
  useEffect(() => {
    if (!mapInstance || !googleMaps || !route?.stages || route.stages.length < 2) {
      return;
    }

    const pathCoordinates = route.stages.map((stage) => ({
      lat: Number(stage.lat),
      lng: Number(stage.lng),
    }));

    const polyline = new googleMaps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: routeColor,
      map: mapInstance,
    });

    const clickListener = polyline.addListener('click', () => {
      if (onSelectRoute) onSelectRoute(route);
    });

    polylineRef.current = polyline;

    // Cleanup: remove listener + polyline on unmount or when route/map changes
    return () => {
      googleMaps.event.removeListener(clickListener);
      polyline.setMap(null);
      polylineRef.current = null;
    };
  }, [mapInstance, googleMaps, route, routeColor, onSelectRoute]);

  // Update styling when selection state changes, without recreating the polyline
  useEffect(() => {
    if (!polylineRef.current) return;

    const opacity = hasActiveSelection ? (isSelected ? 1.0 : 0.35) : 0.85;
    const strokeWidth = isSelected ? 6 : 4;
    const zIndex = isSelected ? 10 : 2;

    polylineRef.current.setOptions({
      strokeColor: routeColor,
      strokeOpacity: opacity,
      strokeWeight: strokeWidth,
      zIndex,
    });
  }, [isSelected, hasActiveSelection, routeColor]);

  return null;
}