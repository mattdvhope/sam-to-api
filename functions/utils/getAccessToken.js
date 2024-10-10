import axios from 'axios'; // Directly import axios

const getAccessToken = async () => {
  const apiBaseURL = process.env.SAM_SANDBOX_PRINT_JOBS;

  const url = `${apiBaseURL}${process.env.SAM_LULU_AUTH}`; // Use the correct path

  const data = new URLSearchParams({
    'grant_type': process.env.SAM_GRANT_TYPE,
  });

  const headers = {
    'Content-Type': process.env.SAM_CONTENT_TYPE,
    'Authorization': `Basic ${process.env.SAM_ENCODED}`,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to retrieve access token');
  }
}; // Missing closing brace added here

export default getAccessToken;
