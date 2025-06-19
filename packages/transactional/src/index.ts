// Exporter toutes les fonctions d'envoi d'email
export * from "./send";
export * from "./contacts";

// Exporter les templates et les types
export * from "./templates";

// Exporter les fonctions générées automatiquement avec des noms spécifiques pour éviter les conflits
import { 
  sendNetlifyWelcomeEmail,
  // Renommer les exports qui entrent en conflit avec send.tsx
  sendPasswordResetEmail as sendGeneratedPasswordResetEmail,
  sendWelcomeEmail as sendGeneratedWelcomeEmail 
} from "./generated-templates";

export {
  sendNetlifyWelcomeEmail,
  sendGeneratedPasswordResetEmail,
  sendGeneratedWelcomeEmail
};
