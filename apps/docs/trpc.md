# Guide Complet tRPC - Documentation du Projet

## Table des Matières

1. [Introduction à tRPC](#introduction-a-trpc)
2. [Architecture de votre projet](#architecture-de-votre-projet)
3. [Configuration serveur](#configuration-serveur)
4. [Configuration client](#configuration-client)
5. [Utilisation pratique](#utilisation-pratique)
6. [Bonnes pratiques](#bonnes-pratiques)
7. [Debugging et troubleshooting](#debugging-et-troubleshooting)
8. [Exemples avancés spécifiques à votre projet](#exemples-avances-specifiques-a-votre-projet)

---

## Introduction à tRPC

**tRPC** (TypeScript Remote Procedure Call) est une bibliothèque qui permet de créer des APIs end-to-end type-safe sans code generation. Elle utilise TypeScript pour garantir la sécurité des types entre le client et le serveur.

### Avantages principaux

- **Type Safety** : Sécurité des types garantie
- **Auto-completion** : IntelliSense complet.
- **Runtime Safety** : Validation automatique avec Zod.
- **Developer Experience** : Erreurs détectées à la compilation.

---

## Architecture de votre projet

Votre implémentation tRPC suit une architecture modulaire bien structurée :

```text
src/
├── trpc/
│   ├── init-procedure.ts      # Configuration de base tRPC
│   ├── routers/
│   │   └── index.ts          # Router principal (AppRouter)
│   ├── client.tsx            # Client tRPC pour composants React
│   └── query-client.ts       # Configuration React Query
├── features/
│   ├── todos/server/procedure.ts
│   ├── home/server/procedure.ts
│   └── user/server/procedure.ts
└── app/
    └── api/trpc/[trpc]/route.ts  # API endpoint Next.js
```

---

## Configuration Serveur

### 1. Initialisation tRPC (`init-procedure.ts`)

```typescript
// Création du contexte tRPC
export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return { session: session };
});

// Configuration de base avec SuperJSON pour la sérialisation
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Procédures de base
export const publicProcedure = t.procedure;  // Accessible à tous
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // Vérifie l'authentification
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});
```

### 2. Router Principal (`routers/index.ts`)

```typescript
export const appRouter = createTRPCRouter({
  // Procédure simple
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query((opts) => ({
      greeting: `Hello ${opts.input.text}`,
    })),

  // Procédure protégée
  privateData: protectedProcedure.query(({ ctx }) => ({
    message: "This is private",
    user: ctx.session.user,
  })),

  // Routers modulaires
  todos: todoRouter,
  home: homeRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
```

### 3. Router Modulaire Exemple (`todos/server/procedure.ts`)

```typescript
export const todoRouter = createTRPCRouter({
  // Query - Récupérer des données
  getAll: publicProcedure.query(async () => {
    return await db.todo.findMany({
      orderBy: { id: "asc" }
    });
  }),

  // Mutation - Modifier des données
  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return await db.todo.create({
        data: { text: input.text },
      });
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(async ({ input }) => {
      return await db.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),
});
```

---

## Configuration Client

### 1. Client tRPC (`client.tsx`)

```typescript
// Création du client React tRPC
export const trpc = createTRPCReact<AppRouter>();

// Configuration du client avec React Query
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(), // URL de votre API
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 2. Query Client (`query-client.ts`)

```typescript
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // Les données restent "fraîches" 30s
      },
      dehydrate: {
        serializeData: superjson.serialize,   // Sérialisation SSR
      },
      hydrate: {
        deserializeData: superjson.deserialize, // Désérialisation SSR
      },
    },
  });
}
```

---

## Utilisation Pratique

### 1. Dans un Composant Client

```typescript
"use client"
import { trpc } from "@/trpc/client";

export default function TodosPage() {
  // ✅ Query - Récupérer des données
  const todos = trpc.todos.getAll.useQuery();

  // ✅ Mutation - Modifier des données
  const createMutation = trpc.todos.create.useMutation({
    onSuccess: () => {
      todos.refetch(); // Rafraîchir après création
    },
  });

  // ✅ Gestion des états
  if (todos.isLoading) return <div>Chargement...</div>;
  if (todos.error) return <div>Erreur: {todos.error.message}</div>;

  return (
    <div>
      {todos.data?.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
      
      <button onClick={() => createMutation.mutate({ text: "Nouvelle tâche" })}>
        Ajouter
      </button>
    </div>
  );
}
```

### 2. Patterns d'Utilisation Courants

#### A. Query avec paramètres

```typescript
const hello = trpc.hello.useQuery({
  text: "world Greetings",
});
```

#### B. Mutation avec gestion d'erreur

```typescript
const deleteMutation = trpc.todos.delete.useMutation({
  onSuccess: () => {
    todos.refetch();
  },
  onError: (error) => {
    console.error("Erreur lors de la suppression:", error.message);
  },
});
```

#### C. Query conditionnelle

```typescript
const userProfile = trpc.users.getProfile.useQuery(
  { userId },
  { enabled: !!userId } // Ne s'exécute que si userId existe
);
```

### 3. Gestion des États de Chargement

```typescript
function TodoComponent() {
  const todos = trpc.todos.getAll.useQuery();
  const createMutation = trpc.todos.create.useMutation();

  return (
    <div>
      {/* État de chargement initial */}
      {todos.isLoading && <Spinner />}
      
      {/* État d'erreur */}
      {todos.error && <ErrorMessage error={todos.error.message} />}
      
      {/* Données chargées */}
      {todos.data && (
        <ul>
          {todos.data.map(todo => <li key={todo.id}>{todo.text}</li>)}
        </ul>
      )}
      
      {/* Bouton avec état de mutation */}
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

---

## Bonnes Pratiques

### 1. Structure des Routers

```typescript
// ✅ Bon : Router modulaire par feature
export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.input(z.object({...})).query(),
  updateProfile: protectedProcedure.input(z.object({...})).mutation(),
  deleteAccount: protectedProcedure.mutation(),
});

// ❌ Éviter : Tout dans un seul router
```

### 2. Validation avec Zod

```typescript
// ✅ Validation stricte
.input(z.object({
  email: z.string().email("Email invalide"),
  age: z.number().min(0).max(120),
  name: z.string().min(2).max(50),
}))

// ✅ Validation optionnelle
.input(z.object({
  search: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
}))
```

### 3. Gestion d'Erreur

```typescript
// ✅ Erreurs typées
throw new TRPCError({
  code: "NOT_FOUND",
  message: "Utilisateur introuvable",
  cause: error,
});

// Codes d'erreur disponibles :
// - BAD_REQUEST
// - UNAUTHORIZED  
// - FORBIDDEN
// - NOT_FOUND
// - METHOD_NOT_SUPPORTED
// - TIMEOUT
// - CONFLICT
// - PRECONDITION_FAILED
// - PAYLOAD_TOO_LARGE
// - UNPROCESSABLE_CONTENT
// - TOO_MANY_REQUESTS
// - CLIENT_CLOSED_REQUEST
// - INTERNAL_SERVER_ERROR
```

### 4. Optimisation des Queries

```typescript
// ✅ Mise en cache intelligente
const todos = trpc.todos.getAll.useQuery(undefined, {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});

// ✅ Invalidation sélective
const utils = trpc.useUtils();
await utils.todos.getAll.invalidate();
```

---

## Debugging et Troubleshooting

### 1. Erreurs Communes

#### Erreur : "Cannot read property 'useQuery' of undefined"

```typescript
// ❌ Problème : Client non configuré
import { trpc } from "@/trpc/client"; // Vérifier le chemin

// ✅ Solution : S'assurer que TRPCProvider enveloppe l'app
function App() {
  return (
    <TRPCProvider>
      <YourApp />
    </TRPCProvider>
  );
}
```

#### Erreur : "UNAUTHORIZED"

```typescript
// ❌ Problème : Session non trouvée
// ✅ Solution : Vérifier l'authentification
const session = await auth.api.getSession({
  headers: await headers()
});
```

### 2. Logging et Debug

```typescript
// Activer les logs tRPC
const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({ url: getUrl() }),
  ],
});
```

### 3. Type Checking

```typescript
// ✅ Vérifier les types avec TypeScript
const result: Awaited<ReturnType<typeof appRouter.todos.getAll>> = await trpc.todos.getAll.query();
```

---

## Résumé des Commandes Essentielles

### Queries (Lecture)

```typescript
// Simple
const data = trpc.procedure.useQuery();

// Avec paramètres
const data = trpc.procedure.useQuery({ id: 1 });

// Avec options
const data = trpc.procedure.useQuery(params, { enabled: true });
```

### Mutations (Écriture)

```typescript
// Mutation simple
const mutation = trpc.procedure.useMutation();
mutation.mutate({ data });

// Avec callbacks
const mutation = trpc.procedure.useMutation({
  onSuccess: (data) => console.log('Succès:', data),
  onError: (error) => console.error('Erreur:', error),
});
```

### Utilitaires

```typescript
const utils = trpc.useUtils();

// Invalidation
utils.procedure.invalidate();

// Prefetch
await utils.procedure.prefetch(params);

// Données en cache
const data = utils.procedure.getData(params);
```

---

## Exemples Avancés Spécifiques à Votre Projet

### 1. Configuration Layout avec TRPCProvider

Pour intégrer tRPC dans votre app Next.js, ajoutez le provider dans votre layout :

```typescript
// app/layout.tsx
import { TRPCProvider } from '@/trpc/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
```

### 2. Composant Todo Complet - Analyse Détaillée

Analysons votre implémentation de `todos/page.tsx` :

```typescript
"use client"
import { trpc } from "@/trpc/client";
import { useState } from "react";

export default function TodosPage() {
  const [newTodoText, setNewTodoText] = useState("");

  // 🔍 Pattern: Query avec refetch automatique
  const todos = trpc.todos.getAll.useQuery();

  // 🔍 Pattern: Mutation avec optimistic update potentiel
  const createMutation = trpc.todos.create.useMutation({
    onSuccess: () => {
      todos.refetch(); // ✅ Rafraîchit la liste
      setNewTodoText(""); // ✅ Reset du formulaire
    },
    // 💡 Amélioration possible: Optimistic update
    onMutate: async (newTodo) => {
      await trpc.useUtils().todos.getAll.cancel();
      const previousTodos = trpc.useUtils().todos.getAll.getData();
      
      trpc.useUtils().todos.getAll.setData(undefined, (old) => [
        ...(old ?? []),
        { id: Date.now(), text: newTodo.text, completed: false }
      ]);
      
      return { previousTodos };
    },
  });

  // 🔍 Pattern: Gestion des états de chargement
  if (todos.isLoading) return <LoadingSpinner />;
  if (todos.error) return <ErrorDisplay error={todos.error} />;

  return (
    <div className="mx-auto w-full max-w-md py-10">
      {/* Formulaire d'ajout */}
      <form onSubmit={handleAddTodo}>
        <Input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Nouvelle tâche..."
          disabled={createMutation.isPending}
        />
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? <Loader2 className="animate-spin" /> : "Ajouter"}
        </Button>
      </form>

      {/* Liste des todos */}
      <ul className="space-y-2">
        {todos.data?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
```

### 3. Patterns d'Optimisation Avancés

#### A. Optimistic Updates

```typescript
// Composant TodoItem avec optimistic update
function TodoItem({ todo }: { todo: Todo }) {
  const utils = trpc.useUtils();

  const toggleMutation = trpc.todos.toggle.useMutation({
    // ✨ Update optimiste immédiat
    onMutate: async (newData) => {
      await utils.todos.getAll.cancel();
      const previousTodos = utils.todos.getAll.getData();
      
      utils.todos.getAll.setData(undefined, (old) =>
        old?.map((t) => t.id === newData.id 
          ? { ...t, completed: newData.completed }
          : t
        ) ?? []
      );
      
      return { previousTodos };
    },
    
    // 🔄 Rollback en cas d'erreur
    onError: (err, newData, context) => {
      utils.todos.getAll.setData(undefined, context?.previousTodos);
    },
    
    // ✅ Resync avec le serveur
    onSettled: () => {
      utils.todos.getAll.invalidate();
    },
  });

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={(checked) => 
          toggleMutation.mutate({ 
            id: todo.id, 
            completed: !!checked 
          })
        }
      />
      <span className={todo.completed ? "line-through" : ""}>
        {todo.text}
      </span>
    </div>
  );
}
```

#### B. Pagination et Filtrage

```typescript
// Extension du router todos avec pagination
export const todoRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      cursor: z.number().optional(),
      limit: z.number().min(1).max(100).default(10),
      filter: z.enum(['all', 'completed', 'pending']).default('all'),
    }))
    .query(async ({ input }) => {
      const { cursor, limit, filter } = input;
      
      const where = filter === 'all' ? {} : 
        filter === 'completed' ? { completed: true } :
        { completed: false };

      const todos = await db.todo.findMany({
        where,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' },
      });

      const hasNextPage = todos.length > limit;
      if (hasNextPage) todos.pop();

      return {
        todos,
        nextCursor: hasNextPage ? todos[todos.length - 1]?.id : undefined,
      };
    }),
});

// Utilisation avec pagination infinie
function TodoList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = trpc.todos.getAll.useInfiniteQuery(
    { limit: 10, filter: 'all' },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const allTodos = data?.pages.flatMap((page) => page.todos) ?? [];

  return (
    <div>
      {allTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          Charger plus
        </Button>
      )}
    </div>
  );
}
```

### 4. Gestion d'État Global avec tRPC

#### A. Store Custom avec React Context

```typescript
// contexts/TodoContext.tsx
interface TodoContextType {
  filter: 'all' | 'completed' | 'pending';
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  selectedTodos: number[];
  toggleSelection: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedTodos(prev => 
      prev.includes(id) 
        ? prev.filter(todoId => todoId !== id)
        : [...prev, id]
    );
  };

  return (
    <TodoContext.Provider value={{ filter, setFilter, selectedTodos, toggleSelection }}>
      {children}
    </TodoContext.Provider>
  );
}
```

#### B. Actions Batch avec tRPC

```typescript
// Extension du router pour actions groupées
export const todoRouter = createTRPCRouter({
  // ... autres procédures

  batchDelete: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ input }) => {
      return await db.todo.deleteMany({
        where: { id: { in: input.ids } }
      });
    }),

  batchToggle: publicProcedure
    .input(z.object({ 
      ids: z.array(z.number()),
      completed: z.boolean()
    }))
    .mutation(async ({ input }) => {
      return await db.todo.updateMany({
        where: { id: { in: input.ids } },
        data: { completed: input.completed }
      });
    }),
});

// Utilisation dans le composant
function TodoBatchActions() {
  const { selectedTodos } = useContext(TodoContext);
  const utils = trpc.useUtils();

  const batchDeleteMutation = trpc.todos.batchDelete.useMutation({
    onSuccess: () => {
      utils.todos.getAll.invalidate();
    },
  });

  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => batchDeleteMutation.mutate({ ids: selectedTodos })}
        disabled={selectedTodos.length === 0}
      >
        Supprimer sélectionnés ({selectedTodos.length})
      </Button>
    </div>
  );
}
```

### 5. Server-Side Rendering (SSR) Avancé

#### A. Prefetch de données dans Server Component

```typescript
// app/todos/page.tsx (Server Component)
import { createCaller } from '@/trpc/routers';
import { createTRPCContext } from '@/trpc/init-procedure';
import { HydrateClient, trpc } from '@/trpc/client';

export default async function TodosServerPage() {
  // Création du caller côté serveur
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);

  // Prefetch des données
  const initialTodos = await caller.todos.getAll();

  return (
    <HydrateClient>
      <TodosClientComponent initialData={initialTodos} />
    </HydrateClient>
  );
}

// Composant client qui utilise les données préchargées
function TodosClientComponent({ initialData }: { initialData: Todo[] }) {
  const todos = trpc.todos.getAll.useQuery(undefined, {
    initialData,
    staleTime: 60 * 1000, // 1 minute
  });

  return (
    <div>
      {todos.data?.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

#### B. Streaming avec Suspense

```typescript
// components/TodosSuspense.tsx
function TodosList() {
  const todos = trpc.todos.getAll.useSuspenseQuery();
  
  return (
    <ul>
      {todos.data.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Page avec Suspense boundary
export default function TodosPage() {
  return (
    <div>
      <h1>Mes Tâches</h1>
      <Suspense fallback={<TodosSkeleton />}>
        <TodosList />
      </Suspense>
    </div>
  );
}
```

### 6. Testing Avancé

#### A. Test des Procédures tRPC

```typescript
// __tests__/todos.test.ts
import { createCaller } from '@/trpc/routers';
import { createTRPCContext } from '@/trpc/init-procedure';

describe('Todo Router', () => {
  it('should create a todo', async () => {
    const ctx = await createTRPCContext();
    const caller = createCaller(ctx);

    const newTodo = await caller.todos.create({
      text: 'Test todo'
    });

    expect(newTodo.text).toBe('Test todo');
    expect(newTodo.completed).toBe(false);
  });

  it('should require authentication for protected routes', async () => {
    const ctx = { session: null }; // Pas de session
    const caller = createCaller(ctx);

    await expect(
      caller.privateData()
    ).rejects.toThrow('UNAUTHORIZED');
  });
});
```

#### B. Test des Hooks React

```typescript
// __tests__/useTodos.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from './test-utils';

describe('Todo Hooks', () => {
  it('should fetch todos', async () => {
    const { result } = renderHook(
      () => trpc.todos.getAll.useQuery(),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([
      expect.objectContaining({
        id: expect.any(Number),
        text: expect.any(String),
        completed: expect.any(Boolean),
      })
    ]);
  });
});
```

### 7. Monitoring et Observabilité

#### A. Logging Avancé

```typescript
// trpc/logger.ts
import { initTRPC } from '@trpc/server';

const logger = initTRPC.context<Context>().create({
  transformer: superjson,
  
  // Middleware de logging global
  defaultMeta: { 
    authRequired: false 
  }
});

const loggerMiddleware = logger.middleware(async ({ path, type, next, meta }) => {
  const start = Date.now();
  
  console.log(`🔄 ${type.toUpperCase()} ${path} - Start`);
  
  const result = await next();
  
  const duration = Date.now() - start;
  
  if (result.ok) {
    console.log(`✅ ${type.toUpperCase()} ${path} - Success (${duration}ms)`);
  } else {
    console.error(`❌ ${type.toUpperCase()} ${path} - Error (${duration}ms):`, result.error);
  }
  
  return result;
});

export const publicProcedure = logger.procedure.use(loggerMiddleware);
```

#### B. Métriques et Analytics

```typescript
// trpc/analytics.ts
const analyticsMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const startTime = performance.now();
  
  try {
    const result = await next();
    
    // Métriques de succès
    analytics.track('trpc_call_success', {
      procedure: path,
      type,
      duration: performance.now() - startTime,
      userId: ctx.session?.user?.id,
    });
    
    return result;
  } catch (error) {
    // Métriques d'erreur
    analytics.track('trpc_call_error', {
      procedure: path,
      type,
      error: error.code,
      duration: performance.now() - startTime,
    });
    
    throw error;
  }
});
```

---

## Prochaines Étapes Recommandées

Maintenant que vous maîtrisez tRPC, voici les améliorations que vous pourriez implémenter :

### 1. **Subscriptions en Temps Réel**

```typescript
// WebSocket pour notifications live
const subscription = trpc.todos.onUpdate.useSubscription();
```

### 2. **Caching Avancé**

```typescript
// Cache persistant avec localStorage
const persistedClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24h
    },
  },
});
```

### 3. **Validation d'Input Complexe**

```typescript
// Schémas Zod réutilisables
export const todoSchema = z.object({
  text: z.string().min(1).max(200),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date().optional(),
});
```

### 4. **API Rate Limiting**

```typescript
// Middleware de rate limiting
const rateLimitMiddleware = t.middleware(async ({ next, ctx }) => {
  await rateLimit(ctx.session?.user?.id);
  return next();
});
