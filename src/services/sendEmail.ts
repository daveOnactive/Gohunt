import Api from './api';

export async function sendEmail(subject: string, html: string) {
  try {
    const response = await Api.post('/send-email/', {
      html,
      subject
    })
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}