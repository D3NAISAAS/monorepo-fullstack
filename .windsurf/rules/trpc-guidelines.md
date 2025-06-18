# Règles de Développement tRPC - Windsurf IDE

## 🎯 Architecture et Structure

### 1. Organisation des Routers
- **TOUJOURS** créer des routers modulaires dans `src/features/[feature]/server/procedure.ts`
- **JAMAIS** mettre toutes les procédures dans un seul fichier
- **OBLIGATOIRE** : Exporter le router avec un nom descriptif (`todoRouter`, `userRouter`, etc.)
- **CONVENTION** : Un router par feature/domaine métier

```typescript
// ✅ CORRECT
export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => { /* ... */ }),
  create: publicProcedure.input(z.object({...})).mutation(async ({ input }) => { /* ... */ }),
});

// ❌ INCORRECT - Tout dans index.ts
```

### 2. Procédures et Sécurité
- **TOUJOURS** utiliser `publicProcedure` pour les endpoints publics
- **TOUJOURS** utiliser `protectedProcedure` pour les endpoints nécessitant une authentification
- **OBLIGATOIRE** : Valider tous les inputs avec Zod
- **JAMAIS** accéder directement à `ctx.session` sans vérification dans `publicProcedure`

```typescript
// ✅ CORRECT
const createTodo = protectedProcedure
  .input(z.object({
    text: z.string().min(1).max(500),
    priority: z.enum(['low', 'medium', 'high']).optional()
  }))
  .mutation(async ({ input, ctx }) => {
    // ctx.session est garanti d'exister
    return await db.todo.create({
      data: { ...input, userId: ctx.session.user.id }
    });
  });

// ❌ INCORRECT - Pas de validation
const createTodo = publicProcedure.mutation(async ({ input }) => { /* ... */ });
```

## 🔧 Configuration et Client

### 3. Client tRPC
- **TOUJOURS** utiliser le singleton `getQueryClient()` côté client
- **OBLIGATOIRE** : Wrapper l'app avec `TRPCProvider` dans le layout
- **JAMAIS** créer plusieurs instances de `QueryClient`
- **TOUJOURS** utiliser `superjson` comme transformer

```typescript
// ✅ CORRECT - Dans layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
```

### 4. Gestion des États
- **TOUJOURS** gérer les états `isLoading`, `error`, et `data`
- **OBLIGATOIRE** : Afficher un feedback utilisateur pendant les mutations
- **TOUJOURS** invalider les queries après les mutations réussies
- **JAMAIS** ignorer les erreurs sans les afficher

```typescript
// ✅ CORRECT
function TodoList() {
  const todos = trpc.todos.getAll.useQuery();
  const createMutation = trpc.todos.create.useMutation({
    onSuccess: () => {
      todos.refetch(); // Rafraîchir les données
    },
    onError: (error) => {
      toast.error(error.message); // Afficher l'erreur
    }
  });

  if (todos.isLoading) return <Spinner />;
  if (todos.error) return <ErrorMessage error={todos.error.message} />;

  return (
    <div>
      {todos.data?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      <button
        onClick={() => createMutation.mutate({ text: "Nouveau" })}
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? "Création..." : "Ajouter"}
      </button>
    </div>
  );
}
```

## 📝 Validation et Types

### 5. Schémas Zod
- **TOUJOURS** définir des schémas Zod réutilisables
- **OBLIGATOIRE** : Valider tous les inputs de procédures
- **CONVENTION** : Créer des schémas partagés dans `src/lib/schemas/`
- **TOUJOURS** utiliser des messages d'erreur explicites

```typescript
// ✅ CORRECT - Schémas réutilisables
export const todoSchema = z.object({
  text: z.string().min(1, "Le texte est requis").max(500, "Texte trop long"),
  completed: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium')
});

export const createTodoSchema = todoSchema.omit({ completed: true });
export const updateTodoSchema = todoSchema.partial().extend({
  id: z.number().positive()
});
```

### 6. Types TypeScript
- **TOUJOURS** exporter le type `AppRouter` depuis `routers/index.ts`
- **JAMAIS** utiliser `any` dans les procédures tRPC
- **OBLIGATOIRE** : Typer correctement le contexte tRPC
- **TOUJOURS** utiliser l'inférence de types tRPC côté client

```typescript
// ✅ CORRECT
export type AppRouter = typeof appRouter;

// Dans les composants
const todos: RouterOutputs['todos']['getAll'] = trpc.todos.getAll.useQuery().data;
```

## 🚀 Performance et Optimisation

### 7. Caching et Queries
- **TOUJOURS** configurer `staleTime` approprié pour chaque query
- **OBLIGATOIRE** : Utiliser `enabled` pour les queries conditionnelles
- **TOUJOURS** préférer `invalidate()` à `refetch()` après mutations
- **JAMAIS** faire de queries dans des boucles

```typescript
// ✅ CORRECT
const userProfile = trpc.users.getProfile.useQuery(
  { userId },
  {
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
);

// Après mutation
const utils = trpc.useUtils();
await utils.users.getProfile.invalidate({ userId });
```

