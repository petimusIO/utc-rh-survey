import React from 'react';
import gif from "./img/thanks2.webp"
import {motion, AnimatePresence} from "framer-motion";

const PillarResults = ({ data }) => {
    //console.log("LOOKING HERE!!!", data)

    // FRAMER MOTION
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
        },
      },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
  return (
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1 max-w-full"
>
  {data.map((item, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      className="bg-gray-200 p-2 rounded-lg shadow-md transform transition-all hover:scale-105"
    >
      <p className="text-sm font-light text-gray-600">
        {item}
      </p>
    </motion.div>
  ))}
</motion.div>







  );
};

export default PillarResults;