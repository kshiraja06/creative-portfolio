# KAM - 2D Artist Portfolio

A whimsical, nature-themed portfolio website showcasing 2D art, game art, animation, and character design work.

## Features

- **Nature-inspired Design**: Whimsical mushroom, cat, and snail illustrations
- **Smooth Navigation**: Interactive sections with scroll-based animations
- **Responsive Layout**: Works beautifully on desktop and mobile devices
- **Gallery Sections**: Organized by project type (Background, Game Art, Animation, Character Design)
- **Optimized for Vercel**: Ready for deployment with proper configuration

## Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with nature theme
├── script.js           # Interactive JavaScript functionality
├── vercel.json         # Vercel deployment configuration
├── package.json        # Project metadata and scripts
├── README.md           # This file
├── biolumi/            # Background art projects
├── character design/   # Character design work
├── comic/              # Comic projects
├── concept art/        # Concept art pieces
├── food reel/          # Food-related artwork
├── game/               # Game art projects
├── personal/           # Personal projects
└── pou goa/            # Special projects
```

## Local Development

1. **Start a local server:**
   ```bash
   npm run dev
   ```
   Or use Python:
   ```bash
   python -m http.server 8000
   ```

2. **Open in browser:**
   Navigate to `http://localhost:8000`

## Deployment to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

Or connect your GitHub repository to Vercel for automatic deployments.

## Customization

### Adding Your Artwork

1. Place your images in the respective folders:
   - `biolumi/` → Background art
   - `game/` → Game art
   - `character design/` → Character designs
   - Animation files in appropriate folders

2. Update the `getProjectsForSection()` function in `script.js` to load your actual artwork.

### Styling Adjustments

- Modify colors in `styles.css` (currently using nature-inspired palette)
- Adjust typography and layout in the CSS variables
- Update the mushroom/illustration styles in the CSS

### Adding New Sections

1. Add new section to `index.html`
2. Update navigation in `index.html`
3. Add corresponding styles to `styles.css`
4. Update the JavaScript to handle the new section

## Design Inspiration

Based on the whimsical nature-themed design with:
- Color palette: Cream background, earthy browns, orange accents
- Typography: Bold, playful fonts with two-tone effects
- Illustrations: Mushrooms, cat, snail, and grass elements
- Layout: Clean, minimalist with artistic flair

## Performance

- Optimized for fast loading
- Lazy loading for images
- Smooth animations and transitions
- Mobile-responsive design

## License

MIT License - feel free to use this as a template for your own portfolio!
