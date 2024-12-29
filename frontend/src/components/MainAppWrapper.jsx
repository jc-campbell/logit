import React from 'react';
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

import MainApp from './MainApp.jsx';
import SideBar from './Sidebar.jsx';
import AppBar from './AppBar.jsx';

import '../styles/MainAppWrapper.css';

export const MainAppWrapper = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(loginSuccess({ username: decoded.username }));
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <main id="app-wrapper">
      <AppBar />
      <div className='overflow-auto position-relative'>
        <SideBar />
        <MainApp />
      </div>
    </main>
  )
}