import React, { createContext, useState, useContext } from 'react';

export const PatienteContext = createContext<{paciente?: any, setPaciente?: any}>({});

const PatienteProvider = (props) => {
  const [paciente, setPaciente] = useState(null);

  return (
    <PatienteContext.Provider value={{ paciente, setPaciente }}>
      {props.children}
    </PatienteContext.Provider>
  );
};



export default PatienteProvider 
export const usePacienteContext = () => useContext(PatienteContext);