'use client';

import React from 'react';
import {
  HeaderContainer,
  TopRow,
  RouteBadge,
  RouteTitle,
  OperatorBlock,
  OperatorLabel,
  OperatorValue,
  StatsRow,
  StatBadge,
} from './RouteHeader.styles';

export default function RouteHeader({ route }) {
  if (!route) return null;

  return (
    <HeaderContainer $color={route.color}>
      <TopRow>
        <div>
          <RouteBadge $color={route.color}>
            {route.name?.split(' ')[0] || 'ROUTE'}
          </RouteBadge>
          <RouteTitle>{route.name}</RouteTitle>
        </div>
        <OperatorBlock>
          <OperatorLabel>Operator</OperatorLabel>
          <OperatorValue>{route.sacco || 'Corridor SACCO'}</OperatorValue>
        </OperatorBlock>
      </TopRow>
      <StatsRow>
        <StatBadge>⏱️ Freq: 8-12m</StatBadge>
        <StatBadge>💳 KSh 50 - 100</StatBadge>
      </StatsRow>
    </HeaderContainer>
  );
}
