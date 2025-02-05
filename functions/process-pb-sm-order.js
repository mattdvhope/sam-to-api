// app/functions/process-pb-sm-order.js
import createPbSmPrintJob from './utils/createPbSmPrintJob';
import handleOrder from './utils/handleOrder';

exports.handler = async (event) => {
    return handleOrder(event, createPbSmPrintJob);
};
