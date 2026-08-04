import styled, { keyframes } from 'styled-components';

export const MapContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  overflow: hidden;
`;

export const MapCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

export const LocateButton = styled.button`
  position: absolute;
  bottom: 140px;
  right: ${({ theme }) => theme.spacing.containerMargin || '16px'};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surface : theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  color: ${({ theme }) => theme.colors.onSurface};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex?.floatingControls || 40};
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.92);
  }
`;

export const MapOverlayBadge = styled.div`
  position: absolute;
  bottom: 140px;
  left: ${({ theme }) => theme.spacing.containerMargin || '16px'};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(28, 28, 23, 0.85)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(8px);
  color: ${({ theme }) => theme.colors.onSurface};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  z-index: ${({ theme }) => theme.zIndex?.mapOverlay || 10};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0.92); opacity: 1; }
  50% { transform: scale(1.12); opacity: 0.85; }
  100% { transform: scale(0.92); opacity: 1; }
`;

export const VehiclePulse = styled.div`
  position: absolute;
  z-index: 12;
  animation: ${pulseAnimation} 2.5s infinite ease-in-out;
  cursor: pointer;
`;

export const VehicleBadge = styled.div`
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 13px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VehicleDot = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  border: 3px solid #ffffff;
  border-radius: 50%;
  margin: -4px auto 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;
