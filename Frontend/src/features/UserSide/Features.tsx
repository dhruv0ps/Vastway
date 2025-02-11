
import { Globe, Newspaper, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
const Features = () => {
    const features = [
        {
            icon: Globe,
            title: "Immigration Insights",
            description: "Stay Informed with the Latest Immigration Draws and short and informative News from All Canadian Provinces in One Convenient Website!",
        },
        {
            icon: Newspaper,
            title: "Free Newsletter",
            description: "Subscribe to our free weekly newsletter for the latest immigration updates, inspiring stories, and informative blogs delivered straight to your inbox.",
        },
        {
            icon: Lightbulb,
            title: "Career Tips",
            description: "Explore our blog for vital career tips, job opportunities, grants and loans, certifications, and everything else that matters to students in Canada.",
        },
    ];

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
                    <Link to="/view/list" className="text-primary-600 hover:text-blue-800 font-medium">
                        Check All Draws/News &gt;&gt;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-14 h-14 mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;