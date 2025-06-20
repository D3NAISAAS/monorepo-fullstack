import MaintenanceEmail from "../../src/templates/notifications/maintenance";

export default function MaintenancePreview() {
	return (
		<MaintenanceEmail
			maintenanceDate={new Date("2025-01-20T22:00:00")}
			maintenanceEnd={new Date("2025-01-21T02:00:00")}
			affectedServices={["API", "Dashboard", "Reports", "Notifications"]}
			statusPageUrl="https://status.stellar-saas.com"
			estimatedDuration="4 heures"
		/>
	);
}
