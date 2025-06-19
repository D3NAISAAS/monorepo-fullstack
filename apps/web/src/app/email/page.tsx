// Import the React component directly for rendering preview
import PasswordResetEmail from '@d3n/transactional/emails/default/reset-password/password-reset';
// Import NetlifyWelcomeEmail for demonstration
import { sendNetlifyWelcomeEmail, sendEmail } from '@d3n/transactional';

import { render } from '@react-email/components';
import { EmailRenderer } from './email-renderer';
import { EmailTestForm } from './email-test-form';

export default async function Page() {
  // Rendre l'email côté serveur pour prévisualisation
  const passwordResetHTML = await render(PasswordResetEmail({
    userEmail: 'exemple@email.com',
    resetUrl: 'https://example.com/reset-password?token=abc123xyz78954548745151'
  }));

  // Rendre l'email de bienvenue Netlify pour démonstration
  const netlifyWelcomeHTML = await render(NetlifyWelcomeEmail({
    steps: [
      {
        id: 1,
        Description: (
          <li className="mb-20" key={1}>
            <strong>Déployez votre premier projet.</strong> Connectez-vous à Git ou choisissez un template.
          </li>
        ),
      },
      {
        id: 2,
        Description: (
          <li className="mb-20" key={2}>
            <strong>Vérifiez vos logs de déploiement.</strong> Surveillez les erreurs potentielles.
          </li>
        ),
      },
    ],
    links: [
      { title: 'Documentation', href: 'https://docs.example.com' },
      { title: 'Support', href: 'https://support.example.com' },
    ],
  }));

  // Choisir quel template afficher par défaut
  const currentEmailHTML = netlifyWelcomeHTML; // Vous pouvez changer pour passwordResetHTML si besoin

  // Liste des templates disponibles pour le test
  const availableTemplates = [
    { name: 'password-reset', displayName: 'Réinitialisation de mot de passe' },
    { name: 'invite', displayName: 'Invitation' },
    { name: 'welcome', displayName: 'Bienvenue' },
    { name: 'netlify-welcome', displayName: 'Bienvenue Netlify' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test d&apos;emails</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Prévisualisation</h2>
          <div className="border rounded-lg overflow-hidden">
            <EmailRenderer html={currentEmailHTML} />
          </div>
        </div>

        <div>
          <EmailTestForm
            templates={availableTemplates}
            onSendEmail={async (emailData) => {
              'use server';

              const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send email');
              }

              return response.json();
            }}
          />
        </div>
      </div>
    </div>
  );
}