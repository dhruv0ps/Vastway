import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";
import { Card, TextInput, Button, Label } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import ColorThief from "color-thief-browser";
interface Draw {
  id: string;
  title: string;
  image: string;
  imageUrl: string;
  category: { name: string };
  drawDate: string;
  candidates: number;
  linkEdit : string;
}

const categoryColors: { [key: string]: string } = {
  "Alberta PNP": "#D1E3FF",
  "Manitoba PNP": "#F5E1A4",
  "Ontario PNP": "#FFD1DC",
  "BC PNP": "#D1FFD1",
};

export default function CanadianDraws() {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [filteredDraws, setFilteredDraws] = useState<Draw[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const imgRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});
  const [_borderColors, setBorderColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await drawrAPi.GetDraw();
        setDraws(response.data);
        setFilteredDraws(response.data);
      } catch (error) {
        console.error("Error fetching draws:", error);
      }
    };
    fetchDraws();
  }, []);

  useEffect(() => {
    const results = draws.filter((draw) =>
      draw.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "All" || draw.category.name === activeCategory)
    );
    setFilteredDraws(results);
  }, [searchTerm, activeCategory, draws]);

  useEffect(() => {
    Object.keys(imgRefs.current).forEach((id) => {
      const imgElement = imgRefs.current[id];
      if (imgElement && imgElement.complete) {
        extractColor(id, imgElement);
      }
    });
  }, [filteredDraws]);

  const extractColor = (id: string, imgElement: HTMLImageElement) => {
    const colorThief = new ColorThief();
    try {
      const color = colorThief.getColor(imgElement);
      setBorderColors((prev) => ({
        ...prev,
        [id]: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
      }));
    } catch (error) {
      console.error("Error extracting color:", error);
    }
  };

  const categories = ["All", ...new Set(draws.map((draw) => draw.category.name))];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Canadian Draws</h1>
        <p className="text-xl text-gray-600">Explore the latest immigration opportunities in Canada</p>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <TextInput
              id="search"
              type="text"
              icon={FaSearch}
              placeholder="Search draws..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                color={activeCategory === category ? "blue" : "light"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDraws.map((item) => (
            <Link to={`/view/${item.linkEdit}`} key={item.id}>
              <Card
                className="h-full hover:shadow-lg transition-shadow cursor-pointer rounded-lg"
                style={{
                  borderColor: categoryColors[item.category.name] || "#ddd",
                  
                }}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {item.image || item.imageUrl ? (
                    <img
                      // ref={(el) => (imgRefs.current[item.id] = el)}
                      src={item.imageUrl || item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoad={() => extractColor(item.id, imgRefs.current[item.id]!)}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">{item.title}</h5>
                <div className="font-normal text-gray-700">
                  <Label
                    className="inline-block px-3 py-1 mt-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: categoryColors[item.category.name] || "#ddd",
                      color: "#333",
                    }}
                  >
                    {item.category.name}
                  </Label>
                  <div className="flex items-center text-gray-500 mb-1 mt-2">
                    <p>{new Date(item.drawDate).toLocaleDateString()}</p>
                  </div>
                  
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
