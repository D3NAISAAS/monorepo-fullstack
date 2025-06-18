# Ink CLI

Parfait ! Transformer ton script `rename_scope.sh` en un **CLI interactif Ink** dans un **monorepo Turborepo** est une excellente idée pour industrialiser ton outil.

Voici comment structurer ton projet **Turborepo + Ink CLI** proprement.

---

## ✅ Objectif

Tu veux :

* Créer un CLI interactif avec **Ink (React dans le terminal)** ;
* L’intégrer comme un package dans ton **Turborepo** ;
* Reproduire et améliorer le comportement de ton script `rename_scope.sh` dans ce nouveau CLI.

---

## 🗂️ Structure recommandée du Turborepo

```bash
my-turbo-monorepo/
├── apps/
│   ├── web/                  # (si tu as une app web Next.js par ex.)
├── packages/
│   ├── cli/                  # <--- Ton nouveau CLI Ink ici
│   └── core/                 # (si tu veux partager de la logique, ex: functions de scan)
├── node_modules/
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 🚀 Étapes d’installation

### 1. Crée ton CLI avec Ink

Si tu veux partir d’un template Ink TypeScript :

```bash
cd packages
pnpm dlx create-ink-app --typescript cli
```

Cela va générer une structure de ce type :

```bash
packages/cli/
├── src/
│   └── index.tsx            # Ton point d'entrée CLI
├── package.json
├── tsconfig.json
└── ...
```

Tu peux ensuite l’adapter à ton usage (voir plus bas : script `rename_scope.tsx`).

---

### 2. Déclare le package dans ton `pnpm-workspace.yaml`

```yaml
packages:
  - apps/*
  - packages/*
```

---

### 3. Rends le package exécutable en CLI

Dans `packages/cli/package.json`, ajoute :

```jsonc
{
  "name": "@d3n/cli",
  "bin": {
    "d3cli": "dist/index.js" // le nom de la commande terminal que tu veux
  },
  "scripts": {
    "dev": "tsx src/index.tsx",
    "build": "tsup src/index.tsx --format esm,cjs --dts",
    "start": "node dist/index.js"
  },
  "type": "module"
}
```

Ensuite, depuis la racine :

```bash
pnpm install
pnpm --filter @d3n/cli dev   # Lancer ton CLI Ink en dev
```

---

### 4. Expose-le globalement (dev local)

Tu peux le lier globalement en local :

```bash
cd packages/cli
pnpm link --global
```

Puis utiliser dans ton terminal :

```bash
d3cli
```

---

## 🧠 Organisation du code Ink

Voici une idée de structure dans `cli/src/` :

```
src/
├── index.tsx           # Entrée CLI
├── ui/                 # Composants Ink (UI)
│   └── ScopeRenamer.tsx
├── lib/                # Fonctions utilitaires (parsing, rename, etc.)
│   ├── findPackageFiles.ts
│   ├── confirmChanges.ts
│   └── renameScopes.ts
```

---

## 💡 Astuce : réutilise ton script shell en Node

Tu peux facilement transposer :

* le `find . -type f -name "package.json"` en `fast-glob` ;
* le `sed` en lecture JSON + écriture avec `fs.promises` ;
* les confirmations en prompts via Ink (ou `ink-select-input` / `ink-confirm-input`).

---

## ✅ En résumé

* **Créer un package CLI Ink** dans `packages/cli` ;
* Le définir en tant que **package local** dans ton Turborepo ;
* **Ne pas le globaliser par défaut**, sauf si tu veux l'exécuter partout (use `pnpm link`) ;
* Utilise `Ink`, `tsup` (ou `esbuild`) pour builder un exécutable propre.

Souhaites-tu que je te fournisse un **template complet de `packages/cli` déjà configuré** avec Ink, tsup, et un exemple de commande `rename-scope` ?


Pour **annuler un `pnpm link --global`**, tu as deux options selon ce que tu veux faire :

---

### 🔧 1. **Délier un package globalement (annule le lien)**

Depuis **n’importe où** dans ton terminal :

```bash
pnpm unlink --global @d3n/cli
```

Ou, si tu utilisais le nom de commande CLI (`d3cli`) :

```bash
pnpm unlink --global d3cli
```

---

### 🧼 2. **Nettoyer tous les liens globaux (optionnel)**

Si tu veux tout réinitialiser (⚠️ cela déliera tous les paquets liés globalement avec `pnpm link`):

```bash
pnpm store prune
```

---

### 🧪 Vérification

Tu peux vérifier les liens globaux actuels avec :

```bash
pnpm list --global --depth 0
```

Tu devrais ne plus voir `@d3nai/cli` ou `d3cli` après l’avoir délié.

---

Si tu veux re-linker plus tard :

```bash
cd packages/cli
pnpm link --global
```

Souhaites-tu que je t’ajoute une commande dans ton `package.json` pour automatiser l’unlink ?
---

## Utilisation de la CLI d3ncli

Maintenant que nous avons restructuré la CLI pour utiliser `d3ncli` comme commande principale avec `rename-scope` comme sous-commande, voici comment l'utiliser :

### En développement (sans build)

```bash
# Utiliser avec les valeurs par défaut (@repo/ → @d3nai/)
pnpm dev -- rename-scope

# Avec des valeurs personnalisées
pnpm dev -- rename-scope --from=@repo/ --to=@votre-scope/

# Afficher l'aide
pnpm dev -- --help
```

### Après le build

```bash
# Construire la CLI
pnpm build

# Exécuter avec les valeurs par défaut
pnpm start -- rename-scope

# Avec des valeurs personnalisées
pnpm start -- rename-scope --from=@repo/ --to=@votre-scope/
```

### Installation globale pour développement

```bash
# Dans le répertoire packages/cli
pnpm link --global

# Puis n'importe où
d3ncli rename-scope --from=@repo/ --to=@votre-scope/
```

### Utilisation directe du script Node

```bash
# Après le build
node dist/cli.js rename-scope --from=@repo/ --to=@votre-scope/
```

Le format général de la commande est :

```bash
d3ncli <sous-commande> [options]
```

Cette structure permet d'ajouter facilement d'autres sous-commandes à l'avenir, comme par exemple :

* `d3ncli generate-component`
* `d3ncli setup-project`
* etc.