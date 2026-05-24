import { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTeams();
  }, [page]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/teams?page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch teams');
      const data = await response.json();
      setTeams(data.teams || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching teams');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🏆 Teams</h2>
      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <p className="text-muted">
                    <small>Members: {team.members?.length || 0}</small>
                  </p>
                </div>
                <div className="card-footer bg-light">
                  <small>Created: {new Date(team.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No teams found</div>
        )}
      </div>
      <nav className="mt-4">
        <button className="btn btn-secondary me-2" onClick={() => setPage(Math.max(1, page - 1))}>Previous</button>
        <span className="me-2">Page {page}</span>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</button>
      </nav>
    </div>
  );
}

export default Teams;
