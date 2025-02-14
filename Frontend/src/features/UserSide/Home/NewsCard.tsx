import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { MapPin,ArrowRight } from "lucide-react";
import { NewsItem } from "../../../config/models/news";
import {FastAverageColor} from "fast-average-color";

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New Upcoming PR Pathways",
    description: "More information for this pathway will be announced soon!",
    date: "December 15, 2024",
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "PR Pathways for Data Roles",
    description:
      "PR streams for Data Scientist, Database Analyst, or Data Entry Clerk",
    date: "December 5, 2024",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Top 3 Skilled Trades for Easy PR",
    description: "Top 3 Skilled Trade",
    date: "November 22, 2024",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "PR Options for Home Support",
    description: "Home support worker opportunities",
    date: "November 15, 2024",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Most Invited Occupations in Ontario",
    description: "Latest occupation trends in Ontario",
    date: "November 10, 2024",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "New Immigration Plan 2025-2027",
    description: "Updated immigration policies and targets",
    date: "November 5, 2024",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export function NewsCard() {
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const[hoverId,setHoveredId] = useState<number | null>(null)
  useEffect(() => {
    const fac = new FastAverageColor();

    newsItems.forEach((item) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = item.image;
      img.onload = () => {
        const color = fac.getColor(img);
        setColors((prevColors) => ({
          ...prevColors,
          [item.id]: color.hex,
        }));
      };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {newsItems.map((item) => (
        <Card
          key={item.id}
        className="max-w-sm h-full hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1"
        style={{
          borderRight: `6px solid ${colors[item.id] ||  "#ddd"}`,
          borderBottom: `6px solid ${colors[item.id] ||  "#ddd"}`,
          borderTop:`1px solid ${colors[item.id] ||  "#ddd"}`,
          borderLeft: `1px solid ${colors[item.id] ||  "#ddd"}`,
          borderRadius: "12px",
        }}
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {item.image ?  (
                    <img
                      src={ item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
          <div className="p-2">
            <div className="flex items-center gap-2 ">
              {item.icon === "location" && (
                <MapPin className="w-5 h-5 text-red-500" />
              )}
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
              {item.description}
            </p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
          <button 
                  className="flex items-center text-sm font-semibold transition-colors duration-300 ml-2"
                  style={{ 
                    color: hoverId === item.id ? colors[item.id] : '#6B7280',
                  }}
                >
                  Read More
                  <ArrowRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    hoverId === item.id ? 'translate-x-1' : ''
                  }`} />
                </button>
        </Card>
      ))}
    </div>
  );
}

