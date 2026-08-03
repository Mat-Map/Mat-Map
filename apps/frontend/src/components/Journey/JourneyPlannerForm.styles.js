import styled from 'styled-components';

export const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid ${({ theme }) => theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const InputSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  border: ${({ theme }) => theme.borders.card};
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
    color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const FieldSelect = styled.select`
  width: 100%;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onSurface};

  &:focus {
    outline: none;
  }
`;

export const SwapButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  color: ${({ theme }) => theme.colors.matatuYellow};
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.borders.card};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const RecentChipsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const RecentChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RecentChip = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: ${({ theme }) => theme.borders.card};
  padding: 4px 10px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
    color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  border: ${({ theme }) => theme.borders.card};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 22px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.inkBlack};
    color: ${({ theme }) => theme.colors.matatuYellow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
