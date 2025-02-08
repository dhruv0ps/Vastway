
import  { useEffect, useState } from "react";
// import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";
import { Card } from "flowbite-react";


export default function CanindianDraws() {
    const [draws, setDraws] = useState<any[]>([]);
    // const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL || "http://localhost:5050"; 
        useEffect(() => {
          const fetchDraws = async () => {
            try {
              const response = await drawrAPi.GetDraw();
              setDraws(response.data); // Assuming response.data is an array
            } catch (error) {
              console.error("Error fetching draws:", error);
            }
          };
      
          fetchDraws();
        }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
    {/* Header */}
    

    
    <main className="max-w-5xl w-full  mx-auto flex flex-wrap justify-center gap-8">
      {/* Navigation Pills */}
     

      {/* Search Section */}
      

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {draws.map((item) => (
          <Card key={item.id}  className="hover:shadow-lg transition-shadow cursor-pointer " >
             <div className="relative h-48 overflow-hidden rounded-t-lg">
              
             {item.image || item.imageUrl ? (
                <img
                src={item.imageUrl ? item.imageUrl : item.image}
                  alt={item.title}
                  className="absolute top-0 left-0 max-w-xs max-h-48  object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 px-4 mt-2">{item.title}</h5>
            <div className="font-normal text-gray-700 px-4 pb-4">
              <p className="text-gray-600">{item.category.name}</p>
              <p className="text-gray-500">{item.date}</p>
              {/* <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      tag === "Draw"
                        ? "bg-pink-100 text-pink-800"
                        : tag === "Express Entry"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </Card>
        ))}
      </div>
    </main>
  </div>
  )
}
