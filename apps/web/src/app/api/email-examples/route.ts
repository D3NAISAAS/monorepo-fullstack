import { NextRequest, NextResponse } from "next/server";
import { reSendNamedTemplateEmail } from "@d3n/transactional";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type') || 'welcome';
  const email = searchParams.get('email') || 'test@example.com';
  const test = searchParams.get('test') !== 'false'; // Par défaut, on utilise le mode test

  // Liste des templates valides pour vérification
  const validTemplates = [
    'welcome',
    'password-reset',
    'invite',
    'midday-welcome',
    'midday-invite',
    'midday-api-key-created'
    // etc.
  ];

  // Vérifier si le type demandé est valide
  if (!validTemplates.includes(type)) {
    console.warn(`Template "${type}" n'est pas dans la liste des templates valides, il pourrait ne pas exister`);
  }

  try {
    let result;

    switch (type) {
      case 'netlify-welcome':
        // Exemple d'envoi d'un email de bienvenue Netlify
        result = await reSendNamedTemplateEmail({
          to: email,
          templateName: 'netlify-welcome',
          props: {
            steps: [
              {
                id: 1,
                Description: "Déployez votre premier projet. Connectez-vous à Git ou choisissez un template."
              },
              {
                id: 2,
                Description: "Vérifiez vos logs de déploiement. Surveillez les erreurs potentielles."
              },
              {
                id: 3,
                Description: "Configurez votre domaine personnalisé pour une meilleure expérience utilisateur."
              }
            ],
            links: [
              { title: "Documentation", href: "https://docs.example.com" },
              { title: "Support", href: "https://support.example.com" },
              { title: "Tutoriels", href: "https://tutorials.example.com" }
            ]
          },
          subject: "Bienvenue chez Netlify - Premiers pas",
          test,
          tags: [{ name: "source", value: "example-route" }]
        });
        break;

      case 'password-reset':
        // Exemple d'envoi d'un email de réinitialisation de mot de passe
        result = await reSendNamedTemplateEmail({
          to: email,
          templateName: 'password-reset',
          props: {
            userEmail: email,
            resetUrl: "https://example.com/reset-password?token=abc123xyz789"
          },
          subject: "Réinitialisez votre mot de passe",
          test,
          tags: [{ name: "source", value: "example-route" }]
        });
        break;

      case 'welcome':
      default:
        // Exemple d'envoi d'un email de bienvenue standard
        result = await reSendNamedTemplateEmail({
          to: email,
          templateName: 'welcome',
          props: {
            name: "Nouveau Membre",
            actionUrl: "https://example.com/getting-started"
          },
          subject: "Bienvenue sur notre plateforme!",
          test,
          tags: [{ name: "source", value: "example-route" }]
        });
        break;
    }

    return NextResponse.json({
      success: true,
      emailType: type,
      recipient: test ? "delivered@resend.dev" : email,
      result: result?.data?.id || "sent"
    });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite"
      },
      { status: 500 }
    );
  }
}
