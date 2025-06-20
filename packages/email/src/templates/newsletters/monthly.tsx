import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface MonthlyNewsletterProps {
	month: string;
	year: number;
	articles: Array<{
		title: string;
		summary: string;
		imageUrl: string;
		readUrl: string;
		category: string;
		readTime: string;
	}>;
	stats: {
		newUsers: number;
		newFeatures: number;
		bugsFixed: number;
	};
	companyName: string;
	unsubscribeUrl: string;
}

export const MonthlyNewsletterEmail = ({
	month = "Janvier",
	year = 2025,
	articles = [
		{
			title: "Nouvelle interface utilisateur dévoilée",
			summary:
				"Découvrez notre design system repensé pour une expérience utilisateur encore plus intuitive.",
			imageUrl:
				"https://via.placeholder.com/300x200/6366f1/ffffff?text=UI+Update",
			readUrl: "https://example.com/article1",
			category: "Produit",
			readTime: "3 min",
		},
		{
			title: "Performance améliorée de 40%",
			summary:
				"Nos dernières optimisations rendent votre workflow plus rapide que jamais.",
			imageUrl:
				"https://via.placeholder.com/300x200/10b981/ffffff?text=Performance",
			readUrl: "https://example.com/article2",
			category: "Tech",
			readTime: "5 min",
		},
	],
	stats = { newUsers: 1247, newFeatures: 8, bugsFixed: 23 },
	companyName = "Stellar SaaS",
	unsubscribeUrl = "https://example.com/unsubscribe",
}: MonthlyNewsletterProps) => (
	<Html>
		<Head />
		<Preview>
			🗞️ Newsletter {month} {year} - Les dernières nouveautés de {companyName}
		</Preview>
		<Body style={newsletterBodyStyle}>
			<Container style={newsletterContainerStyle}>
				{/* Magazine-style Header */}
				<Section style={magazineHeaderStyle}>
					<div style={headerTopStyle}>
						<Text style={editionStyle}>
							ÉDITION {month.toUpperCase()} {year}
						</Text>
						<Text style={volumeStyle}>Vol. 12</Text>
					</div>
					<Text style={magazineTitleStyle}>{companyName} MONTHLY</Text>
					<Text style={taglineStyle}>
						Innovation • Performance • Excellence
					</Text>
					<div style={headerBottomStyle}>
						<Text style={dateStyle}>
							{new Date().toLocaleDateString("fr-FR")}
						</Text>
						<Text style={priceStyle}>GRATUIT</Text>
					</div>
				</Section>

				{/* Statistics Bar */}
				<Section style={statsBarStyle}>
					<Row>
						<Column style={statColumnStyle}>
							<div style={statItemStyle}>
								<Text style={statNumberStyle}>+{stats.newUsers}</Text>
								<Text style={statLabelStyle}>Nouveaux utilisateurs</Text>
							</div>
						</Column>
						<Column style={statColumnStyle}>
							<div style={statItemStyle}>
								<Text style={statNumberStyle}>{stats.newFeatures}</Text>
								<Text style={statLabelStyle}>Nouvelles fonctionnalités</Text>
							</div>
						</Column>
						<Column style={statColumnStyle}>
							<div style={statItemStyle}>
								<Text style={statNumberStyle}>{stats.bugsFixed}</Text>
								<Text style={statLabelStyle}>Bugs corrigés</Text>
							</div>
						</Column>
					</Row>
				</Section>

				{/* Editor's Note */}
				<Section style={editorNoteStyle}>
					<div style={editorCardStyle}>
						<Text style={editorTitleStyle}>📝 Mot de l'équipe</Text>
						<Text style={editorContentStyle}>
							Ce mois-ci marque une étape importante avec le lancement de notre
							nouvelle interface et des améliorations de performance majeures.
							Nous continuons d'innover pour vous offrir la meilleure expérience
							possible. Bonne lecture !
						</Text>
						<Text style={editorSignatureStyle}>— L'équipe {companyName}</Text>
					</div>
				</Section>

				{/* Articles Grid */}
				<Section style={articlesStyle}>
					<Text style={sectionTitleStyle}>🚀 À la une ce mois-ci</Text>

					{articles.map((article, index) => (
						<div key={index.toString()} style={articleCardStyle}>
							<Row>
								<Column style={articleImageColumnStyle}>
									<Img
										src={article.imageUrl}
										alt={article.title}
										style={articleImageStyle}
									/>
									<div style={categoryBadgeStyle}>
										<Text style={categoryTextStyle}>{article.category}</Text>
									</div>
								</Column>
								<Column style={articleContentColumnStyle}>
									<div style={articleMetaStyle}>
										<Text style={readTimeStyle}>⏱️ {article.readTime}</Text>
									</div>
									<Text style={articleTitleStyle}>{article.title}</Text>
									<Text style={articleSummaryStyle}>{article.summary}</Text>
									<Button href={article.readUrl} style={readMoreButtonStyle}>
										Lire l'article →
									</Button>
								</Column>
							</Row>
						</div>
					))}
				</Section>

				{/* Featured Section */}
				<Section style={featuredSectionStyle}>
					<div style={featuredCardStyle}>
						<Text style={featuredIconStyle}>⭐</Text>
						<Text style={featuredTitleStyle}>Fonctionnalité du mois</Text>
						<Text style={featuredContentStyle}>
							<strong>Tableaux de bord personnalisables</strong>
							<br />
							Créez des vues sur mesure avec notre nouveau système de widgets
							modulaires. Glissez-déposez vos métriques préférées et créez
							l'espace de travail parfait.
						</Text>
						<Button
							href="https://example.com/feature"
							style={featuredButtonStyle}
						>
							Découvrir maintenant
						</Button>
					</div>
				</Section>

				{/* Community Spotlight */}
				<Section style={communityStyle}>
					<Text style={communitySectionTitleStyle}>
						👥 Spotlight Communauté
					</Text>
					<div style={communityCardStyle}>
						<Row>
							<Column style={communityAvatarColumnStyle}>
								<Img
									src="https://via.placeholder.com/60x60/f3f4f6/6b7280?text=MC"
									alt="Marie C."
									style={communityAvatarStyle}
								/>
							</Column>
							<Column style={communityContentColumnStyle}>
								<Text style={communityQuoteStyle}>
									"Grâce aux nouvelles optimisations, mon équipe économise 2h
									par jour. C'est exactement ce dont nous avions besoin !"
								</Text>
								<Text style={communityAuthorStyle}>
									— Marie C., Product Manager chez TechCorp
								</Text>
							</Column>
						</Row>
					</div>
				</Section>

				{/* Footer */}
				<Hr style={newsletterSeparatorStyle} />
				<Section style={newsletterFooterStyle}>
					<Text style={socialTitleStyle}>Suivez-nous :</Text>
					<Row>
						<Column style={socialColumnStyle}>
							<Button href="https://twitter.com" style={socialButtonStyle}>
								🐦 Twitter
							</Button>
						</Column>
						<Column style={socialColumnStyle}>
							<Button href="https://linkedin.com" style={socialButtonStyle}>
								💼 LinkedIn
							</Button>
						</Column>
						<Column style={socialColumnStyle}>
							<Button href="https://github.com" style={socialButtonStyle}>
								🐙 GitHub
							</Button>
						</Column>
					</Row>

					<Hr style={footerSeparatorStyle} />

					<Text style={unsubscribeTextStyle}>
						Vous recevez cet email car vous êtes abonné à notre newsletter.
					</Text>
					<Text style={unsubscribeLinkStyle}>
						<a href={unsubscribeUrl} style={linkStyle}>
							Se désabonner
						</a>{" "}
						|
						<a href="https://example.com/preferences" style={linkStyle}>
							{" "}
							Gérer les préférences
						</a>
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

// Styles Newsletter
const newsletterBodyStyle = {
	backgroundColor: "#1f2937",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	padding: "40px 0",
};

const newsletterContainerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "700px",
	borderRadius: "0",
	overflow: "hidden",
};

