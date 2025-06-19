import { NextRequest, NextResponse } from "next/server";
import { reSendNamedTemplateEmail } from "@d3n/transactional";

export async function POST(req: NextRequest) {
  try {
    // Extraire les données du corps de la requête
    const data = await req.json();
    const { to, subject, templateName, test = false } = data;

    // Vérifier que les données requises sont présentes
    if (!to || !templateName) {
      return NextResponse.json(
        { error: "Les champs 'to' et 'templateName' sont obligatoires." },
        { status: 400 }
      );
    }

    // Préparer les propriétés en fonction du template sélectionné
    let props: Record<string, any> = {};
    
    switch (templateName) {
      case "password-reset":
        props = {
          userEmail: to,
          resetUrl: "https://example.com/reset-password?token=abc123xyz789",
        };
        break;

      case "invite":
        props = {
          inviterName: "Jean Dupont",
          teamName: "Équipe Awesome",
          inviteLink: "https://example.com/invite/abc123xyz789",
        };
        break;

      case "welcome":
        props = {
          name: "Utilisateur",
          actionUrl: "https://example.com/get-started",
        };
        break;

      case "netlify-welcome":
        props = {
          steps: [
            {
              id: 1,
              Description: "Déployez votre premier projet. Connectez-vous à Git ou choisissez un template.",
            },
            {
              id: 2,
              Description: "Vérifiez vos logs de déploiement. Surveillez les erreurs potentielles.",
            },
          ],
          links: [
            { title: "Documentation", href: "https://docs.example.com" },
            { title: "Support", href: "https://support.example.com" },
          ],
        };
        break;

      default:
        return NextResponse.json(
          { error: `Template '${templateName}' non pris en charge.` },
          { status: 400 }
        );
    }

    // Envoyer l'email avec le template spécifié
    const result = await reSendNamedTemplateEmail({
      to,
      templateName: templateName as any, // Type assertion nécessaire car templateName est une chaîne dynamique
      subject,
      props,
      test,
      tags: [
        { name: "source", value: "test-interface" }
      ]
    });

    // Renvoyer une réponse de succès
    return NextResponse.json({
      success: true,
      message: `Email envoyé avec succès${test ? " (mode test)" : ""}`,
      emailId: result?.data?.id || "unknown"
    });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    
    // Renvoyer une réponse d'erreur
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
      },
      { status: 500 }
    );
  }
}
