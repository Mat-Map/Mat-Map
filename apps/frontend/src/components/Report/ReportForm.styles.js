import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const FieldSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 9999px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.matatuYellow};
  }
`;

export const ChipsRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FareChipButton = styled.button.attrs({ type: 'button' })`
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 9999px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : theme.colors.surfaceContainerHigh};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.inkBlack : theme.colors.onSurface};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
`;

export const CustomFareInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface};
  outline: none;
  margin-top: 4px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.matatuYellow};
  }
`;

export const SegmentedCrowdContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surfaceContainerHighest};
  border-radius: 9999px;
  padding: 4px;
  display: flex;
  align-items: center;
`;

export const CrowdIndicatorBg = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: calc(33.333% - 3px);
  background-color: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border-radius: 9999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $index }) => `translateX(${$index * 100}%)`};
`;

export const CrowdSegmentButton = styled.button.attrs({ type: 'button' })`
  flex: 1;
  position: relative;
  z-index: 1;
  padding: 8px 0;
  border-radius: 9999px;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  font-weight: 700;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.onSurface : theme.colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
`;

export const CrowdDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

export const VibeCardsRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const VibeRadioCard = styled.button.attrs({ type: 'button' })`
  flex: 1;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.matatuYellow : theme.colors.outlineVariant)};
  background-color: ${({ $active, theme }) =>
    $active ? 'rgba(242, 183, 5, 0.15)' : theme.colors.surfaceContainerHigh};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.onSurface : theme.colors.onSurfaceVariant};
  transition: all 0.15s ease;

  &:active {
    transform: scale(0.96);
  }
`;

export const VibeIcon = styled.span`
  font-size: 28px;
`;

export const VibeCardLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  font-weight: 700;
`;

export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  width: 100%;
  padding: 14px 20px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  border: none;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.priority};
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
