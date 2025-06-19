/**
 * Utilitaires pour la découverte automatique de templates d'emails
 * Ce fichier contient des fonctions pour faciliter l'ajout de nouveaux templates
 * sans avoir à modifier manuellement les imports et les types
 */

import fs from 'fs';
import path from 'path';

/**
 * Fonction pour scanner un répertoire et trouver tous les templates d'emails
 * @param directoryPath Chemin du répertoire à scanner
 * @param prefix Préfixe à ajouter aux noms des templates (ex: 'midday-')
 * @returns Un tableau d'objets contenant le nom du template et son chemin
 */
export function discoverTemplates(directoryPath: string, prefix: string = '') {
  try {
    const files = fs.readdirSync(directoryPath);

    return files
      .filter(file => {
        // Filtrer uniquement les fichiers .tsx qui ne sont pas des fichiers de test
        return file.endsWith('.tsx') && !file.includes('.test.') && !file.includes('.spec.');
      })
      .map(file => {
        const templateName = file.replace('.tsx', '');
        const fullPath = path.join(directoryPath, file);

        return {
          name: `${prefix}${templateName}`,
          path: fullPath,
          // Convertir le nom du template en PascalCase pour le nom du composant
          componentName: templateName
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 'Email'
        };
      });
  } catch (error) {
    console.error(`Erreur lors de la découverte des templates dans ${directoryPath}:`, error);
    return [];
  }
}

/**
 * Fonction pour générer du code TypeScript pour importer et enregistrer automatiquement
 * tous les templates d'emails trouvés dans un répertoire
 * @param directoryPath Chemin du répertoire à scanner
 * @param prefix Préfixe à ajouter aux noms des templates (ex: 'midday-')
 * @returns Le code TypeScript généré
 */
export function generateTemplateImports(directoryPath: string, prefix: string = '') {
  const templates = discoverTemplates(directoryPath, prefix);

  if (templates.length === 0) {
    return '// Aucun template trouvé';
  }

  // Générer les imports
  const imports = templates
    .map(template => {
      const relativePath = path.relative(
        path.dirname(path.resolve(process.cwd(), 'src/templates.tsx')),
        template.path
      ).replace(/\\/g, '/').replace('.tsx', '');

      return `import ${template.componentName}, { type ${template.componentName.replace('Email', '')}EmailProps } from "${relativePath}";`;
    })
    .join('\n');

  // Nous n'avons plus besoin de générer les interfaces car nous les importons directement des composants
  
  // Alias de types pour la compatibilité
  const typeAliases = templates
    .map(template => {
      return `type ${template.componentName.replace('Email', '')}Props = ${template.componentName.replace('Email', '')}EmailProps;`;
    })
    .join('\n');

  // Générer les entrées pour l'objet emailTemplates
  const templateEntries = templates
    .map(template => {
      return `'${template.name}': createTemplate(${template.componentName}, {} as ${template.componentName.replace('Email', '')}Props)`;
    })
    .join(',\n  ');

  // Générer les fonctions d'envoi
  const senderFunctions = templates
    .map(template => {
      return `export const send${template.componentName} = createStandardEmailSender('${template.name}', 'standard');`;
    })
    .join('\n');

  return `${imports}\n\n// Alias de types pour la compatibilité\n${typeAliases}\n\n// Templates générés automatiquement\nexport const generatedTemplates = {\n  ${templateEntries}\n};\n\n// Fonctions d'envoi générées automatiquement\n${senderFunctions}`;
}

/**
 * Exemple d'utilisation:
 *
 * Pour générer automatiquement le code pour tous les templates dans le dossier standard:
 *
 * ```
 * import { generateTemplateImports } from './utils/template-discovery';
 * import path from 'path';
 *
 * const standardTemplatesDir = path.resolve(__dirname, '../emails/standard');
 * const generatedCode = generateTemplateImports(standardTemplatesDir, '');
 * console.log(generatedCode);
 * ```
 *
 * Ce code peut être utilisé dans un script de build pour générer automatiquement
 * les imports et les types pour tous les nouveaux templates ajoutés au dossier standard.
 */
