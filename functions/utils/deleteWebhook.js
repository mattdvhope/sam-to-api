import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

const deleteWebhook = async () => {
  
  const { apiBaseURL, myHeaders } = await getApiConfig();

  try {
    const response = await axios.delete(
      `${apiBaseURL}webhooks/0a1014ec-b72c-46df-ae07-f5df65c3ea2c`,
      { headers: myHeaders }
    );
    
    console.log(response.data);

  } catch (errorData) {
    console.error(showErrors(errorData));
  }

};

export default deleteWebhook;