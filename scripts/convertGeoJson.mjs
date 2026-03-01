// Script to convert GeoJSON to SVG paths
// Run with: node --experimental-json-modules scripts/convertGeoJson.js

import fs from 'fs';
import path from 'path';

const turkeyData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/turkey.json'), 'utf-8')
);

// Mercator projection function
function mercatorProjection(lon, lat, centerLon = 35, centerLat = 39, scale = 15) {
    const x = (lon - centerLon) * scale;
    const latRad = (lat * Math.PI) / 180;
    const centerLatRad = (centerLat * Math.PI) / 180;
    const y = -(Math.log(Math.tan(Math.PI / 4 + latRad / 2)) -
        Math.log(Math.tan(Math.PI / 4 + centerLatRad / 2))) * scale * (180 / Math.PI);
    return { x: x + 325, y: y + 190 }; // Offset to center in viewBox
}

// Convert coordinates array to SVG path
function coordinatesToPath(coordinates) {
    if (!coordinates || coordinates.length === 0) return '';

    let pathData = '';

    coordinates.forEach((ring, ringIndex) => {
        ring.forEach((coord, i) => {
            const { x, y } = mercatorProjection(coord[0], coord[1]);
            if (i === 0) {
                pathData += `M${x.toFixed(2)},${y.toFixed(2)}`;
            } else {
                pathData += `L${x.toFixed(2)},${y.toFixed(2)}`;
            }
        });
        pathData += 'Z';
    });

    return pathData;
}

// Process GeoJSON features
function convertGeoJSON(geoJson) {
    const provinces = [];

    geoJson.features.forEach((feature) => {
        const name = feature.properties.name;
        const number = feature.properties.number;
        const geometry = feature.geometry;

        let pathData = '';
        let allPoints = [];

        if (geometry.type === 'Polygon') {
            pathData = coordinatesToPath(geometry.coordinates);
            geometry.coordinates[0].forEach(coord => {
                allPoints.push(mercatorProjection(coord[0], coord[1]));
            });
        } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach((polygon) => {
                pathData += coordinatesToPath(polygon);
                polygon[0].forEach(coord => {
                    allPoints.push(mercatorProjection(coord[0], coord[1]));
                });
            });
        }

        // Calculate center
        const centerX = allPoints.reduce((sum, p) => sum + p.x, 0) / allPoints.length;
        const centerY = allPoints.reduce((sum, p) => sum + p.y, 0) / allPoints.length;

        provinces.push({
            id: name.toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/ /g, '-'),
            name,
            number,
            path: pathData,
            center: { x: parseFloat(centerX.toFixed(2)), y: parseFloat(centerY.toFixed(2)) }
        });
    });

    return provinces;
}

const provinces = convertGeoJSON(turkeyData);

// Generate TypeScript file content
const tsContent = `// Auto-generated from turkey.json GeoJSON
// Contains SVG paths for all 81 provinces of Turkey

export interface ProvinceData {
  id: string;
  name: string;
  number: number;
  path: string;
  center: { x: number; y: number };
}

export const TURKEY_PROVINCES: ProvinceData[] = ${JSON.stringify(provinces, null, 2)};

// Lookup by name
export const provincesByName: Record<string, ProvinceData> = {};
TURKEY_PROVINCES.forEach(p => { provincesByName[p.name] = p; });
`;

fs.writeFileSync(
    path.join(process.cwd(), 'src/data/turkeyPaths.ts'),
    tsContent
);

console.log(`✅ Generated turkeyPaths.ts with ${provinces.length} provinces`);
