import styled from 'styled-components';

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-bottom: 24px;
  max-height: 50vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SettingsHeaderBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 14px;
  padding: 8px 12px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const SettingsGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surfaceContainer : theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 20px;
  padding: 16px;
  gap: 16px;
  box-shadow: ${({ theme }) => theme.shadows.ambient};
`;

export const SettingsGroupTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin: 0;
`;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const SettingLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SettingTitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const SettingSubtitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

export const ToggleSwitch = styled.button`
  position: relative;
  width: 52px;
  height: 28px;
  border-radius: 9999px;
  border: none;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.matatuYellow : theme.colors.outlineVariant};
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 2px;
`;

export const ToggleKnob = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  color: #faf8f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  transform: ${({ $active }) => ($active ? 'translateX(24px)' : 'translateX(0)')};
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const StatusBadge = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.matatuYellow};
  color: ${({ theme }) => theme.colors.inkBlack};
  padding: 3px 8px;
  border-radius: 9999px;
`;

export const AppInfoFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  text-align: center;
  gap: 4px;
`;

export const AppVersionText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const AppCreditText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;
