//  tabela deve ser atualizada com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar em um botão para efetuar a filtragem. Por exemplo, se for digitado "Tatoo" no campo de texto, o planeta "Tatooine" deve ser exibido //

import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableFilters() {
  const { filterByName, setFilterByName } = useContext(PlanetsContext);

  return (
    <div>
      <form>
        <label htmlFor="name">
          Search Planet
          <input
            type="text"
            id="name"
            placeholder="Search by planet name"
            data-testid="name-filter"
            value={ filterByName }
            onChange={ (e) => setFilterByName(e.target.value) }
          />
        </label>
      </form>
    </div>
  );
}

export default TableFilters;
