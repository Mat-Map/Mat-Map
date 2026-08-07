import React from 'react';
import { mockAlerts } from '@/mock/mockData';
import {
  AlertsContainer,
  AlertsHeaderBanner,
  AlertCard,
  AlertHeaderRow,
  AlertTitleGroup,
  AlertIcon,
  AlertTitle,
  SeverityTag,
  AlertDescription,
  AlertFooterRow,
  AffectedRouteTag,
  TimestampText,
} from './AlertsView.styles';

const getAlertIcon = (type) => {
  switch (type) {
    case 'route_change':
      return '🚨';
    case 'delay':
      return '⚠️';
    case 'crowd_spike':
      return '👥';
    default:
      return '📢';
  }
};

export default function AlertsView({ alerts = mockAlerts }) {
  return (
    <AlertsContainer data-testid="alerts-view">
      <AlertsHeaderBanner>
        <div>
          ⚠️ <strong>Live Traffic & Safety Alerts</strong>
        </div>
        <span>{alerts.length} Active Alerts</span>
      </AlertsHeaderBanner>

      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          $severity={alert.severity}
          data-testid={`alert-card-${alert.id}`}
        >
          <AlertHeaderRow>
            <AlertTitleGroup>
              <AlertIcon>{getAlertIcon(alert.type)}</AlertIcon>
              <AlertTitle>{alert.title}</AlertTitle>
            </AlertTitleGroup>
            <SeverityTag $severity={alert.severity}>
              {alert.severity}
            </SeverityTag>
          </AlertHeaderRow>

          <AlertDescription>{alert.description}</AlertDescription>

          <AlertFooterRow>
            <AffectedRouteTag>📍 {alert.affectedRoute}</AffectedRouteTag>
            <TimestampText>🕒 {alert.timestamp}</TimestampText>
          </AlertFooterRow>
        </AlertCard>
      ))}
    </AlertsContainer>
  );
}
