import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'
import './App.css'

function HomePage() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 mb-4">🐙 OctoFit Tracker</h1>
      <p className="lead mb-5">
        Welcome to your ultimate fitness tracking application. 
        Track activities, compete with teams, and reach your fitness goals!
      </p>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📊 Track Activities</h5>
              <p className="card-text">Log and monitor your daily workouts</p>
              <Link to="/activities" className="btn btn-primary">View Activities</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">Compete and climb the rankings</p>
              <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">Discover new workout programs</p>
              <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">© 2026 OctoFit Tracker. Build your fitness journey with GitHub Copilot! 🚀</p>
      </footer>
    </Router>
  )
}

export default App
