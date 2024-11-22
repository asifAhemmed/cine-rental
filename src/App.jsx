import { MovieContext, ThemeContext } from "./context";
import { useState,useReducer } from "react";
import Page from "./Page";
import { cartReducer, initialState } from "./reducers/cartReducer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieContext.Provider value={{ state, dispatch }}>
        <Page/>
        <ToastContainer/>
      </MovieContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
