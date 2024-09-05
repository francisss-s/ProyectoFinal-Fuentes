// src/components/Counter/Counter.tsx

import React, { useState } from "react";

import { CounterProps } from "../../../types/interfaces";

const Counter: React.FC<CounterProps> = ({ initialCount = 1, min = 1, max = 100, onChange }) => {
  const [count, setCount] = useState<number>(initialCount);

  const handleIncrement = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      if (onChange) onChange(newCount);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      if (onChange) onChange(newCount);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
          count === min ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleDecrement}
        disabled={count === min}
      >
        -
      </button>
      <span className="bg-white border-t border-b border-gray-300 px-4 py-2 text-center">
        {count}
      </span>
      <button
        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ${
          count === max ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleIncrement}
        disabled={count === max}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
