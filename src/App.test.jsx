import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

global.fetch = jest.fn();

describe('Pokeverse App', () => {
  const mockPokemon = {
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    ]
  };

  beforeEach(() => {
    fetch.mockResolvedValue({
      json: async () => mockPokemon,
    });
  });

  test('loads Pokemon from API', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());
  });

  test('filters Pokemon by search', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());
    
    await user.type(screen.getByRole('textbox'), 'char');
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  test('adds Pokemon to squad', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());
    
    await user.click(screen.getAllByText('Add')[0]);
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});
