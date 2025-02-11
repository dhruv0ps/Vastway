import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Link as LucideLink } from "lucide-react";
import Features from "./Features";
function HomePage() {
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState(0);
  const texts = ["Career Tips", "Immigration News", "Success Stories"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  const links = [
    { title: "Get Free PR Guide", path: "/view/list", color: "bg-green-300 hover:bg-green-400" },
    { title: "PR Draws", path: "/view/list", color: "bg-blue-300 hover:bg-blue-400" },
    { title: "EE/PNP Draw Tracker", path: "/draw-tracker", color: "bg-orange-200 hover:bg-orange-300" },
    { title: "Ways To PR", path: "/ways-to-pr", color: "bg-red-400 hover:bg-salmon-400" },
    { title: "Program Details", path: "/program-details", color: "bg-teal-300 hover:bg-teal-400" },
    { title: "Processing Time", path: "/processing-time", color: "bg-pink-300 hover:bg-pink-400" },
    { title: "Points Calculator", path: "/points-calculator", color: "bg-gray-300 hover:bg-gray-400" },
    { title: "NOC Finder", path: "/noc-finder", color: "bg-emerald-300 hover:bg-emerald-400" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto grid lg:grid-flow-col grid-flow-row  gap-8 md:space-x-2">

        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Updates On{" "}
              <span className="text-red-500 animate-fade-in-down">{texts[index]}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Get the latest draw updates, immigration insights, and news - subscribe now and join{" "}
              <span className="font-bold">7,300+ growing</span> community for tips to secure your PR!{" "}
              <span role="img" aria-label="maple leaf">🍁</span>
            </p>
            <div className="bg-yellow-100 inline-block px-4 py-2 rounded-full">
              <p className="text-gray-800">100% free. Unsubscribe anytime.</p>
            </div>
            <div className="relative max-w-xl mx-auto mb-16">
              <form onSubmit={handleSubmit} className="flex gap-2 mt-12">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Here!"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        
        <div className="space-x-2">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <LucideLink size={24} /> Site Links
          </h2>

          
          <div className="mb-2">
            <Link to={links[0].path} className="block w-full">
              <button
                className={`${links[0].color} p-2 rounded-lg text-gray-800 flex flex-col items-center justify-center transition-all hover:scale-105 w-full`}
              >
                <span className="text-sm font-medium text-center">{links[0].title}</span>
              </button>
            </Link>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            {links.slice(1, 7).map((link, index) => (
              <Link key={index} to={link.path} className="block">
                <button
                  className={`${link.color} p-2 mb-2 rounded-lg text-gray-800 flex flex-col items-center justify-center transition-all hover:scale-105 w-full`}
                >
                  <span className="text-sm font-medium text-center">{link.title}</span>
                </button>
              </Link>
            ))}
          </div>

         
          <div className="mt-2">
            <Link to={links[7].path} className="block w-full">
              <button
                className={`${links[7].color} p-2 rounded-lg text-gray-800 flex flex-col items-center justify-center transition-all hover:scale-105 w-full`}
              >
                <span className="text-sm font-medium text-center">{links[7].title}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Features/>
    </div>
  );
}

export default HomePage;
