import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RouteCard from './RouteCard';
import {
  SkeletonCard,
  EmptyStateWrapper,
  EmptyStateTitle,
  EmptyStateText,
} from './RouteCard.styles';

const RouteCardsScrollList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-bottom: 24px;
  max-height: 50vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CorridorHeaderBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.08)'};
  border: 1px solid #3B82F6;
  border-radius: 14px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export default function ThikaRoadView({
  routes = [],
  selectedRoute,
  onSelectRoute,
  onToggleSaveRoute,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief loading delay (300ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter routes belonging to Thika Road corridor
  const thikaRoutes = routes.filter(
    (r) =>
      r.corridor === 'Thika Road' ||
      r.name?.includes('237') ||
      r.name?.includes('44') ||
      r.name?.includes('45')
  );

  if (loading) {
    return (
      <RouteCardsScrollList data-testid="thika-routes-loading">
        <SkeletonCard />
        <SkeletonCard />
      </RouteCardsScrollList>
    );
  }

  if (thikaRoutes.length === 0) {
    return (
      <EmptyStateWrapper data-testid="thika-routes-empty">
        <span style={{ fontSize: '36px' }}>🛣️</span>
        <EmptyStateTitle>No Thika Road Routes Available</EmptyStateTitle>
        <EmptyStateText>
          There are currently no active matatus operating on the Thika Superhighway corridor.
        </EmptyStateText>
      </EmptyStateWrapper>
    );
  }

  return (
    <RouteCardsScrollList data-testid="thika-road-list">
      <CorridorHeaderBanner>
        <div>
          🛣️ <strong>Thika Superhighway Corridor</strong>
        </div>
        <span>{thikaRoutes.length} Express Routes</span>
      </CorridorHeaderBanner>

      {thikaRoutes.map((route) => (
        <RouteCard
          key={route.id}
          route={route}
          isSelected={selectedRoute?.id === route.id}
          onSelect={onSelectRoute}
          onToggleSave={onToggleSaveRoute}
        />
      ))}
    </RouteCardsScrollList>
  );
}
