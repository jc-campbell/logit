import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { loginSuccess, logout } from '../slices/userSlice';
import { 
  fetchPostsStart, 
  fetchPostsSuccess, 
  fetchPostsFailure,
  setActiveTab 
} from '../slices/postsSlice';
import {
  fetchTrendsStart,
  fetchTrendsSuccess,
  fetchTrendsFailure
} from '../slices/trendsSlice';

export const MainApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentUser } = useSelector((state) => state.user);
  const { items: posts, loading: postsLoading, activeTab } = useSelector((state) => state.posts);
  const { items: trends, suggestedUsers } = useSelector((state) => state.trends);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(loginSuccess({ id: decoded.id }));
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsStart());
      try {
        const response = await fetch(`/api/posts/${activeTab}`);
        const data = await response.json();
        dispatch(fetchPostsSuccess(data));
      } catch (error) {
        dispatch(fetchPostsFailure(error.message));
      }
    };

    fetchPosts();
  }, [dispatch, activeTab]);

  useEffect(() => {
    const fetchTrends = async () => {
      dispatch(fetchTrendsStart());
      try {
        const response = await fetch('/api/trends');
        const data = await response.json();
        dispatch(fetchTrendsSuccess(data));
      } catch (error) {
        dispatch(fetchTrendsFailure(error.message));
      }
    };

    fetchTrends();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  const SidebarLink = ({ text, to }) => (
    <Link to={to} className="text-decoration-none">
      <div className="d-flex align-items-center py-2 px-3 text-dark hover-bg-light rounded">
        <span className="fs-5">{text}</span>
      </div>
    </Link>
  );

  return (
    <div className="container-md">
      <div className="row min-vh-100">
        {/* Sidebar Column */}
        <div className="col-3 border-end p-3 d-flex flex-column">
          <div className="mb-4">
            <Link to="/" className="text-decoration-none">
              <h1 className="h3 text-primary">Logit</h1>
            </Link>
          </div>
          
          <div className="d-flex flex-column flex-grow-1">
            <nav className="mb-4">
              <SidebarLink text="Home" to="/" />
              <SidebarLink text="Explore" to="/explore" />
              <SidebarLink text="Notifications" to="/notifications" />
              <SidebarLink text="Bookmarks" to="/bookmarks" />
            </nav>
            
            <div className="mt-auto">
              {currentUser ? (
                <>
                  <Link to="/profile" className="text-decoration-none">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <img
                        src="/api/placeholder/40/40"
                        className="rounded-circle me-2"
                        alt="Profile"
                      />
                      <div>
                        <div className="fw-bold">{currentUser.username}</div>
                        <div className="text-muted">@{currentUser.handle}</div>
                      </div>
                    </div>
                  </Link>
                  <button 
                    className="btn btn-link text-decoration-none text-dark w-100 text-start mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="d-grid gap-2">
                  <Link to="/login" className="btn btn-primary">Login</Link>
                  <Link to="/register" className="btn btn-outline-primary">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Column */}
        <div className="col-6 border-end p-0">
          <div className="border-bottom">
            <div className="d-flex">
              <button
                className={`flex-grow-1 btn btn-link text-decoration-none px-4 py-3 ${
                  activeTab === 'for-you' ? 'fw-bold border-bottom border-primary border-3' : ''
                }`}
                onClick={() => dispatch(setActiveTab('for-you'))}
              >
                For You
              </button>
              <button
                className={`flex-grow-1 btn btn-link text-decoration-none px-4 py-3 ${
                  activeTab === 'trending' ? 'fw-bold border-bottom border-primary border-3' : ''
                }`}
                onClick={() => dispatch(setActiveTab('trending'))}
              >
                Trending
              </button>
            </div>
          </div>

          <div className="p-3">
            {postsLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {posts.map(post => (
                  <div key={post.id} className="card">
                    <div className="card-body">
                      <div className="d-flex mb-2">
                        <img
                          src="/api/placeholder/40/40"
                          className="rounded-circle me-2"
                          alt={post.author.username}
                        />
                        <div>
                          <div className="fw-bold">{post.author.username}</div>
                          <div className="text-muted small">@{post.author.handle}</div>
                        </div>
                      </div>
                      <p className="card-text">{post.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trending Column */}
        <div className="col-3 p-3">
          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header bg-white">
              <h6 className="mb-0">Trending Topics</h6>
            </div>
            <div className="list-group list-group-flush">
              {trends.map(trend => (
                <a 
                  key={trend.id} 
                  href="#" 
                  className="list-group-item list-group-item-action"
                >
                  <div className="text-muted small">Trending in {trend.category}</div>
                  <div className="fw-bold">#{trend.tag}</div>
                  <div className="text-muted small">{trend.postCount} posts</div>
                </a>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white">
              <h6 className="mb-0">Who to Follow</h6>
            </div>
            <div className="list-group list-group-flush">
              {suggestedUsers.map(user => (
                <div key={user.id} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <img
                      src="/api/placeholder/40/40"
                      className="rounded-circle me-2"
                      alt={user.username}
                    />
                    <div className="flex-grow-1">
                      <div className="fw-bold">{user.username}</div>
                      <div className="text-muted small">@{user.handle}</div>
                    </div>
                    <button className="btn btn-outline-primary btn-sm">Follow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};