/**
 * Exemple d'utilisation du système unifié de templates d'emails
 */
// Importer la fonction générée automatiquement
import { sendWelcomeEmail } from '../src/generated-templates';
// Vous pouvez aussi utiliser la fonction depuis le module principal
// import { sendWelcomeEmail } from '../src/send';

// Exemple d'envoi d'un email de bienvenue
async function sendExampleWelcomeEmail() {
  try {
    const result = await sendWelcomeEmail({
      to: 'utilisateur@example.com',
      props: {
        name: 'John Doe',
        actionUrl: 'https://example.com/dashboard'
      },
      subject: 'Bienvenue sur notre plateforme !',
      test: true // Mode test pour éviter d'envoyer réellement l'email
    });
    
    console.log('Email envoyé avec succès:', result);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

// Exécuter l'exemple
sendExampleWelcomeEmail();
