"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import turkeyGeoData from "../data/turkey.json";

type TooltipInfo = {
  cityName: string;
  message: string;
};

export default function TurkeyMap() {
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Gruplar
  const smmmCities = ["İstanbul", "Eskişehir", "Ankara", "Kırşehir", "Yozgat", "Sivas"];
  const merkezCity = "Kayseri";

  const handleMouseEnter = (
    cityName: string,
    event: React.MouseEvent<SVGPathElement>
  ) => {
    let message = "";
    if (smmmCities.includes(cityName)) {
      message = "İş birliği yaptığımız SMMM illeri";
    } else if (cityName === merkezCity) {
      message = "Trend Kobi Danışmanlık Merkez Ofisi";
    }

    if (message) {
      setTooltip({ cityName, message });
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY + 25, // mouse'un biraz altı
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip) {
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY + 25,
      });
    }
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onMouseMove={handleMouseMove}
    >
        <div className="w-full h-[600px]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 2000, center: [35, 39] }}
            width={800}
            height={600}
          >
            <Geographies geography={turkeyGeoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const cityName = geo.properties.name;

                  let fillColor = "#e2e8f0"; // default gri
                  if (smmmCities.includes(cityName)) {
                    fillColor = "#3AF2FF";
                  } else if (cityName === merkezCity) {
                    fillColor = "#ED8B09";
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => handleMouseEnter(cityName, e)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: "#64748b",
                          strokeWidth: 0.8,
                          outline: "none",
                        },
                        hover: {
                          fill: fillColor,
                          opacity: 0.9,
                          outline: "none",
                        },
                      }}
                      className="cursor-pointer transition-colors duration-200"
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

      {/* Tooltip (mouse'un altında balon gibi) */}
     {/* Tooltip (mouse'un altında balon gibi) */}
{tooltip && (
  <div
    className="fixed z-50 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg pointer-events-none"
    style={{
      left: `${tooltipPosition.x}px`,
      top: `${tooltipPosition.y}px`,
      transform: "translateX(-50%)",
    }}
  >
    <div className="font-semibold">{tooltip.cityName}</div>
    <div className="text-xs text-gray-300 mt-1">{tooltip.message}</div>
  </div>
)}

    </div>
  );
}
