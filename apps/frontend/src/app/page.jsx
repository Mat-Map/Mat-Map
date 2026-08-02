'use client';

import React from 'react';
import styled from 'styled-components';
import { useThemeToggle } from './providers';

const ShellContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onBackground};
`;

const TopNav = styled.header`
  height: ${({ theme }) => theme.spacing.navbarHeight};
  background-color: ${({ theme }) => theme.colors.inkBlack};
  border-bottom: 4px solid ${({ theme }) => theme.colors.matatuYellow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const BrandTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.matatuYellow};
  letter-spacing: 0.05em;
  margin: 0;
`;

const ModeToggleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border: 2px solid ${({ theme }) => theme.colors.inkBlack};
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const CardShell = styled.div`
  max-width: ${({ theme }) => theme.spacing.containerMax};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.card};
  border-radius: ${({ theme }) => theme.radii.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid ${({ theme }) => theme.colors.matatuYellow};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.colors.glow || 'none'};
`;

const CardHeader = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 32px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.onSurface};
`;

const CardSubtext = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatusTag = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  color: ${({ theme }) => theme.colors.matatuYellow};
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.matatuYellow};
`;

export default function Home() {
  const { themeMode, toggleTheme } = useThemeToggle();

  return (
    <ShellContainer>
      <TopNav>
        <BrandTitle>MATMAP</BrandTitle>
        <ModeToggleButton onClick={toggleTheme}>
          Theme: {themeMode.toUpperCase()}
        </ModeToggleButton>
      </TopNav>

      <ContentArea>
        <CardShell>
          <CardHeader>APP SHELL INITIALIZED</CardHeader>
          <CardSubtext>
            Nairobi Thika Road Corridor (CBD ↔ Juja) Transit Intelligence Platform
          </CardSubtext>
          <StatusTag>THEME ENGINE ACTIVE: {themeMode.toUpperCase()} MODE</StatusTag>
        </CardShell>
      </ContentArea>
    </ShellContainer>
  );
}
