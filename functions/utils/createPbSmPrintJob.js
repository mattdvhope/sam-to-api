// functions/utils/createPbSmPrintJob.js
import createPrintJob from './createPrintJob';

const createPbSmPrintJob = async (orderSummary) => {
    const books = [];
    books.push({
        cover: process.env.SAM_PB_SM_CV,
        interior: process.env.SAM_PB_SM_IN,
        podPackageId: process.env.SAM_PB_SM_PPI,
    });

    const shippingLevel = "MAIL";

    return createPrintJob(orderSummary, books, shippingLevel);
};

export default createPbSmPrintJob;
