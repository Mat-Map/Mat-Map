import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.unit || '8px'};
  z-index: ${({ theme }) => theme.zIndex?.floatingControls || 40};
  pointer-events: none;
`;

export const FloatingPillCard = styled.div`
  pointer-events: auto;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(28, 28, 23, 0.92)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 6px 12px 6px 16px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.gutter || '12px'};
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:focus-within {
    box-shadow: ${({ theme }) => theme.shadows.priority};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LocationDotColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  justify-content: center;
  padding: 4px 0;
`;

export const DotOrigin = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
`;

export const DotConnector = styled.div`
  width: 2px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.outlineVariant};
  opacity: 0.6;
`;

export const DotDestination = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.matatuYellow};
`;

export const InputFieldsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  padding-right: 12px;
  gap: 2px;
`;

export const SingleInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  padding: 2px 0;
  height: 24px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurface};

  &::placeholder {
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    font-weight: 400;
  }

  &.destination {
    font-weight: 600;
    font-size: 14px;
  }
`;

export const InputDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outlineVariant};
  opacity: 0.4;
  width: 100%;
`;

export const SearchActionButton = styled.button`
  pointer-events: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  transition: transform 0.15s ease, background-color 0.15s ease;

  &:active {
    transform: scale(0.92);
  }
`;

export const VibeRow = styled.div`
  pointer-events: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

export const SegmentedVibeContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(28, 28, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  border-radius: 9999px;
  padding: 4px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const ActiveIndicatorPill = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  border-radius: 9999px;
  z-index: 0;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $activeVibe }) =>
    $activeVibe === 'quiet' ? 'translateX(100%)' : 'translateX(0%)'};
`;

export const VibeOptionButton = styled.button`
  position: relative;
  z-index: 1;
  min-width: 80px;
  height: 32px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.inkBlack : theme.colors.onSurfaceVariant};
  transition: color 0.2s ease;
`;