### 8. Batching et Optimisation
- **TOUJOURS** utiliser `httpBatchLink` pour grouper les requêtes
- **OBLIGATOIRE** : Limiter le nombre de queries simultanées
- **JAMAIS** faire de queries redondantes
- **TOUJOURS** utiliser `useQueries` pour plusieurs queries parallèles

## 🛡️ Sécurité et Erreurs

### 9. Gestion d'Erreur
- **TOUJOURS** utiliser `TRPCError` avec des codes appropriés
- **OBLIGATOIRE** : Logs détaillés côté serveur
- **JAMAIS** exposer des informations sensibles dans les erreurs
- **TOUJOURS** valider les permissions dans `protectedProcedure`

```typescript
// ✅ CORRECT
if (!todo) {
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'Todo non trouvé',
  });
}

if (todo.userId !== ctx.session.user.id) {
  throw new TRPCError({
    code: 'FORBIDDEN',
    message: 'Accès non autorisé',
  });
}
```

### 10. Authentification
- **TOUJOURS** vérifier l'authentification dans `protectedProcedure`
- **JAMAIS** faire confiance aux données côté client
- **OBLIGATOIRE** : Vérifier les permissions pour chaque ressource
- **TOUJOURS** utiliser le middleware d'auth défini dans `init-procedure.ts`

## 📁 Structure de Fichiers

### 11. Organisation des Fichiers
```
src/
├── trpc/
│   ├── init-procedure.ts      # ✅ Configuration de base
│   ├── routers/
│   │   └── index.ts          # ✅ Router principal uniquement
│   ├── client.tsx            # ✅ Client React
│   └── query-client.ts       # ✅ Config React Query
├── features/
│   └── [feature]/
│       └── server/
│           └── procedure.ts  # ✅ Router de la feature
├── lib/
│   ├── schemas/              # ✅ Schémas Zod partagés
│   └── types/                # ✅ Types TypeScript
└── app/
    └── api/trpc/[trpc]/
        └── route.ts          # ✅ Endpoint Next.js
```

## 🔄 Patterns de Développement

### 12. Mutations et Updates
- **TOUJOURS** implémenter des updates optimistes pour l'UX
- **OBLIGATOIRE** : Rollback en cas d'erreur
- **TOUJOURS** afficher un feedback de chargement
- **JAMAIS** muter l'état local sans passer par tRPC

```typescript
// ✅ CORRECT - Update optimiste
const toggleMutation = trpc.todos.toggle.useMutation({
  onMutate: async (variables) => {
    await utils.todos.getAll.cancel();
    const previousTodos = utils.todos.getAll.getData();

    utils.todos.getAll.setData(undefined, (old) =>
      old?.map(todo =>
        todo.id === variables.id
          ? { ...todo, completed: variables.completed }
          : todo
      )
    );

    return { previousTodos };
  },
  onError: (err, variables, context) => {
    utils.todos.getAll.setData(undefined, context?.previousTodos);
  },
  onSettled: () => {
    utils.todos.getAll.invalidate();
  },
});
```

### 13. Testing
- **TOUJOURS** tester les routers avec des tests unitaires
- **OBLIGATOIRE** : Mocker le contexte pour les tests
- **TOUJOURS** tester les cas d'erreur
- **JAMAIS** tester l'implémentation, tester le comportement

```typescript
// ✅ CORRECT - Test de router
describe('todoRouter', () => {
  it('should create a todo', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.todos.create({
      text: 'Test todo'
    });

    expect(result.text).toBe('Test todo');
    expect(result.userId).toBe(ctx.session.user.id);
  });
});
```

## 🎨 Conventions de Code

### 14. Nommage
- **Procédures** : `camelCase` (`getAll`, `createTodo`, `updateProfile`)
- **Routers** : `camelCase` + `Router` (`todoRouter`, `userRouter`)
- **Schémas** : `camelCase` + `Schema` (`todoSchema`, `createUserSchema`)
- **Types** : `PascalCase` (`AppRouter`, `TodoInput`)

### 15. Documentation
- **TOUJOURS** documenter les procédures complexes
- **OBLIGATOIRE** : Exemples d'utilisation pour les nouveaux patterns
- **TOUJOURS** maintenir la documentation à jour
- **JAMAIS** laisser du code mort ou commenté

---

## 🚨 Règles Critiques à Ne Jamais Violer

1. **JAMAIS** exposer de données sensibles sans authentification
2. **JAMAIS** faire confiance aux données côté client
3. **TOUJOURS** valider tous les inputs avec Zod
4. **TOUJOURS** gérer les erreurs et états de chargement
5. **JAMAIS** créer de queries infinies ou récursives
6. **TOUJOURS** utiliser TypeScript strict mode
7. **JAMAIS** ignorer les erreurs TypeScript liées à tRPC

Ces règles garantissent un code tRPC robuste, sécurisé et maintenable dans votre projet Next.js.
