'use client';

import React from 'react';
import styled from 'styled-components';

const FabButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: ${({ theme }) => theme.spacing.md};
  z-index: 40;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  border: ${({ theme }) => theme.borders.card};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 18px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

  &:active {
    transform: scale(0.95);
    background-color: ${({ theme }) => theme.colors.inkBlack};
    color: ${({ theme }) => theme.colors.matatuYellow};
  }
`;

export default function ReportFAB({ onClick }) {
  return (
    <FabButton onClick={onClick}>
      <span>📢</span>
      <span>REPORT</span>
    </FabButton>
  );
}
