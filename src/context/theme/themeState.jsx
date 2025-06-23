import {useState} from 'react';
import ThemeContext from './themeContext';

export default function ThemeState(props) {
  const [darkMode, setDarkMode] = useState(true);
const toggleMode=()=>{
    setDarkMode(!darkMode)
}
    return (
   <ThemeContext.Provider value={{darkMode,toggleMode}}>
    {props.children}
   </ThemeContext.Provider>
  );
}

