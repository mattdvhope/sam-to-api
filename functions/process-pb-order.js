// app/functions/process-pb-order.js
import createPbPrintJob from './utils/createPbPrintJob';
import handleOrder from './utils/handleOrder';

exports.handler = async (event) => {
    return handleOrder(event, createPbPrintJob);
};
