import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import type { KeyboardEvent } from "react";
import { MdCancel } from "react-icons/md";
import { supabase } from "../supabaseClient";

interface Language {
  language: string;
  fluencyLevel: string;
}

export const Skills = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<any[]>([]); // {ID, PREFERREDLABEL}
  const softSkills = ["Leadership", "Communication", "Teamwork", "Problem-Solving"];
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [informalSkills, setInformalSkills] = useState<string>("");
  const [industryExperience, setIndustryExperience] = useState<string>("");
  const [certifications, setCertifications] = useState<string>("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    language: "",
    fluencyLevel: "",
  });
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  // Fetch suggestions from Supabase on input change (with debouncing)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (skill.length > 2) {
        try {
          const { data, error } = await supabase
            .from("skills")
            .select("ID, PREFERREDLABEL")
            .ilike("PREFERREDLABEL", `%${skill}%`)
            .or(`ALTLABELS.ilike.%${skill}%`)
            .limit(10);

          if (error) {
            console.error("Error fetching suggestions:", error);
            if (error.code === "42703") {
              console.warn("Check table schema: column names might not match.");
            } else if (error.message.includes("API key")) {
              console.warn("Check API key configuration or query syntax.");
            }
          } else {
            setSuggestedSkills(data || []);
          }
        } catch (e) {
          console.error("Unexpected error:", e);
        }
      } else {
        setSuggestedSkills([]);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timer);
  }, [skill]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSkills([...skills, skill]);
      setSkill("");
      setSuggestedSkills([]);
    }
  };

  const handleAddSkill = (addedSkill: string) => {
    if (!skills.includes(addedSkill)) {
      setSkills([...skills, addedSkill]);
      setSkill("");
      setSuggestedSkills([]);
    }
  };

  const handleAnalyzeSkills = () => {
    const skillData = {
      technicalSkills: skills,
      softSkills: selectedSoftSkills,
      informalSkills: informalSkills.split(",").map((s) => s.trim()).filter((s) => s),
      industryExperience,
      certifications: certifications.split(",").map((c) => c.trim()).filter((c) => c),
      languages: selectedLanguages,
      educationLevel,
    };
    // Save to localStorage
    localStorage.setItem("skillAssessmentData", JSON.stringify(skillData));
    console.log("Skill Analysis Data saved to localStorage:", skillData);
    alert("Skills analyzed and saved! Check the console or visit the Career Path page.");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Skills Assessment</h2>
          <p className="text-gray-600">
            Tell us about your current skills and experience. Include both
            formal qualifications and informal skills.
          </p>
        </div>
        <select className="border rounded-lg px-3 py-2">
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

      {/* Technical Skills */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 font-medium">Technical Skills *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., JavaScript, Python, Data Analysis..."
              value={skill}
              className="w-full border rounded-lg px-3 py-2 mb-2"
              onChange={(event) => setSkill(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="p-2 -ml-10 rounded absolute cursor-pointer"
              onClick={() => handleAddSkill(skill)}
            >
              <Plus className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {suggestedSkills.length > 0 && (
            <ul className="border rounded-lg max-h-40 overflow-y-auto mb-2">
              {suggestedSkills.map((s) => (
                <li
                  key={s.ID}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddSkill(s.PREFERREDLABEL)}
                >
                  {s.PREFERREDLABEL}
                </li>
              ))}
            </ul>
          )}

          {skills.length !== 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 flex gap-x-1 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setSkills(skills.filter((addedSkill) => addedSkill !== skill))
                    }
                  >
                    <MdCancel />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Years of Experience</label>
            <input
              type="number"
              placeholder="0"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Months</label>
            <input
              type="number"
              placeholder="0"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Soft Skills</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          onChange={(event) =>
            setSelectedSoftSkills([...selectedSoftSkills, event.target.value])
          }
        >
          <option key="default" value="">
            Select soft skills...
          </option>
          {softSkills.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSoftSkills.map((softSkill) => (
            <span
              key={softSkill}
              className="bg-gray-200 flex gap-x-1 px-3 py-1 rounded-full text-sm"
            >
              {softSkill}
              <button
                className="cursor-pointer"
                onClick={() =>
                  setSelectedSoftSkills(
                    selectedSoftSkills.filter((addedSkill) => addedSkill !== softSkill)
                  )
                }
              >
                <MdCancel />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Informal Skills */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Informal Skills & Life Experience</label>
        <textarea
          placeholder="e.g., Caregiving, Community organizing, Event planning... (separate with commas)"
          className="w-full border rounded-lg px-3 py-2"
          rows={2}
          value={informalSkills}
          onChange={(e) => setInformalSkills(e.target.value)}
        ></textarea>
        <p className="text-sm text-gray-500 mt-1">
          Include skills from volunteer work, caregiving, or other life experiences
        </p>
      </div>

      {/* Industry Experience & Certifications */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 font-medium">Industry Experience</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={industryExperience}
            onChange={(e) => setIndustryExperience(e.target.value)}
          >
            <option value="">Select industries...</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Certifications</label>
          <input
            type="text"
            placeholder="e.g., PMP, AWS Certified, Google Analytics... (separate with commas)"
            className="w-full border rounded-lg px-3 py-2"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Languages</label>
        <div className="flex items-center gap-4 mb-2">
          <select
            className="border rounded-lg px-3 py-2"
            value={selectedLanguage.language}
            onChange={(event) =>
              setSelectedLanguage({
                language: event.target.value,
                fluencyLevel: selectedLanguage.fluencyLevel,
              })
            }
          >
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
          <select
            className="border rounded-lg px-3 py-2"
            value={selectedLanguage.fluencyLevel}
            onChange={(event) =>
              setSelectedLanguage({
                language: selectedLanguage.language,
                fluencyLevel: event.target.value,
              })
            }
          >
            <option value="">Fluency level</option>
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => setSelectedLanguages([])}
          >
            🗑
          </button>
        </div>
        <button
          className="text-blue-600 flex items-center gap-x-1 cursor-pointer"
          onClick={() =>
            selectedLanguage.language && selectedLanguage.fluencyLevel &&
            setSelectedLanguages([...selectedLanguages, selectedLanguage])
          }
        >
          + Add Language
        </button>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedLanguages.map(({ language, fluencyLevel }) => (
            <span
              key={language}
              className="bg-gray-200 flex gap-x-1 px-3 py-1 rounded-full text-sm"
            >
              {language}:{fluencyLevel}
              <button
                className="cursor-pointer"
                onClick={() =>
                  setSelectedLanguages(
                    selectedLanguages.filter(
                      (selectedLang) => selectedLang.language !== language
                    )
                  )
                }
              >
                <MdCancel />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Education Level</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
        >
          <option value="">Select education level...</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={handleAnalyzeSkills}
        >
          Analyze My Skills
        </button>
      </div>
    </div>
  );
};