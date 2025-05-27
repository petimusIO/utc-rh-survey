import React, { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import UTCLogo from "../img/UTC-logo.png";

const api = axios.create({
  baseURL: `https://petimus-utc-survey-api.onrender.com/user` //`http://localhost:3001/user`
});

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1, scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

// Updated item variants to enable custom delays
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom, 
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

const actionPlans = {
  struggling: [
    "Seek couples counseling or coaching for guided support.",
    "Set one small, achievable goal this week—like a tech-free dinner.",
    "Identify and address repeating conflict cycles—don't ignore red flags."
  ],
  growing: [
    "Establish a weekly 30-minute check-in (no distractions).",
    "Read a relationship-building book or do a couples' devotional together.",
    "Practice active listening—repeat back what you heard before responding."
  ],
  thriving: [
    "Schedule a monthly \"vision meeting\" to talk about goals and dreams.",
    "Take a strengths-based personality assessment together and discuss.",
    "Serve together—shared purpose deepens emotional intimacy."
  ]
};

export default function FinalForm() {
  const [backendData, setBackendData] = useState({});
  const { userData } = useContext(StepperContext);
  const [totalScore, setTotalScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [category, setCategory] = useState("");
  const [showBonus, setShowBonus] = useState(false);
  const [scoreComplete, setScoreComplete] = useState(false);
  
  useEffect(() => {
    // Calculate total score from survey responses
    const calculateScore = () => {
      let score = 0;
      let count = 0;
      
    // Define which fields are actual questions
    const questionFields = [
      "conflict_resolution", "quality_time", "emotional_safety", "open_communication", 
      "perspective_taking", "shared_experiences", "mutual_responsibility", "appreciation", 
      "healthy_boundaries", "no_negative_patterns"
    ];
  
    // Only process fields that are in our whitelist
    for (const key of questionFields) {
      if (userData[key] && !isNaN(userData[key])) {
        const value = parseInt(userData[key]);
        score += value;
        count++;
        console.log(`Question ${key}: ${value} points`);
      }
    }
      
      return score;
    };
    
    const score = calculateScore();
    setTotalScore(score);
    
    // Start with 0 and animate up to the score
    setDisplayScore(0);
    setScoreComplete(false);
    
    // Determine category based on score
  let categoryValue;
  if (score >= 10 && score <= 25) {
    categoryValue = "struggling";
    setCategory("struggling");
  } else if (score >= 26 && score <= 40) {
    categoryValue = "growing";
    setCategory("growing");
  } else {
    categoryValue = "thriving";
    setCategory("thriving");
  }
  
  // Send data to backend - use the directly calculated categoryValue 
  const addUser = async () => {
    try {
      const res = await api.post("/", {
        ...userData,
        dbTable: "Relationship_Health",
        totalScore: score,
        category: categoryValue // Use the direct value, not the state
      });
      console.log("API response:", res);
    } catch (error) {
      console.error("API error:", error);
    }
  };
  addUser();
  }, [userData]);

  useEffect(() => {
    // Animate the score counting up
    if (displayScore < totalScore) {
      const timeout = setTimeout(() => {
        setDisplayScore(prev => Math.min(prev + 1, totalScore));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (displayScore === totalScore && totalScore > 0) {
      // Mark score animation as complete to trigger the next animations
      const timeout = setTimeout(() => {
        setScoreComplete(true);
      }, 500); // Small delay after score finishes
      return () => clearTimeout(timeout);
    }
  }, [displayScore, totalScore]);

  const getCategoryName = () => {
    switch(category) {
      case "struggling": return "Struggling Relationship 🚨";
      case "growing": return "Growing Relationship 🌱";
      case "thriving": return "Thriving Relationship 💖";
      default: return "";
    }
  };

  const getCategoryDescription = () => {
    switch(category) {
      case "struggling": return "There may be communication breakdowns, unresolved hurt, or toxic patterns that need attention.";
      case "growing": return "Your relationship has a healthy foundation but could benefit from more intentionality, especially during challenges.";
      case "thriving": return "You and your partner are deeply connected, communicate well, and resolve conflict with maturity and grace.";
      default: return "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <motion.div
        className="bg-white rounded-lg p-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Section - Add this before the score section */}
      <motion.div variants={itemVariants} custom={0} className="flex justify-center mb-6">
        <img 
          src={UTCLogo} 
          alt="UTC Logo" 
          className="h-14 md:h-6" // Adjust size as needed
        />
      </motion.div>
        {/* Score Section - Always visible first */}
        <motion.div variants={itemVariants} custom={0} className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Your Relationship Health Score</h2>
          <motion.div 
            className="text-4xl md:text-5xl font-bold text-pmmGrit mb-2"
            key={totalScore}
            animate={{ opacity: 1 }}
          >
            {displayScore}
          </motion.div>
          <p className="text-xs text-gray-500">Total Score Range: 10-50</p>
          
          <AnimatePresence>
            {scoreComplete && (
              <motion.div 
                className="mt-2 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-bold text-base mb-0.5 text-pmmGrit">{getCategoryName()}</h3>
                <p className="text-xs text-gray-600">{getCategoryDescription()}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Action Plan - Compact & Modern */}
        <AnimatePresence>
          {scoreComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mb-3"
            >
              <div className="flex items-center mb-1">
                <span className="text-pmmGrit mr-1.5">✅</span>
                <h2 className="text-base font-bold">Tips to Strengthen Your Relationship</h2>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                {actionPlans[category] && actionPlans[category].map((action, index) => (
                  <div 
                    key={index} 
                    className={`py-2 px-3 flex items-start text-xs ${
                      index !== actionPlans[category].length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="bg-pmmGrit text-white w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <span className="text-[10px]">{index + 1}</span>
                    </div>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bonus Section - Compact & Cleaner */}
        <AnimatePresence>
          {scoreComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="mb-3"
            >
              <button 
                className="text-left w-full flex justify-between items-center bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow duration-200"
                onClick={() => setShowBonus(!showBonus)}
              >
                <div className="flex items-center">
                  <span className="text-pmmGrit mr-1.5">⏳</span>
                  <h2 className="text-sm font-bold">7-Day Relationship Booster</h2>
                </div>
                <span className="text-xs text-pmmGrit">{showBonus ? '−' : '+'}</span>
              </button>
              
              <AnimatePresence>
                {showBonus && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[10px] text-gray-500 mt-1 mb-2 pl-2">
                      A quick-start plan to strengthen your relationship in one week
                    </div>
                    
                    <div className="space-y-1">
                      {/* Time blocks - more compact */}
                      <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                        <h3 className="font-bold text-xs text-pmmGrit mb-1">Days 1-2</h3>
                        <ul className="space-y-1 pl-4 text-[10px] list-disc text-gray-700">
                          <li>Share three specific things you appreciate about your partner.</li>
                          <li>Have a conversation without any digital distractions for 20 minutes.</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                        <h3 className="font-bold text-xs text-pmmGrit mb-1">Days 3-5</h3>
                        <ul className="space-y-1 pl-4 text-[10px] list-disc text-gray-700">
                          <li>Do something your partner enjoys, even if it's not your favorite.</li>
                          <li>Practice the 5:1 ratio—five positive interactions for every negative one.</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                        <h3 className="font-bold text-xs text-pmmGrit mb-1">Days 6-7</h3>
                        <ul className="space-y-1 pl-4 text-[10px] list-disc text-gray-700">
                          <li>Plan something to look forward to together in the next month.</li>
                          <li>Share one way you'd like to grow as a partner and ask for feedback.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* CTA Section - Compact & Attractive */}
        <AnimatePresence>
          {scoreComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.8 }}
              className="text-center mt-4"
            >
              <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg p-3 shadow-sm">
                <p className="text-xs font-medium mb-2 text-gray-700">Know your worth. Lead with values.</p>
                <a 
                  href="https://learn.liveprosperous.com/pages/focus-fridays-signup-form" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-pmmGrit hover:bg-pmmBlue text-white font-bold py-2 px-3 rounded-lg shadow-sm transition duration-300 text-sm text-center cursor-pointer"
                >
                  Join Focus Friday Email
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}