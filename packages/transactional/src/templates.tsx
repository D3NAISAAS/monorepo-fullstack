import React from "react";

// Import des templates standards
import InviteEmail, { type InviteProps } from "../emails/invite";
import PasswordResetEmail, { type PasswordResetProps } from "../emails/password-reset";
// Utiliser le template standard au lieu de l'ancien
import WelcomeEmail, { type WelcomeEmailProps } from "../emails/standard/welcome";
// Alias de type pour la compatibilité
type WelcomeProps = WelcomeEmailProps;

// Import des templates du dossier midday
import MidDayApiKeyCreatedEmail from "../emails/midday/api-key-created";
import MidDayConnectionExpireEmail from "../emails/midday/connection-expire";
import MidDayConnectionIssueEmail from "../emails/midday/connection-issue";
import MidDayGetStartedEmail from "../emails/midday/get-started";
import MidDayInviteEmail from "../emails/midday/invite";
import MidDayInvoiceEmail from "../emails/midday/invoice";
import MidDayInvoiceOverdueEmail from "../emails/midday/invoice-overdue";
import MidDayInvoicePaidEmail from "../emails/midday/invoice-paid";
import MidDayInvoiceReminderEmail from "../emails/midday/invoice-reminder";
import MidDayTransactionsEmail from "../emails/midday/transactions";
import MidDayTrialEndedEmail from "../emails/midday/trial-ended";
import MidDayTrialExpiringEmail from "../emails/midday/trial-expiring";
import MidDayWelcomeEmail from "../emails/midday/welcome";

// Types pour les templates du dossier midday
interface MidDayWelcomeProps {
  fullName: string;
}

interface MidDayInviteProps {
  email?: string;
  invitedByEmail?: string;
  invitedByName?: string;
  teamName?: string;
  ip?: string;
  locale: string;
}

interface MidDayApiKeyCreatedProps {
  fullName: string;
  keyName: string;
  createdAt: string;
  email: string;
  ip: string;
}

interface MidDayConnectionExpireProps {
  fullName: string;
  expiresAt: string;
  bankName: string;
  teamName: string;
}

interface MidDayConnectionIssueProps {
  fullName: string;
  bankName: string;
  teamName: string;
}

interface MidDayGetStartedProps {
  fullName: string;
}

interface MidDayInvoiceProps {
  customerName: string;
  teamName: string;
  link: string;
}

interface MidDayInvoiceOverdueProps {
  customerName: string;
  invoiceNumber: string;
  link: string;
  daysOverdue?: number;
}

interface MidDayInvoicePaidProps {
  invoiceNumber: string;
  link: string;
  paymentDate?: string;
}

interface MidDayInvoiceReminderProps {
  companyName: string;
  teamName: string;
  invoiceNumber: string;
  link: string;
}

interface MidDayTransactionsProps {
  fullName: string;
  transactions: Array<{
    id: string;
    date: string;
    amount: number;
    name: string;
    currency: string;
    category?: string;
  }>;
  locale: string;
  teamName: string;
}

interface MidDayTrialEndedProps {
  fullName: string;
  trialEndDate: string;
}

interface MidDayTrialExpiringProps {
  fullName: string;
  trialEndDate: string;
  daysRemaining: number;
}

// Type générique pour les templates d'emails
type EmailTemplate<T> = {
  component: React.ComponentType<T>;
  props: T;
};

// Define types for email templates
export type EmailTemplateMap = {
  // Templates de base
  'password-reset': EmailTemplate<PasswordResetProps>;
  'invite': EmailTemplate<InviteProps>;
  'welcome': EmailTemplate<WelcomeProps>;

  // Templates du dossier midday (pour la compatibilité avec le code existant)
  'midday-welcome': EmailTemplate<MidDayWelcomeProps>;
  'midday-invite': EmailTemplate<MidDayInviteProps>;
  'midday-api-key-created': EmailTemplate<MidDayApiKeyCreatedProps>;
  'midday-connection-expire': EmailTemplate<MidDayConnectionExpireProps>;
  'midday-connection-issue': EmailTemplate<MidDayConnectionIssueProps>;
  'midday-get-started': EmailTemplate<MidDayGetStartedProps>;
  'midday-invoice': EmailTemplate<MidDayInvoiceProps>;
  'midday-invoice-overdue': EmailTemplate<MidDayInvoiceOverdueProps>;
  'midday-invoice-paid': EmailTemplate<MidDayInvoicePaidProps>;
  'midday-invoice-reminder': EmailTemplate<MidDayInvoiceReminderProps>;
  'midday-transactions': EmailTemplate<MidDayTransactionsProps>;
  'midday-trial-ended': EmailTemplate<MidDayTrialEndedProps>;
  'midday-trial-expiring': EmailTemplate<MidDayTrialExpiringProps>;

  // Templates du dossier standard et autres templates dynamiques
  // Ces types seront étendus automatiquement par le script discover-templates.ts
  [key: string]: EmailTemplate<any>;
};

// Fonction utilitaire pour créer un template d'email avec des props par défaut
export function createTemplate<T>(component: React.ComponentType<T>, defaultProps: T): EmailTemplate<T> {
  return {
    component,
    props: defaultProps
  };
}

