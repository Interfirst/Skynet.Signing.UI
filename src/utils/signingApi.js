import axios from 'axios';

export const getSigningBaseApiUrl = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (NODE_ENV === 'development') {
    return 'https://dev-skynet-signing-api.azurewebsites.net';
  }

  if (NODE_ENV === 'production' && process.env.REACT_APP_IS_QA === 'true') {
    return 'https://qa-skynet-signing-api.azurewebsites.net';
  }

  if (NODE_ENV === 'production' && process.env.REACT_APP_IS_STAGE === 'true') {
    return 'https://stage-skynet-signing-api.azurewebsites.net';
  }

  if (NODE_ENV === 'production') {
    return 'https://skynet-signing-api.azurewebsites.net';
  }

  return undefined;
};

export const axiosSigningInstance = axios.create({
  baseURL: getSigningBaseApiUrl(),
});
