import { SystemAlertEmail } from "../../src/templates/notifications/system-alert";

export default function SystemAlertPreview() {
	return (
		<SystemAlertEmail
			title="Migration base de données terminée"
			message="La migration de notre infrastructure vers des serveurs plus performants s'est déroulée avec succès. Toutes vos données sont sécurisées et les performances sont améliorées de 40%."
			severity="success"
			actionUrl="https://status.stellar-saas.com"
			actionText="Voir les détails"
			timestamp={new Date()}
		/>
	);
}
