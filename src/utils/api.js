import showMessage from 'react-hot-toast';

export const catchHandler = ({ response }) => {
  const message = response.data?.error?.message || response.statusText;
  showMessage.error(message);
};

export const getAuthHeader = ({ getToken }) => `Bearer ${getToken()}`;
