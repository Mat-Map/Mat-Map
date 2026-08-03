'use client';

import React, { useEffect } from 'react';
import {
  Overlay,
  ModalContainer,
  DragHandle,
  ModalHeader,
  ModalTitle,
  CloseButton,
  SuccessCard,
  SuccessTitle,
  SuccessBody,
} from './ReportModal.styles';
import ReportForm from './ReportForm';
import { useReport } from '@/hooks/useReport';

export default function ReportModal({ isOpen, onClose, routes = [], stages = [] }) {
  const { submitting, submitted, submit, reset } = useReport();

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        reset();
        if (onClose) onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [submitted, reset, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <DragHandle />
        <ModalHeader>
          <ModalTitle>REPORT STATUS</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        {submitted ? (
          <SuccessCard>
            <SuccessTitle>✅ REPORT RECEIVED!</SuccessTitle>
            <SuccessBody>
              Asante! Community crowd and fare manifest updated successfully for fellow riders.
            </SuccessBody>
          </SuccessCard>
        ) : (
          <ReportForm
            routes={routes}
            stages={stages}
            onSubmit={submit}
            submitting={submitting}
          />
        )}
      </ModalContainer>
    </>
  );
}
