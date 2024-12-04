import { tryCatch } from "@/helpers";
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  return tryCatch(async () => {
    const res = await request.json();
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: res.subject,
      html: res.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return Response.json(info);
  })
}