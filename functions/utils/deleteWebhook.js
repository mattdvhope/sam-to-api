import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

const deleteWebhook = async () => {
  
  const { apiBaseURL, myHeaders } = await getApiConfig();

  try {
    const response = await axios.delete(
      `${apiBaseURL}webhooks/4f158c8c-df06-496f-a056-3ab1855ae520`,
      { headers: myHeaders }
    );
    
    console.log(response.data);

  } catch (errorData) {
    console.error(showErrors(errorData));
  }

};

export default deleteWebhook;