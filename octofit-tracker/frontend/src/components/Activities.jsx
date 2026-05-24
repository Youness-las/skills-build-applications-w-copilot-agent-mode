import { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchActivities();
  }, [page]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/activities?page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching activities');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    const icons = {
      running: '🏃',
      cycling: '🚴',
      swimming: '🏊',
      gym: '🏋️',
      yoga: '🧘',
      walking: '🚶',
      other: '💪'
    };
    return icons[type] || '💪';
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 Activities</h2>
      <div className="row">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {getActivityIcon(activity.type)} {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </h5>
                  <ul className="list-unstyled">
                    <li><strong>Duration:</strong> {activity.duration} min</li>
                    <li><strong>Calories:</strong> {activity.calories} kcal</li>
                    {activity.distance > 0 && <li><strong>Distance:</strong> {activity.distance} km</li>}
                    {activity.notes && <li><strong>Notes:</strong> {activity.notes}</li>}
                  </ul>
                </div>
                <div className="card-footer bg-light">
                  <small>{new Date(activity.date).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No activities found</div>
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

export default Activities;
