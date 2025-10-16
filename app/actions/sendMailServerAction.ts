// 'use server';

// import nodemailer from 'nodemailer';

// async function sendEmail(fullname: string, email: string, message: string) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.NODEMAILER_HOST,
//       port: parseInt(process.env.NODEMAILER_PORT!),
//       auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.USER_MAILER,
//       to: process.env.USER_TO,
//       subject: `${fullname} sent you a message`,
//       html: `
//       <h1>Message from ${fullname}</h1>
//       <p>Email: ${email}</p>
//       <p>${message}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     return {
//       success: "Message sent successfully, I'll get back to you soon. 🤖",
//     };
//   } catch (error: any) {
//     return {
//       error:
//         'There seems a problem with the email service, please try again later. 🤖',
//     };
//   }
// }

// export async function sendMessageServerAction(
//   _previousState: any,
//   formData: FormData
// ) {
//   // Validate inputs first
//   const fullname = (formData.get('fullname') as string)?.trim();
//   const email = (formData.get('email') as string)?.trim();
//   const message = (formData.get('message') as string)?.trim();

//   // validate fullname
//   if (fullname?.length <= 2) {
//     return {
//       fullnameError:
//         'Wow, your name seems to be in stealth mode! 😄 How about unleashing the full version this time?',
//     };
//   }

//   // validate email using regex
//   if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//     return {
//       emailError:
//         'Oops! Looks like your email just threw a curveball at my regex skills 😅. Let’s give it another shot—what do you say?',
//     };
//   }

//   // validate message
//   if (message?.length <= 10) {
//     return {
//       messageError: 'That’s a bit brief! 😅 Let it flow—share the whole story!',
//     };
//   }

//   // If validation passes, try to send email
//   try {
//     const response = await sendEmail(fullname, email, message);
//     console.log('Response: ', response);
//     if (response.success) {
//       return {
//         success: "Message sent successfully, I'll get back to you soon. 🤖",
//       };
//     }
//     return {
//       error: 'Something went wrong, please try again later. 🤖',
//     };
//   } catch (error: any) {
//     return {
//       error: 'Something went wrong, please try again later. 🤖',
//     };
//   }
// }
'use server';

import nodemailer from 'nodemailer';

// Helper function to send the email
async function sendEmail(fullname: string, email: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_TO || process.env.GMAIL_USER,
      subject: `${fullname} sent you a message`,
      html: `
        <h1>Message from ${fullname}</h1>
        <p>Email: ${email}</p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: "Message sent successfully, I'll get back to you soon. 🤖",
    };
  } catch (error: any) {
    console.error('Mail sending error:', error);
    return {
      error: 'There seems a problem with the email service, please try again later. 🤖',
    };
  }
}

// Server Action used by your contact form
export async function sendMessageServerAction(
  _previousState: any,
  formData: FormData
) {
  const fullname = (formData.get('fullname') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  // Input validations
  if (!fullname || fullname.length <= 2) {
    return {
      fullnameError: 'Please enter a valid name (at least 3 characters).',
    };
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return {
      emailError: 'Please enter a valid email address.',
    };
  }

  if (!message || message.length <= 10) {
    return {
      messageError: 'Message should be at least 10 characters long.',
    };
  }

  // Send email
  const response = await sendEmail(fullname, email, message);
  return response;
}
