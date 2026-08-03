'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onBackground};
  padding: ${({ theme }) => theme.spacing.md};
`;

const SpinnerBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 24px;
  padding: 12px 24px;
  border: ${({ theme }) => theme.borders.card};
  animation: ${pulse} 1.5s infinite ease-in-out;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export default function Loading() {
  return (
    <Container>
      <SpinnerBadge>MATMAP</SpinnerBadge>
      <LoadingText>LOADING CORRIDOR DATA...</LoadingText>
    </Container>
  );
}
