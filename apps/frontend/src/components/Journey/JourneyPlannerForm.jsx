'use client';

import React, { useState } from 'react';
import {
  FormContainer,
  FieldGroup,
  FieldLabel,
  InputSelectWrapper,
  FieldSelect,
  SwapButton,
  RecentChipsSection,
  RecentChipsRow,
  RecentChip,
  SubmitButton,
} from './JourneyPlannerForm.styles';

export default function JourneyPlannerForm({ stages = [], onSubmit, loading }) {
  const [selectedFromId, setSelectedFromId] = useState('');
  const [selectedToId, setSelectedToId] = useState('');

  const fromId = selectedFromId || (stages.length >= 2 ? stages[0].id : '');
  const toId = selectedToId || (stages.length >= 2 ? stages[stages.length - 1].id : '');

  const handleSwap = () => {
    setSelectedFromId(toId);
    setSelectedToId(fromId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && fromId && toId) {
      onSubmit(fromId, toId);
    }
  };

  const handleSelectRecent = (fromName, toName) => {
    const foundFrom = stages.find((s) => s.name?.toLowerCase().includes(fromName.toLowerCase()));
    const foundTo = stages.find((s) => s.name?.toLowerCase().includes(toName.toLowerCase()));
    if (foundFrom && foundTo) {
      setSelectedFromId(foundFrom.id);
      setSelectedToId(foundTo.id);
      if (onSubmit) onSubmit(foundFrom.id, foundTo.id);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldLabel>FROM STAGE</FieldLabel>
        <InputSelectWrapper>
          <FieldSelect
            value={fromId}
            onChange={(e) => setSelectedFromId(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled>
              Select origin stage
            </option>
            {stages.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} (Order {st.order})
              </option>
            ))}
          </FieldSelect>
        </InputSelectWrapper>
      </FieldGroup>

      <SwapButton onClick={handleSwap} title="Swap origin & destination">
        ↕ SWAP
      </SwapButton>

      <FieldGroup>
        <FieldLabel>TO STAGE</FieldLabel>
        <InputSelectWrapper>
          <FieldSelect
            value={toId}
            onChange={(e) => setSelectedToId(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled>
              Select destination stage
            </option>
            {stages.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} (Order {st.order})
              </option>
            ))}
          </FieldSelect>
        </InputSelectWrapper>
      </FieldGroup>

      <RecentChipsSection>
        <FieldLabel>RECENT JOURNEYS</FieldLabel>
        <RecentChipsRow>
          <RecentChip onClick={() => handleSelectRecent('githurai', 'ngara')}>
            ⏱️ GITHURAI ➔ NGARA
          </RecentChip>
          <RecentChip onClick={() => handleSelectRecent('kasarani', 'cbd')}>
            ⏱️ KASARANI ➔ CBD
          </RecentChip>
          <RecentChip onClick={() => handleSelectRecent('juja', 'allsopps')}>
            ⏱️ JUJA ➔ ALLSOPPS
          </RecentChip>
        </RecentChipsRow>
      </RecentChipsSection>

      <SubmitButton disabled={loading || !fromId || !toId}>
        {loading ? 'PLANNING MANIFEST...' : 'FIND MY ROUTE ➔'}
      </SubmitButton>
    </FormContainer>
  );
}
