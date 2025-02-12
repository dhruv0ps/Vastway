import { Users, FileEdit, Users2 } from "lucide-react";
interface Feature {
  title: string;
  description: string;
  icon: "community" | "stories" | "grow";
}

const features: Feature[] = [
  {
    title: "Building Community",
    description:
      "Building Community that will be Your Ultimate Resource for Life, Investment, and Career Tips.",
    icon: "community",
  },
  {
    title: "Inspiring Stories",
    description:
      "Stories to Navigate Your Canadian Immigration Journey with Confidence and Inspiration. Their inspiring stories will motivate and uplift you!",
    icon: "stories",
  },
  {
    title: "Grow Together",
    description:
      "Together, we thrive! Our website is your hub for growth, offering resources and inspiration to all. Let's grow together!",
    icon: "grow",
  },
];


const getIcon = (icon: Feature["icon"]) => {
  switch (icon) {
    case "community":
      return <Users className="w-7 h-7 text-primary" />;
    case "stories":
      return <FileEdit className="w-7 h-7 text-primary" />;
    case "grow":
      return <Users2 className="w-7 h-7 text-primary" />;
    default:
      return null;
  }
};

export default function FeaturesPage() {
  return (
    <section className="">
         <div className=" max-w-7xl flex justify-end mb-16">
                    <a href="#" className="text-black hover:text-gray-700 font-medium">
                      Read All {`>>`}
                    </a>
                  </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map(({ title, description, icon }) => (
          <div key={title} className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 mb-6 rounded-full bg-blue-50 flex items-center justify-center">{getIcon(icon)}</div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
