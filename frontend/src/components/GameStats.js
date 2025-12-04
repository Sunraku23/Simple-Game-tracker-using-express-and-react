import React, { useState, useEffect } from 'react';

const GameStats = ({ games }) => {
  const [stats, setStats] = useState({
    byStatus: {},
    totalGames: 0,
    totalHours: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const byStatus = {};
      let totalHours = 0;
      
      games.forEach(game => {
        byStatus[game.status] = (byStatus[game.status] || 0) + 1;
        totalHours += game.hoursPlayed;
      });

      setStats({
        byStatus,
        totalGames: games.length,
        totalHours
      });
    };

    calculateStats();
  }, [games]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Wishlist': return '#ffd700';
      case 'Playing': return '#4CAF50';
      case 'Completed': return '#2196F3';
      case 'Dropped': return '#f44336';
      default: return '#666';
    }
  };

  const statusOrder = ['Wishlist', 'Playing', 'Completed', 'Dropped'];

  return (
    <div className="game-stats">
      <h2>📊 Game Stats</h2>
      
      <div className="stat-cards-container">
        <div className="stat-card total">
          <h3>Total Games</h3>
          <p className="stat-number">{stats.totalGames}</p>
        </div>
        
        <div className="stat-card hours">
          <h3>Total Hours</h3>
          <p className="stat-number">{stats.totalHours}h</p>
        </div>
      </div>
      
      <div className="status-stats">
        <h3>By Status</h3>
        <div className="status-grid">
          {statusOrder.map(status => (
            <div key={status} className="status-item">
              <span 
                className="status-dot" 
                style={{ backgroundColor: getStatusColor(status) }}
              ></span>
              <span className="status-label">{status}</span>
              <span className="status-count">{stats.byStatus[status] || 0}</span>
            </div>
          ))}
        </div>
      </div>
      
      {stats.totalGames > 0 && (
        <div className="completion-rate">
          <h3>Completion Rate</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${(stats.byStatus['Completed'] || 0) / stats.totalGames * 100}%` 
              }}
            ></div>
          </div>
          <p className="percentage">
            {Math.round((stats.byStatus['Completed'] || 0) / stats.totalGames * 100)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default GameStats;