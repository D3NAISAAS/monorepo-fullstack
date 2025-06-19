/**
 * FICHIER GÉNÉRÉ AUTOMATIQUEMENT
 * NE PAS MODIFIER DIRECTEMENT
 * 
 * Ce fichier est généré par le script discover-templates.ts
 * Pour ajouter de nouveaux templates, créez simplement un nouveau fichier .tsx
 * dans le dossier emails/standard/ et exécutez le script.
 */

import { createTemplate } from './templates';
import { createStandardEmailSender } from './send';

// Templates du dossier standard
import NetlifyWelcomeEmail, { type NetlifyWelcomeEmailProps } from "../emails/standard/netlify-welcome";
import PasswordResetEmail, { type PasswordResetEmailProps } from "../emails/standard/password-reset";
import WelcomeEmail, { type WelcomeEmailProps } from "../emails/standard/welcome";

// Alias de types pour la compatibilité
type NetlifyWelcomeProps = NetlifyWelcomeEmailProps;
type PasswordResetProps = PasswordResetEmailProps;
type WelcomeProps = WelcomeEmailProps;

// Templates générés automatiquement
export const generatedTemplates = {
  'netlify-welcome': createTemplate(NetlifyWelcomeEmail, {} as NetlifyWelcomeProps),
  'password-reset': createTemplate(PasswordResetEmail, {} as PasswordResetProps),
  'welcome': createTemplate(WelcomeEmail, {} as WelcomeProps)
};

// Fonctions d'envoi générées automatiquement
export const sendNetlifyWelcomeEmail = createStandardEmailSender('netlify-welcome', 'standard');
export const sendPasswordResetEmail = createStandardEmailSender('password-reset', 'standard');
export const sendWelcomeEmail = createStandardEmailSender('welcome', 'standard');

/**
 * Pour utiliser ces templates générés automatiquement:
 * 
 * 1. Importez ce fichier dans templates.tsx:
 *    import { generatedTemplates } from './generated-templates';
 * 
 * 2. Ajoutez les templates générés à l'objet emailTemplates:
 *    export const emailTemplates: EmailTemplateMap = {
 *      ...standardTemplates,
 *      ...generatedTemplates
 *    };
 * 
 * 3. Utilisez les fonctions d'envoi exportées ou sendNamedTemplateEmail
 */
