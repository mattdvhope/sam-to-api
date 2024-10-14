import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

const getListOfWebhooks = async () => {

  const { apiBaseURL, myHeaders } = await getApiConfig();

  try {
    const response = await axios.get(
      `${apiBaseURL}webhooks/`,
      { headers: myHeaders }
    );

    return response.data;
    
  } catch (errorData) {
    console.error(showErrors(errorData));
  }

};

export default getListOfWebhooks;