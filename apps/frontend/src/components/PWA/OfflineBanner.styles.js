import styled from 'styled-components';

export const BannerWrapper = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  z-index: 45;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  border-bottom: 2px solid ${({ theme }) => theme.colors.inkBlack};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const BannerText = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;
