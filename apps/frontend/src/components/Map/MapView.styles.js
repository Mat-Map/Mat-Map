import styled, { keyframes } from 'styled-components';

export const MapContainer = styled.section`
  position: relative;
  width: 100%;
  height: 45vh;
  min-height: 320px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border-bottom: ${({ theme }) => theme.borders.card};
  overflow: hidden;
`;

export const MapCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

export const LocateButton = styled.button`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  border: ${({ theme }) => theme.borders.card};
  color: ${({ theme }) => theme.colors.inkBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:active {
    transform: scale(0.95);
  }
`;

export const MapOverlayBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.inkBlack};
  color: ${({ theme }) => theme.colors.matatuYellow};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.matatuYellow};
  z-index: 10;
  text-transform: uppercase;
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0.9); opacity: 1; }
  70% { transform: scale(1.3); opacity: 0.5; }
  100% { transform: scale(0.9); opacity: 1; }
`;

export const VehiclePulse = styled.div`
  position: absolute;
  z-index: 12;
  animation: ${pulseAnimation} 2s infinite;
  cursor: pointer;
`;

export const VehicleBadge = styled.div`
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 14px;
  padding: 2px 6px;
  border: 2px solid ${({ theme }) => theme.colors.inkBlack};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VehicleDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  border: 2px solid #ffffff;
  border-radius: 50%;
  margin: -4px auto 0 auto;
`;
