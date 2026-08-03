'use client';

import React from 'react';
import styled from 'styled-components';
import RouteHeader from './RouteHeader';
import StageSequenceList from './StageSequenceList';
import MapView from '@/components/Map/MapView';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const MapSection = styled.div`
  border: ${({ theme }) => theme.borders.card};
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  overflow: hidden;
`;

export default function RouteDetailView({ route }) {
  if (!route) return null;

  return (
    <ViewContainer>
      <RouteHeader route={route} />

      <StageSequenceList
        stages={route.stages || []}
        routeColor={route.color}
      />

      <MapSection>
        <MapView
          stages={route.stages || []}
          routes={[route]}
          selectedRouteId={route.id}
        />
      </MapSection>
    </ViewContainer>
  );
}
