/**
 * Expose certaines variables d'environnement aux packages
 * Ce fichier permet de partager des variables d'environnement sélectionnées
 * avec les packages du monorepo, comme @d3n/transactional
 */

// Variables d'environnement à exposer
const exposedEnv = {
	// Clé API Resend pour le package transactional
	RESEND_API_KEY: process.env.RESEND_API_KEY,
};

/**
 * Fonction pour exposer les variables d'environnement au client
 * À utiliser dans un composant côté client
 */
export function exposeEnvVariables() {
	if (typeof window !== "undefined") {
		// Créer un objet global pour les variables d'environnement
		(window as any).__ENV = exposedEnv;
	}
}

/**
 * Récupérer les variables d'environnement exposées
 * À utiliser dans les packages qui ont besoin d'accéder aux variables
 */
export function getExposedEnv() {
	if (typeof window !== "undefined" && (window as any).__ENV) {
		return (window as any).__ENV;
	}
	return {};
}
