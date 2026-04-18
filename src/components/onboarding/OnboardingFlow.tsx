import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Step1_Intro } from './Step1_Intro';
import { Step2_SwitchFlip } from './Step2_SwitchFlip';
import { Step3_CTA } from './Step3_CTA';
import { Language } from '../../i18n/translations';

interface OnboardingFlowProps {
  onComplete: () => void;
  language: Language;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, language }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && <Step1_Intro key="step1" onNext={nextStep} language={language} />}
        {step === 2 && <Step2_SwitchFlip key="step2" onNext={nextStep} language={language} />}
        {step === 3 && <Step3_CTA key="step3" onComplete={onComplete} language={language} />}
      </AnimatePresence>
    </div>
  );
};