// Grouper les templates par catégorie pour une meilleure organisation
const standardTemplates = {
  'password-reset': createTemplate(PasswordResetEmail, {
    userEmail: 'user@example.com',
    resetUrl: 'https://example.com/reset-password?token=abc123'
  } as PasswordResetProps),

  'invite': createTemplate(InviteEmail, {
    inviterName: 'John Doe',
    teamName: 'Acme Co',
    inviteLink: 'https://example.com/invite/abc123'
  } as InviteProps),

  'welcome': createTemplate(WelcomeEmail, {
    name: 'John Doe',
    actionUrl: 'https://example.com/get-started'
  } as WelcomeProps)
};

// Templates du dossier midday
const middayTemplates = {
  'midday-welcome': createTemplate(MidDayWelcomeEmail, {
    fullName: 'Viktor Hofte'
  } as MidDayWelcomeProps),

  'midday-invite': createTemplate(MidDayInviteEmail, {
    email: 'pontus@lostisland.co',
    invitedByEmail: 'bukinoshita@example.com',
    invitedByName: 'Pontus Abrahamsson',
    teamName: 'Acme Co',
    ip: '204.13.186.218',
    locale: 'en'
  } as MidDayInviteProps),

  'midday-api-key-created': createTemplate(MidDayApiKeyCreatedEmail, {
    fullName: 'Viktor Hofte',
    keyName: 'Midday API Key',
    createdAt: 'May 28, 2025',
    email: 'viktor@midday.ai',
    ip: '204.13.186.218'
  } as MidDayApiKeyCreatedProps),

  'midday-connection-expire': createTemplate(MidDayConnectionExpireEmail, {
    fullName: 'Viktor Hofte',
    expiresAt: 'June 30, 2025',
    bankName: 'Revolut',
    teamName: 'Midday'
  } as MidDayConnectionExpireProps),

  'midday-connection-issue': createTemplate(MidDayConnectionIssueEmail, {
    fullName: 'Viktor Hofte',
    bankName: 'Revolut',
    teamName: 'Midday'
  } as MidDayConnectionIssueProps),

  'midday-get-started': createTemplate(MidDayGetStartedEmail, {
    fullName: 'Viktor Hofte'
  } as MidDayGetStartedProps),

  'midday-invoice': createTemplate(MidDayInvoiceEmail, {
    customerName: 'Viktor Hofte',
    teamName: 'Midday',
    link: 'https://app.midday.ai/i/1234567890'
  } as MidDayInvoiceProps),

  'midday-invoice-overdue': createTemplate(MidDayInvoiceOverdueEmail, {
    customerName: 'Viktor Hofte',
    invoiceNumber: 'INV-2025-001',
    link: 'https://app.midday.ai/i/1234567890',
    daysOverdue: 14
  } as MidDayInvoiceOverdueProps),

  'midday-invoice-paid': createTemplate(MidDayInvoicePaidEmail, {
    invoiceNumber: 'INV-2025-001',
    link: 'https://app.midday.ai/i/1234567890',
    paymentDate: 'June 10, 2025'
  } as MidDayInvoicePaidProps),

  'midday-invoice-reminder': createTemplate(MidDayInvoiceReminderEmail, {
    companyName: 'Acme Co',
    teamName: 'Midday',
    invoiceNumber: 'INV-2025-001',
    link: 'https://app.midday.ai/i/1234567890'
  } as MidDayInvoiceReminderProps),

  'midday-transactions': createTemplate(MidDayTransactionsEmail, {
    fullName: 'Viktor Hofte',
    transactions: [
      {
        id: '1',
        name: 'Monthly subscription',
        amount: -9900,
        date: new Date().toISOString(),
        currency: 'USD'
      },
      {
        id: '2',
        name: 'Additional users',
        amount: -2900,
        date: new Date().toISOString(),
        currency: 'USD'
      }
    ],
    locale: 'en',
    teamName: 'Midday'
  } as MidDayTransactionsProps),

  'midday-trial-ended': createTemplate(MidDayTrialEndedEmail, {
    fullName: 'Viktor Hofte',
    trialEndDate: 'June 15, 2025'
  } as MidDayTrialEndedProps),

  'midday-trial-expiring': createTemplate(MidDayTrialExpiringEmail, {
    fullName: 'Viktor Hofte',
    trialEndDate: 'June 30, 2025',
    daysRemaining: 7
  } as MidDayTrialExpiringProps)
};

// Templates du dossier standard
// Ce groupe sera rempli automatiquement par le script discover-templates.ts
const standardGeneratedTemplates = {};

// Essayer d'importer les templates générés automatiquement
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const generated = require('./generated-templates');
  if (generated && generated.generatedTemplates) {
    Object.assign(standardGeneratedTemplates, generated.generatedTemplates);
  }
} catch {
  // Le fichier généré n'existe pas encore, ce n'est pas grave
  console.log('Aucun template généré trouvé. Exécutez le script discover-templates.ts pour générer les templates.');
}

// Export the email templates
export const emailTemplates: EmailTemplateMap = {
  // Templates de base (définis manuellement)
  ...standardTemplates,

  // Templates midday (pour la compatibilité avec le code existant)
  ...middayTemplates,

  // Templates générés automatiquement du dossier standard
  ...standardGeneratedTemplates
};

// Type helper to get props type from template name
export type TemplateProps<T extends keyof EmailTemplateMap> = EmailTemplateMap[T]['props'];
