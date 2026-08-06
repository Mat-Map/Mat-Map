'use client';

import React from 'react';
import styled from 'styled-components';

const FabButton = styled.button`
  position: fixed;
  bottom: 84px;
  right: ${({ theme }) => theme.spacing.containerMargin || '16px'};
  z-index: ${({ theme }) => theme.zIndex?.floatingControls || 40};
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  border: none;
  border-radius: 9999px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.priority};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.92);
  }
`;

export default function ReportFAB({ onClick }) {
  return (
    <FabButton onClick={onClick} data-testid="report-fab">
      <span>📢</span>
      <span>REPORT</span>
    </FabButton>
  );
}
