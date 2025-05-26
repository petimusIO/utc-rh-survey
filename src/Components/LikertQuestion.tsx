import React from 'react';
import { motion } from 'framer-motion';

const LikertQuestion = ({ 
  questionIndex,
  questionText, 
  onAnswerSelected,
  fieldName = `question_${questionIndex}`
}) => {
  // Framer Motion animations
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const options = [
    { text: 'Strongly Disagree', value: 1 },
    { text: 'Disagree', value: 2 },
    { text: 'Neutral', value: 3 },
    { text: 'Agree', value: 4 },
    { text: 'Strongly Agree', value: 5 }
  ];

  return (
    <div className="question-container">
      <motion.div
        className="form-content"
        animate="visible"
        initial="hidden"
        variants={container}
      >
        <motion.p variants={item} className="question-text">
          {questionText}
        </motion.p>
        <motion.div
          variants={container}
          className="button-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: '10px',
            maxWidth: '400px',
            margin: '0 auto'
          }}
        >
          {options.map((option, index) => (
            <motion.button
              key={index}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onAnswerSelected(fieldName, option.text, option.value);
              }}
              className="option-button"
              style={{
                textAlign: 'center',
                padding: '12px 16px'
              }}
            >
              {option.text}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LikertQuestion;