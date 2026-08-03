'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useThemeToggle } from './providers';
import { useStages } from '@/hooks/useStages';
import { useRoutes } from '@/hooks/useRoutes';
import MapView from '@/components/Map/MapView';

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onBackground};
  padding-bottom: 80px;
`;

const TopAppBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.inkBlack};
  border-bottom: 4px solid ${({ theme }) => theme.colors.matatuYellow};
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BrandTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 28px;
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
  padding: 4px 8px;
  border: 2px solid ${({ theme }) => theme.colors.inkBlack};
  text-transform: uppercase;
`;

const MainContent = styled.div`
  padding-top: 64px;
`;

const SearchContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border-bottom: ${({ theme }) => theme.borders.card};
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 14px;
  font-weight: 700;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 48px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.card};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.onSurface};

  &:focus {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
    color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

const FilterChipsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xs};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterChip = styled.button`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.inkBlack : theme.colors.surface};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : theme.colors.onSurface};
  border: ${({ theme }) => theme.borders.card};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.onBackground};
  text-transform: uppercase;
  margin: 0;
`;

const SectionMeta = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const LiveCarousel = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LiveCard = styled.div`
  flex-shrink: 0;
  width: 260px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid ${({ $color }) => $color || '#1D9E75'};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ $selected, theme }) => ($selected ? theme.colors.glow : 'none')};
  cursor: pointer;
`;

const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RouteBadge = styled.div`
  background-color: ${({ $color }) => $color || '#1D9E75'};
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 20px;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.inkBlack};
`;

const EtaBox = styled.div`
  text-align: right;
`;

const EtaVal = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const EtaLbl = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const RouteName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SaccoText = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const RouteList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: ${({ theme }) => theme.borders.divider};
`;

const RouteListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border-bottom: ${({ theme }) => theme.borders.divider};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.surfaceVariant : theme.colors.surface};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceVariant};
  }
`;

const ListItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ListRouteBox = styled.div`
  width: 60px;
  height: 44px;
  background-color: ${({ $color }) => $color || '#14140F'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.colors.inkBlack};
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 50;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: ${({ theme }) => theme.borders.card};
`;

const NavItem = styled.button`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.inkBlack : theme.colors.onSurfaceVariant};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

import ReportFAB from '@/components/Report/ReportFAB';
import ReportModal from '@/components/Report/ReportModal';

export default function Home() {
  const { themeMode, toggleTheme } = useThemeToggle();
  const { stages } = useStages();
  const { routes } = useRoutes();

  const [activeFilter, setActiveFilter] = useState('All routes');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [activeTab, setActiveTab] = useState('nearby');
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleSelectRoute = (route) => {
    setSelectedRoute((prev) => (prev?.id === route?.id ? null : route));
  };

  const handleSelectStage = (stage) => {
    setSelectedStage((prev) => (prev?.id === stage?.id ? null : stage));
  };

  return (
    <PageContainer>
      <TopAppBar>
        <BrandSection>
          <BrandTitle>MATMAP</BrandTitle>
        </BrandSection>
        <ThemeToggleButton onClick={toggleTheme}>
          {themeMode.toUpperCase()} MODE
        </ThemeToggleButton>
      </TopAppBar>

      <MainContent>
        <SearchContainer>
          <SearchInputWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="Where are you headed? (e.g. Kasarani, Juja)" />
          </SearchInputWrapper>

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
        </SearchContainer>

        <MapView
          stages={stages}
          routes={routes}
          selectedRouteId={selectedRoute?.id}
          selectedStageId={selectedStage?.id}
          onSelectRoute={handleSelectRoute}
          onSelectStage={handleSelectStage}
        />

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Live Now</SectionTitle>
            <SectionMeta>{routes.length || 3} Corridor Routes Active</SectionMeta>
          </SectionHeader>

          <LiveCarousel>
            {routes.map((route, idx) => (
              <LiveCard
                key={route.id || idx}
                $color={route.color}
                $selected={selectedRoute?.id === route.id}
                onClick={() => handleSelectRoute(route)}
              >
                <CardTopRow>
                  <RouteBadge $color={route.color}>
                    {route.name?.split(' ')[1] || route.name || '237'}
                  </RouteBadge>
                  <EtaBox>
                    <EtaVal>{(idx + 1) * 4} min</EtaVal>
                    <EtaLbl>ETA</EtaLbl>
                  </EtaBox>
                </CardTopRow>
                <RouteName>{route.name}</RouteName>
                <SaccoText>🚌 {route.sacco || 'Thika Rd SACCO'}</SaccoText>
              </LiveCard>
            ))}
          </LiveCarousel>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle style={{ marginBottom: '12px' }}>Nearby Routes</SectionTitle>
          <RouteList>
            {routes.map((route) => (
              <RouteListItem
                key={route.id}
                $selected={selectedRoute?.id === route.id}
                onClick={() => handleSelectRoute(route)}
              >
                <ListItemLeft>
                  <ListRouteBox $color={route.color}>
                    {route.name?.split(' ')[1] || route.name?.slice(0, 3)}
                  </ListRouteBox>
                  <div>
                    <RouteName style={{ marginBottom: 0 }}>{route.name}</RouteName>
                    <SaccoText>{route.sacco || 'Corridor Matatu'}</SaccoText>
                  </div>
                </ListItemLeft>
                <FilterChip $active={selectedRoute?.id === route.id}>
                  {selectedRoute?.id === route.id ? 'SELECTED' : 'VIEW'}
                </FilterChip>
              </RouteListItem>
            ))}
          </RouteList>
        </SectionContainer>
      </MainContent>

      <ReportFAB onClick={() => setIsReportOpen(true)} />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        routes={routes}
        stages={stages}
      />

      <BottomNav>
        <NavItem $active={activeTab === 'nearby'} onClick={() => setActiveTab('nearby')}>
          🚌 Nearby
        </NavItem>
        <NavItem $active={activeTab === 'saved'} onClick={() => setActiveTab('saved')}>
          🔖 Saved
        </NavItem>
        <NavItem $active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')}>
          ⚠️ Alerts
        </NavItem>
        <NavItem $active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
          ⚙️ Settings
        </NavItem>
      </BottomNav>
    </PageContainer>
  );
}
