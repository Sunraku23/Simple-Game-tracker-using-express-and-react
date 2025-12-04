import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import GameStats from './components/GameStats';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('/api/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const addGame = async (game) => {
    try {
      const response = await axios.post('/api/games', game);
      setGames([response.data, ...games]);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const updateGame = async (id, updatedGame) => {
    try {
      const response = await axios.put(`/api/games/${id}`, updatedGame);
      setGames(games.map(g => g._id === id ? response.data : g));
      setEditingGame(null);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await axios.delete(`/api/games/${id}`);
      setGames(games.filter(g => g._id !== id));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const filteredGames = games
    .filter(game => filter === 'All' || game.status === filter)
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'rating': return b.rating - a.rating;
        case 'hours': return b.hoursPlayed - a.hoursPlayed;
        default: return 0;
      }
    });

  return (
    <div className="App">
      <header>
        <h1>🎮 Game Collection Tracker</h1>
      </header>
      
      <div className="container">
        {/* Top Section: Form and Stats side by side */}
        <div className="top-section">
          <div className="form-container">
            <GameForm 
              addGame={addGame}
              updateGame={updateGame}
              editingGame={editingGame}
              setEditingGame={setEditingGame}
            />
          </div>
          
          <div className="stats-container">
            <GameStats games={games} />
          </div>
        </div>
        
        {/* Bottom Section: Game List */}
        <div className="main-content">
          <div className="controls">
            <div className="filter-controls">
              <label>Filter by Status:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All Games</option>
                <option value="Wishlist">Wishlist</option>
                <option value="Playing">Playing</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
              </select>
              
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rating</option>
                <option value="hours">Most Hours</option>
              </select>
            </div>
          </div>
          
          <GameList 
            games={filteredGames}
            deleteGame={deleteGame}
            setEditingGame={setEditingGame}
            updateGame={updateGame}
          />
        </div>
      </div>
    </div>
  );
}

export default App;