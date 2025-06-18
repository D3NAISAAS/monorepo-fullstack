import { Change, diffLines } from 'diff';
import { Box, Text } from 'ink';
import React from 'react';

interface DiffViewProps {
  oldContent: string;
  newContent: string;
  contextLines?: number;
}

export function DiffView({ oldContent, newContent, contextLines = 3 }: DiffViewProps) {
  const differences = diffLines(oldContent, newContent);

  // Filtrer pour ne montrer que les lignes modifiées et quelques lignes de contexte
  const enhancedDiff = enhanceDiffWithContext(differences, contextLines);

  return (
    <Box flexDirection="column">
      {enhancedDiff.map((part, index) => {
        // Déterminer la couleur en fonction du type de changement
        let color = 'white';
        let prefix = ' ';

        if (part.added) {
          color = 'green';
          prefix = '+';
        } else if (part.removed) {
          color = 'red';
          prefix = '-';
        }

        // Diviser le contenu en lignes pour un affichage plus clair
        const lines = part.value.split('\n').filter(line => line !== '');

        return lines.map((line, lineIndex) => (
          <Text key={`${index}-${lineIndex}`} color={color}>
            {prefix} {line}
          </Text>
        ));
      })}
    </Box>
  );
}

// Fonction pour améliorer le diff en ajoutant des lignes de contexte
function enhanceDiffWithContext(diff: Change[], contextLines: number): Change[] {
  if (contextLines <= 0) return diff;

  const result: Change[] = [];
  let inChangePart = false;

  for (let i = 0; i < diff.length; i++) {
    const part = diff[i];

    // Si c'est une partie modifiée, on l'ajoute toujours
    if (part.added || part.removed) {
      inChangePart = true;
      result.push(part);
      continue;
    }

    // Pour les parties inchangées, on ajoute seulement le contexte nécessaire
    if (inChangePart) {
      // Après une modification, on ajoute quelques lignes de contexte
      const lines = part.value.split('\n');
      if (lines.length <= contextLines + 1) {
        // Si la partie est petite, on l'ajoute entièrement
        result.push(part);
      } else {
        // Sinon, on ajoute seulement les premières lignes comme contexte
        const contextValue = lines.slice(0, contextLines + 1).join('\n');
        result.push({ ...part, value: contextValue });

        // On ajoute un indicateur de lignes omises si nécessaire
        if (lines.length > contextLines + 1) {
          result.push({ value: '... (lignes omises) ...\n', added: false, removed: false });
        }
      }
      inChangePart = false;
    } else {
      // Avant une modification, on ajoute quelques lignes de contexte
      const lines = part.value.split('\n');
      if (lines.length <= contextLines + 1) {
        // Si la partie est petite, on l'ajoute entièrement
        result.push(part);
      } else {
        // On cherche si la partie suivante est une modification
        const nextPartIsChange = i < diff.length - 1 && (diff[i + 1].added || diff[i + 1].removed);

        if (nextPartIsChange) {
          // Si oui, on ajoute seulement les dernières lignes comme contexte
          const contextValue = lines.slice(-contextLines - 1).join('\n');

          // On ajoute un indicateur de lignes omises si nécessaire
          if (lines.length > contextLines + 1) {
            result.push({ value: '... (lignes omises) ...\n', added: false, removed: false });
          }

          result.push({ ...part, value: contextValue });
        } else {
          // Sinon, on ignore cette partie
          continue;
        }
      }
    }
  }

  return result;
}
