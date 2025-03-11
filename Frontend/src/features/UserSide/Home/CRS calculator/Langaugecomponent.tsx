import React from "react";
import { LanguageScores } from "../../../../config/models/crs";

interface LanguageComponentProps {
  setLanguageTest: (value: string) => void;
  languageTest: string;
  languageScores: LanguageScores;
  setLanguageScores: (scores: LanguageScores) => void;
  mode?: "TEF_TCF" | "all";
  isSecondLanguage?: boolean;
  firstLanguageTest?: string;
}

const LanguageComponent: React.FC<LanguageComponentProps> = ({
  setLanguageTest,
  languageTest,
  languageScores,
  setLanguageScores,
  mode = "all",
  isSecondLanguage = false,
  firstLanguageTest = "",
}) => {
  const scoreOptions: Record<string, Record<string, string[]>> = {
    IELTS: {
      reading: ["8 - 9", "7 - 7.5", "6.5", "6", "5 - 5.5", "4 - 4.5", "3.5"],
      writing: ["7.5 - 9", "7", "6.5", "6", "5.5", "5", "4 - 4.5"],
      listening: ["8.5 - 9", "8", "7.5", "6 - 7", "5.5", "5", "4.5"],
      speaking: ["7.5 - 9", "7", "6.5", "6", "5.5", "5", "4 - 4.5"],
    },
    PTE_CORE: {
      listening: ["89 - 90", "82 - 88", "71 - 81", "60 - 70", "50 - 59", "39 - 49", "28 - 38", "0 - 27"],
      reading: ["88 - 90", "78 - 87", "69 - 77", "60 - 68", "51 - 59", "42 - 50", "33 - 41", "24 - 32"],
      speaking: ["89 - 90", "84 - 88", "76 - 83", "68 - 75", "59 - 67", "51 - 58", "42 - 50", "0 - 41"],
      writing: ["90", "88 - 89","79 - 87", "69 - 78", "60 - 68", "51 - 59", "41 - 50", "0- 40"],
    },
    TEF_Canada: {
      listening: ["Not Applicable","316-360","298-315","280-297","249-279","217-248","181-216","145-180","0-144"],
      reading : ["Not Applicable","263-300","248-262","233-247","207-232","181-206","151-180","120-150","0-120"],
      speaking : ["Not Applicable", "393-450", "371-392", "349-370", "310-348", "271-309", "226-270", "181-225", "0 - 180"],
      writing : ["Not Applicable", "393-450", "371-392", "349-370", "310-348", "271-309", "226-270", "181-225", "0 - 180"],
    },
    TCF_Canada: {
      listening: ["549 - 699", "523 - 548", "503 - 522", "458 - 502", "398 - 457", "331 - 397", "0 - 330"],
      reading: ["549 - 699", "524 - 548", "499 - 523", "453 - 498", "406 - 452", "375 - 405", "342 - 374","0-341"],
      speaking: ["16 - 20", "14 - 15", "12 - 13", "10 - 11", "7 - 9", "6", "4 - 5", "0 - 3"],
      writing: ["16 - 20", "14 - 15", "12 - 13", "10 - 11", "7 - 9", "6", "4 - 5", "0 - 3"],
    },
    "Celpip-g": {
      all: ["10 - 12", "9", "8", "7", "6", "5", "4", "M, 0 - 3"],
    },
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

  const getAvailableTests = () => {
    if (isSecondLanguage) {
      if (firstLanguageTest === "TEF_Canada" || firstLanguageTest === "TCF_Canada") {
        return [
          { value: "IELTS", label: "IELTS" },
          { value: "PTE_CORE", label: "PTE CORE" },
          { value: "Celpip-g", label: "Celpip-g" },
        ];
      }
    }

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
      <label className="block font-semibold">
        {isSecondLanguage ? "Select Your Second Language Exam" : "Select Your Language Exam"}
      </label>
      <select
        value={languageTest}
        onChange={(e) => setLanguageTest(e.target.value)}
        className="w-40 border rounded px-3 py-2"
      >
        <option value="">Select...</option>
        {getAvailableTests().map((test) => (
          <option key={test.value} value={test.value}>
            {test.label}
          </option>
        ))}
      </select>

      {languageTest && (
        <div className="mt-4">
          <label className="block font-semibold">Enter Your {languageTest} Scores</label>
          <div className="grid grid-cols-2 gap-4">
            {(["speaking", "listening", "reading", "writing"] as const).map((skill) => {
              let scoreList: string[] = [];

             
              if (languageTest === "PTE_CORE") {
                scoreList = scoreOptions[languageTest]?.[skill] || [];
              }
              else    if (languageTest === "TEF_Canada" || languageTest === "IELTS") {
                scoreList = scoreOptions[languageTest]?.[skill] || [];
              }
             
              else if (languageTest === "TCF_Canada") {
                scoreList = scoreOptions[languageTest]?.[skill] || [];
              } 
              // Handle all other tests
              else {
                scoreList = scoreOptions[languageTest]?.all || [];
              }

              return (
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
                    {scoreList.map((score, index) => (
                      <option key={index} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageComponent;
