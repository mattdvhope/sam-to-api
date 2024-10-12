// app/functions/process-order.js
import createPrintJob from './utils/createPrintJob';
import handleOrder from './utils/handleOrder'; // Import the handleOrder function

exports.handler = async (event) => {
    // Call the handleOrder function, passing the event and createPrintJob function
    return handleOrder(event, createPrintJob);
};
