'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useThemeToggle } from './providers';
import { useStages } from '@/hooks/useStages';
import { useRoutes } from '@/hooks/useRoutes';
import MapView from '@/components/Map/MapView';
import JourneyForm from '@/components/JourneyForm';
import ReportFAB from '@/components/Report/ReportFAB';
import ReportModal from '@/components/Report/ReportModal';
import AllRoutesView from '@/components/RouteList/AllRoutesView';
import LiveNowView from '@/components/RouteList/LiveNowView';
import SavedRoutesView from '@/components/RouteList/SavedRoutesView';
import ThikaRoadView from '@/components/RouteList/ThikaRoadView';

const PageContainer = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onBackground};
  user-select: none;
`;

const MapBackgroundWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex?.map || 0};
`;

const TopFloatingControls = styled.header`
  position: absolute;
  top: ${({ theme }) => theme.spacing.floatingOffset || '16px'};
  left: ${({ theme }) => theme.spacing.containerMargin || '16px'};
  right: ${({ theme }) => theme.spacing.containerMargin || '16px'};
  z-index: ${({ theme }) => theme.zIndex?.floatingControls || 40};
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
`;

const HeaderBarPill = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(20, 20, 15, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 9999px;
  padding: 6px 16px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
`;

const BrandTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.matatuYellow};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
`;

const ThemeToggleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.94);
  }
`;

const BottomSheetContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex?.bottomSheet || 30};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surface : theme.colors.surfaceContainerLowest};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: ${({ theme }) => theme.shadows.bottomSheet};
  padding: 12px 16px 84px 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isExpanded }) => ($isExpanded ? 'translateY(0)' : 'translateY(calc(100% - 130px))')};
  max-height: 75vh;
  display: flex;
  flex-direction: column;
`;

const GrabberHandle = styled.div`
  width: 48px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 9999px;
  margin: 4px auto 12px auto;
  cursor: pointer;
  flex-shrink: 0;
`;

const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SheetTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

const SheetSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin: 2px 0 0 0;
`;

const FilterChipsRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 12px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterChip = styled.button`
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 9999px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : theme.colors.surfaceContainerHigh};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.inkBlack : theme.colors.onSurface};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
`;

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

const CardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.surfaceContainerHigh : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 24px;
  padding: 14px 16px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const RouteAvatarBadge = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
`;

const RouteMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const RouteTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0 0 2px 0;
`;

const SaccoText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const EtaBadge = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const CrowdIndicatorRow = styled.div`
  display: flex;
  gap: 4px;
