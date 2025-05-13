# Funkthetown.net

Site web pour le projet Funkthetown.

## Installation

```bash
# Cloner le dépôt
git clone [URL_DU_DEPOT]

# Installer les dépendances
cd Funkthetown.net
npm install

# Lancer le serveur de développement
npm run dev
```

## Fichiers médias

⚠️ **Important** : Les fichiers vidéo et audio ne sont pas inclus dans le dépôt Git en raison de leur taille. 

Pour obtenir les fichiers médias nécessaires au fonctionnement du site :
1. Téléchargez les fichiers depuis [LIEN_VERS_STOCKAGE_PARTAGE]
2. Placez tous les fichiers MP4 et WAV dans le dossier `public/` du projet

## Structure du projet

- `src/App.vue` - Composant principal du site
- `public/` - Fichiers statiques (vidéos, audio, polices)
- `src/` - Code source Vue.js

## Développement

Ce projet utilise Vue 3 avec Vite.

## Déploiement

Pour construire le site pour la production :

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/`.
