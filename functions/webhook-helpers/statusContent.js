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
            ${bodyContent}
            <img src="https://drive.google.com/uc?id=1xjc3AQolPR3UZvdJ3h5b0pcaZymkySMg" alt="Book Cover" style="width: 100%; height: auto;"/>
        </body>
    </html>
`;

export const productionDelayedHtml = createHtmlContent(
    "Your copy of <u>The Source of All Wealth</u> is on the docket for printing!!",
    `
        <p class="paragraph">
            I wanted to let you know that your book is on the docket and will head toward the <b>PRINTING PRESSES</b> soon!.
        </p>
        <p class="paragraph">
            <b>You can look forward to a top quality "print-on-demand" copy of <u>The Source of All Wealth</u> coming your way!</b>
        </p>
        <p class="paragraph">
            If you have any questions or concerns... or just want to say "Hello!" ...please write to me, Matt Malone, at info@sourceofallwealth.com! I'll write back to you personally!
        </p>
    `
);

export const productionReadyHtml = createHtmlContent(
    "Your copy of <u>The Source of All Wealth</u> will move into the big printing press room shortly!",
    `
        <p class="paragraph">
            I'll keep you posted on its progress. I take great pride in ensuring that you receive a <b>carefully crafted, top quality 665-page page-turner</b> that you will thoroughly ENJOY!
        </p>
        <p class="paragraph">
            If you have any questions or concerns... or just want to say "Hello!" ...please write to me, Matt Malone, at info@sourceofallwealth.com! I'll write back to you personally!
        </p>
    `
);

export const inProductionHtml = createHtmlContent(
    "Your copy of <u>The Source of All Wealth</u> is <i>Going to Press</i> Now!",
    `
        <p class="paragraph">
            Good news! Your copy of <u>The Source of All Wealth</u> is now in the big printing press room! <b>Ink & Paper will MEET</b> in this huge noisy place!
        </p>
        <p class="paragraph">
            I'll let you know when it gets on the truck for <b>SHIPPING</b> to you!
        </p>
        <p class="paragraph">
            If you have any questions or concerns... or just want to say "Hello!" ...please write to me, Matt Malone, at info@sourceofallwealth.com! I'll write back to you personally!
        </p>
    `
);

export const shippedHtml = createHtmlContent(
    "Hooray!! Your copy of <u>The Source of All Wealth</u> has Shipped!!",
    `
        <p class="paragraph">
            You can expect it to arrive at your address in a little over a week. Once you read it... or even before them! ...I'd love to hear from you!
        </p>
        <p class="paragraph">
            If you have any questions or concerns... or just want to say "Hello!" ...please write to me, Matt Malone, at info@sourceofallwealth.com! I'll write back to you personally!
        </p>
    `
);
