import { resend } from "@/lib/resend";
import EmailVerification from "@/emails/auth/email-verification";


export const sendEmailVerification = async (
    username: string,
    email: string,
    verificationCode: string
) => {
    return await resend.emails.send({
      from: "no-reply@app.ishmaelsroadstonextapp.com",
      to: email,
      subject: "Email Verification from TicketMaster",
      react: <EmailVerification toName={username} code={verificationCode} />,
    });
}