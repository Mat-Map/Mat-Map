import styled from 'styled-components';

export const FormContainer = styled.form`
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

export const FieldSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: ${({ theme }) => theme.borders.card};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.onSurface};

  &:focus {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
    color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const OptionButton = styled.button.attrs({ type: 'button' })`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid
    ${({ $color, theme }) => $color || theme.colors.matatuYellow};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : theme.colors.surface};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.inkBlack : theme.colors.onSurface};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:active {
    transform: scale(0.98);
  }
`;

export const OptionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 18px;
  text-transform: uppercase;
  margin: 0;
`;

export const OptionSub = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  margin: 0;
  opacity: 0.8;
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
`;
