import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

const deleteWebhook = async (id) => {
  
  const { apiBaseURL, myHeaders } = await getApiConfig();

  try {
    const response = await axios.delete(
      `${apiBaseURL}webhooks/${id}`,
      { headers: myHeaders }
    );
    
    console.log("In Delete webhooks: ", response.data);

  } catch (errorData) {
    console.error(showErrors(errorData));
  }

};

export default deleteWebhook;