'use client';

import React from 'react';
import { MarkerWrapper, PinBubble, PinStem } from './StageMarker.styles';

export default function StageMarker({ stage, isSelected, onClick }) {
  if (!stage) return null;

  return (
    <MarkerWrapper onClick={() => onClick && onClick(stage)}>
      <PinBubble $selected={isSelected}>
        {stage.name || `Stage ${stage.order || ''}`}
      </PinBubble>
      <PinStem />
    </MarkerWrapper>
  );
}
