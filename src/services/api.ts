import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const register = (email: string, password: string) =>
  axios.post(`${API_BASE}/users/register`, { email, password });

export const login = (email: string, password: string) =>
  axios.post(`${API_BASE}/users/login`, new URLSearchParams({ username: email, password }));

export const getProfile = (token: string) =>
  axios.get(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${token}` } });

export const getBrands = (token: string) =>
  axios.get(`${API_BASE}/brands`, { headers: { Authorization: `Bearer ${token}` } });

export const addBrand = (token: string, name: string, domain: string) =>
  axios.post(`${API_BASE}/brands`, { name, domain }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteBrand = (token: string, brandId: number) =>
  axios.delete(`${API_BASE}/brands/${brandId}`, { headers: { Authorization: `Bearer ${token}` } });

export const getAlerts = (token: string) =>
  axios.get(`${API_BASE}/alerts`, { headers: { Authorization: `Bearer ${token}` } });

export const getAlert = (token: string, alertId: number) =>
  axios.get(`${API_BASE}/alerts/${alertId}`, { headers: { Authorization: `Bearer ${token}` } });

export const markAlertRead = (token: string, alertId: number) =>
  axios.post(`${API_BASE}/alerts/mark_read`, { alert_id: alertId }, { headers: { Authorization: `Bearer ${token}` } });
