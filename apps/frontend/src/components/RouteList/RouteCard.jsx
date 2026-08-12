import React from 'react';
import {
  CardWrapper,
  CardMainRow,
  CardLeft,
  RouteBadge,
  RouteMeta,
  RouteTitle,
  RouteSubtitle,
  CardRight,
  EtaBadge,
  CardFooterRow,
  TagsGroup,
  FareTag,
  VibeBadge,
  LiveBadge,
  LivePulseDot,
  CrowdGroup,
  CrowdDot,
  SaveButton,
} from './RouteCard.styles';

export default function RouteCard({
  route,
  isSelected,
  onSelect,
  onToggleSave,
  isLive = false,
  liveVehicle = null,
  liveEtaDisplay = null,
}) {
  if (!route) return null;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(route.id);
    }
  };

  const routeNumber =
    route.name?.split(' ')[0] || route.id?.replace('route-', '') || '237';

  return (
    <CardWrapper
      $selected={isSelected}
      onClick={() => onSelect && onSelect(route)}
      data-testid={`route-card-${route.id}`}
    >
      <CardMainRow>
        <CardLeft>
          <RouteBadge $color={route.color}>{routeNumber}</RouteBadge>
          <RouteMeta>
            <RouteTitle>{route.name}</RouteTitle>
            <RouteSubtitle>
              🚌 {liveVehicle?.registration ? `${liveVehicle.registration} (${liveVehicle.name})` : route.sacco || 'Express Matatu'}
            </RouteSubtitle>
          </RouteMeta>
        </CardLeft>

        <CardRight>
          <EtaBadge style={isLive ? { border: '1px solid #7DA82E', color: '#7DA82E' } : {}}>
            {liveEtaDisplay || `${route.etaMinutes || 10} min`}
          </EtaBadge>
          <SaveButton
            $isSaved={route.isSaved}
            onClick={handleSaveClick}
            title={route.isSaved ? 'Remove from saved' : 'Save route'}
            data-testid={`save-btn-${route.id}`}
          >
            {route.isSaved ? '❤️' : '🤍'}
          </SaveButton>
        </CardRight>
      </CardMainRow>

      <CardFooterRow>
        <TagsGroup>
          {isLive && (
            <LiveBadge data-testid="live-now-badge">
              <LivePulseDot /> LIVE NOW
            </LiveBadge>
          )}
          <FareTag>{route.fareRange || 'KES 50 - 100'}</FareTag>
          <VibeBadge $vibe={route.vibeTag || 'nganya'}>
            {route.vibeTag === 'nganya' ? '🔥 Nganya' : '🎧 Quiet'}
          </VibeBadge>
        </TagsGroup>

        <CrowdGroup title="Stage Crowd Levels">
          <CrowdDot $level={route.crowdLevelPerStage?.['stage-cbd'] || 'low'} />
          <CrowdDot $level={route.crowdLevelPerStage?.['stage-ngara'] || 'medium'} />
          <CrowdDot $level={route.crowdLevelPerStage?.['stage-thika-rd'] || 'high'} />
        </CrowdGroup>
      </CardFooterRow>
    </CardWrapper>
  );
}

