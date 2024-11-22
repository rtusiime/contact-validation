'use server';

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('RESEND_API_KEY is not set in the environment variables');
  throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(resendApiKey);

export async function uploadAndSendEmail(formData: FormData) {
  const file = formData.get('csvFile') as File;
  const userEmail = formData.get('email') as string;

  console.log('File and email extracted:', { file: file?.name, userEmail });

  if (!file || !userEmail) {
    console.error('Missing file or email');
    return { success: false, message: 'Missing file or email' };
  }

  try {
    const fileBuffer = await file.arrayBuffer();
    const fileContent = Buffer.from(fileBuffer).toString('base64');

    console.log('File converted to Base64, ready for email attachment');

    // Send to specified emails
    const sendToRecipients = await resend.emails.send({
      from: 'REVI <onboarding@resend.dev>',
      to: ['nathan.mccarley@infoscout.ai', 'cto@infoscout.ai', 'rtusiime@u.rochester.edu'],
      subject: 'New CSV File Uploaded',
      text: `A new CSV file has been uploaded by ${userEmail}`,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
        },
      ],
    });

    console.log('Email sent to specified recipients:', sendToRecipients);

    // Send to user's email
    const sendToUser = await resend.emails.send({
      from: 'REVI <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Your CSV File Upload Confirmation',
      text: `Thank you for uploading your CSV file to REVI. We've attached a copy of your file for your records.`,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
        },
      ],
    });

    console.log('Confirmation email sent to user:', sendToUser);

    return { success: true, message: 'File uploaded and emails sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email: ' + (error instanceof Error ? error.message : String(error)) };
  }
}
