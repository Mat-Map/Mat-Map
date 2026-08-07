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

const SavedHeaderBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(186, 26, 26, 0.12)' : 'rgba(186, 26, 26, 0.08)'};
  border: 1px solid ${({ theme }) => theme.colors.signalRed};
  border-radius: 14px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export default function SavedRoutesView({
  routes = [],
  selectedRoute,
  onSelectRoute,
  onToggleSaveRoute,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief loading state (300ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const savedRoutes = routes.filter((r) => r.isSaved);

  if (loading) {
    return (
      <RouteCardsScrollList data-testid="saved-routes-loading">
        <SkeletonCard />
        <SkeletonCard />
      </RouteCardsScrollList>
    );
  }

  if (savedRoutes.length === 0) {
    return (
      <EmptyStateWrapper data-testid="saved-routes-empty">
        <span style={{ fontSize: '36px' }}>❤️</span>
        <EmptyStateTitle>No Saved Routes Yet</EmptyStateTitle>
        <EmptyStateText>
          Tap the heart icon on any matatu route card to save it here for instant access.
        </EmptyStateText>
      </EmptyStateWrapper>
    );
  }

  return (
    <RouteCardsScrollList data-testid="saved-routes-list">
      <SavedHeaderBanner>
        <div>
          ❤️ <strong>Quick Bookmarks</strong>
        </div>
        <span>{savedRoutes.length} Saved {savedRoutes.length === 1 ? 'Route' : 'Routes'}</span>
      </SavedHeaderBanner>

      {savedRoutes.map((route) => (
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
