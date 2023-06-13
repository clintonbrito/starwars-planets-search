import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import randomID from '../helpers/randomID';
import '../index.css';

function Table() {
  const {
    planets,
    columnLabels,
    filterByName,
    filterByNum,
    filteredPlanets,
    setFilteredPlanets,
    isColumnSelected,
  } = useContext(PlanetsContext);

  // console.log(filteredPlanets);

  useEffect(() => {
    const filtersPlanetsByName = planets.filter(({ name }) => (
      name.toLowerCase().includes(filterByName.toLowerCase())
    ));

    let filteredPlanetsByLists = filtersPlanetsByName;

    if (!isColumnSelected && Array.isArray(filterByNum) && filterByNum.length > 0) {
      filteredPlanetsByLists = filtersPlanetsByName
        .filter((planet) => (filterByNum.every(({ column, comparison, value }) => {
          const planetValue = Number(planet[column]);
          switch (comparison) {
          case 'maior que':
            return planetValue > Number(value);
          case 'menor que':
            return planetValue < Number(value);
          case 'igual a':
            return planetValue === Number(value);
          default:
            return true;
          }
        })));
    }

    setFilteredPlanets(filteredPlanetsByLists);
  }, [filterByName, filterByNum, planets]);

  return (
    <div>
      <table className="bg-black text-yellow-500">
        <thead>
          <tr>
            {columnLabels.map((column) => (
              <th
                key={ randomID() }
                className="px-4 py-2 text-yellow-500 font-medium uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {console.log(filteredPlanets)} */}
          { filteredPlanets.map((planet, index) => (
            <tr
              key={ randomID() }
              className={ index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800' }
            >
              <td className="px-4 py-2 text-white">{planet.name}</td>
              <td className="px-4 py-2 text-white">{planet.rotation_period}</td>
              <td className="px-4 py-2 text-white">{planet.orbital_period}</td>
              <td className="px-4 py-2 text-white">{planet.diameter}</td>
              <td className="px-4 py-2 text-white">{planet.climate}</td>
              <td className="px-4 py-2 text-white">{planet.gravity}</td>
              <td className="px-4 py-2 text-white">{planet.terrain}</td>
              <td className="px-4 py-2 text-white">{planet.surface_water}</td>
              <td className="px-4 py-2 text-white">{planet.population}</td>
              <td className="px-4 py-2 text-white">{planet.films}</td>
              <td className="px-4 py-2 text-white">{planet.created}</td>
              <td className="px-4 py-2 text-white">{planet.edited}</td>
              <td className="px-4 py-2 text-white">{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
