import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

export const AlertsContainer = styled.div`
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

export const AlertsHeaderBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(232, 114, 44, 0.12)' : 'rgba(232, 114, 44, 0.08)'};
  border: 1px solid ${({ theme }) => theme.colors.alertOrange};
  border-radius: 14px;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const AlertCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surfaceContainer : theme.colors.surfaceContainerLow};
  border-left: 4px solid
    ${({ $severity, theme }) =>
      $severity === 'high'
        ? theme.colors.signalRed
        : $severity === 'medium'
        ? theme.colors.alertOrange
        : theme.colors.matatuYellow};
  border-top: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-right: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
`;

export const AlertHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AlertTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AlertIcon = styled.span`
  font-size: 18px;
`;

export const AlertTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

export const SeverityTag = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 9999px;
  color: #faf8f2;
  background-color: ${({ $severity, theme }) =>
    $severity === 'high'
      ? theme.colors.signalRed
      : $severity === 'medium'
      ? theme.colors.alertOrange
      : theme.colors.matatuYellow};
  color: ${({ $severity, theme }) =>
    $severity === 'low' ? theme.colors.inkBlack : '#FAF8F2'};
`;

export const AlertDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin: 0;
  line-height: 1.4;
`;

export const AlertFooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  border-top: 1px dashed ${({ theme }) => theme.colors.outlineVariant};
`;

export const AffectedRouteTag = styled.span`
  background-color: ${({ theme }) => theme.colors.surfaceContainerHigh};
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const TimestampText = styled.span`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.signalRed};
  box-shadow: 0 0 6px ${({ theme }) => theme.colors.signalRed};
  animation: ${pulseGlow} 1.5s infinite ease-in-out;
`;
