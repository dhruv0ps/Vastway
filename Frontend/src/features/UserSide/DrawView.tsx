import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";
import { Card, TextInput, Button, Label, Spinner } from "flowbite-react";

import { DrawList } from "../../config/models/draw";
import { FastAverageColor } from "fast-average-color";

export default function CanadianDraws() {
  const [draws, setDraws] = useState<DrawList[]>([]);
  const [filteredDraws, setFilteredDraws] = useState<DrawList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [borderColors, setBorderColors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");

  const handleReset = () => {

  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  useEffect(() => {
    const fetchDraws = async () => {
      setLoading(true);
      try {
        const response = await drawrAPi.GetDraw();
        setDraws(response.data);
        setFilteredDraws(response.data);
      } catch (error) {
        console.error("Error fetching draws:", error);
      }
      setLoading(false);
    };
    fetchDraws();
  }, []);

  useEffect(() => {
    const results = draws.filter(
      (draw) =>
        draw.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeCategory === "All" || draw.category.name === activeCategory)
    );
    setFilteredDraws(results);
  }, [searchTerm, activeCategory, draws]);

  useEffect(() => {
    const fac = new FastAverageColor();
    let mounted = true;

    const updateColors = async () => {
      const newBorderColors: { [key: string]: string } = {};

      await Promise.all(
        filteredDraws.map((draw) => {
          return new Promise((resolve) => {
            if (!draw.imageUrl && !draw.image) {
              newBorderColors[draw._id] = "#ddd";
              return resolve(null);
            }

            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = draw.imageUrl || draw.image;

            img.onload = () => {
              try {
                const color = fac.getColor(img);
                newBorderColors[draw._id] = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${color.value[3]})`;
              } catch (error) {
                newBorderColors[draw._id] = "#ddd";
              }
              resolve(null);
            };

            img.onerror = () => {
              console.error(`Error loading image for draw ${draw._id}`);
              newBorderColors[draw._id] = "#ddd";
              resolve(null);
            };
          });
        })
      );

      if (mounted) {
        setBorderColors(newBorderColors);
      }
    };

    updateColors();

    return () => {
      mounted = false;
    };
  }, [filteredDraws]);

  const categories = ["All", ...new Set(draws.map((draw) => draw.category.name))];

  if (loading) {
    return (
      <section className="py-10 font-['Lexend',sans-serif] max-w-[1200px] mx-auto">
        <div className="container mx-auto px-4 min-h-[400px] flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-xl font-bold mb-4">Draws</h1>
              <p className="text-xl mb-8">
                Find <span className="font-bold">latest Immigration Draws and News</span>,
                ensuring you are always well-informed and Up-To-Date.
              </p>


            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Get the latest draw updates, immigration news, and insights – it's free!
              </h2>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <TextInput
                  type="email"
                  placeholder="Enter Your Email Here!"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-primary text-white">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-8 justify-center items-center mt-4">
            <Button
              className="bg-white text-primary border border-black rounded-md "
              size="md"
              as={Link}
              to="/news"
            >
              News
            </Button>
            <Button className="bg-white text-primary border border-black rounded-md" size="md" as={Link} to="/draw">
              Draw
            </Button>
            <Button className="bg-white text-primary border border-black rounded-md" size="md" as={Link} to="/draw-tracker">
              Draw Tracker
            </Button>
            <Button className="bg-white text-primary border border-black rounded-md" size="md" as={Link} to="/ways-to-pr">
              Ways To PR
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={activeCategory}
              // onChange={(e) => setSelectedOption(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="">Select a category...</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>


            <div className="flex-1 flex gap-2">
              <TextInput
                type="text"
                placeholder="Search your Specific NOC Code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-primary text-white" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">

        <main className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDraws.map((item) => (
              <Link to={`/view/${item.linkEdit}`} key={item._id}>
                <Card
                  className="max-w-sm h-full hover:shadow-lg transition-shadow duration-300"
                  style={{
                    borderRight: `6px solid ${borderColors[item._id] || "#ddd"}`,
                    borderBottom: `6px solid ${borderColors[item._id] || "#ddd"}`,
                    borderTop: `1px solid ${borderColors[item._id] || "#ddd"}`,
                    borderLeft: `1px solid ${borderColors[item._id] || "#ddd"}`,
                    borderRadius: "12px",
                  }}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    {item.image || item.imageUrl ? (
                      <img
                        src={item.imageUrl || item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                    {item.title}
                  </h5>
                  <div className="font-normal text-gray-700">
                    <div className="space-x-2">
                      <Label className="inline-block px-3 py-1 mt-2 rounded-full text-sm font-semibold bg-red-400">
                        Draw
                      </Label>
                      <Label
                        className="inline-block px-3 py-1 mt-2 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: borderColors[item._id] || "#ddd",
                          color: "#333",
                        }}
                      >
                        {item.category.name}
                      </Label>
                    </div>
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
    </div>
  );
}