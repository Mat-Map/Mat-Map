'use client';

import React from 'react';
import {
  CardContainer,
  HeaderRow,
  RouteInfo,
  RouteBox,
  SaccoInfo,
  RouteName,
  SaccoName,
  FareEtaBlock,
  StatItem,
  StatValue,
  StatLabel,
  WarningCallout,
  WarningTitle,
  WarningBody,
  HighlightButton,
} from './JourneyResultCard.styles';

export default function JourneyResultCard({ option, onHighlightRoute }) {
  if (!option) return null;

  const isDirect = option.type === 'direct';

  if (!isDirect) {
    return (
      <CardContainer $warning>
        <WarningCallout>
          <WarningTitle>⚠️ NO DIRECT MATATU ROUTE AVAILABLE</WarningTitle>
          <WarningBody>
            No direct matatu on this path. Take route 237 or 44 to a corridor hub stage
            (e.g., Allsops / Roysambu), then transfer to your target destination route.
          </WarningBody>
        </WarningCallout>
      </CardContainer>
    );
  }

  const { route, fare, eta } = option;

  const fareDisplay = fare
    ? `KSh ${fare.baseFare || 0} Base ${fare.peakFare ? `/ KSh ${fare.peakFare} Peak` : ''}`
    : 'Fare N/A';

  const etaDisplay = eta
    ? `${eta.durationMinutes} min • ${eta.distanceKm} km`
    : 'ETA N/A';

  return (
    <CardContainer $color={route?.color}>
      <HeaderRow>
        <RouteInfo>
          <RouteBox $color={route?.color}>
            {route?.name?.split(' ')[1] || route?.name || 'ROUTE'}
          </RouteBox>
          <SaccoInfo>
            <RouteName>{route?.name || 'Direct Route'}</RouteName>
            <SaccoName>🚌 {route?.sacco || 'Corridor Operator'}</SaccoName>
          </SaccoInfo>
        </RouteInfo>
      </HeaderRow>

      <FareEtaBlock>
        <StatItem>
          <StatLabel>ESTIMATED FARE</StatLabel>
          <StatValue>{fareDisplay}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>TRAVEL TIME & DISTANCE</StatLabel>
          <StatValue>{etaDisplay}</StatValue>
        </StatItem>
      </FareEtaBlock>

      {onHighlightRoute && route && (
        <HighlightButton onClick={() => onHighlightRoute(route)}>
          SHOW ROUTE ON MAP ➔
        </HighlightButton>
      )}
    </CardContainer>
  );
}
