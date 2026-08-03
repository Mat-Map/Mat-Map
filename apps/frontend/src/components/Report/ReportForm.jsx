'use client';

import React, { useState } from 'react';
import {
  FormContainer,
  FieldGroup,
  FieldLabel,
  FieldSelect,
  OptionButton,
  OptionTitle,
  OptionSub,
  SubmitButton,
} from './ReportForm.styles';

export default function ReportForm({ routes = [], stages = [], onSubmit, submitting }) {
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [selectedStageId, setSelectedStageId] = useState('');
  const [fareCategory, setFareCategory] = useState('80');
  const [crowdLevel, setCrowdLevel] = useState('sitting_on_sema');
  const [vibe, setVibe] = useState('nganya');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        routeId: selectedRouteId || (routes[0]?.id || 'r1'),
        stageId: selectedStageId || (stages[0]?.id || 's1'),
        fareReported: Number(fareCategory) || 80,
        crowdLevel,
        vibe,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldLabel>CORRIDOR ROUTE</FieldLabel>
        <FieldSelect
          value={selectedRouteId}
          onChange={(e) => setSelectedRouteId(e.target.value)}
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
        <FieldLabel>CURRENT STAGE LOCATION</FieldLabel>
        <FieldSelect
          value={selectedStageId}
          onChange={(e) => setSelectedStageId(e.target.value)}
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
        <FieldLabel>FARE PAID REPORT</FieldLabel>
        <OptionButton
          $color="#fcc019"
          $active={fareCategory === '80'}
          onClick={() => setFareCategory('80')}
        >
          <div>
            <OptionSub>FARE INFO</OptionSub>
            <OptionTitle>FARE PAID: KES 80 (STANDARD)</OptionTitle>
          </div>
          <span>💳</span>
        </OptionButton>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>CAPACITY & CROWD STATUS</FieldLabel>
        <OptionButton
          $color="#ba1a1a"
          $active={crowdLevel === 'sitting_on_sema'}
          onClick={() => setCrowdLevel('sitting_on_sema')}
        >
          <div>
            <OptionSub>CAPACITY</OptionSub>
            <OptionTitle>SITTING ON SEMA (CROWDED)</OptionTitle>
          </div>
          <span>👥</span>
        </OptionButton>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>ATMOSPHERE & VIBE</FieldLabel>
        <OptionButton
          $color="#785900"
          $active={vibe === 'nganya'}
          onClick={() => setVibe('nganya')}
        >
          <div>
            <OptionSub>ATMOSPHERE</OptionSub>
            <OptionTitle>VIBE: NGANYA (LOUD BASS)</OptionTitle>
          </div>
          <span>🔊</span>
        </OptionButton>
      </FieldGroup>

      <SubmitButton disabled={submitting}>
        {submitting ? 'SUBMITTING...' : 'SUBMIT COMMUNITY REPORT ➔'}
      </SubmitButton>
    </FormContainer>
  );
}
