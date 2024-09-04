import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-md mb-4">
      <button
        onClick={toggleAccordion}
        className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
