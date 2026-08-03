import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid
    ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const RouteBadge = styled.span`
  display: inline-block;
  background-color: ${({ $color }) => $color || '#008080'};
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 20px;
  padding: 2px 8px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.inkBlack};
`;

export const RouteTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.onBackground};
  text-transform: uppercase;
  margin: 0;
`;

export const OperatorBlock = styled.div`
  text-align: right;
`;

export const OperatorLabel = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin: 0;
`;

export const OperatorValue = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  border-top: ${({ theme }) => theme.borders.divider};
  padding-top: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onSurface};
`;
