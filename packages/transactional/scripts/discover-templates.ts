#!/usr/bin/env node
/**
 * Script pour découvrir automatiquement les templates d'emails
 * et générer le code nécessaire pour les intégrer facilement
 * 
 * Utilisation:
 * npx tsx scripts/discover-templates.ts
 */

import fs from 'fs';
import path from 'path';
import { generateTemplateImports } from '../src/utils/template-discovery';

// Chemins des répertoires de templates
const rootDir = process.cwd();
const standardTemplatesDir = path.join(rootDir, 'emails/standard');
const outputFile = path.join(rootDir, 'src/generated-templates.ts');

// Vérifier si le répertoire standard existe et le créer si nécessaire
if (!fs.existsSync(standardTemplatesDir)) {
  try {
    fs.mkdirSync(standardTemplatesDir, { recursive: true });
    console.log(`Répertoire créé: ${standardTemplatesDir}`);
  } catch {
    console.error(`Erreur lors de la création du répertoire ${standardTemplatesDir}`);
  }
}

// Générer le code pour les templates standard
let standardTemplatesCode = '';

if (fs.existsSync(standardTemplatesDir)) {
  standardTemplatesCode = generateTemplateImports(standardTemplatesDir, '');
  if (!standardTemplatesCode || standardTemplatesCode.includes('Aucun template trouvé')) {
    console.log('Aucun template trouvé dans le répertoire standard.');
    standardTemplatesCode = '';
  }
}

// Créer le contenu du fichier généré
const fileContent = `/**
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
${standardTemplatesCode}

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
`;

// Écrire le fichier généré
fs.writeFileSync(outputFile, fileContent);

console.log(`Templates découverts et code généré dans ${outputFile}`);
console.log('Pensez à mettre à jour les interfaces de props pour les nouveaux templates.');
console.log(`Pour ajouter de nouveaux templates, créez des fichiers .tsx dans ${standardTemplatesDir}`);
