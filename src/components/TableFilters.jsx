import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableFilters() {
  const {
    filterByName,
    setFilterByName,
    filterByNum,
    setFilterByNum,
    // filteredPlanets,
    // setFilteredPlanets,
  } = useContext(PlanetsContext);

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const clearFilters = () => {
    setFilter({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilter = (click) => {
    click.preventDefault();
    const { column, comparison, value } = filter;
    const newFilter = { column, comparison, value };
    setFilterByNum([
      ...filterByNum,
      newFilter,
    ]);
    clearFilters();
    // console.log(filterByNum);
  };

  return (
    <div className="py-10 bg-black text-yellow-500">
      <div className="flex flex-col items-center py-5">
        <div>
          <label htmlFor="planetName" className="text-lg px-2">
            Search Planet
          </label>
        </div>
        <div>
          <input
            type="text"
            id="planetName"
            placeholder="Search by planet name"
            className="bg-black text-yellow-500 placeholder-yellow-500 border
              border-yellow-500 rounded px-2 py-1 ml-1 mt-1 text-center"
            data-testid="name-filter"
            value={ filterByName }
            onChange={ (e) => setFilterByName(e.target.value) }
          />
        </div>
      </div>
      <form className="space-y-4">
        <label htmlFor="columnFilter" className="px-3">
          Column
          <select
            id="columnFilter"
            name="column"
            className="bg-black text-yellow-500 border border-yellow-500
              rounded px-2 py-1 ml-1"
            data-testid="column-filter"
            value={ filter.column }
            onChange={ (e) => handleChange(e) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Comparison Filter
          <select
            id="comparisonFilter"
            name="comparison"
            className="bg-black text-yellow-500 border border-yellow-500
              rounded px-2 py-1 ml-1"
            data-testid="comparison-filter"
            value={ filter.comparison }
            onChange={ (e) => handleChange(e) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="valueFilter" className="px-3">
          <input
            type="number"
            id="valueFilter"
            name="value"
            data-testid="value-filter"
            value={ filter.value }
            onChange={ (e) => handleChange(e) }
            className="bg-black text-yellow-500 border border-yellow-500
              rounded px-2 py-1"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
          className="bg-yellow-500 text-black rounded px-4 py-2 font-semibold
            hover:bg-yellow-600"
        >
          Filter
        </button>
      </form>
    </div>
  );
}

export default TableFilters;
