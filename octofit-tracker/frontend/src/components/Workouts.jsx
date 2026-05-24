import { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchWorkouts();
  }, [page]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/workouts?page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch workouts');
      const data = await response.json();
      setWorkouts(data.workouts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching workouts');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      easy: 'success',
      medium: 'warning',
      hard: 'danger'
    };
    return <span className={`badge bg-${colors[difficulty] || 'secondary'}`}>{difficulty.toUpperCase()}</span>;
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">💪 Workouts</h2>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{workout.title}</h5>
                    {getDifficultyBadge(workout.difficulty)}
                  </div>
                  <p className="card-text">{workout.description}</p>
                  <ul className="list-unstyled small">
                    <li><strong>Duration:</strong> {workout.duration} min</li>
                    <li><strong>Target Muscles:</strong> {workout.targetMuscles?.join(', ') || 'N/A'}</li>
                    <li><strong>Exercises:</strong> {workout.exercises?.length || 0}</li>
                  </ul>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mt-3">
                      <strong>Exercise List:</strong>
                      <ul className="list-unstyled small">
                        {workout.exercises.map((ex, idx) => (
                          <li key={idx}>{ex.name}: {ex.sets}×{ex.reps}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No workouts found</div>
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

export default Workouts;
