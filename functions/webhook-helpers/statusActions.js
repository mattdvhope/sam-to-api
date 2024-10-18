// src/statusActions.js

import { 
    productionDelayedHtml, 
    productionReadyHtml, 
    inProductionHtml, 
    shippedHtml 
} from './statusContent.js'; // Adjust the path as necessary

const statusActions = {
    PRODUCTION_DELAYED: {
        subject: "Your book is on the docket to be printed!",
        body: productionDelayedHtml // Replace with the imported HTML
    },
    PRODUCTION_READY: {
        subject: "Printing of book begins soon!!",
        body: productionReadyHtml // Replace with the imported HTML
    },
    IN_PRODUCTION: {
        subject: "Your book is being printed now!!",
        body: inProductionHtml // Replace with the imported HTML
    },
    SHIPPED: {
        subject: "Your book has been shipped!!",
        body: shippedHtml // Replace with the imported HTML
    },
};

export { statusActions };
