#!/bin/bash

FROM="@repo/"
TO="@d3nai/"

COLOR_BLUE="\033[1;34m"
COLOR_GREEN="\033[1;32m"
COLOR_YELLOW="\033[1;33m"
COLOR_RESET="\033[0m"
COLOR_RED="\033[1;31m"

echo -e "${COLOR_BLUE}🔍 Recherche des fichiers contenant '${FROM}'...${COLOR_RESET}"

FILES=$(find . \
  -type f \( -name "package.json" -o -name "*.ts" -o -name "*.tsx" \) \
  -not -path "./node_modules/*" \
  -exec grep -l "${FROM}" {} +)

if [ -z "$FILES" ]; then
  echo -e "${COLOR_RED}❌ Aucun fichier trouvé avec le scope '${FROM}'.${COLOR_RESET}"
  exit 1
fi

echo ""
echo -e "${COLOR_GREEN}✅ Fichiers trouvés contenant '${FROM}' :${COLOR_RESET}"
echo "----------------------------------------"
for FILE in $FILES; do
  echo -e "${COLOR_YELLOW}- $FILE${COLOR_RESET}"
done
echo "----------------------------------------"
echo ""
read -p "🔄 Appuie sur Entrée pour commencer le traitement fichier par fichier..."

echo ""

for FILE in $FILES; do
  echo -e "${COLOR_BLUE}📄 Fichier : ${FILE}${COLOR_RESET}"

  # Sauvegarde temporaire de l'original
  TMP=$(mktemp)
  cp "$FILE" "$TMP"

  # Effectuer la substitution dans une copie
  sed "s|${FROM}|${TO}|g" "$FILE" > "${FILE}.tmp"

  echo ""
  echo -e "${COLOR_YELLOW}🔎 Différences :${COLOR_RESET}"
  echo "----------------------------------------"
  diff --color=always "$TMP" "${FILE}.tmp" || true
  echo "----------------------------------------"
  echo ""

  while true; do
    read -p "🎯 Appliquer cette modification ? ([y]es / [s]kip / [q]uit) : " answer
    case $answer in
      [Yy]* )
        mv "${FILE}.tmp" "$FILE"
        echo -e "${COLOR_GREEN}✅ Modifié : $FILE${COLOR_RESET}"
        break;;
      [Ss]* )
        rm "${FILE}.tmp"
        echo -e "${COLOR_YELLOW}⏭ Skippé : $FILE${COLOR_RESET}"
        break;;
      [Qq]* )
        rm "${FILE}.tmp"
        echo -e "${COLOR_RED}🛑 Script interrompu.${COLOR_RESET}"
        exit 0;;
      * )
        echo "❓ Choix invalide. Tape y / s / q.";;
    esac
  done
  echo ""
done

# 🔥 Nettoyage des node_modules & lockfile
echo -e "${COLOR_BLUE}🧹 Nettoyage final recommandé...${COLOR_RESET}"
read -p "Souhaitez-vous supprimer tous les node_modules + pnpm-lock.yaml ? ([y]es / [n]o) : " clean

if [[ "$clean" =~ ^[Yy]$ ]]; then
  echo -e "${COLOR_YELLOW}🔄 Suppression de tous les node_modules...${COLOR_RESET}"
  find . -type d -name "node_modules" -prune -exec rm -rf '{}' +

  if [ -f "pnpm-lock.yaml" ]; then
    rm pnpm-lock.yaml
    echo -e "${COLOR_YELLOW}🧾 Fichier pnpm-lock.yaml supprimé.${COLOR_RESET}"
  fi

  echo -e "${COLOR_GREEN}✅ Nettoyage terminé. Tu peux maintenant exécuter :${COLOR_RESET}"
  echo -e "${COLOR_BLUE}   pnpm install${COLOR_RESET}"
else
  echo -e "${COLOR_YELLOW}🚫 Nettoyage annulé.${COLOR_RESET}"
fi

echo ""
echo -e "${COLOR_GREEN}🎉 Script terminé avec succès !${COLOR_RESET}"
