import React from "react";
import { LanguageScores } from "../../../../config/models/crs";

interface LanguageComponentProps {
  setLanguageTest: (value: string) => void;
  languageTest: string;
  languageScores: LanguageScores;
  setLanguageScores: (scores: LanguageScores) => void;
  mode?: "TEF_TCF" | "all";  
}

const LanguageComponent: React.FC<LanguageComponentProps> = ({
  setLanguageTest,
  languageTest,
  languageScores,
  setLanguageScores,
  mode = "all"  
}) => {
  const scoreOptions: Record<string, string[]> = {
    IELTS: ["9.0", "8.5", "8.0", "7.5", "7.0", "6.5", "6.0", "5.5", "5.0", "0 - 4.5"],
    PTE_CORE: ["89 - 90", "84 - 88", "76 - 83", "68 - 75", "59 - 67", "51 - 58", "42 - 50", "0 - 41"],
    TEF_Canada: ["Not Applicable", "393-450", "371-392", "349-370", "310-348", "271-309", "226-270", "181-225", "0 - 180"],
    TCF_Canada: ["Not Applicable", "16-20", "14-15", "12-13", "10-11", "7-9", "6", "4-5", "0-3"],
    "Celpip-g": ["10 - 12", "9", "8", "7", "6", "5", "4", "M, 0 - 3"],
  };

  const handleScoreChange = (skill: keyof LanguageScores) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    
  
    if (newValue === "Not Applicable") {
      setLanguageScores({
        speaking: "Not Applicable",
        listening: "Not Applicable",
        reading: "Not Applicable",
        writing: "Not Applicable",
      });
    } else {
      setLanguageScores({
        ...languageScores,
        [skill]: newValue,
      });
    }
  };

  // Filter language tests based on mode
  const getAvailableTests = () => {
    if (mode === "TEF_TCF") {
      return [
        { value: "TEF_Canada", label: "TEF Canada" },
        { value: "TCF_Canada", label: "TCF Canada" },
      ];
    }
    return [
      { value: "IELTS", label: "IELTS" },
      { value: "PTE_CORE", label: "PTE CORE" },
      { value: "TEF_Canada", label: "TEF Canada" },
      { value: "TCF_Canada", label: "TCF Canada" },
      { value: "Celpip-g", label: "Celpip-g" },
    ];
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold">Select Your Language Exam</label>
      <select
        value={languageTest}
        onChange={(e) => setLanguageTest(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select...</option>
        {getAvailableTests().map(test => (
          <option key={test.value} value={test.value}>
            {test.label}
          </option>
        ))}
      </select>

      {languageTest && (
        <div className="mt-4">
          <label className="block font-semibold">
            Enter Your {languageTest} Scores
          </label>
          <div className="grid grid-cols-2 gap-4">
            {(["speaking", "listening", "reading", "writing"] as const).map((skill) => (
              <div key={skill}>
                <label className="block text-sm text-gray-600 mb-1">
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </label>
                <select
                  value={languageScores[skill]}
                  onChange={handleScoreChange(skill)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select...</option>
                  {scoreOptions[languageTest]?.map((score, index) => (
                    <option key={index} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageComponent;
								
