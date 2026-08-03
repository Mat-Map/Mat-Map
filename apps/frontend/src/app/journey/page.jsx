'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useThemeToggle } from '../providers';
import { useStages } from '@/hooks/useStages';
import { useRoutes } from '@/hooks/useRoutes';
import { useJourney } from '@/hooks/useJourney';
import JourneyPlannerForm from '@/components/Journey/JourneyPlannerForm';
import JourneyResultCard from '@/components/Journey/JourneyResultCard';
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
  max-width: 600px;
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
`;

const PageHeader = styled.section`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.onBackground};
  text-transform: uppercase;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-top: 4px;
`;

const ResultsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SectionLabel = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.onBackground};
  text-transform: uppercase;
  margin: 0;
`;

const ErrorBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: 2px solid ${({ theme }) => theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  color: ${({ theme }) => theme.colors.onBackground};
`;

export default function JourneyPage() {
  const { themeMode, toggleTheme } = useThemeToggle();
  const { stages } = useStages();
  const { routes } = useRoutes();
  const { journey, loading, error, fetchJourney } = useJourney();

  const [highlightedRoute, setHighlightedRoute] = useState(null);

  const handlePlanJourney = (fromUuid, toUuid) => {
    fetchJourney(fromUuid, toUuid);
  };

  const handleHighlightRoute = (route) => {
    setHighlightedRoute(route);
  };

  return (
    <PageContainer>
      <TopAppBar>
        <BrandTitle>MATMAP</BrandTitle>
        <ThemeToggleButton onClick={toggleTheme}>
          {themeMode.toUpperCase()} MODE
        </ThemeToggleButton>
      </TopAppBar>

      <MainContent>
        <PageHeader>
          <Title>Find Your Route</Title>
          <Subtitle>NAIROBI TRANSIT MANIFEST v2.0</Subtitle>
        </PageHeader>

        <JourneyPlannerForm
          stages={stages}
          onSubmit={handlePlanJourney}
          loading={loading}
        />

        {error && (
          <ErrorBox style={{ marginTop: '16px' }}>
            ⚠️ {error.message || 'Failed to calculate journey options.'}
          </ErrorBox>
        )}

        {journey && journey.options && (
          <ResultsSection>
            <SectionLabel>MANIFTEST ROUTE OPTIONS</SectionLabel>
            {journey.options.map((opt, idx) => (
              <JourneyResultCard
                key={idx}
                option={opt}
                onHighlightRoute={handleHighlightRoute}
              />
            ))}
          </ResultsSection>
        )}

        <div style={{ marginTop: '24px' }}>
          <SectionLabel style={{ marginBottom: '12px' }}>CORRIDOR MAP VIEW</SectionLabel>
          <MapView
            stages={stages}
            routes={routes}
            selectedRouteId={highlightedRoute?.id}
            onSelectRoute={handleHighlightRoute}
          />
        </div>
      </MainContent>
    </PageContainer>
  );
}
