import { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/leaderboard?page=${page}&limit=50`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}.`;
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🏅 Leaderboard</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
            <th>Activities</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry) => (
              <tr key={entry._id} className={entry.rank <= 3 ? 'table-warning' : ''}>
                <td><strong>{getMedalEmoji(entry.rank)}</strong></td>
                <td>{entry.username}</td>
                <td><strong>{entry.totalPoints}</strong></td>
                <td>{entry.activitiesCount}</td>
                <td>{entry.totalCalories}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center">No leaderboard data</td></tr>
          )}
        </tbody>
      </table>
      <nav className="mt-4">
        <button className="btn btn-secondary me-2" onClick={() => setPage(Math.max(1, page - 1))}>Previous</button>
        <span className="me-2">Page {page}</span>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</button>
      </nav>
    </div>
  );
}

export default Leaderboard;
