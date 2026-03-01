"use client";

import TurkeyMap from '../components/TurkeyMap';

export default function Home() {
  const handleCityClick = (cityName: string, cityData: any) => {
    console.log(`${cityData.name_tr} şehrine tıklandı!`, cityData);
    alert(`${cityData.name_tr} şehrine tıklandı!\nNüfus: ${cityData.population}\nAçıklama: ${cityData.description}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Türkiye Haritası - React 19 & Next.js 15
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
        <TurkeyMap
  highlightedCities={["İstanbul", "Ankara", "Konya", "İzmir", "Antalya"]}
  onCityClick={(cityName) => console.log("Tıklanan şehir:", cityName)}
/>

        </div>
        
        <div className="mt-8 text-center text-gray-600">
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">Özellikler</h3>
              <ul className="text-sm space-y-1">
                <li>• Hover tooltip</li>
                <li>• Tıklanabilir şehirler</li>
                <li>• TailwindCSS styling</li>
                <li>• TypeScript desteği</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-green-600 mb-2">Teknolojiler</h3>
              <ul className="text-sm space-y-1">
                <li>• React 19.1.0</li>
                <li>• Next.js 15</li>
                <li>• TypeScript</li>
                <li>• TailwindCSS</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-purple-600 mb-2">İnteraktif</h3>
              <ul className="text-sm space-y-1">
                <li>• Şehir hover efektleri</li>
                <li>• Detaylı bilgi tooltip</li>
                <li>• Tıklama olayları</li>
                <li>• Responsive tasarım</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
