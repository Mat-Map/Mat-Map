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

  useEffect(() => {
    if (!mapInstance || !googleMaps || !route?.stages || route.stages.length < 2) {
      return;
    }

    const pathCoordinates = route.stages.map((stage) => ({
      lat: Number(stage.lat),
      lng: Number(stage.lng),
    }));

    const opacity = hasActiveSelection ? (isSelected ? 1.0 : 0.35) : 0.85;
    const strokeWidth = isSelected ? 6 : 4;
    const zIndex = isSelected ? 10 : 2;

    if (!polylineRef.current) {
      const polyline = new googleMaps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: routeColor,
        strokeOpacity: opacity,
        strokeWeight: strokeWidth,
        zIndex,
        map: mapInstance,
      });

      polyline.addListener('click', () => {
        if (onSelectRoute) onSelectRoute(route);
      });

      polylineRef.current = polyline;
    } else {
      polylineRef.current.setOptions({
        strokeColor: routeColor,
        strokeOpacity: opacity,
        strokeWeight: strokeWidth,
        zIndex,
      });
    }

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [mapInstance, googleMaps, route, isSelected, hasActiveSelection, routeColor, onSelectRoute]);

  return null;
}
