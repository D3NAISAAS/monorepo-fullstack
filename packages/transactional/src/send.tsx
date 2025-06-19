import React, { ReactElement } from "react";
import { render } from "@react-email/render";
import { nanoid } from "nanoid";
import { emailTemplates, EmailTemplateMap } from "./templates";
import MarkdownEmail from "../components/markdown-email";
import SummaryEmail, { type SummaryEmailProps } from "../emails/default/inbox-zero/summary";
import { resend } from "./client";

export const sendEmail = async ({
  to,
  subject,
  react,
  html,
  text,
  test,
  tags,
  unsubscribeToken,
}: {
  to: string;
  subject: string;
  react?: ReactElement;
  html?: string;
  text?: string;
  test?: boolean;
  tags?: { name: string; value: string }[];
  unsubscribeToken?: string;
}) => {
  if (!resend) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.",
    );
    return Promise.resolve();
  }

  // Ensure we have at least one content type (text, html, or react)
  if (!react && !html && !text) {
    throw new Error("At least one of react, html, or text must be provided");
  }

  // Generate text content if needed
  let textContent = text;
  if (!textContent && react) {
    textContent = await render(react, { plainText: true });
  }

  // Generate HTML content if needed
  let htmlContent = html;
  if (!htmlContent && react) {
    htmlContent = await render(react);
  }

  // Prepare email options
  const emailOptions: any = {
    from: "Inbox Zero <updates@transactional.getinboxzero.com>",
    to: test ? "delivered@resend.dev" : to,
    subject,
  };

  // Add content based on what's available
  if (react) {
    emailOptions.react = react;
  } else if (htmlContent) {
    emailOptions.html = htmlContent;
  }

  // Always include text content if available
  if (textContent) {
    emailOptions.text = textContent;
  }

  // Add headers
  emailOptions.headers = {
    // Prevent threading on Gmail
    "X-Entity-Ref-ID": nanoid(),
  };

  // Add unsubscribe headers if token is provided
  if (unsubscribeToken) {
    emailOptions.headers["List-Unsubscribe"] =
      `<https://www.getinboxzero.com/api/unsubscribe?token=${unsubscribeToken}>`;
    emailOptions.headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  // Add tags if provided
  if (tags) {
    emailOptions.tags = tags;
  }

  const result = await resend.emails.send(emailOptions);

  if (result.error) {
    console.error("Error sending email", result.error);
    throw new Error(`Error sending email: ${result.error.message}`);
  }

  return result;
};

/**
 * Sends an email using a markdown template
 */
export const sendMarkdownEmail = async ({
  to,
  subject,
  preview,
  markdown,
  test,
  tags,
  unsubscribeToken,
}: {
  to: string;
  subject: string;
  preview?: string;
  markdown: string;
  test?: boolean;
  tags?: { name: string; value: string }[];
  unsubscribeToken?: string;
}) => {
  return sendEmail({
    to,
    subject,
    react: <MarkdownEmail preview={preview} markdown={markdown} />,
    test,
    tags,
    unsubscribeToken,
  });
};

/**
 * Sends an email using a template component and props
 */
export const sendTemplateEmail = async <T extends Record<string, any>>({
  to,
  subject,
  template,
  props,
  test,
  tags,
  unsubscribeToken,
}: {
  to: string;
  subject: string;
  template: React.ComponentType<T>;
  props: T;
  test?: boolean;
  tags?: { name: string; value: string }[];
  unsubscribeToken?: string;
}) => {
  const TemplateComponent = template;

  return sendEmail({
    to,
    subject,
    react: <TemplateComponent {...props} />,
    test,
    tags,
    unsubscribeToken,
  });
};

/**
 * Sends an email using a predefined template by name
 */
/**
 * Fonction pour envoyer un email avec le template de réinitialisation de mot de passe
 * Utilise la fonction générique sendNamedTemplateEmail
 */
