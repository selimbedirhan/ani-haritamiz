# 🇹🇷 Turkey Map - React GeoJSON SVG Interactive Map Component

A modern, interactive Turkey map application built with React 19, Next.js 15, and GeoJSON data. Features SVG-based map visualization with hover tooltips and clickable cities.

## ✨ Features

- 🗺️ **Real Turkey Map** - SVG-based, sharp and clear visualization
- 🏙️ **10 Major Cities** 
- 🎯 **Interactive Experience** - Hover tooltips and clickable cities
- 🎨 **Modern UI/UX** - Responsive design with TailwindCSS
- 📊 **Detailed Information** - Population, coordinates, and city descriptions
- ⚡ **High Performance** - React 19 and Next.js 15 optimizations
- 🌍 **GeoJSON Integration** - Real geographic data visualization
- 🎨 **SVG Map Rendering** - Scalable vector graphics for crisp display

## 🚀 Technologies

- **React 19.1.0** - Latest React features and hooks
- **Next.js 15** - App Router and Server Components
- **TypeScript** - Type safety and better development experience
- **TailwindCSS** - Modern utility-first CSS framework
- **react-simple-maps** - Geographic map visualization library
- **SVG** - Vector-based map rendering
- **GeoJSON** - Standard format for geographic data
- **D3.js** - Data visualization and mapping

## 📦 Installation

### Requirements
- Node.js 18.17 or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd turkey-map
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

### Alternative Installation Methods

#### Using Yarn
```bash
yarn install
yarn dev
```

#### Using pnpm
```bash
pnpm install
pnpm dev
```

## 🏗️ Project Structure

```
turkey-map/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx        # Root layout component
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   └── TurkeyMap.tsx     # Interactive map component
│   └── data/
│       └── cities.ts         # City data and coordinates
├── public/
│   ├── turkeymap.svg         # Turkey SVG map file
│   └── tr-cities.json        # GeoJSON city data
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # TailwindCSS configuration
└── README.md                 # Project documentation
```

### Key Files

- **`TurkeyMap.tsx`** - Main interactive map component with React hooks
- **`turkeymap.svg`** - Vector-based Turkey map with city boundaries
- **`tr-cities.json`** - GeoJSON data containing city coordinates and properties
- **`cities.ts`** - TypeScript interfaces and city data structures

## 🎮 Usage

### Basic Implementation

```tsx
import TurkeyMap from '@/components/TurkeyMap';

export default function Home() {
  const handleCityClick = (cityName: string, cityData: any) => {
    console.log(`Clicked on ${cityData.name_tr} city!`);
  };

  return (
    <TurkeyMap 
      highlightedCities={['istanbul', 'ankara', 'konya']}
      onCityClick={handleCityClick}
    />
  );
}
```

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `highlightedCities` | `string[]` | `['istanbul', 'ankara', 'konya']` | Array of city IDs to highlight |
| `onCityClick` | `(cityName: string, cityData: City) => void` | `undefined` | City click event handler |

### City Data Structure

```typescript
interface City {
  id: string;
  name: string;
  name_tr: string;
  population?: string;
  description?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
```

## 🌍 Interactive Map Features

### SVG Map Integration
- **Vector Graphics**: Scalable SVG map for crisp display at any resolution
- **GeoJSON Support**: Real geographic data integration
- **Interactive Elements**: Hover effects and click handlers
- **Responsive Design**: Works on all screen sizes

### React Map Component
- **React Hooks**: useState and useEffect for state management
- **TypeScript**: Full type safety for props and data
- **Performance**: Optimized rendering with React 19
- **Accessibility**: ARIA labels and keyboard navigation

## 🎨 Customization

### Styling and Colors

Customize highlighted cities by modifying CSS classes in `TurkeyMap.tsx`:

```tsx
// Highlighted cities
fill="#3b82f6"  // Blue
stroke="#1d4ed8" // Dark blue

// Normal cities  
fill="#6b7280"   // Gray
stroke="#374151" // Dark gray
```

### Adding New Cities

Add new cities to `src/data/cities.ts`:

```typescript
{
  id: "trabzon",
  name: "Trabzon",
  name_tr: "Trabzon",
  population: "800K",
  description: "Pearl of the Black Sea",
  coordinates: { lat: 41.0027, lng: 39.7168 }
}
```

## 🗺️ Map Data Sources

### SVG Map Files
- **turkeymap.svg**: Vector-based Turkey map with city boundaries
- **GeoJSON Data**: Standard format for geographic features
- **City Coordinates**: Latitude and longitude for accurate positioning
- **Population Data**: Real demographic information for Turkish cities

### Geographic Data
- **Turkey Provinces**: All 81 provinces with accurate boundaries
- **Major Cities**: Istanbul, Ankara, Izmir, and other metropolitan areas
- **Coordinates**: WGS84 coordinate system for global compatibility

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Quality

The project uses ESLint and Prettier for code formatting:

```bash
npm run lint
npm run lint:fix
```

## 📱 Responsive Design

- **Mobile First** approach
- **Tablet** and **Desktop** compatibility
- **Touch** and **Mouse** interaction support
- **Accessible** design with ARIA labels
- **Cross-browser** compatibility

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
npm run build
npx vercel --prod
```

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=out
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### GitHub Pages

```bash
npm run build
npm run export
# Deploy 'out' folder to GitHub Pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Emrelutfi** - [GitHub](https://github.com/lutfiEmre)

## 🙏 Acknowledgments

- [react-simple-maps](https://github.com/zcreativelabs/react-simple-maps) - Geographic map visualization library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next.js](https://nextjs.org/) - React framework
- [SimpleMaps](https://simplemaps.com/) - SVG map data
- [D3.js](https://d3js.org/) - Data visualization library
- [GeoJSON](https://geojson.org/) - Geographic data format

## 🔍 SEO Keywords

**React Map Component**, **Turkey SVG Map**, **GeoJSON React**, **Interactive Map**, **SVG Map Component**, **React Geographic Map**, **Turkey Map Visualization**, **React Map Library**, **SVG Map React**, **Geographic Data Visualization**, **Interactive Turkey Map**, **React Map Component Library**, **SVG Map with React**, **GeoJSON React Component**, **Turkey Cities Map**, **React Map SVG**, **Interactive SVG Map**, **React Map Visualization**, **Turkey Map Component**, **SVG Map React Hook**

---

⭐ **If you like this project, please give it a star!**

## 📞 Support

For questions, issues, or contributions, please open an issue on GitHub or contact the developer.
