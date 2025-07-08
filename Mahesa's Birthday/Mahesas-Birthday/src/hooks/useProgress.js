import { useState, useEffect } from 'react';

export const useProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [unlockedFeatures, setUnlockedFeatures] = useState([]);

  const steps = [
    { id: 'quiz', name: 'Entry Quiz', required: true },
    { id: 'welcome', name: 'Welcome', required: false },
    { id: 'celebration', name: 'Celebration', required: true },
    { id: 'memory', name: 'Memory Lane', required: true },
    { id: 'dashboard', name: 'Dashboard', required: false }
  ];

  const completeStep = (stepId, data = {}) => {
    setCompletedSteps(prev => [...prev, stepId]);
    
    // Unlock features based on completed steps
    if (stepId === 'quiz' && data.score >= 80) {
      setUnlockedFeatures(prev => [...prev, 'gallery']);
    }
    
    if (stepId === 'memory') {
      setUnlockedFeatures(prev => [...prev, 'about', 'full-gallery']);
    }
  };

  const canAccessStep = (stepId) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (stepIndex === 0) return true;
    
    const previousStep = steps[stepIndex - 1];
    return completedSteps.includes(previousStep.id);
  };

  return {
    currentStep,
    setCurrentStep,
    completedSteps,
    quizScore,
    setQuizScore,
    unlockedFeatures,
    completeStep,
    canAccessStep,
    steps
  };
};