export function sendPasswordResetEmail({
  to,
  userEmail,
  resetUrl,
  subject,
  test,
  tags,
  unsubscribeToken,
}: {
  to: string;
  userEmail: string;
  resetUrl: string;
  subject?: string;
  test?: boolean;
  tags?: { name: string; value: string }[];
  unsubscribeToken?: string;
}) {
  return sendNamedTemplateEmail({
    to,
    templateName: "password-reset",
    props: { userEmail, resetUrl },
    subject,
    test,
    tags,
    unsubscribeToken,
  });
}

/**
 * Fonction pour envoyer un email d'invitation
 * Utilise la fonction générique sendNamedTemplateEmail
 */
export function sendInviteEmail({
  to,
  inviterName,
  teamName,
  inviteLink,
  subject,
  test,
  tags,
  unsubscribeToken,
}: {
  to: string;
  inviterName: string;
  teamName: string;
  inviteLink: string;
  subject?: string;
  test?: boolean;
  tags?: { name: string; value: string }[];
  unsubscribeToken?: string;
}) {
  return sendNamedTemplateEmail({
    to,
    templateName: "invite",
    props: { inviterName, teamName, inviteLink },
    subject,
    test,
    tags,
    unsubscribeToken,
  });
}

/**
 * Fonction pour envoyer un email de bienvenue
 * Utilise la fonction générique sendNamedTemplateEmail
 */
export function sendWelcomeEmail({
  to,
  name,
  actionUrl,
  subject,
  test,
  tags,
  unsubscribeToken,
}: {
  to: string;
  name: string;
  actionUrl: string;
  subject?: string;
  test?: boolean;
  tags?: { name: string; value: string }[];
  unsubscribeToken?: string;
}) {
  return sendNamedTemplateEmail({
    to,
    templateName: "welcome",
    props: { name, actionUrl },
    subject,
    test,
    tags,
    unsubscribeToken,
  });
}

/**
 * Fonction utilitaire pour générer un sujet d'email par défaut en fonction du nom du template
 */
function getDefaultSubject(templateName: string, props: Record<string, any>): string {
  // Mapping des noms de templates vers des sujets par défaut
  const subjectMap: Record<string, (props: Record<string, any>) => string> = {
    'password-reset': () => "Réinitialisation de votre mot de passe",
    'invite': (p) => `Invitation à rejoindre ${p.teamName || 'notre équipe'}`,
    'welcome': () => "Bienvenue !",
    'midday-welcome': (p) => `Bienvenue chez Midday, ${p.fullName || ''} !`,
    'midday-invite': (p) => `Vous avez été invité(e) à rejoindre ${p.teamName || 'une équipe'} sur Midday`,
    'midday-api-key-created': () => "Nouvelle clé API créée",
    'midday-connection-expire': (p) => `Votre connexion à ${p.bankName || 'votre banque'} va expirer`,
    'midday-connection-issue': (p) => `Problème avec votre connexion à ${p.bankName || 'votre banque'}`,
    'midday-get-started': () => "Commencez avec Midday",
    'midday-invoice': () => "Votre nouvelle facture",
    'midday-invoice-overdue': (p) => `Facture ${p.invoiceNumber || ''} en retard de paiement`,
    'midday-invoice-paid': (p) => `Facture ${p.invoiceNumber || ''} payée`,
    'midday-invoice-reminder': (p) => `Rappel : Facture ${p.invoiceNumber || ''} à payer`,
    'midday-transactions': () => "Vos dernières transactions",
    'midday-trial-ended': () => "Votre période d'essai est terminée",
    'midday-trial-expiring': (p) => `Votre période d'essai expire dans ${p.daysRemaining || 'quelques'} jours`
  };

  // Retourner le sujet par défaut ou un sujet générique si le template n'est pas dans le mapping
  const subjectGenerator = subjectMap[templateName];
  return subjectGenerator ? subjectGenerator(props) : `Email de ${templateName}`;
}

/**
 * Fonction générique pour envoyer un email en utilisant un template par son nom
 * Cette fonction permet d'utiliser n'importe quel template défini dans emailTemplates
 * sans avoir à importer directement le composant React
 */
