// utils/apiConfig.js
import getAccessToken from './getAccessToken'; // Import the function to get access token

export const getApiConfig = async () => {
  const access_token = await getAccessToken();

  const apiBaseURL =
    process.env.NODE_ENV === 'development'
      ? '/api/' // Use proxy for development
      : 'https://api.sandbox.lulu.com/'; // Direct URL for production

  const myHeaders = {
    "Authorization": `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  };

  return {
    apiBaseURL,
    myHeaders, // Include myHeaders in the return object
  };
};

