"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const CallButton: React.FC = () => {
  const phoneNumber = "+918870044213";
  const callUrl = `tel:${phoneNumber}`;

  return (
    <motion.a
      href={callUrl}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#28362b] rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e1b258]/30"
      aria-label="Call us"
    >
      <Phone
        size={24}
        className="text-[#e1b258]"
      />
    </motion.a>
  );
};

export default CallButton;
