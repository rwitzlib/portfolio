# Robert Witzlib Portfolio

A modern portfolio website featuring a unique stacked folder scrolling effect for showcasing projects.

## Features

- **Interactive Portfolio Carousel**: Stacked folder cards that cycle on scroll
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Stack**: Built with Next.js 15, React 19, and TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing section
│   ├── Portfolio.tsx   # Portfolio with folder stack effect
│   ├── PortfolioCard.tsx # Individual project card
│   ├── About.tsx       # About section
│   ├── Resume.tsx      # Experience timeline
│   ├── Skills.tsx      # Skills grid
│   └── Contact.tsx     # Contact form
└── public/
    └── projects/       # Project screenshots
```

## Customization

### Portfolio Projects

Edit the `projects` array in `components/Portfolio.tsx` to add your own projects:

```typescript
const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief description",
    image: "/projects/screenshot.png",
    url: "https://project-url.com",
  },
  // ... more projects
];
```

### Personal Information

- Update name and bio in `components/Hero.tsx` and `components/About.tsx`
- Update work experience in `components/Resume.tsx`
- Update skills in `components/Skills.tsx`
- Update contact info in `components/Contact.tsx`

### Colors

Modify CSS variables in `app/globals.css`:

```css
:root {
  --background: #0f172a;
  --foreground: #f8fafc;
  --accent: #3b82f6;
  /* ... */
}
```

## Docker

### Build and run with Docker

```bash
# Build the image
docker build -t robwitzlib-portfolio .

# Run the container
docker run -p 3000:3000 robwitzlib-portfolio
```

### Using Docker Compose

```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker Deployment

The Docker image can be deployed to any container platform:
- AWS ECS / Fargate
- Google Cloud Run
- Azure Container Apps
- DigitalOcean App Platform
- Any Kubernetes cluster

## License

MIT
