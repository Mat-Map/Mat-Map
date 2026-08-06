import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(20, 20, 15, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: ${({ theme }) => theme.zIndex?.modal || 60};
  transition: opacity 0.3s ease;
`;

export const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 540px;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surface : theme.colors.surfaceContainerLowest};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: ${({ theme }) => theme.shadows.bottomSheet};
  z-index: ${({ theme }) => (theme.zIndex?.modal || 60) + 10};
  padding: 16px 20px 32px 20px;
  max-height: 85vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DragHandle = styled.div`
  width: 48px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.outlineVariant};
  margin: 0 auto 16px auto;
  border-radius: 9999px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

export const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surfaceContainerHigh};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.9);
  }
`;

export const SuccessCard = styled.div`
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  padding: 24px;
  text-align: center;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadows.priority};
`;

export const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

export const SuccessBody = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  margin: 0;
`;
