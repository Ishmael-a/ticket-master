import { resend } from "@/lib/resend";
import EmailPasswordReset from "@/emails/password/email-password-reset";


export const sendEmailPasswordReset = async (
    username: string,
    email: string,
    passwordResetLink: string
) => {
    return await resend.emails.send({
      from: "no-reply@app.ishmaelsroadstonextapp.com",
      to: email,
      subject: "Password Reset from TicketMaster",
      react: <EmailPasswordReset toName={username} url={passwordResetLink} />,
    });
}