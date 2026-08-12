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

export default function AllRoutesView({
  routes = [],
  selectedRoute,
  onSelectRoute,
  onToggleSaveRoute,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief simulated loading delay for realistic demo experience (300ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <RouteCardsScrollList data-testid="all-routes-loading">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </RouteCardsScrollList>
    );
  }

  if (!routes || routes.length === 0) {
    return (
      <EmptyStateWrapper data-testid="all-routes-empty">
        <span style={{ fontSize: '32px' }}>🚌</span>
        <EmptyStateTitle>No Routes Found</EmptyStateTitle>
        <EmptyStateText>
          There are currently no matatu routes available matching your search.
        </EmptyStateText>
      </EmptyStateWrapper>
    );
  }

  return (
    <RouteCardsScrollList data-testid="all-routes-list">
      {routes.map((route) => (
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
