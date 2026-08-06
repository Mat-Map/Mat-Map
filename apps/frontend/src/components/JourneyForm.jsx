import React from 'react';
import {
  SearchWrapper,
  FloatingPillCard,
  LocationDotColumn,
  DotOrigin,
  DotConnector,
  DotDestination,
  InputFieldsColumn,
  SingleInput,
  InputDivider,
  SearchActionButton,
  VibeRow,
  SegmentedVibeContainer,
  ActiveIndicatorPill,
  VibeOptionButton,
} from './JourneyForm.styles';

export default function JourneyForm({
  origin = 'Current Location',
  destination = '',
  onOriginChange,
  onDestinationChange,
  vibe = 'nganya',
  onVibeChange,
  onSubmit,
  className,
  'data-testid': testId = 'journey-form',
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ origin, destination, vibe });
  };

  return (
    <SearchWrapper className={className} data-testid={testId}>
      <FloatingPillCard as="form" onSubmit={handleFormSubmit}>
        <LocationDotColumn>
          <DotOrigin />
          <DotConnector />
          <DotDestination />
        </LocationDotColumn>

        <InputFieldsColumn>
          <SingleInput
            type="text"
            placeholder="From (e.g. Current Location)"
            value={origin}
            onChange={(e) => onOriginChange && onOriginChange(e.target.value)}
            data-testid="search-origin-input"
          />
          <InputDivider />
          <SingleInput
            className="destination"
            type="text"
            placeholder="Where to? (e.g. Kasarani, Juja)"
            value={destination}
            onChange={(e) => onDestinationChange && onDestinationChange(e.target.value)}
            data-testid="search-destination-input"
          />
        </InputFieldsColumn>

        <SearchActionButton type="submit" data-testid="search-submit-btn" aria-label="Search routes">
          🔍
        </SearchActionButton>
      </FloatingPillCard>

      <VibeRow>
        <SegmentedVibeContainer data-testid="vibe-toggle-container">
          <ActiveIndicatorPill $activeVibe={vibe} />
          <VibeOptionButton
            type="button"
            $selected={vibe === 'nganya'}
            onClick={() => onVibeChange && onVibeChange('nganya')}
            data-testid="vibe-option-nganya"
          >
            <span>🔊</span>
            Nganya
          </VibeOptionButton>
          <VibeOptionButton
            type="button"
            $selected={vibe === 'quiet'}
            onClick={() => onVibeChange && onVibeChange('quiet')}
            data-testid="vibe-option-quiet"
          >
            <span>🔇</span>
            Quiet
          </VibeOptionButton>
        </SegmentedVibeContainer>
      </VibeRow>
    </SearchWrapper>
  );
}
