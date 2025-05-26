import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FormStepper.css';

export default function FormStepper({ steps, currStep }) {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    return steps.map((step, index) => ({
      ...step,
      highlighted: index === stepNumber,
      selected: index <= stepNumber,
      completed: index < stepNumber,
    }));
  };

  useEffect(() => {
    const stepState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));
    stepRef.current = stepState;
    setNewStep(updateStep(currStep - 1, stepRef.current));
  }, [steps, currStep]);

  // Calculate percentage done
  const percentageDone = Math.round((currStep / steps.length) * 100);

  // Framer motion animation settings
  const counterVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  // Progress bar animation
  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: `${percentageDone}%` },
  };

  return (
    <div>
      {/* Progress Bar (replacing the stepper) */}
      <div className="progress-bar-container w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <motion.div 
          className={`h-2.5 rounded-full bg-pmmGrit`}
          variants={progressBarVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Optional: Current step info */}
      <div className="text-center text-sm text-gray-500">
        Question {currStep} of {steps.length}
      </div>
    </div>
  );
}