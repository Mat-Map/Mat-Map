'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';

export default function StageMarker({
  mapInstance,
  googleMaps,
  stage,
  isSelected,
  onSelectStage,
}) {
  const theme = useTheme();
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

  // Create the marker once, tied to this mapInstance + stage
  useEffect(() => {
    if (!mapInstance || !googleMaps || !stage) return;

    const marker = new googleMaps.Marker({
      position: { lat: stage.lat, lng: stage.lng },
      map: mapInstance,
      icon: {
        path: googleMaps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: theme.colors.inkBlack,
        fillOpacity: 1,
        strokeColor: theme.colors.paperWhite,
        strokeWeight: 2,
      },
      title: stage.name,
    });

    const infoWindow = new googleMaps.InfoWindow({
      content: `<div style="font-family: ${theme.typography.fonts.mono}; font-size: 12px; color: ${theme.colors.inkBlack};">${stage.name}</div>`,
    });

    const clickListener = marker.addListener('click', () => {
      onSelectStage(stage);
      infoWindow.open({ anchor: marker, map: mapInstance });
    });

    markerRef.current = marker;
    infoWindowRef.current = infoWindow;

    // Cleanup: remove marker + listener + info window on unmount or dependency change
    return () => {
      googleMaps.event.removeListener(clickListener);
      infoWindow.close();
      marker.setMap(null);
    };
  }, [mapInstance, googleMaps, stage, onSelectStage, theme]);

  // Update icon styling when selection state changes, without recreating the marker
  useEffect(() => {
    if (!markerRef.current || !googleMaps) return;

    markerRef.current.setIcon({
      path: googleMaps.SymbolPath.CIRCLE,
      scale: isSelected ? 9 : 6,
      fillColor: isSelected ? theme.colors.matatuYellow : theme.colors.inkBlack,
      fillOpacity: 1,
      strokeColor: theme.colors.paperWhite,
      strokeWeight: 2,
    });
    markerRef.current.setZIndex(isSelected ? 20 : 10);
  }, [isSelected, googleMaps, theme]);

  // This component renders nothing to the DOM directly — the marker is drawn
  // straight onto the Google Maps canvas via the imperative API above.
  return null;
}