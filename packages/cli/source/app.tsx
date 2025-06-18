import { execSync } from 'child_process';
import fs from 'fs';
import { Box, Text, useApp, useInput } from 'ink';
import React, { useEffect, useState } from 'react';
import { promisify } from 'util';
import { DiffView } from './components/diff-view.js';
import path from 'path';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

interface Props {
	fromScope: string;
	toScope: string;
}

enum Stage {
	SEARCHING,
	SHOWING_FILES,
	PROCESSING_FILES,
	CLEANING,
	FINISHED
}

interface FileToProcess {
	path: string;
	absolutePath: string;
	content: string;
	newContent: string;
	processed: boolean;
	skipped: boolean;
}

export default function App({ fromScope, toScope }: Props) {
	const { exit } = useApp();
	const [stage, setStage] = useState<Stage>(Stage.SEARCHING);
	const [files, setFiles] = useState<FileToProcess[]>([]);
	const [currentFileIndex, setCurrentFileIndex] = useState(0);
	const [shouldClean, setShouldClean] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [processedCount, setProcessedCount] = useState(0);
	const [skippedCount, setSkippedCount] = useState(0);

	// Recherche des fichiers contenant le scope à remplacer
	useEffect(() => {
		const searchFiles = async () => {
			try {
				setIsProcessing(true);
				// Trouver tous les fichiers package.json, .ts et .tsx qui contiennent le scope
				const output = execSync(
					`find . -type f \\( -name "package.json" -o -name "*.ts" -o -name "*.tsx" \\) -not -path "./node_modules/*" -exec grep -l "${fromScope}" {} \\;`
				).toString();

				if (!output.trim()) {
					setError(`Aucun fichier trouvé avec le scope '${fromScope}'`);
					return;
				}

				const filePaths = output.trim().split('\n');

				// Lire le contenu de chaque fichier
				const filesWithContent = await Promise.all(
					filePaths.map(async (filePath) => {
						// Convertir le chemin relatif en chemin absolu
						const absolutePath = path.resolve(process.cwd(), filePath);
						const content = await readFile(filePath, 'utf8');
						const newContent = content.replace(new RegExp(fromScope, 'g'), toScope);

						return {
							path: filePath,
							absolutePath,
							content,
							newContent,
							processed: false,
							skipped: false
						};
					})
				);

				setFiles(filesWithContent);
				setStage(Stage.SHOWING_FILES);
			} catch (err) {
				setError(`Erreur lors de la recherche des fichiers: ${(err as Error).message}`);
			} finally {
				setIsProcessing(false);
			}
		};

		searchFiles();
	}, [fromScope, toScope]);

	// Gérer les entrées clavier
	useInput((input, key) => {
		if (stage === Stage.SHOWING_FILES && key.return) {
			setStage(Stage.PROCESSING_FILES);
		} else if (stage === Stage.PROCESSING_FILES) {
			const currentFile = files[currentFileIndex];

			if (input === 'y') {
				// Appliquer les modifications
				const updatedFiles = [...files];
				updatedFiles[currentFileIndex] = {
					...currentFile,
					processed: true,
					skipped: false
				};
				setFiles(updatedFiles);
				setProcessedCount(prev => prev + 1);

				// Écrire les modifications dans le fichier
				fs.writeFileSync(currentFile.path, currentFile.newContent);

				// Passer au fichier suivant ou à l'étape de nettoyage
				if (currentFileIndex < files.length - 1) {
					setCurrentFileIndex(currentFileIndex + 1);
				} else {
					setStage(Stage.CLEANING);
				}
			} else if (input === 's') {
				// Ignorer ce fichier
				const updatedFiles = [...files];
				updatedFiles[currentFileIndex] = {
					...currentFile,
					processed: true,
					skipped: true
				};
				setFiles(updatedFiles);
				setSkippedCount(prev => prev + 1);

				// Passer au fichier suivant ou à l'étape de nettoyage
				if (currentFileIndex < files.length - 1) {
					setCurrentFileIndex(currentFileIndex + 1);
				} else {
					setStage(Stage.CLEANING);
				}
			} else if (input === 'q') {
				exit();
			}
		} else if (stage === Stage.CLEANING) {
			if (input === 'y') {
				setShouldClean(true);
				setStage(Stage.FINISHED);
			} else if (input === 'n') {
				setShouldClean(false);
				setStage(Stage.FINISHED);
			}
		} else if (stage === Stage.FINISHED && key.return) {
			exit();
		}
	});

	// Effectuer le nettoyage si demandé
	useEffect(() => {
		if (stage === Stage.FINISHED && shouldClean) {
			try {
				// Supprimer tous les node_modules
				execSync('find . -type d -name "node_modules" -prune -exec rm -rf {} +');

				// Supprimer le fichier pnpm-lock.yaml s'il existe
				if (fs.existsSync('pnpm-lock.yaml')) {
					fs.unlinkSync('pnpm-lock.yaml');
				}
			} catch (err) {
				setError(`Erreur lors du nettoyage: ${(err as Error).message}`);
			}
		}
	}, [stage, shouldClean]);

	// Rendu de l'interface selon l'étape actuelle
	if (error) {
		return (
			<Box flexDirection="column">
				<Text color="red">❌ {error}</Text>
				<Text>Appuyez sur n'importe quelle touche pour quitter...</Text>
			</Box>
		);
	}

	if (stage === Stage.SEARCHING || isProcessing) {
		return (
			<Box flexDirection="column">
				<Text color="blue">🔍 Recherche des fichiers contenant '{fromScope}'...</Text>
			</Box>
		);
	}

	if (stage === Stage.SHOWING_FILES) {
		return (
			<Box flexDirection="column">
				<Text color="green">✅ Fichiers trouvés contenant '{fromScope}' :</Text>
				<Text>----------------------------------------</Text>
				{files.map((file) => (
					<Text key={file.path} color="yellow">- {file.absolutePath}</Text>
				))}
				<Text>----------------------------------------</Text>
				<Text>Total: {files.length} fichiers</Text>
				<Text>Appuyez sur Entrée pour commencer le traitement fichier par fichier...</Text>
			</Box>
		);
	}

	if (stage === Stage.PROCESSING_FILES) {
		const currentFile = files[currentFileIndex];

		return (
			<Box flexDirection="column">
				<Text color="blue">📄 Fichier : {currentFile.absolutePath}</Text>
				<Text color="yellow">🔎 Différences :</Text>
				<Text>----------------------------------------</Text>
				<DiffView oldContent={currentFile.content} newContent={currentFile.newContent} />
				<Text>----------------------------------------</Text>
				<Text>Progression: {currentFileIndex + 1}/{files.length} ({processedCount} modifiés, {skippedCount} ignorés)</Text>
				<Text>🎯 Appliquer cette modification ? ([y]es / [s]kip / [q]uit)</Text>
			</Box>
		);
	}

	if (stage === Stage.CLEANING) {
		return (
			<Box flexDirection="column">
				<Text color="green">✅ Traitement terminé: {processedCount} fichiers modifiés, {skippedCount} fichiers ignorés</Text>
				<Text color="blue">🧹 Nettoyage final recommandé...</Text>
				<Text>Souhaitez-vous supprimer tous les node_modules + pnpm-lock.yaml ? ([y]es / [n]o)</Text>
			</Box>
		);
	}

	if (stage === Stage.FINISHED) {
		return (
			<Box flexDirection="column">
				<Text color="green">✅ Traitement terminé: {processedCount} fichiers modifiés, {skippedCount} fichiers ignorés</Text>
				{shouldClean && (
					<>
						<Text color="yellow">🔄 Suppression de tous les node_modules...</Text>
						<Text color="yellow">🧾 Fichier pnpm-lock.yaml supprimé.</Text>
						<Text color="green">✅ Nettoyage terminé. Tu peux maintenant exécuter :</Text>
						<Text color="blue">   pnpm install</Text>
					</>
				)}
				<Text color="green">🎉 Script terminé avec succès !</Text>
				<Text>Appuyez sur Entrée pour quitter...</Text>
			</Box>
		);
	}

	return null;
}
