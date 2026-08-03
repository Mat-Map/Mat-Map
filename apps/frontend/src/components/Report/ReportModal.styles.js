import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(28, 28, 23, 0.6);
  z-index: 60;
`;

export const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 4px solid ${({ theme }) => theme.colors.inkBlack};
  z-index: 70;
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  max-height: 85vh;
  overflow-y: auto;
`;

export const DragHandle = styled.div`
  width: 48px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.outlineVariant};
  margin: 0 auto ${({ theme }) => theme.spacing.md} auto;
  border-radius: 3px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 26px;
  color: ${({ theme }) => theme.colors.onBackground};
  text-transform: uppercase;
  margin: 0;
`;

export const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border: ${({ theme }) => theme.borders.card};
  color: ${({ theme }) => theme.colors.inkBlack};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 16px;
  padding: 4px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
  }
`;

export const SuccessCard = styled.div`
  border: ${({ theme }) => theme.borders.card};
  border-left: ${({ theme }) => theme.spacing.liveryStripe} solid ${({ theme }) => theme.colors.inkBlack};
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 24px;
  margin: 0 0 8px 0;
  text-transform: uppercase;
`;

export const SuccessBody = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 16px;
  margin: 0;
`;
