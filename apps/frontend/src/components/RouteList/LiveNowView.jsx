import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RouteCard from './RouteCard';
import { mockLiveVehicles } from '@/mock/mockData';
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

const LiveHeaderBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(242, 183, 5, 0.1)' : 'rgba(242, 183, 5, 0.15)'};
  border: 1px solid ${({ theme }) => theme.colors.matatuYellow};
  border-radius: 14px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const PulseIcon = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #7DA82E;
  margin-right: 6px;
  box-shadow: 0 0 6px #7DA82E;
`;

export default function LiveNowView({
  routes = [],
  selectedRoute,
  onSelectRoute,
  onToggleSaveRoute,
}) {
  const [loading, setLoading] = useState(true);

  // Maintain ticking live ETAs per vehicle ID (in seconds)
  const [liveETAs, setLiveETAs] = useState(() => {
    const initial = {};
    mockLiveVehicles.forEach((v) => {
      initial[v.id] = v.liveEtaSeconds || 180;
    });
    return initial;
  });

  useEffect(() => {
    // Brief loading state (300ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Live countdown ticker simulation every second
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveETAs((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((vId) => {
          if (next[vId] > 10) {
            next[vId] = next[vId] - 1;
          } else {
            // reset countdown loop for continuous demo
            next[vId] = 240;
          }
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter routes that have an active live vehicle
  const liveRouteItems = mockLiveVehicles
    .map((vehicle) => {
      const parentRoute = routes.find((r) => r.id === vehicle.routeId) || {
        id: vehicle.routeId,
        name: vehicle.name,
        sacco: vehicle.sacco,
        color: '#E8722C',
        fareRange: 'KES 80 - 120',
        vibeTag: vehicle.vibe,
        isSaved: false,
      };
      return {
        vehicle,
        route: parentRoute,
      };
    })
    .filter((item) => Boolean(item.route));

  const formatEtaDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const padSecs = secs < 10 ? `0${secs}` : secs;
    return `${mins}m ${padSecs}s`;
  };

  if (loading) {
    return (
      <RouteCardsScrollList data-testid="live-routes-loading">
        <SkeletonCard />
        <SkeletonCard />
      </RouteCardsScrollList>
    );
  }

  if (liveRouteItems.length === 0) {
    return (
      <EmptyStateWrapper data-testid="live-routes-empty">
        <span style={{ fontSize: '32px' }}>📡</span>
        <EmptyStateTitle>No Live Matatus Right Now</EmptyStateTitle>
        <EmptyStateText>
          Check back shortly. Live tracked vehicles will appear here in real-time.
        </EmptyStateText>
      </EmptyStateWrapper>
    );
  }

  return (
    <RouteCardsScrollList data-testid="live-now-list">
      <LiveHeaderBanner>
        <div>
          <PulseIcon /> <strong>Real-time Telemetry Active</strong>
        </div>
        <span>{liveRouteItems.length} Matatus Live</span>
      </LiveHeaderBanner>

      {liveRouteItems.map(({ vehicle, route }) => (
        <RouteCard
          key={vehicle.id}
          route={route}
          isSelected={selectedRoute?.id === route.id}
          onSelect={onSelectRoute}
          onToggleSave={onToggleSaveRoute}
          isLive={true}
          liveVehicle={vehicle}
          liveEtaDisplay={formatEtaDisplay(liveETAs[vehicle.id] || 180)}
        />
      ))}
    </RouteCardsScrollList>
  );
}
