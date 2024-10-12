import getAccessToken from './getAccessToken'; // Import the function to get access token

export const getApiConfig = async () => {
  const { access_token, apiBaseURL } = await getAccessToken(); // Get both apiBaseURL and access_token from getAccessToken

  const myHeaders = {
    "Authorization": `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  };

  return {
    apiBaseURL, // Pass the apiBaseURL along
    myHeaders,  // Include myHeaders in the return object
  };
};
