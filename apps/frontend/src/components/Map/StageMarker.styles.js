import styled from 'styled-components';

export const MarkerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transform: translate(-50%, -100%);
`;

export const PinBubble = styled.div`
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.matatuYellow : theme.colors.inkBlack};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.inkBlack : theme.colors.paperWhite};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 11px;
  font-weight: 700;
  padding: 3px 6px;
  border: 2px solid ${({ theme }) => theme.colors.inkBlack};
  border-radius: ${({ theme }) => theme.radii.chip};
  white-space: nowrap;
  box-shadow: ${({ $selected, theme }) => ($selected ? theme.colors.glow : 'none')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.matatuYellow};
    color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const PinStem = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid ${({ theme }) => theme.colors.inkBlack};
  margin-top: -1px;
`;
