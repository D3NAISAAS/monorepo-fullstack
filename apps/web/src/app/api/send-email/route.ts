import InviteEmail from '@d3n/transactional/emails/midday/invite';
import WelcomeEmail from '@d3n/transactional/emails/midday/welcome';
import PasswordResetEmail from '@d3n/transactional/emails/reset-password/password-reset';
import { sendSummaryEmail } from '@d3n/transactional/send';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

// Define types for email templates
type PasswordResetProps = {
  userEmail: string;
  resetUrl: string;
};

type InviteProps = {
  inviterName: string;
  teamName: string;
  inviteLink: string;
};

type WelcomeProps = {
  name: string;
  actionLink: string;
};

type EmailTemplateMap = {
  'password-reset': {
    component: (props: any) => React.ReactElement;
    props: PasswordResetProps;
  };
  'invite': {
    component: (props: any) => React.ReactElement;
    props: InviteProps;
  };
  'welcome': {
    component: (props: any) => React.ReactElement;
    props: WelcomeProps;
  };
};

// Map of available email templates
const emailTemplates: EmailTemplateMap = {
  'password-reset': {
    component: PasswordResetEmail,
    props: {
      userEmail: '',
      resetUrl: 'https://example.com/reset-password?token=abc123xyz789'
    }
  },
  'invite': {
    component: InviteEmail,
    props: {
      inviterName: 'John Doe',
      teamName: 'Demo Team',
      inviteLink: 'https://example.com/invite/abc123'
    }
  },
  'welcome': {
    component: WelcomeEmail,
    props: {
      name: 'New User',
      actionLink: 'https://example.com/dashboard'
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, templateName, test = true } = body;

    if (!to || !subject || !templateName) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, or templateName' },
        { status: 400 }
      );
    }

    const template = emailTemplates[templateName as keyof typeof emailTemplates];

    if (!template) {
      return NextResponse.json(
        { error: `Template "${templateName}" not found` },
        { status: 404 }
      );
    }

    // If the template is password-reset, add the recipient email to the props
    if (templateName === 'password-reset') {
      (template.props as PasswordResetProps).userEmail = to;
    }

    // Generate a simple unsubscribe token
    const unsubscribeToken = `unsub-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    // Send the email using the sendEmail function from the transactional package
    const result = await sendSummaryEmail({
      to,
      subject,
      // Use type assertion to handle the different template types
      react: template.component(template.props as any),
      test,
      unsubscribeToken,
      tags: [
        {
          name: 'source',
          value: 'web-test'
        },
        {
          name: 'template',
          value: templateName
        }
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}