`;

const CrowdDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const FloatingDockNav = styled.nav`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.floatingOffset || '20px'};
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex?.floatingDock || 50};
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(28, 28, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 9999px;
  padding: 6px 12px;
  box-shadow: ${({ theme }) => theme.shadows.floatingDock};
`;

const DockNavItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.inkBlack : theme.colors.onSurfaceVariant};
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;

  &:active {
    transform: scale(0.9);
  }
`;

export default function Home() {
  const { themeMode, toggleTheme } = useThemeToggle();
  const { stages } = useStages();
  const { routes, setRoutes } = useRoutes();

  const [origin, setOrigin] = useState('Nairobi CBD');
  const [destination, setDestination] = useState('');
  const [vibeFilter, setVibeFilter] = useState('nganya');
  const [activeFilter, setActiveFilter] = useState('All routes');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [activeTab, setActiveTab] = useState('nearby');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  const handleSelectRoute = (route) => {
    setSelectedRoute((prev) => (prev?.id === route?.id ? null : route));
    setIsSheetExpanded(true);
  };

  const handleSelectStage = (stage) => {
    setSelectedStage((prev) => (prev?.id === stage?.id ? null : stage));
  };

  const handleToggleSaveRoute = (routeId) => {
    if (setRoutes) {
      setRoutes((prevRoutes) =>
        prevRoutes.map((r) =>
          r.id === routeId ? { ...r, isSaved: !r.isSaved } : r
        )
      );
    }
  };

  const handleSearchSubmit = (searchParams) => {
    setIsSheetExpanded(true);
    setActiveFilter('All routes');
  };

  const handleSearchIconClick = () => {
    setActiveTab('nearby');
    setActiveFilter('All routes');
    setIsSheetExpanded(true);
    if (typeof document !== 'undefined') {
      const destInput = document.querySelector('[data-testid="search-destination-input"]');
      if (destInput) destInput.focus();
    }
  };

  // Dynamic filter for search input & vibe toggle
  const searchLower = destination.trim().toLowerCase();
  const filteredRoutes = routes.filter((route) => {
    // Vibe filter check
    const matchesVibe = !vibeFilter || route.vibeTag === vibeFilter;

    // Substring match on destination, route name, sacco, or corridor
    const matchesQuery =
      !searchLower ||
      route.name?.toLowerCase().includes(searchLower) ||
      route.destinationStage?.toLowerCase().includes(searchLower) ||
      route.originStage?.toLowerCase().includes(searchLower) ||
      route.sacco?.toLowerCase().includes(searchLower) ||
      route.corridor?.toLowerCase().includes(searchLower);

    return matchesVibe && matchesQuery;
  });

  const handleSavedIconClick = () => {
    setActiveTab('saved');
    setActiveFilter('Saved');
    setIsSheetExpanded(true);
  };

  return (
    <PageContainer>
      <MapBackgroundWrapper>
        <MapView
          stages={stages}
          routes={filteredRoutes}
          selectedRouteId={selectedRoute?.id}
          selectedStageId={selectedStage?.id}
          onSelectRoute={handleSelectRoute}
          onSelectStage={handleSelectStage}
        />
      </MapBackgroundWrapper>

      <TopFloatingControls>
        <HeaderBarPill>
          <BrandTitle>MATMAP</BrandTitle>
          <ThemeToggleButton onClick={toggleTheme} data-testid="theme-toggle-btn">
            {themeMode.toUpperCase()} MODE
          </ThemeToggleButton>
        </HeaderBarPill>

        <JourneyForm
          origin={origin}
          destination={destination}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          vibe={vibeFilter}
          onVibeChange={setVibeFilter}
          onSubmit={handleSearchSubmit}
        />
      </TopFloatingControls>

      <BottomSheetContainer $isExpanded={isSheetExpanded} id="bottom-sheet">
        <GrabberHandle onClick={() => setIsSheetExpanded((prev) => !prev)} />
        <SheetHeader>
          <div>
            <SheetTitle>
              {filteredRoutes.length} {filteredRoutes.length === 1 ? 'Route' : 'Routes'} Found
            </SheetTitle>
            <SheetSubtitle>
              {destination
                ? `Results matching "${destination}" (${vibeFilter.toUpperCase()} vibe)`
                : 'Swipe up to view details and live status'}
            </SheetSubtitle>
          </div>
        </SheetHeader>

        <FilterChipsRow>
          {['All routes', 'Live now', 'Saved', 'Thika Rd'].map((chip) => (
            <FilterChip
              key={chip}
              $active={activeFilter === chip}
              onClick={() => setActiveFilter(chip)}
            >
              {chip}
            </FilterChip>
          ))}
        </FilterChipsRow>

        {activeFilter === 'All routes' && (
          <AllRoutesView
            routes={filteredRoutes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            onToggleSaveRoute={handleToggleSaveRoute}
          />
        )}

        {activeFilter === 'Live now' && (
          <LiveNowView
            routes={filteredRoutes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            onToggleSaveRoute={handleToggleSaveRoute}
          />
        )}

        {activeFilter === 'Saved' && (
          <SavedRoutesView
            routes={routes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            onToggleSaveRoute={handleToggleSaveRoute}
          />
        )}

        {activeFilter === 'Thika Rd' && (
          <ThikaRoadView
            routes={routes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            onToggleSaveRoute={handleToggleSaveRoute}
          />
        )}
      </BottomSheetContainer>

      <ReportFAB onClick={() => setIsReportOpen(true)} />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        routes={routes}
        stages={stages}
      />

      <FloatingDockNav data-testid="bottom-icon-dock">
        <DockNavItem
          $active={activeTab === 'nearby'}
          onClick={handleSearchIconClick}
          title="Search & Nearby Routes"
          data-testid="dock-nav-nearby"
        >
          🔍
        </DockNavItem>
        <DockNavItem
          $active={activeTab === 'saved'}
          onClick={handleSavedIconClick}
          title="Saved Routes"
          data-testid="dock-nav-saved"
        >
          🔖
        </DockNavItem>
        <DockNavItem
          $active={activeTab === 'alerts'}
          onClick={() => setActiveTab('alerts')}
          title="Traffic Alerts"
          data-testid="dock-nav-alerts"
        >
          ⚠️
        </DockNavItem>
        <DockNavItem
          $active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          title="Settings"
          data-testid="dock-nav-settings"
        >
          ⚙️
        </DockNavItem>
      </FloatingDockNav>
    </PageContainer>
  );
}
