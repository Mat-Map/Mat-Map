'use client';

import React, { useState } from 'react';
import {
  FormContainer,
  FieldGroup,
  FieldLabel,
  FieldSelect,
  ChipsRow,
  FareChipButton,
  CustomFareInput,
  SegmentedCrowdContainer,
  CrowdIndicatorBg,
  CrowdSegmentButton,
  CrowdDot,
  VibeCardsRow,
  VibeRadioCard,
  VibeIcon,
  VibeCardLabel,
  SubmitButton,
} from './ReportForm.styles';

export default function ReportForm({ routes = [], stages = [], onSubmit, submitting }) {
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [selectedStageId, setSelectedStageId] = useState('');
  const [fareCategory, setFareCategory] = useState('80');
  const [customFare, setCustomFare] = useState('');
  const [crowdLevel, setCrowdLevel] = useState('sitting_on_sema'); // 'low', 'sitting_on_sema' (med), 'high'
  const [vibe, setVibe] = useState('nganya'); // 'nganya' or 'quiet'

  const crowdOptions = [
    { key: 'low', label: 'Low', color: '#7DA82E' },
    { key: 'sitting_on_sema', label: 'Med', color: '#E8722C' },
    { key: 'high', label: 'High', color: '#BA1A1A' },
  ];

  const currentCrowdIndex = Math.max(
    0,
    crowdOptions.findIndex((opt) => opt.key === crowdLevel)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFare = customFare ? Number(customFare) : Number(fareCategory) || 80;
    if (onSubmit) {
      onSubmit({
        routeId: selectedRouteId || (routes[0]?.id || 'r1'),
        stageId: selectedStageId || (stages[0]?.id || 's1'),
        fareReported: finalFare,
        crowdLevel,
        vibe,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} data-testid="report-form">
      <FieldGroup>
        <FieldLabel>Corridor Route</FieldLabel>
        <FieldSelect
          value={selectedRouteId}
          onChange={(e) => setSelectedRouteId(e.target.value)}
          data-testid="report-route-select"
        >
          {routes.map((rt) => (
            <option key={rt.id} value={rt.id}>
              {rt.name} ({rt.sacco || 'Corridor SACCO'})
            </option>
          ))}
          {routes.length === 0 && <option value="r1">Route 237 (Thika Express)</option>}
        </FieldSelect>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Current Stage Location</FieldLabel>
        <FieldSelect
          value={selectedStageId}
          onChange={(e) => setSelectedStageId(e.target.value)}
          data-testid="report-stage-select"
        >
          {stages.map((st) => (
            <option key={st.id} value={st.id}>
              {st.name} (Order #{st.order})
            </option>
          ))}
          {stages.length === 0 && <option value="s1">Githurai 45 Stage</option>}
        </FieldSelect>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Fare Paid</FieldLabel>
        <ChipsRow data-testid="fare-chips-row">
          {['50', '80', '100', '120'].map((amount) => (
            <FareChipButton
              key={amount}
              $active={fareCategory === amount && !customFare}
              onClick={() => {
                setFareCategory(amount);
                setCustomFare('');
              }}
              data-testid={`fare-chip-${amount}`}
            >
              Ksh {amount}
            </FareChipButton>
          ))}
        </ChipsRow>
        <CustomFareInput
          type="number"
          placeholder="Other amount (Ksh)"
          value={customFare}
          onChange={(e) => setCustomFare(e.target.value)}
          data-testid="custom-fare-input"
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Stage Crowd</FieldLabel>
        <SegmentedCrowdContainer data-testid="crowd-segmented-control">
          <CrowdIndicatorBg $index={currentCrowdIndex} />
          {crowdOptions.map((opt) => (
            <CrowdSegmentButton
              key={opt.key}
              $selected={crowdLevel === opt.key}
              onClick={() => setCrowdLevel(opt.key)}
              data-testid={`crowd-option-${opt.key}`}
            >
              <CrowdDot $color={opt.color} />
              {opt.label}
            </CrowdSegmentButton>
          ))}
        </SegmentedCrowdContainer>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Vehicle Vibe</FieldLabel>
        <VibeCardsRow data-testid="vibe-cards-row">
          <VibeRadioCard
            $active={vibe === 'nganya'}
            onClick={() => setVibe('nganya')}
            data-testid="vibe-card-nganya"
          >
            <VibeIcon>🔊</VibeIcon>
            <VibeCardLabel>Nganya</VibeCardLabel>
          </VibeRadioCard>
          <VibeRadioCard
            $active={vibe === 'quiet'}
            onClick={() => setVibe('quiet')}
            data-testid="vibe-card-quiet"
          >
            <VibeIcon>🔇</VibeIcon>
            <VibeCardLabel>Quiet</VibeCardLabel>
          </VibeRadioCard>
        </VibeCardsRow>
      </FieldGroup>

      <SubmitButton disabled={submitting} data-testid="report-submit-btn">
        {submitting ? 'Submitting...' : 'Submit Report 🚀'}
      </SubmitButton>
    </FormContainer>
  );
}
