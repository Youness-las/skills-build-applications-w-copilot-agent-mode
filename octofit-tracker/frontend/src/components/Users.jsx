import { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/users?page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👥 Users</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td><strong>{user.username}</strong></td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3" className="text-center">No users found</td></tr>
          )}
        </tbody>
      </table>
      <nav>
        <button className="btn btn-secondary me-2" onClick={() => setPage(Math.max(1, page - 1))}>Previous</button>
        <span className="me-2">Page {page}</span>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</button>
      </nav>
    </div>
  );
}

export default Users;
