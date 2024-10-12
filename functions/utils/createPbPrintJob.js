// functions/utils/createPbPrintJob.js
import createPrintJob from './createPrintJob'; // Import the new function

const createPbPrintJob = async (orderSummary) => {
    const books = [];
    books.push({
        cover: process.env.SAM_PB_CV,
        interior: process.env.SAM_PB_IN,
        podPackageId: process.env.SAM_PB_PPI,
    });

    const shippingLevel = "MAIL";

    return createPrintJob(orderSummary, books, shippingLevel);
};

export default createPbPrintJob;
