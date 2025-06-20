// Import des fonctions du package transactional (uniquement celles commencant par reSend ou send)

"use client";

import { sendNetlifyWelcomeEmail, sendPasswordResetEmail, sendWelcomeEmail } from '@d3n/transactional';
import { useState } from 'react';

export default function EmailTestPage() {
  // État pour stocker l'adresse email de test
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(true); // Par défaut en mode test

  // Fonction pour gérer l'envoi d'un email de bienvenue
  const handleSendWelcomeEmail = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Veuillez saisir une adresse email' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await sendWelcomeEmail({
        to: email,
        props: {
          name: 'Utilisateur Test',
          actionUrl: 'https://example.com/get-started'
        },
        test: testMode // Utilise la valeur de l'état testMode
      });
      setStatus({ type: 'success', message: 'Email de bienvenue envoyé avec succès!' });
    } catch (error) {
      setStatus({ type: 'error', message: `Erreur lors de l'envoi: ${error instanceof Error ? error.message : String(error)}` });
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer l'envoi d'un email de réinitialisation de mot de passe
  const handleSendPasswordResetEmail = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Veuillez saisir une adresse email' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await sendPasswordResetEmail({
        to: email,
        props: {
          userEmail: email,
          resetUrl: 'https://example.com/reset-password?token=sample-token'
        },
        test: testMode // Utilise la valeur de l'état testMode
      });
      setStatus({ type: 'success', message: 'Email de réinitialisation de mot de passe envoyé avec succès!' });
    } catch (error) {
      setStatus({ type: 'error', message: `Erreur lors de l'envoi: ${error instanceof Error ? error.message : String(error)}` });
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer l'envoi d'un email de bienvenue Netlify
  const handleSendNetlifyWelcomeEmail = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Veuillez saisir une adresse email' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await sendNetlifyWelcomeEmail({
        to: email,
        props: {
          name: 'Utilisateur Test',
          teamName: 'Équipe Test',
          actionUrl: 'https://example.com/netlify-dashboard'
        },
        test: testMode // Utilise la valeur de l'état testMode
      });
      setStatus({ type: 'success', message: 'Email de bienvenue Netlify envoyé avec succès!' });
    } catch (error) {
      setStatus({ type: 'error', message: `Erreur lors de l'envoi: ${error instanceof Error ? error.message : String(error)}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test des fonctions d'envoi d'emails</h1>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">Adresse email de test</label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@example.com"
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="testMode"
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="testMode" className="text-sm">Mode test</label>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {testMode
            ? "En mode test, les emails sont envoyés à delivered@resend.dev au lieu de l'adresse spécifiée"
            : "Les emails seront envoyés à l'adresse email spécifiée ci-dessus"}
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={handleSendWelcomeEmail}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer un email de bienvenue'}
        </button>

        <button
          onClick={handleSendPasswordResetEmail}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer un email de réinitialisation de mot de passe'}
        </button>

        <button
          onClick={handleSendNetlifyWelcomeEmail}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer un email de bienvenue Netlify'}
        </button>
      </div>

      {status && (
        <div className={`p-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Informations</h2>
        <p className="mb-2">Cette page permet de tester les trois fonctions d'envoi d'emails du package transactional :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><code>sendWelcomeEmail</code> - Email de bienvenue standard</li>
          <li><code>sendPasswordResetEmail</code> - Email de réinitialisation de mot de passe</li>
          <li><code>sendNetlifyWelcomeEmail</code> - Email de bienvenue pour Netlify</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">
          Note: Assurez-vous que la clé API Resend est configurée dans le fichier .env pour que les emails fonctionnent correctement.
        </p>
      </div>
    </div>
  );
}
