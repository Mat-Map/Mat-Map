import React, { useState } from 'react';
import { useThemeToggle } from '@/app/providers';
import {
  SettingsContainer,
  SettingsHeaderBanner,
  SettingsGroup,
  SettingsGroupTitle,
  SettingRow,
  SettingLabelGroup,
  SettingTitle,
  SettingSubtitle,
  ToggleSwitch,
  ToggleKnob,
  StatusBadge,
  AppInfoFooter,
  AppVersionText,
  AppCreditText,
} from './SettingsView.styles';

export default function SettingsView() {
  const { themeMode, toggleTheme } = useThemeToggle();
  const [offlineDemoMode, setOfflineDemoMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  const isDarkMode = themeMode === 'dark';

  return (
    <SettingsContainer data-testid="settings-view">
      <SettingsHeaderBanner>
        <div>
          ⚙️ <strong>App Preferences</strong>
        </div>
        <StatusBadge>OFFLINE DEMO MODE</StatusBadge>
      </SettingsHeaderBanner>

      <SettingsGroup>
        <SettingsGroupTitle>Appearance</SettingsGroupTitle>
        <SettingRow>
          <SettingLabelGroup>
            <SettingTitle>Dark Mode Theme</SettingTitle>
            <SettingSubtitle>
              Switch between Light Mode and High-Contrast Dark Mode
            </SettingSubtitle>
          </SettingLabelGroup>
          <ToggleSwitch
            $active={isDarkMode}
            onClick={toggleTheme}
            data-testid="settings-theme-toggle"
            title="Toggle theme mode"
          >
            <ToggleKnob $active={isDarkMode}>
              {isDarkMode ? '🌙' : '☀️'}
            </ToggleKnob>
          </ToggleSwitch>
        </SettingRow>
      </SettingsGroup>

      <SettingsGroup>
        <SettingsGroupTitle>Data & Telemetry</SettingsGroupTitle>
        <SettingRow>
          <SettingLabelGroup>
            <SettingTitle>Local Mock Data Mode</SettingTitle>
            <SettingSubtitle>
              Locked ON for zero-backend standalone PWA demo
            </SettingSubtitle>
          </SettingLabelGroup>
          <ToggleSwitch
            $active={offlineDemoMode}
            onClick={() => setOfflineDemoMode((prev) => !prev)}
            data-testid="settings-mock-data-toggle"
            title="Offline Mock Data Mode"
          >
            <ToggleKnob $active={offlineDemoMode}>
              {offlineDemoMode ? '⚡' : '🌐'}
            </ToggleKnob>
          </ToggleSwitch>
        </SettingRow>

        <SettingRow>
          <SettingLabelGroup>
            <SettingTitle>Audio Feedback</SettingTitle>
            <SettingSubtitle>
              Play subtle chime when selecting routes & stages
            </SettingSubtitle>
          </SettingLabelGroup>
          <ToggleSwitch
            $active={soundEffects}
            onClick={() => setSoundEffects((prev) => !prev)}
            data-testid="settings-sound-toggle"
            title="Audio feedback toggle"
          >
            <ToggleKnob $active={soundEffects}>
              {soundEffects ? '🔊' : '🔇'}
            </ToggleKnob>
          </ToggleSwitch>
        </SettingRow>
      </SettingsGroup>

      <AppInfoFooter>
        <AppVersionText>MATMAP PWA v1.2.0 (Offline Build)</AppVersionText>
        <AppCreditText>
          Built with ❤️ for Nairobi Transit Riders & Nganya Enthusiasts
        </AppCreditText>
      </AppInfoFooter>
    </SettingsContainer>
  );
}
