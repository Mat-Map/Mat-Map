'use client';

import React, { useState } from 'react';
import {
  ManifestSection,
  ManifestHeader,
  FilterWrapper,
  FilterInput,
  ListContainer,
  StopRow,
  StopLine,
  StopDot,
  InnerDot,
  StopContent,
  StopHeaderRow,
  StopName,
  StopTime,
  StopMetaRow,
  StopMetaLabel,
  FareTag,
  TicketFooter,
  TicketInfo,
  TicketLabel,
  TicketValue,
} from './StageSequenceList.styles';

export default function StageSequenceList({ stages = [], routeColor = '#008080' }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeStopId, setActiveStopId] = useState(null);

  const filteredStages = stages.filter((st) =>
    (st.name || st.slug || '').toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <ManifestSection>
      <ManifestHeader>
        <span>STATION MANIFEST</span>
        <span>EST. ARRIVAL</span>
      </ManifestHeader>

      <FilterWrapper>
        <FilterInput
          placeholder="Filter stations along route..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </FilterWrapper>

      <ListContainer>
        {filteredStages.map((stage, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === filteredStages.length - 1;
          const isSelected = activeStopId === stage.id;
          const estMinutes = (idx + 1) * 6;

          return (
            <StopRow key={stage.id || idx}>
              {!isLast && <StopLine $color={routeColor} />}

              <StopDot
                $active={isSelected}
                $isStart={isFirst}
                $isEnd={isLast}
                $color={routeColor}
              >
                <InnerDot $color={routeColor} />
              </StopDot>

              <StopContent
                $active={isSelected}
                onClick={() => setActiveStopId((prev) => (prev === stage.id ? null : stage.id))}
              >
                <StopHeaderRow>
                  <StopName>{stage.name || `Stage ${stage.order || idx + 1}`}</StopName>
                  <StopTime>+{estMinutes}m</StopTime>
                </StopHeaderRow>

                <StopMetaRow>
                  <StopMetaLabel>
                    {isFirst ? 'START TERMINUS' : isLast ? 'END TERMINUS' : `+6m LEG (Stage #${stage.order || idx + 1})`}
                  </StopMetaLabel>
                  <FareTag>
                    {isFirst ? 'BASE FARE' : `KSH ${50 + idx * 10}`}
                  </FareTag>
                </StopMetaRow>
              </StopContent>
            </StopRow>
          );
        })}
      </ListContainer>

      <TicketFooter>
        <TicketInfo>
          <TicketLabel>TICKET ID</TicketLabel>
          <TicketValue>MM-MANIFEST-{stages.length || 0}X</TicketValue>
        </TicketInfo>
        <TicketInfo style={{ textAlign: 'right' }}>
          <TicketLabel>VALID UNTIL</TicketLabel>
          <TicketValue>11:59PM EAT</TicketValue>
        </TicketInfo>
      </TicketFooter>
    </ManifestSection>
  );
}
