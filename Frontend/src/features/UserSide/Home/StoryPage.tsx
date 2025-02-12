import React from "react";
interface Story {
  title: string;
  date: string;
  category: string;
}
const stories: Story[] = [
  {
    title:
      "Pritha Solaiapp got 3 rejections but never gave up on the dream of coming to Canada",
    date: "April 23, 2024",
    category: "Work Permit Story",
  },
  {
    title: "How Krens Patel landed his Permanent Residency in Canada!",
    date: "March 15, 2024",
    category: "PR Story",
  },
  {
    title: "Vatsal's Bold Move: Leaving Behind His Dream Job for settling in Canada",
    date: "March 1, 2024",
    category: "Study Permit Story",
  },
];
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "work permit story":
      return "bg-yellow-100 text-yellow-800";
    case "pr story":
      return "bg-green-100 text-green-800";
    case "study permit story":
      return "bg-cyan-100 text-cyan-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

 const StoryPage : React.FC =() =>{
  return (
    <section className="min-h-screen bg-gray-50 mt-16 ">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Stories</h2>
        <p className="text-lg text-gray-600 mb-12">
          Read real-life success stories of people who overcame challenges to build a new life in Canada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
        {stories.map(({ title, date, category }) => (
        <div
        key={title}
        className="border-2 border-black rounded-lg p-6 hover:shadow-lg transition-all bg-white flex flex-col justify-between h-full"
      >
        <h3 className="text-xl font-bold">{title}</h3>
    
        <div className="mt-auto">
          <div className="flex">
            <span className="text-gray-600">{date}</span>
          </div>
          <div className="mt-2 flex justify-start">
            <span className={`${getCategoryColor(category)} px-2 py-1 rounded-full text-sm`}>
              {category}
            </span>
          </div>
        </div>
      </div>
        ))}
      </div>
    </section>
  );
}
export default StoryPage;


