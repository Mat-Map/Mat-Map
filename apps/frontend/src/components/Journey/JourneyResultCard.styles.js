import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid
    ${({ $color, $warning, theme }) =>
      $warning ? theme.colors.matatuYellow : $color || theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const RouteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RouteBox = styled.div`
  background-color: ${({ $color }) => $color || '#14140F'};
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 24px;
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.inkBlack};
`;

export const SaccoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RouteName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

export const SaccoName = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const FareEtaBlock = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  border-top: ${({ theme }) => theme.borders.divider};
  border-bottom: ${({ theme }) => theme.borders.divider};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const StatItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const WarningCallout = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: 2px solid ${({ theme }) => theme.colors.matatuYellow};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const WarningTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.inkBlack};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const WarningBody = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

export const HighlightButton = styled.button`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border: ${({ theme }) => theme.borders.card};
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ theme }) => theme.colors.inkBlack};
    color: ${({ theme }) => theme.colors.matatuYellow};
  }
`;
