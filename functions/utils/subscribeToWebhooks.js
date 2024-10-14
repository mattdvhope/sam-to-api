import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

const subscribeToWebhooks = async () => {

  console.log("handleOrder is invoking subscribeToWebhooks");
  
  const { apiBaseURL, myHeaders } = await getApiConfig();

  console.log("Base URL: ", apiBaseURL);
  console.log("My Headers: ", myHeaders);
  console.log("URL to process webhooks: ", process.env.URL_TO_PROCESS_WEBHOOK)

  const requestBody = {
    "topics": [
      "PRINT_JOB_STATUS_CHANGED"
    ],
    "url": process.env.URL_TO_PROCESS_WEBHOOK
  };

  try {
    const response = await axios.post(
      `${apiBaseURL}webhooks/`,
      requestBody,
      { headers: myHeaders }
    );
    
    console.log(response.data);

  } catch (errorData) {
    console.error(showErrors(errorData));
  }

};

export default subscribeToWebhooks;
