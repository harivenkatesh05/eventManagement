import nodemailer from 'nodemailer';
export const sendMail = async ({
  firstName,
  lastName,
  purchaseId,
}: {
  firstName: string;
  lastName: string;
  purchaseId: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_NODEMAILER_EMAIL,
      pass: process.env.NEXT_NODEMAILER_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NEXT_NODEMAILER_EMAIL,
    to: 'santhosht2412@gmail.com',
    subject: 'Sending Email using Node.js',
    html: `
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              color: #333;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              border: 1px solid #ddd;
              overflow: hidden;
          }
          .header {
              background-color: #4CAF50;
              color: #ffffff;
              text-align: center;
              padding: 20px;
          }
          .content {
              padding: 20px;
          }
          .content p {
              margin-bottom: 15px;
              font-size: 16px;
          }
          .booking-details {
              background-color: #f4f4f9;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
          }
          .footer {
              text-align: center;
              padding: 10px;
              font-size: 14px;
              color: #666;
              background-color: #f4f4f9;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <!-- Header Section -->
          <div class="header">
              <h1>Booking Confirmation</h1>
          </div>
  
          <!-- Content Section -->
          <div class="content">
              <p>Hi ${firstName} ${lastName}1,</p>
              <p>Thank you for booking with us. We are happy to confirm your booking details as follows:</p>
  
              <div class="booking-details">
                  <p><strong>Booking ID:</strong> ${purchaseId}</p>
                  <p><strong>Date:</strong> {{booking_date}}</p>
                  <p><strong>Time:</strong> {{booking_time}}</p>
                  <p><strong>Service:</strong> {{service_name}}</p>
                  <p><strong>Location:</strong> {{location}}</p>
              </div>
  
              <p>If you have any questions, feel free to reply to this email or contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.</p>
              <p>Thank you for choosing {{company_name}}.</p>
          </div>
  
         <!--  Footer Section -->
          <div class="footer">
              <p>© {{current_year}} {{company_name}}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('email error', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
