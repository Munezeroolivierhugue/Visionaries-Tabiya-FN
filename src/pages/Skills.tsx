import { useState } from "react";
import { Plus } from "lucide-react";
import type { KeyboardEvent } from "react";
import { MdCancel } from "react-icons/md";

interface Language {
  language: string;
  fluencyLevel: string;
}

export const Skills = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const softSkills = ["Leadership", "Communication"];
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<
    { language: string; fluencyLevel: string }[]
  >([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSkills([...skills, skill]);
      setSkill("");
    }
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
              onClick={() => {
                setSkills([...skills, skill]);
                setSkill("");
              }}
            >
              <Plus className="w-6 h-6 text-gray-600" />
            </button>
          </div>

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
                      setSkills([
                        ...skills.filter((addedSkill) => addedSkill !== skill),
                      ])
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
            <label className="block mb-1 font-medium">
              Years of Experience
            </label>
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
                  setSelectedSoftSkills([
                    ...skills.filter((addedSkill) => addedSkill !== skill),
                  ])
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
        <label className="block mb-1 font-medium">
          Informal Skills & Life Experience
        </label>
        <textarea
          placeholder="e.g., Caregiving, Community organizing, Event planning..."
          className="w-full border rounded-lg px-3 py-2"
          rows={2}
        ></textarea>
        <p className="text-sm text-gray-500 mt-1">
          Include skills from volunteer work, caregiving, or other life
          experiences
        </p>
      </div>

      {/* Industry Experience & Certifications */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 font-medium">Industry Experience</label>
          <select className="w-full border rounded-lg px-3 py-2">
            <option>Select industries...</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Certifications</label>
          <input
            type="text"
            placeholder="e.g., PMP, AWS Certified, Google Analytics..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Languages</label>
        <div className="flex items-center gap-4 mb-2">
          <select
            className="border rounded-lg px-3 py-2"
            onChange={(event) =>
              setSelectedLanguage({
                ...selectedLanguage,
                language: event.target.value,
                fluencyLevel: ""
              })
            }
          >
            <option key="default" value="">
              Language
            </option>
            <option key="English" value="English">
              English
            </option>
            <option key="French" value="French">
              French
            </option>
          </select>
          <select
            className="border rounded-lg px-3 py-2"
            onChange={(event) =>
              selectedLanguage?.language &&
              setSelectedLanguage({
                ...selectedLanguage,
                fluencyLevel: event.target.value,
              })
            }
          >
            <option key="default" value="">
              Fluency level
            </option>
            <option key="Native" value="Native">
              Native
            </option>
            <option key="Fluent" value="Fluent">
              Fluent
            </option>
            <option key="Intermediate" value="Intermediate">
              Intermediate
            </option>
            <option key="Beginner" value="Beginner">
              Beginner
            </option>
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
            selectedLanguage?.fluencyLevel &&
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
                  setSelectedLanguages([
                    ...selectedLanguages.filter(
                      ({ language: selectedLanguage }) =>
                        selectedLanguage !== language
                    ),
                  ])
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
        <select className="w-full border rounded-lg px-3 py-2">
          <option>Select education level...</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Analyze My Skills
        </button>
      </div>
    </div>
  );
};
