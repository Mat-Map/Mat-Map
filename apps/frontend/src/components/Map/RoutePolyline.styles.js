import styled from 'styled-components';

export const PolylineLabel = styled.span`
  background-color: ${({ $color }) => $color || '#78776f'};
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 12px;
  padding: 2px 6px;
  border: 1px solid ${({ theme }) => theme.colors.inkBlack};
  display: inline-block;
`;