const magazineHeaderStyle = {
	backgroundColor: "#000000",
	color: "#ffffff",
	padding: "32px",
	textAlign: "center" as const,
	position: "relative" as const,
};

const headerTopStyle = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: "16px",
};

const editionStyle = {
	fontSize: "10px",
	fontWeight: "700",
	letterSpacing: "1px",
	color: "#9ca3af",
};

const volumeStyle = {
	fontSize: "10px",
	fontWeight: "700",
	letterSpacing: "1px",
	color: "#9ca3af",
};

const magazineTitleStyle = {
	fontSize: "48px",
	fontWeight: "900",
	margin: "0",
	letterSpacing: "-1px",
	textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
};

const taglineStyle = {
	fontSize: "12px",
	fontWeight: "400",
	color: "#d1d5db",
	margin: "8px 0 24px 0",
	letterSpacing: "2px",
};

const headerBottomStyle = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	borderTop: "1px solid #374151",
	paddingTop: "16px",
};

const dateStyle = {
	fontSize: "12px",
	color: "#9ca3af",
};

const priceStyle = {
	fontSize: "12px",
	fontWeight: "700",
	color: "#10b981",
};

const statsBarStyle = {
	backgroundColor: "#f9fafb",
	padding: "24px 32px",
	borderBottom: "1px solid #e5e7eb",
};

