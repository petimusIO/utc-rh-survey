import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepperContext } from '../../contexts/StepperContext';
import UTCLogo from "../img/UTC-logo.png";

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

const IntroForm = (props) => {
    // Connect to the global context
    const { userData, setUserData } = useContext(StepperContext);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: userData.firstName || '',
        allowContact: userData.allowContact || false,
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        contactPreference: userData.contactPreference || 'email',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData({
            ...formData,
            [name]: newValue,
        });
        
        // Update userData in context as well
        setUserData({
            ...userData,
            [name]: newValue
        });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const isNameValid = formData.firstName.trim().length > 0;
    const isEmailValid = !formData.allowContact || 
                        (formData.contactPreference !== 'email' && formData.contactPreference !== 'both') || 
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPhoneValid = !formData.allowContact || 
                        (formData.contactPreference !== 'phone' && formData.contactPreference !== 'both') || 
                        /^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''));
    const isFormValid = (step === 1 && isNameValid) || 
                        (step === 2) || 
                        (step === 3 && isEmailValid && isPhoneValid);

    return (
        <div className="max-w-3xl mx-auto">
            <motion.div 
                className="bg-white rounded-lg p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Logo Section */}
                <motion.div variants={itemVariants} custom={0} className="flex justify-center mb-6">
                    <img 
                        src={UTCLogo} 
                        alt="UTC Logo" 
                        className="h-12 md:h-16"
                    />
                </motion.div>
                
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Welcome to the Personal Impact Survey
                            </h2>
                            
                            <div className="space-y-2">
                                <label className="block text-lg font-medium text-gray-700">
                                    What is your first name?
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pmmGrit focus:border-transparent"
                                />
                            </div>
                            
                            <div className="pt-4">
                                <button 
                                    onClick={handleNext}
                                    disabled={!isNameValid}
                                    className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition duration-200 ${isNameValid ? 'bg-pmmGrit hover:bg-pmmBlue' : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}
                    
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl font-bold text-center mb-2">
                                Stay Connected with Your Growth Journey
                            </h2>
                            
                            <p className="text-center text-gray-600 mb-4">
                                Would you like to receive personalized insights, early access to new resources, and exclusive offers?
                            </p>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="allowContact"
                                        checked={formData.allowContact}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-pmmGrit"
                                    />
                                    <span className="text-gray-700">Yes, I'd like to stay connected</span>
                                </label>
                            </div>
                            
                            <div className="flex space-x-4 pt-4">
                                <button 
                                    onClick={handleBack}
                                    className="w-1/3 py-3 px-4 rounded-lg font-bold text-pmmGrit border border-pmmGrit hover:bg-gray-50 transition duration-200"
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleNext}
                                    className="w-2/3 py-3 px-4 rounded-lg font-bold text-white bg-pmmGrit hover:bg-pmmBlue shadow-md transition duration-200"
                                >
                                    {formData.allowContact ? 'Next' : 'Skip & Continue'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                    
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {!formData.allowContact ? (
                                <div className="text-center space-y-6">
                                    <h2 className="text-2xl font-bold">
                                        Ready to Begin, {formData.firstName}!
                                    </h2>
                                    <p className="text-gray-600">
                                        Let's discover your personal leadership impact.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-center">
                                        How would you prefer we contact you?
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        <div className="flex space-x-4 mb-4">
                                            <label className="flex-1 flex items-center">
                                                <input
                                                    type="radio"
                                                    name="contactPreference"
                                                    value="email"
                                                    checked={formData.contactPreference === 'email'}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <span>Email</span>
                                            </label>
                                            <label className="flex-1 flex items-center">
                                                <input
                                                    type="radio"
                                                    name="contactPreference"
                                                    value="phone"
                                                    checked={formData.contactPreference === 'phone'}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <span>Text Message</span>
                                            </label>
                                            <label className="flex-1 flex items-center">
                                                <input
                                                    type="radio"
                                                    name="contactPreference"
                                                    value="both"
                                                    checked={formData.contactPreference === 'both'}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <span>Both</span>
                                            </label>
                                        </div>
                                        
                                        {(formData.contactPreference === 'email' || formData.contactPreference === 'both') && (
                                            <div className="space-y-2">
                                                <label className="block text-gray-700">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="youremail@example.com"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pmmGrit focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                        
                                        {(formData.contactPreference === 'phone' || formData.contactPreference === 'both') && (
                                            <div className="space-y-2">
                                                <label className="block text-gray-700">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                    placeholder="(123) 456-7890"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pmmGrit focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                        
                                        <p className="text-xs text-gray-500 mt-2">
                                            We respect your privacy. Your information will never be shared with third parties.
                                        </p>
                                    </div>
                                </>
                            )}
                            
                            <div className="flex space-x-4 pt-4">
                                <button 
                                    onClick={handleBack}
                                    className="w-1/3 py-3 px-4 rounded-lg font-bold text-pmmGrit border border-pmmGrit hover:bg-gray-50 transition duration-200"
                                >
                                    Back
                                </button>
                                
                                {/* This could be replaced by your StepperControl component, but included for form flow */}
                                <button 
    onClick={() => {
        // Send collected form data to parent
        props.onComplete({
            firstName: formData.firstName,
            allowContact: formData.allowContact,
            email: formData.email || '',
            phoneNumber: formData.phoneNumber || '',
            contactPreference: formData.contactPreference
        });
    }}
    disabled={!isFormValid}
    className={`w-2/3 py-3 px-4 rounded-lg font-bold text-white shadow-md transition duration-200 ${isFormValid ? 'bg-pmmGrit hover:bg-pmmBlue' : 'bg-gray-300 cursor-not-allowed'}`}
>
    Start Survey
</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default IntroForm;