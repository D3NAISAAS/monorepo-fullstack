'use client';

import { useEffect, useState } from 'react';

interface EmailRendererProps {
  html: string;
}

export function EmailRenderer({ html }: EmailRendererProps) {
  // Utiliser un état pour éviter l'hydratation incorrecte
  const [mounted, setMounted] = useState(false);

  // Ne rendre le HTML qu'après le montage côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pendant le rendu côté serveur ou avant le montage, afficher un placeholder
  if (!mounted) {
    return <div>Chargement de l'email...</div>;
  }

  return (
    <div className="email-preview">
      <div className="email-rendered" dangerouslySetInnerHTML={{ __html: html }} />
      <details className="email-source">
        <summary>Voir le code source</summary>
        <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-[500px] text-sm">
          {html}
        </pre>
      </details>
    </div>
  );
}
