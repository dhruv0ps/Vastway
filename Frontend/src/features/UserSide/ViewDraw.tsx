import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";


const ViewDraw: React.FC = () => {
    const [draws, setDraws] = useState<any[]>([]);
    
      useEffect(() => {
        const fetchDraws = async () => {
          try {
            const response = await drawrAPi.GetDraw();
            setDraws(response.data); 
          } catch (error) {
            console.error("Error fetching draws:", error);
          }
        };
    
        fetchDraws();
      }, []);
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {draws.map((card, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={card.image} 
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700">
                {card.category.name}
              </span>
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {card.title}
            </h3>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-center text-gray-500">
                <FaCalendarAlt className="h-4 w-4 mr-2" />
                <span className="text-sm">{card.date}</span>
              </div>
              
              <div className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                <span className="text-sm">{card.location}</span>
              </div>
              
              <div className="flex items-center text-gray-500">
                <FaUsers className="h-4 w-4 mr-2" />
                <span className="text-sm">{card.candidates} Candidates</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Learn More
                <FaArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
    
  );
};

export default ViewDraw;
