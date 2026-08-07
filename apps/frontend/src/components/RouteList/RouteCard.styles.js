import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.surfaceContainerHigh
      : theme.mode === 'dark'
      ? theme.colors.surfaceContainer
      : theme.colors.surfaceContainerLow};
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.primary : theme.colors.outlineVariant};
  border-radius: 20px;
  padding: 14px 16px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CardMainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RouteBadge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;

export const RouteMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RouteTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0 0 2px 0;
`;

export const RouteSubtitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
`;

export const EtaBadge = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
  padding: 4px 10px;
  border-radius: 9999px;
`;

export const CardFooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px dashed ${({ theme }) => theme.colors.outlineVariant};
`;

export const TagsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const FareTag = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
  background-color: ${({ theme }) => theme.colors.surfaceContainerHigh};
  padding: 3px 8px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
`;

export const VibeBadge = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ $vibe }) => ($vibe === 'nganya' ? '#14140F' : '#FAF8F2')};
  background-color: ${({ $vibe, theme }) =>
    $vibe === 'nganya' ? theme.colors.matatuYellow : '#5C6068'};
  padding: 3px 8px;
  border-radius: 9999px;
`;

export const CrowdGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CrowdDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $level }) =>
    $level === 'low' ? '#7DA82E' : $level === 'medium' ? '#E8722C' : '#BA1A1A'};
`;

export const SaveButton = styled.button`
  background: none;
  border: none;
  color: ${({ $isSaved, theme }) =>
    $isSaved ? theme.colors.signalRed : theme.colors.onSurfaceVariant};
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export const SkeletonCard = styled.div`
  height: 90px;
  border-radius: 20px;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surfaceContainerHigh : '#EAE8E2'};
  animation: ${pulse} 1.2s infinite ease-in-out;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const EmptyStateTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 700;
  margin: 8px 0 4px 0;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const EmptyStateText = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  margin: 0;
`;
