'use client';

import React, { useState, useEffect } from 'react';
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
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');

  useEffect(() => {
    if (stages.length >= 2) {
      if (!fromId) setFromId(stages[0].id);
      if (!toId) setToId(stages[stages.length - 1].id);
    }
  }, [stages, fromId, toId]);

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
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
      setFromId(foundFrom.id);
      setToId(foundTo.id);
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
            onChange={(e) => setFromId(e.target.value)}
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
            onChange={(e) => setToId(e.target.value)}
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
