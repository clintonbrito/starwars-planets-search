import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNum, setFilterByNum] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const columnLabels = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  useEffect(() => {
    const fetchPlanetsData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanets(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlanetsData();
  }, []);

  const value = {
    planets,
    columnLabels,
    filterByName,
    setFilterByName,
    filterByNum,
    setFilterByNum,
  };

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;
