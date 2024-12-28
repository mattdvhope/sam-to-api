// app/functions/process-htftiw-order.js
import createHtftiwPrintJob from './utils/createHtftiwPrintJob';
import handleOrder from './utils/handleOrder';

exports.handler = async (event) => {
    return handleOrder(event, createHtftiwPrintJob);
};
