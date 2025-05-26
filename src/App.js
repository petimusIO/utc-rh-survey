import { useEffect, useState } from 'react';
import './App.css';
// DATA IMPORTS
import { StepperContext } from './contexts/StepperContext';
import surveyData from './contexts/SurveyQuestion.json';
// COMPONENT IMPORTS
import FormStepper from './Components/FormStepper';
import StepperControl from './Components/StepperControl';
import FinalForm from './Components/Steps/FinalForm';
import IntroForm from './Components/Steps/IntroForm';
import LikertQuestion from './Components/LikertQuestion.tsx';
// 3rd party imports
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  // Add a new state to track whether intro is complete
  const [introCompleted, setIntroCompleted] = useState(false);
  const [currStep, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);

  const handleAnswerSelected = (fieldName, text, value) => {
    setUserData({
      ...userData,
      [fieldName]: value
    });
  };

  // Handle completion of the intro form
  const handleIntroComplete = (introData) => {
    setUserData({
      ...userData,
      ...introData
    });
    setIntroCompleted(true);
  };

  const displayStep = (step) => {
    // Show the final form when we've gone through all questions
    if (step > surveyData.questions.length) {
      return <FinalForm />;
    }

    // Show the current question based on the step number
    const currentQuestion = surveyData.questions[step - 1]; // No offset needed now
    return (
      <LikertQuestion
        key={currentQuestion.questionId}
        questionIndex={currentQuestion.questionId}
        questionText={currentQuestion.questionText}
        fieldName={currentQuestion.fieldName}
        onAnswerSelected={handleAnswerSelected}
      />
    );
  };

  const handleClick = (direction) => {
    let newStep = currStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= surveyData.questions.length + 1 && setStep(newStep);
  };

  return (
    <div className="App">
      <motion.div
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="container main-content">
          <StepperContext.Provider
            value={{ userData, setUserData, finalData, setFinalData }}
          >
            {!introCompleted ? (
              // Show intro form if not completed
              <div className="my-1 p-4 display-content">
                <IntroForm onComplete={handleIntroComplete} />
              </div>
            ) : (
              // Show survey after intro is completed
              <>
                {/* STEPPER - Only show during survey, not final form */}
                {currStep !== surveyData.questions.length + 1 && (
                  <FormStepper steps={surveyData.questions} currStep={currStep} />
                )}

                {/* DISPLAY FORMS */}
                <div className="my-1 p-4 display-content">
                  {displayStep(currStep)}
                </div>

                {/* Navigation Control */}
                {currStep !== surveyData.questions.length + 1 && (
                  <StepperControl
                    handleClick={handleClick}
                    currentStep={currStep}
                    steps={surveyData.questions}
                  />
                )}
              </>
            )}
          </StepperContext.Provider>
        </div>
      </motion.div>
    </div>
  );
}

export default App;