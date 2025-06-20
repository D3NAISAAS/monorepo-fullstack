# Cheat Sheet - Snippets TypeScript React

Ce guide rapide vous permettra d'utiliser efficacement les snippets disponibles dans le projet monorepo-fullstack pour accélérer votre développement React et Next.js.

## Snippets React

| Préfixe | Description | Résultat |
|---------|-------------|----------|
| `us` | React.useState | `const [state, setState] = React.useState<type>(initialState)` |
| `uf` | React.useEffect | `React.useEffect(() => { ... }, []);` |
| `rc` | Composant React fonctionnel | Crée un composant React fonctionnel de base |
| `uc` | Use Client | Ajoute la directive `'use client';` au début du fichier |

## Snippets Next.js

| Préfixe | Description | Résultat |
|---------|-------------|----------|
| `napi` | Route API Next.js complète | Crée une route API avec GET et POST |
| `napig` | Route API GET Next.js | Crée une route API avec méthode GET uniquement |
| `napip` | Route API POST Next.js | Crée une route API avec méthode POST uniquement |

## Snippets d'enveloppement (Wrap)

| Préfixe | Description | Résultat |
|---------|-------------|----------|
| `ff` | Fragment | Enveloppe le texte sélectionné avec `<>...</>` |
| `cx` | clsx | Enveloppe le texte sélectionné avec `{clsx(...)}` |
| `mem` | useMemo | Enveloppe le texte sélectionné avec `const value = useMemo(() => (...), [])` |

## Snippets personnalisés

| Préfixe | Description | Résultat |
|---------|-------------|----------|
| `formapi` | Formulaire + API | Génère un exemple complet d'API et de formulaire client |
| `rhf` | React Hook Form | Crée un formulaire avec React Hook Form |
| `swr` | SWR | Crée un composant avec SWR pour la récupération de données |

## Snippets de logging

| Préfixe | Description | Résultat |
|---------|-------------|----------|
| `lg` | Logger | `console.log({ variable }, 'filename line number')` |
| `cl` | Simple Logger | `console.log('message')` |
| `ce` | Error Logger | `console.error('message')` |

## Comment utiliser

1. Dans un fichier TypeScript React (`.tsx`), tapez le préfixe du snippet
2. Appuyez sur `Tab` ou sélectionnez le snippet dans l'autocomplétion
3. Remplissez les valeurs demandées (utilisez `Tab` pour naviguer entre les champs)

## Astuces

- Les snippets comme `us` (useState) génèrent automatiquement un nom de setter basé sur le nom de l'état
- Pour les snippets d'enveloppement, sélectionnez d'abord le texte, puis utilisez le préfixe du snippet
- Le snippet `lg` inclut automatiquement le nom du fichier et le numéro de ligne pour faciliter le débogage
- Les snippets d'API incluent la validation Zod et la gestion des erreurs

## Exemples d'utilisation

### React.useState (`us`)
```tsx
// Tapez 'us' puis Tab
const [count, setCount] = React.useState<number>(0)
```

### React Hook Form (`rhf`)
```tsx
// Tapez 'rhf' puis Tab pour générer un formulaire complet avec React Hook Form
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { toastSuccess, toastError } from '@/components/Toast';
import { isErrorMessage } from '@/utils/error';

type Inputs = { address: string };

const MyForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async data => {
      const res = await updateProfile(data)
      if (isErrorMessage(res)) toastError({ description: `` });
      else toastSuccess({ description: `` });
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="text"
        name="address"
        label="Address"
        registerProps={register('address', { required: true })}
        error={errors.address}
      />
      <Button type="submit" loading={isSubmitting}>
        Add
      </Button>
    </form>
  );
}
```

### Route API Next.js (`napig`)
```tsx
// Tapez 'napig' puis Tab pour générer une route API GET
import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/utils/prisma";
import { withAuth } from "@/utils/middleware";

export type UserDataResponse = Awaited<
  ReturnType<typeof getUserData>
>;

async function getUserData(options: { email: string }) {
  const result = await prisma.user.findMany({
    where: {
      email: options.email,
    },
  });
  return { result };
};

export const GET = withAuth(async () => {
  const result = await getUserData({ email: session.user.email });

  return NextResponse.json(result);
});
```

Ces snippets sont basés sur le projet [ts-nextjs-tailwind-starter](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter) avec des personnalisations pour le projet monorepo-fullstack.
