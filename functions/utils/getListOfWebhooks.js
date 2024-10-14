import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showLuluErrors from './showLuluErrors';

const getListOfWebhooks = async () => {

  const { apiBaseURL, myHeaders } = await getApiConfig();

  try {
    const response = await axios.get(
      `${apiBaseURL}webhooks/`,
      { headers: myHeaders }
    );

    console.log(response.data);
    
  } catch (errorData) {
    console.error(showLuluErrors(errorData));
  }

};

export default getListOfWebhooks;