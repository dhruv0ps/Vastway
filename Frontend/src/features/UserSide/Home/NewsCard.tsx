import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { MapPin } from "lucide-react";
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
          className="max-w-sm h-full hover:shadow-lg transition-shadow duration-300"
          style={{ borderColor: colors[item.id] || "#ccc", borderWidth: "2px" }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {item.icon === "location" && (
                <MapPin className="w-5 h-5 text-red-500" />
              )}
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
              {item.description}
            </p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

