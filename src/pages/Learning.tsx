import React, { useEffect, useState } from "react";
import reactImage from "../assets/images/react.png";
import designImage from "../assets/images/designImage.png";
import pmpImage from "../assets/images/pmpImage.png";
import Communication from "../assets/images/Communication.png";
import Community from "../assets/images/Community.png";
import English from "../assets/images/English.png";
import {
  FaSearch,
  FaBookOpen,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../Components/ui/dialog";
import { ExternalLink } from "lucide-react"; // Correct import for ExternalLink

interface Resource {
  title: string;
  category: string;
  duration: string;
  level: string;
  rating: number;
  description: string;
  provider: string;
  image: string;
  requiredSkills?: string[]; // Skills this resource helps develop
}

const resources: Resource[] = [
  {
    title: "React Fundamentals",
    category: "Course",
    duration: "40 hours",
    level: "Beginner",
    rating: 4.8,
    description: "Introduction to React components, props, and hooks.",
    provider: "Udemy",
    image: reactImage,
    requiredSkills: ["React", "JavaScript"],
  },
  {
    title: "Design Thinking Workshop",
    category: "Workshop",
    duration: "8 hours",
    level: "Intermediate",
    rating: 4.6,
    description: "Learn to solve problems creatively using design thinking.",
    provider: "Coursera",
    image: designImage,
    requiredSkills: ["UI/UX Design", "Prototyping"],
  },
  {
    title: "Project Management Professional (PMP)",
    category: "Certification",
    duration: "35 hours",
    level: "Advanced",
    rating: 4.9,
    description: "Comprehensive training for PMP certification.",
    provider: "LinkedIn Learning",
    image: pmpImage,
    requiredSkills: ["Project Management", "Agile Methodology"],
  },
  {
    title: "Effective Communication Skills",
    category: "Course",
    duration: "6 hours",
    level: "Beginner",
    rating: 4.8,
    description: "Improve your communication and leadership presence.",
    provider: "edX",
    image: Communication,
    requiredSkills: ["Communication"],
  },
  {
    title: "Community Health Worker Training",
    category: "Program",
    duration: "12 hours",
    level: "Intermediate",
    rating: 4.7,
    description: "Training for community health outreach and support.",
    provider: "WHO Academy",
    image: Community,
    requiredSkills: ["Caregiving", "Community Organizing"],
  },
  {
    title: "English for Professional Development",
    category: "Course",
    duration: "10 hours",
    level: "Beginner",
    rating: 4.6,
    description: "Enhance your English for workplace communication.",
    provider: "FutureLearn",
    image: English,
    requiredSkills: ["English"],
  },
];

export const Learning: React.FC = () => {
  const [skillData, setSkillData] = useState<{
    technicalSkills: string[];
    softSkills: string[];
    informalSkills: string[];
    certifications: string[];
    languages: { language: string; fluencyLevel: string }[];
    educationLevel: string;
    industryExperience: string;
  } | null>(null);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("");

  // Load skill data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("skillAssessmentData");
    if (storedData) {
      setSkillData(JSON.parse(storedData));
    }
  }, []);

  // Filter resources based on user input
  const applyFilters = () => {
    let result = [...resources];

    if (categoryFilter) {
      result = result.filter((r) => r.category === categoryFilter);
    }
    if (levelFilter) {
      result = result.filter((r) => r.level === levelFilter);
    }

    // Prioritize resources for missing skills if skillData exists
    if (skillData) {
      const allUserSkills = [
        ...skillData.technicalSkills,
        ...skillData.softSkills,
        ...skillData.informalSkills,
        ...skillData.certifications,
      ].map((s) => s.toLowerCase());

      result.sort((a, b) => {
        const aMissing = a.requiredSkills?.filter(
          (s) => !allUserSkills.includes(s.toLowerCase())
        ).length;
        const bMissing = b.requiredSkills?.filter(
          (s) => !allUserSkills.includes(s.toLowerCase())
        ).length;
        return (aMissing || 0) - (bMissing || 0); // Prioritize resources with more missing skills
      });
    }

    setFilteredResources(result);
  };

  // Handle filter changes
  const handleFilterChange = () => {
    applyFilters();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    if (hasHalf) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} />);
    }
    return stars;
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-2">Learning Resources</h1>
      <p className="text-gray-600 mb-6">
        Discover courses, certifications, and learning materials to develop your
        skills
      </p>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <select
          className="border rounded-lg px-3 py-2 w-full md:w-1/3 h-10"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Course">Course</option>
          <option value="Workshop">Workshop</option>
          <option value="Certification">Certification</option>
          <option value="Program">Program</option>
        </select>
        <select
          className="border rounded-lg px-3 py-2 w-full md:w-1/3 h-10"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 w-full md:w-1/3 h-10 rounded-lg"
          onClick={handleFilterChange}
        >
          <FaSearch />
          <span>Find Resources</span>
        </button>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((res, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-3 flex flex-col h-full"
          >
            <div className="flex-grow">
              <img
                src={res.image}
                alt={res.title}
                className="h-36 w-full object-cover rounded-lg mb-2"
              />
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {res.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {renderStars(res.rating)}
                </div>
              </div>
              <h3 className="font-semibold text-base">{res.title}</h3>
              <p className="text-xs text-gray-500 mb-1">{res.provider}</p>
              <p className="text-sm text-gray-600 mb-1 line-clamp-2 min-h-[40px]">
                {res.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                <span>{res.duration}</span>
                <span>{res.level}</span>
              </div>
            </div>

            {/* Dialog with Trigger and Description */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="mt-auto w-full bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2">
                  <FaBookOpen />
                  <span>Access Resource</span>
                </button>
              </DialogTrigger>
              <DialogContent aria-describedby={`dialog-desc-${index}`}>
                <DialogHeader>
                  <DialogTitle>{res.title}</DialogTitle>
                </DialogHeader>
                <DialogDescription id={`dialog-desc-${index}`}>
                  {res.description}
                </DialogDescription>
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{res.provider}</span>
                  <span>{res.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  {renderStars(res.rating)}
                </div>
                <p className="text-sm text-gray-600 mb-2">Level: {res.level}</p>
                <p className="text-sm text-gray-600">
                  Skills Gained: {res.requiredSkills?.join(", ") || "N/A"}
                </p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2"
                  onClick={() => window.open(`https://example.com/${res.title}`, "_blank")}
                >
                  <ExternalLink />
                  <span>Go to Resource</span>
                </button>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};