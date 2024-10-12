import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

const calculatePrintCost = async () => {
  
  const { apiBaseURL, myHeaders } = await getApiConfig();

  const requestBody = {
    "line_items": [
      {
        "page_count": 32,
        "pod_package_id": "0600X0900BWSTDPB060UW444MXX",
        "quantity": 20
      },
      {
        "page_count": 324,
        "pod_package_id": "0425X0687BWSTDPB060UW444GXX",
        "quantity": 200
      }
    ],
    "shipping_address": {
      "city": "Washington",
      "country_code": "US",
      "postcode": "20540",
      "state_code": "DC",
      "street1": "101 Independence Ave SE",
      "phone_number": "+1 206 555 0100"
    },
    "shipping_option": "EXPRESS"
  };
  
  try {
    const response = await axios.post(
      `${apiBaseURL}print-job-cost-calculations/`,
      requestBody,
      { headers: myHeaders }
    );

    console.log(response.data);
    
  } catch (errorData) {
    console.error(showErrors(errorData));
  }
};

export default calculatePrintCost;
