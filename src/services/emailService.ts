import nodemailer from "nodemailer";

interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const getBooleanEnv = (value: string | undefined): boolean => {
  return value === "true";
};

const getSmtpConfig = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASSWORD,
    EMAIL_FROM_NAME,
    EMAIL_FROM_ADDRESS,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !EMAIL_FROM_ADDRESS) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: getBooleanEnv(SMTP_SECURE),
    auth:
      SMTP_USER && SMTP_PASSWORD
        ? {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
          }
        : undefined,
    fromName: EMAIL_FROM_NAME || "Product Catalogue",
    fromAddress: EMAIL_FROM_ADDRESS,
  };
};

export const sendEmail = async (input: SendEmailInput): Promise<void> => {
  const config = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  await transporter.sendMail({
    from: `"${config.fromName}" <${config.fromAddress}>`,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });
};