const statColumnStyle = {
	width: "33.333%",
	textAlign: "center" as const,
};

const statItemStyle = {
	padding: "0 16px",
};

const statNumberStyle = {
	fontSize: "24px",
	fontWeight: "800",
	color: "#111827",
	margin: "0 0 4px 0",
	display: "block",
};

const statLabelStyle = {
	fontSize: "12px",
	color: "#6b7280",
	fontWeight: "500",
	margin: "0",
};

const editorNoteStyle = {
	padding: "32px",
	backgroundColor: "#ffffff",
};

const editorCardStyle = {
	backgroundColor: "#fef3c7",
	border: "1px solid #f59e0b",
	borderRadius: "12px",
	padding: "24px",
};

const editorTitleStyle = {
	fontSize: "18px",
	fontWeight: "700",
	color: "#92400e",
	margin: "0 0 12px 0",
};

const editorContentStyle = {
	fontSize: "15px",
	color: "#92400e",
	lineHeight: "1.6",
	margin: "0 0 16px 0",
};

const editorSignatureStyle = {
	fontSize: "14px",
	color: "#d97706",
	fontStyle: "italic",
	margin: "0",
};

const articlesStyle = {
	padding: "32px",
	backgroundColor: "#ffffff",
};

const sectionTitleStyle = {
	fontSize: "28px",
	fontWeight: "800",
	color: "#111827",
	margin: "0 0 32px 0",
	textAlign: "center" as const,
};

