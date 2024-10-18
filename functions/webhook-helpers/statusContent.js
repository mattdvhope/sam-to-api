// statusContent.js

const createHtmlContent = (heading, bodyContent) => `
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Anton&family=Palatino+Linotype&display=swap" rel="stylesheet">
            <style>
                h1 {
                    font-family: 'Anton', sans-serif;
                    font-weight: bold; /* Anton is already bold */
                }
                p {
                    font-family: 'Palatino Linotype', serif;
                }
            </style>
        </head>
        <body>
            <h1 class="heading">${heading}</h1>
            <img src="https://drive.google.com/uc?id=1xjc3AQolPR3UZvdJ3h5b0pcaZymkySMg" alt="Book Cover" style="width: 100%; height: auto;"/>
            ${bodyContent}
        </body>
    </html>
`;

export const productionDelayedHtml = createHtmlContent(
    "Your book printing is in the docket!!",
    `
        <p class="paragraph">
            We wanted to let you know that your book is on the docket and will get on schedule for printing soon!.
        </p>
        <p><b>You can look forward to a high quality "print on demand" job starting soon.</b></p>
        <p>If you have any questions or concerns, please write to info@sourceofallwealth.com!</p>
    `
);

export const productionReadyHtml = createHtmlContent(
    "Getting ready to print your book!",
    `
        <p class="paragraph">
            Good news! Your book will be ready for printing soon. 
            We will keep you updated on the progress.
        </p>
        <p><b>We will take extra care in crafting a worldclass book for you!</b></p>
        <p>If you have any questions or concerns, please write to info@sourceofallwealth.com!</p>
    `
);

export const inProductionHtml = createHtmlContent(
    "Your Book is Going to Press Now!",
    `
        <p class="paragraph">
            Good news! Your book is now in production. 
            We will let you know when we ship it!
        </p>
        <p><b>We take pride in our workmanship!</b></p>
        <p>If you have any questions or concerns, please write to info@sourceofallwealth.com!</p>
    `
);

export const shippedHtml = createHtmlContent(
    "Your Book has Shipped!!",
    `
        <p class="paragraph">
            Good news! Your book has been shipped! 
            You can expect it in a little over a week.
        </p>
        <p><b>We take pride in our workmanship!</b></p>
        <p>If you have any questions or concerns, please write to info@sourceofallwealth.com!</p>
    `
);
