import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/proession.service";
import { toast } from "react-toastify";

const ProfessionsContext = React.createContext();
export const useProfessions = () => {
  return useContext(ProfessionsContext);
};

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfessions = async () => {
      try {
        const { content } = await professionService.fetchAll();
        setProfessions(content);
        setLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    };
    getProfessions();
  }, []);

  const getProfession = (id) => {
    return professions.find(profession => profession._id === id);
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <ProfessionsContext.Provider value={{ professions, isLoading, getProfession }}>
      {children}
    </ProfessionsContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProfessionProvider;
