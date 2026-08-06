import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surface : theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 24px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.priority};
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RouteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const RouteBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
`;

export const SaccoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RouteName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0 0 2px 0;
`;

export const SaccoName = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const FareEtaBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const StatLabel = styled.span`
  background-color: ${({ theme }) => theme.colors.surfaceContainerHigh};
  color: ${({ theme }) => theme.colors.onSurface};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
`;

export const WarningCallout = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(232, 114, 44, 0.15)' : '#fff8ed'};
  border: 1px solid ${({ theme }) => theme.colors.alertOrange};
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const WarningTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.alertOrange};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const WarningBody = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

export const HighlightButton = styled.button`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s ease, background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.inkBlack};
    color: ${({ theme }) => theme.colors.matatuYellow};
  }

  &:active {
    transform: scale(0.95);
  }
`;