const articleCardStyle = {
	border: "1px solid #e5e7eb",
	borderRadius: "16px",
	padding: "24px",
	marginBottom: "24px",
	backgroundColor: "#ffffff",
	boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const articleImageColumnStyle = {
	width: "200px",
	verticalAlign: "top" as const,
	position: "relative" as const,
};

const articleImageStyle = {
	width: "180px",
	height: "120px",
	borderRadius: "8px",
	objectFit: "cover" as const,
};

const categoryBadgeStyle = {
	position: "absolute" as const,
	top: "8px",
	left: "8px",
	backgroundColor: "rgba(0, 0, 0, 0.8)",
	borderRadius: "4px",
	padding: "4px 8px",
};

const categoryTextStyle = {
	fontSize: "10px",
	color: "#ffffff",
	fontWeight: "600",
	margin: "0",
	textTransform: "uppercase" as const,
};

const articleContentColumnStyle = {
	paddingLeft: "24px",
};

const articleMetaStyle = {
	marginBottom: "8px",
};

const readTimeStyle = {
	fontSize: "12px",
	color: "#6b7280",
	margin: "0",
};

const articleTitleStyle = {
	fontSize: "20px",
	fontWeight: "700",
	color: "#111827",
	margin: "0 0 12px 0",
	lineHeight: "1.3",
};

const articleSummaryStyle = {
	fontSize: "14px",
	color: "#6b7280",
	lineHeight: "1.5",
	margin: "0 0 16px 0",
};

const readMoreButtonStyle = {
	backgroundColor: "#111827",
	color: "#ffffff",
	fontSize: "14px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "10px 20px",
	borderRadius: "6px",
	display: "inline-block",
};

const featuredSectionStyle = {
	padding: "32px",
	backgroundColor: "#f3f4f6",
};

const featuredCardStyle = {
	background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	borderRadius: "16px",
	padding: "32px",
	textAlign: "center" as const,
	color: "#ffffff",
};

const featuredIconStyle = {
	fontSize: "48px",
	margin: "0 0 16px 0",
	display: "block",
};

const featuredTitleStyle = {
	fontSize: "24px",
	fontWeight: "700",
	margin: "0 0 16px 0",
};

const featuredContentStyle = {
	fontSize: "16px",
	lineHeight: "1.6",
	margin: "0 0 24px 0",
	opacity: 0.9,
};

const featuredButtonStyle = {
	backgroundColor: "#ffffff",
	color: "#667eea",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "12px 24px",
	borderRadius: "8px",
	display: "inline-block",
};

const communityStyle = {
	padding: "32px",
	backgroundColor: "#ffffff",
};

const communitySectionTitleStyle = {
	fontSize: "22px",
	fontWeight: "700",
	color: "#111827",
	margin: "0 0 24px 0",
	textAlign: "center" as const,
};

const communityCardStyle = {
	backgroundColor: "#f0fdf4",
	border: "1px solid #bbf7d0",
	borderRadius: "12px",
	padding: "24px",
};

const communityAvatarColumnStyle = {
	width: "80px",
	verticalAlign: "top" as const,
};

const communityAvatarStyle = {
	width: "60px",
	height: "60px",
	borderRadius: "50%",
};

const communityContentColumnStyle = {
	paddingLeft: "20px",
};

const communityQuoteStyle = {
	fontSize: "16px",
	color: "#166534",
	fontStyle: "italic",
	lineHeight: "1.5",
	margin: "0 0 12px 0",
};

const communityAuthorStyle = {
	fontSize: "14px",
	color: "#15803d",
	fontWeight: "600",
	margin: "0",
};

const newsletterSeparatorStyle = {
	border: "none",
	borderTop: "1px solid #e5e7eb",
	margin: "0",
};

const newsletterFooterStyle = {
	padding: "32px",
	textAlign: "center" as const,
	backgroundColor: "#f9fafb",
};

const socialTitleStyle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 16px 0",
};

const socialColumnStyle = {
	width: "33.333%",
	textAlign: "center" as const,
};

const socialButtonStyle = {
	backgroundColor: "#374151",
	color: "#ffffff",
	fontSize: "12px",
	fontWeight: "500",
	textDecoration: "none",
	padding: "8px 16px",
	borderRadius: "6px",
	display: "inline-block",
	width: "120px",
};

const footerSeparatorStyle = {
	border: "none",
	borderTop: "1px solid #d1d5db",
	margin: "24px 0",
};

const unsubscribeTextStyle = {
	fontSize: "12px",
	color: "#6b7280",
	margin: "0 0 8px 0",
};

const unsubscribeLinkStyle = {
	fontSize: "12px",
	color: "#6b7280",
	margin: "0",
};

const linkStyle = {
	color: "#6366f1",
	textDecoration: "underline",
};

export default MonthlyNewsletterEmail;
