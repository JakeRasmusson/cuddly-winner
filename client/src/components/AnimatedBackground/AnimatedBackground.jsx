import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  // Number of columns
  const columns = 12

  // Number of small images per column
  const imagesPerColumn = 8;

  // Replace with your image path
  const imageUrl = "/easdlogo2.png";

  return (
    <div className="fixed inset-0 overflow-hidden flex -z-1">
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          className="flex-1 relative overflow-hidden"
        >
          <motion.div
            className="flex flex-col"
            animate={{
              y: index % 2 ? [0, -50 * imagesPerColumn, 0] : [-50 * imagesPerColumn, 0, -50 * imagesPerColumn]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {Array.from({ length: imagesPerColumn * 2 }).map((_, imgIndex) => (
              <img
                key={imgIndex}
                src={imageUrl}
                alt="Background"
                className="w-full h-40 object-cover"
              />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground