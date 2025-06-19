'use client';

import { useState } from 'react';

interface EmailTestFormProps {
  onSendEmail: (emailData: {
    to: string;
    subject: string;
    templateName: string;
    test: boolean;
  }) => Promise<void>;
  templates: { name: string; displayName: string }[];
}

export function EmailTestForm({ onSendEmail, templates }: EmailTestFormProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('Test Email');
  const [templateName, setTemplateName] = useState(templates[0]?.name || '');
  const [isTest, setIsTest] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);
    
    try {
      await onSendEmail({
        to,
        subject,
        templateName,
        test: isTest,
      });
      setResult({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      setResult({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send email' 
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Test Email Sending</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Email
          </label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
            Email Template
          </label>
          <select
            id="template"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            {templates.map((template) => (
              <option key={template.name} value={template.name}>
                {template.displayName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="test"
            checked={isTest}
            onChange={(e) => setIsTest(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="test" className="ml-2 block text-sm text-gray-700">
            Send as test email (to delivered@resend.dev)
          </label>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSending ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
      
      {result && (
        <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}
