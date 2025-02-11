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
                    font-size: 200%;
                }
            </style>
        </head>
        <body>
            <h1 class="heading">${heading}</h1>
            ${bodyContent}
        </body>
    </html>
`;

export const productionDelayedHtml = createHtmlContent(
    "Your book is on the docket for printing!!",
    `
        <p class="paragraph">
            I wanted to let you know that your book is on the docket and will head toward the <b>PRINTING PRESSES</b> soon!.
        </p>
        <p class="paragraph">
            <b>You can look forward to a top quality "print-on-demand" edition of your new book coming your way!</b>
        </p>
        <p class="paragraph">
            If you have any questions, please write back to me, Matt Malone, at this email address, <a href="mailto:info@sourceofallwealth.com">info@sourceofallwealth.com</a>!
        </p>
    `
);

export const productionReadyHtml = createHtmlContent(
    "Your new book will be printed in the press room shortly!",
    `
        <p class="paragraph">
            I'll keep you posted on its progress. I take great pride in ensuring that you receive a <b>carefully crafted, top quality book</b> that you will thoroughly ENJOY!
        </p>
        <p class="paragraph">
            If you have any questions, please write back to me, Matt Malone, at this email address, <a href="mailto:info@sourceofallwealth.com">info@sourceofallwealth.com</a>!
        </p>
    `
);

export const inProductionHtml = createHtmlContent(
    "Your new book is <i>Going to Press</i> Now!",
    `
        <p class="paragraph">
            Good news! Your book is going to the printing press room! <b>Ink & Paper will MEET</b> in this huge noisy place!
        </p>
        <p class="paragraph">
            I'll let you know when it gets on the truck for <b>SHIPPING</b> to you!
        </p>
        <p class="paragraph">
            If you have any questions, please write back to me, Matt Malone, at this email address, <a href="mailto:info@sourceofallwealth.com">info@sourceofallwealth.com</a>!
        </p>
    `
);

export const shippedHtml = createHtmlContent(
    "Hooray!! Your book has been Shipped! It's on the way to your home!",
    `
        <p class="paragraph">
            You can expect your new book to arrive at your address in a little over a week!
        </p>
        <p class="paragraph">
            If you have any questions, please write back to me, Matt Malone, at this email address, <a href="mailto:info@sourceofallwealth.com">info@sourceofallwealth.com</a>!
        </p>
    `
);
