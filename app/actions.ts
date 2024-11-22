'use server'

import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('RESEND_API_KEY is not set in the environment variables');
  throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(resendApiKey);

export async function uploadAndSendEmail(formData: FormData) {
  const file = formData.get('csvFile') as File
  const userEmail = formData.get('email') as string

  if (!file || !userEmail) {
    return { success: false, message: 'Missing file or email' }
  }

  const fileBuffer = await file.arrayBuffer()
  const fileContent = Buffer.from(fileBuffer).toString('base64')

  try {
    // Send to specified emails
    await resend.emails.send({
      from: 'REVI <onboarding@resend.dev>',
      to: ['nathan.mccarley@infoscout.ai', 'cto@infoscout.ai'],
      subject: 'New CSV File Uploaded',
      text: `A new CSV file has been uploaded by ${userEmail}`,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
        },
      ],
    })

    // Send to user's email
    await resend.emails.send({
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
    })

    return { success: true, message: 'File uploaded and emails sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Error sending email: ' + (error instanceof Error ? error.message : String(error)) }
  }
}
