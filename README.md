# La mécanique fine de la résonance conversationnelle

Site web statique présentant l'article de recherche de Florent Klimacek sur la résonance conversationnelle dans les interactions humain-IA.

## Structure du projet

```
Site Web/
├── index.html      # Page principale avec tout le contenu
├── style.css       # Styles (dark theme, responsive)
├── script.js       # Navigation, animations, graphique Chart.js
└── README.md       # Ce fichier
```

## Fonctionnalités

- **Design sombre moderne** avec palette KAIROS (bleu #667eea, orange #f59e0b)
- **Navigation sticky** avec highlight de la section active
- **Menu mobile** responsive avec overlay
- **Animations au scroll** (fade-in des sections)
- **Graphique interactif** Chart.js pour la baseline témoin
- **Équation interactive** avec tooltips sur les variables
- **Typographie optimisée** pour la lecture longue (Inter, 18px, 1.7 line-height)

## Déploiement

### Option 1 : GitHub Pages (recommandé)

1. Créer un repository GitHub
2. Pousser les fichiers :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[username]/[repo].git
   git push -u origin main
   ```
3. Aller dans Settings > Pages
4. Source : Deploy from branch > main > / (root)
5. Le site sera disponible à `https://[username].github.io/[repo]/`

### Option 2 : Netlify

1. Glisser-déposer le dossier sur [netlify.com/drop](https://app.netlify.com/drop)
2. Le site est immédiatement en ligne
3. Possibilité de connecter un domaine personnalisé

### Option 3 : Vercel

1. Installer Vercel CLI : `npm i -g vercel`
2. Dans le dossier du projet : `vercel`
3. Suivre les instructions

### Option 4 : Local

Ouvrir `index.html` directement dans un navigateur. Toutes les fonctionnalités sont opérationnelles en local.

## Personnalisation

### Modifier les couleurs

Dans `style.css`, section `:root` :

```css
:root {
    --bg-primary: #0a0e1a;      /* Fond principal */
    --accent-blue: #667eea;      /* Accent KAIROS */
    --accent-orange: #f59e0b;    /* Highlights */
    --accent-green: #10b981;     /* Résonance positive */
    --accent-red: #ef4444;       /* Anti-résonance */
}
```

### Modifier la typographie

```css
:root {
    --font-main: 'Inter', system-ui, sans-serif;
    --content-max: 720px;        /* Largeur de lecture */
}

body {
    font-size: 18px;
    line-height: 1.7;
}
```

### Ajouter des sections

Copier la structure d'une section existante :

```html
<section id="nouvelle-section" class="section">
    <div class="container">
        <div class="section-header">
            <span class="section-number">07</span>
            <h2 class="section-title">Titre de la section</h2>
        </div>
        <div class="content">
            <!-- Contenu ici -->
        </div>
    </div>
</section>
```

## Dépendances externes

- **Google Fonts** : Inter (400, 500, 600, 700)
- **Chart.js** : Graphiques (CDN)

Le site fonctionne hors-ligne une fois ces ressources en cache.

## Accessibilité

- Navigation clavier complète
- Aria labels sur les éléments interactifs
- Contraste WCAG AA sur le texte
- `prefers-reduced-motion` respecté
- Structure sémantique HTML5

## Licence

Article sous licence Creative Commons BY-NC-SA 4.0

---

KAIROS · Observer la résonance conversationnelle · 2026
