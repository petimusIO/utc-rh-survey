// Modal.js
import React from 'react';
import { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import { motion } from 'framer-motion';

const Modal = ({ show, onClose }) => {
  const statement2pillar = {
    "Help-Me": "Be a Manager",
    "Action-Plan": "Be a Pilot",
    "Help-Others": "Be a Lifeguard",
    "Thoughts/Feelings": "Be Present",
    "Control": "Be a Author",
    "Focus": "Be Intentional",
    "Fires": "Be a Firefighter",
    "Adjusting": "Be Agile",
  };

  const { userData } = useContext(StepperContext);

  const getBenefits = (statement) => {
    switch (statement) {
      case "Help-Me":
        return [
          "Gain effective self-management skills",
          "Develop strategies to manage stress and anxiety"
        ];
      case "Action-Plan":
        return [
          "Create actionable plans to achieve your mental health goals",
          "Gain tools to stay on course during difficult times"
        ];
      case "Help-Others":
        return [
          "Learn to support and uplift others",
          "Develop empathetic communication skills"
        ];
      case "Thoughts/Feelings":
        return [
          "Practice mindfulness and stay present in the moment",
          "Learn techniques to manage negative thoughts and emotions"
        ];
      case "Control":
        return [
          "Take control of your mental health journey",
          "Gain confidence in your ability to shape your own narrative"
        ];
      case "Focus":
        return [
          "Improve your focus and concentration",
          "Set intentional goals for personal growth"
        ];
      case "Fires":
        return [
          "Develop crisis management skills",
          "Learn to stay calm under pressure"
        ];
      case "Adjusting":
        return [
          "Cultivate adaptability and flexibility",
          "Strengthen your ability to bounce back from setbacks"
        ];
      default:
        return [];
    }
  };

  const benefits = getBenefits(userData.statement);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-5 max-w-lg w-full"
      >
        <h2 className="text-2xl mb-4 text-gray-800">Course Offerings</h2>
        <ul className="list-disc pl-5 text-gray-800">
          <li className="mb-4">
            Expert coaching by former <b>pro athlete</b> <b className='text-pmmGrit'>Freddie Scott II</b>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <img src="https://uploads-ssl.webflow.com/65fded56193c91c4ae0eb328/662c1a8c2c50441c8e78a7df_Freddie-Scott-Avatar.jpg" alt="Freddie Scott II" className="mt-2 w-32 h-auto rounded-lg shadow-md" />
            </motion.div>
          </li>
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="mb-4"
            >
              <blockquote className="mt-2 pl-4 border-l-4 border-yellow-500 italic text-gray-700"><b>{benefit}</b></blockquote>
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Modal;
