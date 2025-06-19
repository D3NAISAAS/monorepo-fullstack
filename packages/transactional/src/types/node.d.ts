/**
 * Déclarations de types pour les modules Node.js
 * Ce fichier permet d'utiliser les modules Node.js dans les scripts et utilitaires
 * sans avoir à installer @types/node comme dépendance
 */

declare module 'fs' {
  export function readdirSync(path: string): string[];
  export function writeFileSync(path: string, data: string): void;
  export function existsSync(path: string): boolean;
}

declare module 'path' {
  export function resolve(...paths: string[]): string;
  export function join(...paths: string[]): string;
  export function dirname(path: string): string;
  export function relative(from: string, to: string): string;
}

// Déclaration de process.cwd() pour remplacer __dirname
declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
};
