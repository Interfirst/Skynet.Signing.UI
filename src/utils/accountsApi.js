import axios from 'axios';

export const getAccountsApiUrl = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (process.env.ACCOUNTS_API_BASE_URL) {
    return process.env.ACCOUNTS_API_BASE_URL;
  }

  if (NODE_ENV === 'development') {
    return 'https://dev-skynet-accounts-api.azurewebsites.net/';
  }

  if (NODE_ENV === 'production' && process.env.REACT_APP_IS_QA === 'true') {
    return 'https://qa-skynet-accounts-api.azurewebsites.net/';
  }

  if (NODE_ENV === 'production' && process.env.REACT_APP_IS_STAGE === 'true') {
    return 'https://stage-skynet-accounts-api.azurewebsites.net/';
  }

  return undefined;
};

export const axiosAccountsInstance = axios.create({
  baseURL: getAccountsApiUrl(),
});
