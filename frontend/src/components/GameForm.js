import React, { useState, useEffect } from 'react';

const GameForm = ({ addGame, updateGame, editingGame, setEditingGame }) => {
  const [formData, setFormData] = useState({
    title: '',
    platform: 'PC',
    status: 'Wishlist',
    genre: 'Action',
    rating: 3,
    hoursPlayed: 0,
    notes: ''
  });

  useEffect(() => {
    if (editingGame) {
      setFormData(editingGame);
    }
  }, [editingGame]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'hoursPlayed' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGame) {
      updateGame(editingGame._id, formData);
    } else {
      addGame(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      platform: 'PC',
      status: 'Wishlist',
      genre: 'Action',
      rating: 3,
      hoursPlayed: 0,
      notes: ''
    });
    setEditingGame(null);
  };

  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Other'];
  const genres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation', 'Puzzle', 'Horror'];
  const statuses = ['Wishlist', 'Playing', 'Completed', 'Dropped'];

  return (
    <div className="game-form">
      <h2>{editingGame ? 'Edit Game' : 'Add New Game'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Game Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Platform</label>
            <select name="platform" value={formData.platform} onChange={handleChange}>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Genre</label>
            <select name="genre" value={formData.genre} onChange={handleChange}>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Rating: {formData.rating} ⭐</label>
            <input
              type="range"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Hours Played</label>
          <input
            type="number"
            name="hoursPlayed"
            min="0"
            value={formData.hoursPlayed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingGame ? 'Update Game' : 'Add Game'}
          </button>
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;