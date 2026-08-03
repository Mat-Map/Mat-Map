'use client';

import React, { use } from 'react';
import styled from 'styled-components';
import { useThemeToggle } from '../../providers';
import { useRouteDetail } from '@/hooks/useRouteDetail';
import RouteDetailView from '@/components/RouteDetail/RouteDetailView';

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
  padding-top: 80px;
`;

const LoadingBox = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  color: ${({ theme }) => theme.colors.onBackground};
`;

const ErrorBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: 2px solid ${({ theme }) => theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  color: ${({ theme }) => theme.colors.onBackground};
`;

export default function RouteDetailPage({ params }) {
  const resolvedParams = use(params);
  const routeId = resolvedParams?.id;

  const { themeMode, toggleTheme } = useThemeToggle();
  const { route, loading, error } = useRouteDetail(routeId);

  return (
    <PageContainer>
      <TopAppBar>
        <BrandTitle>MATMAP</BrandTitle>
        <ThemeToggleButton onClick={toggleTheme}>
          {themeMode.toUpperCase()} MODE
        </ThemeToggleButton>
      </TopAppBar>

      <MainContent>
        {loading && <LoadingBox>LOADING ROUTE MANIFEST...</LoadingBox>}

        {error && (
          <ErrorBox>
            ⚠️ Failed to load route details ({error.message || 'Route not found'}).
          </ErrorBox>
        )}

        {!loading && !error && route && <RouteDetailView route={route} />}
      </MainContent>
    </PageContainer>
  );
}
