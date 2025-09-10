// /netlify/functions/send-audiobook-email.js
import { CORS_HEADERS, handlePreflight, parseJson, ok, bad, oops, sendMail } from './_shared/email-core.js';

export const handler = async (event) => {
  console.log('📥 send-audiobook-email triggered');
  const pre = handlePreflight(event);
  if (pre) return pre;

  let body;
  try { body = parseJson(event); }
  catch (err) { console.error('❌ JSON parse error', err); return bad('Invalid JSON'); }

  const email = body?.orderSummary?.customer?.email;
  if (!email) return bad('Missing customer email');

  const subject = 'Your Audiobook: Download & Listening Setup';
  const audioZipUrl = 'https://soaw-audio-book.s3.us-east-1.amazonaws.com/premium/SourceOfAllWealth.zip';

  const text = `Thanks for your order of "The Source of All Wealth" (Audiobook).
		Download the full audiobook (ZIP • 151 MP3 chapters):
		${audioZipUrl}

		Setup help (iPhone/iPad with BookPlayer, Android with Voice Audiobook Player, Desktop):
		https://www.sourceofallwealth.com/e-book-install-instructions

		120-Day Money-Back Guarantee: reply within 120 days for a full refund.
		Support: info@sourceofallwealth.com`;

  const html = `
		<div style="font-family: Georgia, 'Times New Roman', serif; font-size:16px; color:#333; line-height:1.6;">
		  <p style="margin:0 0 16px 0;">
		    Thank you for your order of <strong>“The Source of All Wealth” (Audiobook)</strong>.
		  </p>

		  <p style="margin:0 0 16px 0;">
		    🎧 <strong>Your Audiobook (ZIP • 151 MP3 chapters):</strong><br>
		    <a href="${audioZipUrl}" style="color:#0056b3; text-decoration:underline;">Click here to download</a>
		  </p>

		  <p style="margin:0 0 8px 0;">
		    After download, unzip the file to reveal the MP3 tracks. Then:
		  </p>
		  <ul style="margin:0 0 16px 20px; padding:0;">
		    <li><strong>iPhone/iPad:</strong> Use the <em>Files</em> app to unzip, then import the folder into <em>BookPlayer</em> (free).</li>
		    <li><strong>Android:</strong> Use your file manager to extract, then open the folder in <em>Voice Audiobook Player</em> (free) or your preferred player.</li>
		    <li><strong>Desktop:</strong> Extract and play in your preferred player (e.g., Apple Music, VLC), or sync to your phone.</li>
		  </ul>

		  <p style="margin:0 0 16px 0;">
		    For step-by-step guides (screenshots included), <a href="https://www.sourceofallwealth.com/e-book-install-instructions" style="color:#0056b3; text-decoration:underline;">click here</a>.
		  </p>

		  <p style="margin:0 0 16px 0; font-size:14px; color:#555;">
		    <strong>120-Day Money-Back Guarantee:</strong> If the audiobook isn’t for you, reply within 120 days for a full refund.
		  </p>

		  <hr style="border:none; border-top:1px solid #ddd; margin:16px 0;">

		  <p style="margin:0; font-size:14px; color:#555;">
		    Order support: <a href="mailto:info@sourceofallwealth.com" style="color:#0056b3; text-decoration:underline;">info@sourceofallwealth.com</a>
		  </p>
		</div>`.trim();

  try {
    await sendMail(email, subject, html, text);
    return ok({ message: 'Audiobook email sent' });
  } catch (err) {
    console.error('🚨 Mailgun error:', err);
    return oops('Email failed to send', err);
  }
};
