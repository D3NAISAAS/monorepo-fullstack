# Email


```md
packages/email/
├── src/
│   ├── templates/              # Templates React.email
│   │   ├── auth/
│   │   │   ├── welcome.tsx
│   │   │   ├── reset-password.tsx
│   │   │   ├── verify-email.tsx
│   │   │   └── login-alert.tsx
│   │   ├── notifications/
│   │   │   ├── system-alert.tsx
│   │   │   ├── maintenance.tsx
│   │   │   └── feature-update.tsx
│   │   ├── newsletters/
│   │   │   ├── monthly.tsx
│   │   │   └── product-updates.tsx
│   │   ├── invoicing/
│   │   │   ├── invoice.tsx
│   │   │   ├── payment-success.tsx
│   │   │   ├── payment-failed.tsx
│   │   │   └── subscription-renewal.tsx
│   │   ├── reviews/
│   │   │   ├── feedback-request.tsx
│   │   │   └── review-reminder.tsx
│   │   └── index.ts            # Export tous les templates
│   ├── providers/              # Providers d'envoi
│   │   ├── email-service.ts
│   │   ├── resend.ts
│   │   └── nodemailer.ts
│   ├── utils/
│   │   ├── render.ts
│   │   ├── retry.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   └── index.ts                # Point d'entrée principal
├── emails/                     # Previews organisés par thèmes
│   ├── auth/
│   │   ├── welcome.tsx
│   │   └── reset-password.tsx
│   ├── notifications/
│   │   └── system-alert.tsx
│   ├── newsletters/
│   │   └── monthly.tsx
│   ├── invoicing/
│   │   └── invoice.tsx
│   └── reviews/
│       └── feedback-request.tsx
├── package.json
├── tsconfig.json
└── README.md
```