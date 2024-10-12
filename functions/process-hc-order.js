// app/functions/process-hc-order.js
import createHcPrintJob from './utils/createHcPrintJob';
import handleOrder from './utils/handleOrder';

exports.handler = async (event) => {
    return handleOrder(event, createHcPrintJob);
};
