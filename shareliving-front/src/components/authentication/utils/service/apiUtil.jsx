import axios from 'axios';

const BASE_URL = 'https://kdt.frontend.5th.programmers.co.kr:5003';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getAuthUser = async () => {
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  console.log('token: ', token);
  console.log('userInfo: ', userInfo);
  if (!token) {
    throw new Error('No auth token found');
  }

  try {
    const response = await api.get('/auth-user');
    if (!response.data) {
      throw new Error('No user data received');
    }
    return response.data;
  } catch (error) {
    console.error('Get auth user error:', error);
    localStorage.removeItem('token');
    throw error;
  }
};

export const createChannel = async (channelData) => {
  try {
    const response = await api.post('/channels/create', channelData);
    return response.data;
  } catch (error) {
    console.error('Create channel error:', error);
    throw error;
  }
};

export const getChannelList = async () => {
  try {
    const response = await api.get('/channels');
    return response.data;
  } catch (error) {
    console.error('Get channel list error:', error);
    throw error;
  }
};

export const getProductChannel = async (channelId, offset, limit = 20) => {
  try {
    const response = await api.get(
      `/posts/channel/${channelId}?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Get channel list error:', error);
    throw error;
  }
};

export const getKnowledgeChannel = async (channelId) => {
  try {
    const response = await api.get(`/posts/channel/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Get channel list error:', error);
    throw error;
  }
};

export const getAllSearchResult = async (keyword) => {
  try {
    const response = await api.get(`/search/all/${keyword}`);
    return response.data;
  } catch (error) {
    console.error('Get All Search Result:', error);
    throw error;
  }
};

export const getCurrentArticle = async (articleID) => {
  try {
    const response = await api.get(`/post/${articleID}`);

    return response.data;
  } catch (error) {
    console.error(`Error get load article id: ${articleID}.`);

    throw error;
  }
};

export default api;