export function sendNamedTemplateEmail<TemplateName extends keyof EmailTemplateMap>(
  {
    to,
    templateName,
    props,
    subject,
    test,
    tags,
    unsubscribeToken,
  }: {
    to: string;
    templateName: TemplateName;
    props: EmailTemplateMap[TemplateName]['props'];
    subject?: string;
    test?: boolean;
    tags?: { name: string; value: string }[];
    unsubscribeToken?: string;
  }
) {
  // Récupérer le composant du template et ses props par défaut
  const templateConfig = emailTemplates[templateName];
  if (!templateConfig) {
    throw new Error(`Template "${templateName}" not found in emailTemplates`);
  }

  // Fusionner les props par défaut avec les props fournies
  const mergedProps = { ...templateConfig.props, ...props };

  // Générer un sujet par défaut si aucun n'est fourni
  const emailSubject = subject || getDefaultSubject(templateName as string, mergedProps);

  // Créer l'élément React avec JSX dynamique
  const EmailComponent = templateConfig.component;

  // Ajouter automatiquement des tags basés sur le template
  const emailTags = [
    ...(tags || []),
    { name: "template", value: templateName as string },
    // Ajouter un tag pour la catégorie (standard ou midday)
    { name: "category", value: (templateName as string).startsWith('midday-') ? 'midday' : 'standard' }
  ];

  // Envoyer l'email avec le composant et les props
  return sendEmail({
    to,
    subject: emailSubject,
    react: <EmailComponent {...mergedProps as any} />,
    test,
    tags: emailTags,
    unsubscribeToken,
  });
};

/**
 * Fonction pour envoyer un email de résumé d'activité
 */
export const sendSummaryEmail = async ({
  to,
  test,
  emailProps,
  subject = "Your weekly email summary",
}: {
  to: string;
  test?: boolean;
  emailProps: SummaryEmailProps;
  subject?: string;
}) => {
  return sendEmail({
    to,
    subject,
    react: <SummaryEmail {...emailProps} />,
    test,
    unsubscribeToken: emailProps.unsubscribeToken,
    tags: [
      {
        name: "category",
        value: "activity-update",
      },
    ],
  });
};

/**
 * Fonction utilitaire pour créer facilement des fonctions d'envoi d'email pour n'importe quel template
 * Cette fonction simplifie l'ajout de nouveaux templates dans le futur
 */
export function createStandardEmailSender<TemplateName extends keyof EmailTemplateMap>(
  templateName: TemplateName,
  category?: string
) {
  return function sendEmail(
    {
      to,
      props,
      subject,
      test,
      tags,
      unsubscribeToken,
    }: {
      to: string;
      props: EmailTemplateMap[TemplateName]['props'];
      subject?: string;
      test?: boolean;
      tags?: { name: string; value: string }[];
      unsubscribeToken?: string;
    }
  ) {
    return sendNamedTemplateEmail({
      to,
      templateName,
      props,
      subject,
      test,
      tags: [
        ...(tags || []),
        ...(category ? [{ name: 'template_category', value: category }] : [])
      ],
      unsubscribeToken,
    });
  };
}

// Pour la compatibilité avec le code existant
export const createMiddayEmailSender = <TemplateName extends keyof EmailTemplateMap>(templateName: TemplateName) =>
  createStandardEmailSender(templateName, 'midday');

export const createD3nEmailSender = <TemplateName extends keyof EmailTemplateMap>(templateName: TemplateName) =>
  createStandardEmailSender(templateName, 'd3n');

// Exemples d'utilisation de la fonction createStandardEmailSender

// Création de fonctions d'envoi pour les templates standard
export const sendWelcomeStandardEmail = createStandardEmailSender('welcome', 'standard');
export const sendPasswordResetStandardEmail = createStandardEmailSender('password-reset', 'standard');

// Pour la compatibilité avec le code existant - templates midday
export const sendMiddayTransactionsEmail = createMiddayEmailSender('midday-transactions');
export const sendMiddayInvoiceEmail = createMiddayEmailSender('midday-invoice');
export const sendMiddayConnectionExpireEmail = createMiddayEmailSender('midday-connection-expire');

// Vous pouvez maintenant créer des fonctions d'envoi pour n'importe quel template
// sans vous soucier du dossier dans lequel il se trouve
// Exemple: export const sendNewFeatureEmail = createStandardEmailSender('new-feature');
