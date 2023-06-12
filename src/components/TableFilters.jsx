import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableFilters() {
  const {
    filterByName,
    setFilterByName,
    filterByNum,
    setFilterByNum,
  } = useContext(PlanetsContext);

  const handleFilter = () => {
    const { column, comparison, value } = filterByNum;
    const filter = {
      column,
      comparison,
      value,
    };
    setFilterByNum(filter);
  };

  return (
    <div className="py-10 bg-black text-yellow-500">
      <form onSubmit={ (e) => e.preventDefault() } className="space-y-4">
        <label htmlFor="planetName" className="text-lg px-2">
          Search Planet
          <input
            type="text"
            id="planetName"
            placeholder="Search by planet name"
            className="bg-black text-yellow-500 placeholder-yellow-500 border
              border-yellow-500 rounded-lg px-2 py-1 ml-1"
            data-testid="name-filter"
            value={ filterByName }
            onChange={ (e) => setFilterByName(e.target.value) }
          />
        </label>
        <label htmlFor="columnFilter" className="text-lg px-3">
          Column
          <select
            id="columnFilter"
            className="bg-black text-yellow-500 border border-yellow-500
              rounded-lg px-2 py-1 ml-1"
            data-testid="column-filter"
            value={ filterByNum.column }
            onChange={ (e) => setFilterByNum(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparisonFilter" className="text-lg">
          Comparison Filter
          <select
            id="comparisonFilter"
            className="bg-black text-yellow-500 border border-yellow-500
              rounded-lg px-2 py-1 ml-1"
            data-testid="comparison-filter"
            value={ filterByNum.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="valueFilter" className="text-lg px-3">
          <input
            type="number"
            id="valueFilter"
            data-testid="value-filter"
            value={ filterByNum.value }
            className="bg-black text-yellow-500 border border-yellow-500
              rounded-lg px-2 py-1"
          />
        </label>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ handleFilter }
          className="bg-yellow-500 text-black rounded-lg px-4 py-2 font-semibold
            hover:bg-yellow-600"
        >
          Filter
        </button>
      </form>
    </div>

  );
}

export default TableFilters;
