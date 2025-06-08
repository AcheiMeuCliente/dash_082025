import { useEffect, useState, useRef } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";

interface CompanyMapProps {
  companies: Doc<"companies">[];
  selectedCompanyId?: Id<"companies"> | null;
  onCompanySelect: (id: Id<"companies">) => void;
}

export function CompanyMap({ companies, selectedCompanyId, onCompanySelect }: CompanyMapProps) {
  const [stateDistribution, setStateDistribution] = useState<Record<string, number>>({});
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const distribution = companies.reduce((acc, company) => {
      acc[company.estado] = (acc[company.estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setStateDistribution(distribution);
  }, [companies]);

  useEffect(() => {
    // Initialize map when component mounts
    if (mapRef.current) {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    // Update markers when companies change
    updateMarkers();
  }, [companies, selectedCompanyId]);

  const initializeMap = () => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
            <p class="text-gray-500 text-sm">Map integration would be implemented here</p>
            <p class="text-gray-400 text-xs mt-2">Showing ${companies.length} companies</p>
          </div>
        </div>
      `;
    }
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current = [];
    
    // Add new markers for each company
    companies.forEach((company) => {
      if (company.endereco_mapa) {
        // In a real implementation, you would:
        // 1. Geocode the address to get lat/lng
        // 2. Create a marker on the map
        // 3. Add click handler to select the company
        // 4. Style selected marker differently
      }
    });
  };

  const handleMapClick = (companyId: Id<"companies">) => {
    onCompanySelect(companyId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Company Locations
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Interactive map showing company locations based on address data
        </p>
      </div>
      
      <div className="p-4">
        <div 
          ref={mapRef}
          className="w-full h-96 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center"
        >
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
            <p className="text-gray-500 text-sm">Map showing {companies.length} companies</p>
          </div>
        </div>
      </div>

      {companies.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {companies.filter(c => c.endereco_mapa).length} of {companies.length} companies have address data
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Regular</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
