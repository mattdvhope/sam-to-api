import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showLuluErrors from './showLuluErrors';

const subscribeToWebhooks = async () => {
  
  const { apiBaseURL, myHeaders } = await getApiConfig();

  const requestBody = {
    "topics": [
      "PRINT_JOB_STATUS_CHANGED"
    ],
    "url": process.env.GATSBY_URL_THANKYOU
  };

  try {
    const response = await axios.post(
      `${apiBaseURL}webhooks/`,
      requestBody,
      { headers: myHeaders }
    );
    
    console.log(response.data);

  } catch (errorData) {
    console.error(showLuluErrors(errorData));
  }

};

export default subscribeToWebhooks;
