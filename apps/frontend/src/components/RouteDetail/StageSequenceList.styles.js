import styled from 'styled-components';

export const ManifestSection = styled.section`
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: ${({ theme }) => theme.borders.card};
  position: relative;
  overflow: hidden;
`;

export const ManifestHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.inkBlack};
  color: ${({ theme }) => theme.colors.matatuYellow};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const FilterWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: ${({ theme }) => theme.borders.divider};
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: 1px solid ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface};

  &:focus {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
    color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const ListContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const StopRow = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    padding-bottom: 0;
  }
`;

export const StopLine = styled.div`
  position: absolute;
  left: 11px;
  top: 24px;
  bottom: -24px;
  width: 4px;
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  z-index: 0;
`;

export const StopDot = styled.div`
  position: relative;
  z-index: 1;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ $active, $isStart, $isEnd, theme }) =>
    $active
      ? theme.colors.matatuYellow
      : $isStart || $isEnd
      ? theme.colors.inkBlack
      : theme.colors.paperWhite};
  border: 2px solid ${({ $color, theme }) => $color || theme.colors.inkBlack};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ $color, theme }) => $color || theme.colors.inkBlack};
  border-radius: 50%;
`;

export const StopContent = styled.div`
  flex: 1;
  margin-top: -4px;
  padding: ${({ $active, theme }) => ($active ? theme.spacing.sm : '0')};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : 'transparent'};
  border: ${({ $active, theme }) => ($active ? theme.borders.card : 'none')};
  cursor: pointer;
`;

export const StopHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StopName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
`;

export const StopTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 14px;
  font-weight: 600;
`;

export const StopMetaRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: space-between;
`;

export const StopMetaLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const FareTag = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkBlack};
`;

export const TicketFooter = styled.div`
  border-top: 4px dashed ${({ theme }) => theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
`;

export const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TicketLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const TicketValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 13px;
`;
