import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareFlights, setCompareFlights] = useState([]);

  const addToCompare = (flight) => {
    if (compareFlights.find(f => f._id === flight._id)) return;
    if (compareFlights.length >= 3) {
      alert("You can compare up to 3 flights only");
      return;
    }
    setCompareFlights([...compareFlights, flight]);
  };

  const removeFromCompare = (id) => {
    setCompareFlights(compareFlights.filter(f => f._id !== id));
  };

  const clearCompare = () => setCompareFlights([]);

  return (
    <CompareContext.Provider
      value={{ compareFlights, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
