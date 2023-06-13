import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNum, setFilterByNum] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [isColumnSelected, setIsColumnSelected] = useState(false);
  const [filterColumns, setFilterColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const columnLabels = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
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
    filteredLists,
    setFilteredLists,
    filteredPlanets,
    setFilteredPlanets,
    isColumnSelected,
    setIsColumnSelected,
    filterColumns,
    setFilterColumns,
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
