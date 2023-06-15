import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Test if the page renders correctly', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
    render(<App />)
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should appears all table filters elements from the component', () => {
    const searchBar = screen.getByRole('textbox', { name: /search planet/i });
    const column = screen.getByRole('combobox', { name: /column/i });
    const comparisonFilter = screen.getByRole('combobox', { name: /comparison filter/i });
    const inputNumber = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: /filter/i });

    expect(searchBar).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
  });
  it('should appears fetch result showing planets list', async () => {
    await waitFor(() => {
      const tatooine = screen.getByRole('cell', { name: /tatooine/i });
      const alderaan = screen.getByRole('cell', { name: /alderaan/i });

      expect(tatooine).toBeInTheDocument();
      expect(alderaan).toBeInTheDocument();
    });
  });
  it('should changes column selects when filters and update table rows', async () => {
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    }, {timeout: 4000});
    const column = screen.getByRole('combobox', { name: /column/i });
    const comparisonFilter = screen.getByRole('combobox', { name: /comparison filter/i });
    const inputNumber = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: /filter/i });

    act(() => {
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '500');
    userEvent.click(filterBtn);
    })

    const rowsFirstFilter = screen.getAllByRole('row');
    expect(rowsFirstFilter).toHaveLength(4);
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(column, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.clear(inputNumber);
      userEvent.type(inputNumber, '11000');
      userEvent.click(filterBtn);
    })

    const rowsSecondFilter = screen.getAllByRole('row');
    expect(rowsSecondFilter).toHaveLength(3);
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
    expect(screen.getByText('Hoth')).toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(column, 'rotation_period');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.clear(inputNumber);
      userEvent.type(inputNumber, '24');
      userEvent.click(filterBtn);
    })

    const rowsThirdFilter = screen.getAllByRole('row');
    expect(rowsThirdFilter).toHaveLength(2);
    expect(screen.queryByText('Hoth')).not.toBeInTheDocument();
    expect(screen.getByText('Yavin IV')).toBeInTheDocument();

    const [ , , thirdRemoveButton ] = screen.getAllByRole('button', { name: 'X' });

    act(() => {
      userEvent.click(thirdRemoveButton);
    });

    const rowsAfterRemoveThirdFilter = screen.getAllByRole('row');
    expect(rowsAfterRemoveThirdFilter).toHaveLength(3);
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
    expect(screen.getByText('Hoth')).toBeInTheDocument();

    const removeAllFiltersBtn = screen.getByRole('button', { name: /remove all filters/i });

    act(() => {
      userEvent.click(removeAllFiltersBtn);
    });

    const rowsAfterRemoveAllFilters = screen.getAllByRole('row');
    expect(rowsAfterRemoveAllFilters).toHaveLength(11);
    screen.getByText('Tatooine');
    screen.getByText('Dagobah');
    screen.getByText('Kamino');
  });
});
