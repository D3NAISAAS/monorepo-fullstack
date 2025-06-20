import { Resend } from "resend";

console.log("Votre clé API Resend est dans le client :", process.env.RESEND_API_KEY);
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
