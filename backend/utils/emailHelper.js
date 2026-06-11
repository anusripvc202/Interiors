import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Send booking notification email to a designer
 * @param {Object} bookingDetails 
 * @param {string} designerEmail 
 * @param {string} designerName 
 */
export async function sendBookingNotificationEmail(bookingDetails, designerEmail, designerName) {
  const { clientName, clientEmail, clientPhone, clientNotes, spaceType, date, time, cost } = bookingDetails;

  const subject = `✦ New LuxeInteriors Booking Consultation: ${clientName} ✦`;
  
  const textContent = `
Hello ${designerName},

You have a new design consultation slot booked!

--- PROJECT DETAILS ---
Client Name:    ${clientName}
Client Email:   ${clientEmail}
Client Phone:   ${clientPhone}
Space Type:     ${spaceType}
Requested Date: ${date}
Requested Time: ${time}
Estimated Fee:  ${cost}
Client Notes:   ${clientNotes || 'None provided.'}

Please log in to your designer portal to review this consultation request and update its status.

Best regards,
LuxeInteriors Portal System
  `;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e2d4c5; padding: 20px; border-radius: 8px; background-color: #faf8f5;">
      <h2 style="color: #c9a96e; border-bottom: 2px solid #e2d4c5; padding-bottom: 10px; font-family: Georgia, serif; font-weight: normal; margin-top: 0;">New Consultation Booking Notification</h2>
      <p>Hello <strong>${designerName}</strong>,</p>
      <p>You have received a new consultation request on the LuxeInteriors marketplace. Here are the booking details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold; width: 150px;">Client Name:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold;">Client Email:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5;"><a href="mailto:${clientEmail}" style="color: #c9a96e; text-decoration: none;">${clientEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold;">Client Phone:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5;">${clientPhone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold;">Space Type:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5;">${spaceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold;">Date & Time:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5;">${date} at ${time}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold;">Estimated Budget:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; color: #c9a96e; font-weight: bold;">${cost}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5; font-weight: bold; vertical-align: top;">Client Notes:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2d4c5;">${clientNotes || '<i>None provided.</i>'}</td>
        </tr>
      </table>
      
      <p style="margin-top: 25px;">Please log in to your <strong>LuxeInteriors Designer Portal</strong> to manage this booking (start project, mark completed, or reschedule/cancel).</p>
      
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2d4c5; font-size: 0.8rem; color: #888; text-align: center;">
        This is an automated notification. Please do not reply directly to this email.
      </div>
    </div>
  `;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log(`\n======================================================`);
    console.log(`⚠️  SIMULATING EMAIL NOTIFICATION (SMTP NOT CONFIGURED)`);
    console.log(`======================================================`);
    console.log(`Recipient Email: ${designerEmail} (${designerName})`);
    console.log(`Subject:         ${subject}`);
    console.log(`Content:\n${textContent}`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user,
        pass
      }
    });

    const info = await transporter.sendMail({
      from: `"LuxeInteriors System" <${user}>`,
      to: designerEmail,
      subject,
      text: textContent,
      html: htmlContent
    });

    console.log(`✅ Real email notification sent to ${designerEmail}. MessageId: ${info.messageId}`);
    return { success: true, simulated: false, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Failed to send email to ${designerEmail} via SMTP:`, error);
    return { success: false, error: error.message };
  }
}
