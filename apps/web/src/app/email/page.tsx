import { render } from '@react-email/components';
import PasswordResetEmail from '@repo/transactional/emails/reset-password/password-reset';
// Utiliser un composant client pour l'affichage du HTML
import { EmailRenderer } from './email-renderer';

export default async function Page() {
  // Rendre l'email côté serveur
  const emailHTML = await render(PasswordResetEmail({ userEmail: 'youpie@gmail.com', resetUrl: 'https://example.com/reset-password?token=abc123xyz78954548745151' }));

  return <EmailRenderer html={emailHTML} />;
}