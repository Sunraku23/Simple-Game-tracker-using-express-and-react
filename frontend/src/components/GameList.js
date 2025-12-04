import React from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

const GameList = ({ games, deleteGame, setEditingGame, updateGame }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Wishlist': return '#ffd700';
      case 'Playing': return '#4CAF50';
      case 'Completed': return '#2196F3';
      case 'Dropped': return '#f44336';
      default: return '#666';
    }
  };

  const handleStatusChange = async (gameId, newStatus) => {
    const game = games.find(g => g._id === gameId);
    if (game) {
      await updateGame(gameId, { ...game, status: newStatus });
    }
  };

  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p className="empty-message">No games found. Add your first game!</p>
      ) : (
        <div className="games-grid">
          {games.map(game => (
            <div key={game._id} className="game-card">
              <div className="game-card-header">
                <h3>{game.title}</h3>
                <div className="game-actions">
                  <button onClick={() => setEditingGame(game)} className="icon-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteGame(game._id)} className="icon-btn delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="game-info">
                <div className="game-tags">
                  <span className="platform-tag">{game.platform}</span>
                  <span className="genre-tag">{game.genre}</span>
                </div>
                
                <div className="game-stats">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < game.rating ? 'star filled' : 'star'} />
                    ))}
                  </div>
                  <div className="hours">
                    ⏱️ {game.hoursPlayed}h
                  </div>
                </div>
              </div>
              
              <div className="status-section">
                <div className="status-selector">
                  {['Wishlist', 'Playing', 'Completed', 'Dropped'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(game._id, status)}
                      className={`status-btn ${game.status === status ? 'active' : ''}`}
                      style={game.status === status ? { 
                        backgroundColor: getStatusColor(status),
                        color: 'white'
                      } : {}}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              {game.notes && (
                <div className="game-notes">
                  <p>{game.notes}</p>
                </div>
              )}
              
              <div className="game-footer">
                <small>Added: {new Date(game.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameList;