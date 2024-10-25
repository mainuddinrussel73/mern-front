import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import { RiMoonFoggyFill } from "react-icons/ri";
import { RiSunFoggyFill } from "react-icons/ri";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function

  
  return (
    <button
      onClick={toggleTheme}
      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition"
    >
      {theme === 'light' ? <RiSunFoggyFill/> : <RiMoonFoggyFill/>}
    </button>
  );
};

export default ThemeToggle;
