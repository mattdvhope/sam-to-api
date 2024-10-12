// functions/utils/createHcPrintJob.js
import createPrintJob from './createPrintJob'; // Import the new function

const createHcPrintJob = async (orderSummary) => {
    const books = [];
    books.push({
        cover: process.env.SAM_HC_CV,
        interior: process.env.SAM_HC_IN,
        podPackageId: process.env.SAM_HC_PPI,
    });

    const shippingLevel = "MAIL";

    return createPrintJob(orderSummary, books, shippingLevel);
};

export default createHcPrintJob;
