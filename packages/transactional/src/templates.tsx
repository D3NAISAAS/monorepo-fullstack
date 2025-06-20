import React from "react";

/**
 * Type générique pour les templates d'emails
 */
type EmailTemplate<T> = {
  component: React.ComponentType<T>;
  props: T;
};

/**
 * Map des templates d'emails - étendus automatiquement par le script discover-templates.ts
 */
export type EmailTemplateMap = {
  [key: string]: EmailTemplate<any>;
};

/**
 * Fonction utilitaire pour créer un template d'email avec des props par défaut
 */
export function createTemplate<T>(component: React.ComponentType<T>, defaultProps: T): EmailTemplate<T> {
  return {
    component,
    props: defaultProps
  };
}

/**
 * Charge dynamiquement les templates générés
 * @returns Un objet contenant tous les templates générés
 */
function loadGeneratedTemplates(): Record<string, EmailTemplate<any>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const generated = require('./generated-templates');
    return generated?.generatedTemplates || {};
  } catch (error) {
    console.log('Templates générés non trouvés. Exécutez discover-templates.ts pour les générer.');
    return {};
  }
}

/**
 * Export des templates d'emails
 */
export const emailTemplates: EmailTemplateMap = {
  ...loadGeneratedTemplates(),
};

/**
 * Type helper pour obtenir le type des props à partir du nom du template
 */
export type TemplateProps<T extends keyof EmailTemplateMap> = EmailTemplateMap[T]['props'];

/**
 * Vérifie si un template existe
 * @param templateName Nom du template à vérifier
 * @returns true si le template existe, false sinon
 */
export function templateExists(templateName: string): boolean {
  return templateName in emailTemplates;
}

/**
 * Obtient la liste de tous les templates disponibles
 * @returns Un tableau contenant les noms de tous les templates disponibles
 */
export function getAvailableTemplates(): string[] {
  return Object.keys(emailTemplates);
}