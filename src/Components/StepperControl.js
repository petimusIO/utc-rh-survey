import React from 'react';
import {motion, AnimatePresence} from "framer-motion";


export default function StepperControl({handleClick, currentStep, steps}) {
  //console.log(currentStep);
  return (
    <motion.div className='StepperControlContainer'>
        <motion.button onClick={() => handleClick("next")} className='continue-button'> 
          <a href="#_" class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-write ">
          <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">{currentStep === steps.length  ? "Confirm" : "Next ➤"} </span>
          <span class="relative invisible"> {currentStep === steps.length  ? "Confirm" : "Next"} </span>
          </a>
          
        </motion.button>
    </motion.div>
  )
}
