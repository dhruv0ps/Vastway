
const ieltsToCLB = (score, type) => {
    const mapping = {
      listening: { "8.5": 10, "8.0": 9, "7.5": 8, "7.0": 7, "6.0": 6, "5.0": 5, "4.5": 4 },
      reading: { "8.0": 10, "7.0": 9, "6.5": 8, "6.0": 7, "5.0": 6, "4.0": 5, "3.5": 4 },
      writing: { "8.0" :10, "7.5": 10, "7.0": 9, "6.5": 8, "6.0": 7, "5.5": 6, "5.0": 5, "4.5": 4 },
      speaking: { "8.0" : 10,"7.5": 10, "7.0": 9, "6.5": 8, "6.0": 7, "5.5": 6, "5.0": 5, "4.5": 4 }
    };
    return mapping[type][score] || 0;   
  };
  

  const celpipToCLB = (score) => Math.min(Math.max(score, 3), 10);
  
 
  const pteToCLB = (score, type) => {
    let minScore, maxScore;

    if (typeof score === "string" && score.includes("-")) {
        
        [minScore, maxScore] = score.split("-").map(Number);
    } else {
        minScore = maxScore = Number(score);  
    }

    const mapping = {
        listening: [
            { min: 89, max: 90, clb: 10 }, { min: 82, max: 88, clb: 9 }, { min: 71, max: 81, clb: 8 },
            { min: 60, max: 70, clb: 7 }, { min: 50, max: 59, clb: 6 }, { min: 39, max: 49, clb: 5 },
            { min: 28, max: 38, clb: 4 }, { min: 18, max: 27, clb: 3 }
        ],
        reading: [
            { min: 88, max: 90, clb: 10 }, { min: 78, max: 87, clb: 9 }, { min: 69, max: 77, clb: 8 },
            { min: 60, max: 68, clb: 7 }, { min: 51, max: 59, clb: 6 }, { min: 42, max: 50, clb: 5 },
            { min: 33, max: 41, clb: 4 }, { min: 24, max: 32, clb: 3 }
        ],
        speaking: [
            { min: 89, max: 90, clb: 10 }, { min: 84, max: 88, clb: 9 }, { min: 76, max: 83, clb: 8 },
            { min: 68, max: 75, clb: 7 }, { min: 59, max: 67, clb: 6 }, { min: 51, max: 58, clb: 5 },
            { min: 42, max: 50, clb: 4 }, { min: 34, max: 41, clb: 3 }
        ],
        writing: [
            { min: 89, max: 90, clb: 10 }, { min: 88, max: 88, clb: 9 }, { min: 79, max: 87, clb: 8 },
            { min: 69, max: 78, clb: 7 }, { min: 60, max: 68, clb: 6 }, { min: 51, max: 59, clb: 5 },
            { min: 41, max: 50, clb: 4 }, { min: 32, max: 40, clb: 3 }
        ]
    };

    const clb = mapping[type].find(range =>
        minScore >= range.min && maxScore <= range.max
    )?.clb || 0;

    console.log(`✅ PTE ${type}: Score ${score} → CLB: ${clb}`);

    return clb;
};

  
  const tefToCLB = (score, type) => {
    const mapping = {
      reading: { 263: 10, 248: 9, 233: 8, 207: 7, 181: 6, 151: 5, 121: 4 },
      writing: { 393: 10, 371: 9, 349: 8, 310: 7, 271: 6, 226: 5, 181: 4 },
      listening: { 316: 10, 298: 9, 280: 8, 249: 7, 217: 6, 181: 5, 145: 4 },
      speaking: { 393: 10, 371: 9, 349: 8, 310: 7, 271: 6, 226: 5, 181: 4 }
    };
    return mapping[type][score] || 0;
  };
  

  const tcfToCLB = (score, type) => {
    const mapping = {
      reading: [{ min: 549, max: 699, clb: 10 }, { min: 524, max: 548, clb: 9 }],
      writing: [{ min: 16, max: 20, clb: 10 }, { min: 14, max: 15, clb: 9 }],
      listening: [{ min: 549, max: 699, clb: 10 }, { min: 523, max: 548, clb: 9 }],
      speaking: [{ min: 16, max: 20, clb: 10 }, { min: 14, max: 15, clb: 9 }]
    };
    return mapping[type].find((range) => score >= range.min && score <= range.max)?.clb || 0;
  };
  const canadianExperienceToCRS = {
    "none": 0,            
    "one_year": 40,       
    "two_years": 53,      
    "three_years": 64,    
    "four_years": 72,     
    "five_plus_years": 80 
};

const foreignExperienceToCRS = {
    "none": 0,            
    "one_year": 40,       
    "two_years": 50,      
    "three_years": 50,    
    "four_years": 50,     
    "five_plus_years": 50 
}; 
  const ageToCRS = {
    withSpouse: { 17: 0, 18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100,
                  30: 95, 31: 90, 32: 85, 33: 80, 34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50, 40: 45, 41: 35, 42: 25, 43: 15, 44: 5, 45: 0 },
    withoutSpouse: { 17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110,
                     30: 105, 31: 99, 32: 94, 33: 88, 34: 83, 35: 77, 36: 72, 37: 66, 38: 61, 39: 55, 40: 50, 41: 39, 42: 28, 43: 17, 44: 6, 45: 0 }
  };
  
  const educationToCRS = {
    withSpouse: { "5": 28, "15": 84, "30": 91, "50": 112, 
                  "60": 119, "70": 140 },
    withoutSpouse: { "5": 30, "15": 90, "30": 98, "50": 120, 
                     "60": 128, "70": 135, "80": 150 }
  };

const secondLanguageToCRS = {
    withSpouse: { 4: 0, 5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6 },
    withoutSpouse: { 4: 0, 5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6 }
};

const clbToCRS = {
    withSpouse: { "10": 32, "9": 29, "8": 22, "7": 16, "6": 8, "5": 6, "4": 6, "3": 0 },
    withoutSpouse: { "10": 34, "9": 31, "8": 23, "7": 17, "6": 9, "5": 6, "4": 6, "3": 0 }
};

const calculateCRS = ({maritalStatus, age, educationLevel, languageScores, languageTest, secondlanguageTest, secondlanguageScores,canadianExperience, foreignExperience}) => {
    const hasSpouse = maritalStatus === "married" || maritalStatus === "common_law";

    let clbScores = {};
    if (languageTest === "IELTS") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, ieltsToCLB(languageScores[k], k)])
        );
    } else if (languageTest === "PTE_CORE") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, pteToCLB(languageScores[k], k)])
        );
    } else if (languageTest === "CELPIP") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, celpipToCLB(languageScores[k])])
        );
    } else if (languageTest === "TCF") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, tcfToCLB(languageScores[k], k)])
        );
    } else if (languageTest === "TEF_Canada") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, tefToCLB(languageScores[k], k)])
        );
    }

    let secondClbScores = {};
    if (secondlanguageTest && secondlanguageScores) {
        if (secondlanguageTest === "IELTS") {
            secondClbScores = Object.fromEntries(
                Object.keys(secondlanguageScores).map(k => [k, ieltsToCLB(secondlanguageScores[k], k)])
            );
        } else if (secondlanguageTest === "PTE_CORE") {
            secondClbScores = Object.fromEntries(
                Object.keys(secondlanguageScores).map(k => [k, pteToCLB(secondlanguageScores[k], k)])
            );
        } else if (secondlanguageTest === "CELPIP") {
            secondClbScores = Object.fromEntries(
                Object.keys(secondlanguageScores).map(k => [k, celpipToCLB(secondlanguageScores[k])])
            );
        } else if (secondlanguageTest === "TCF") {
            secondClbScores = Object.fromEntries(
                Object.keys(secondlanguageScores).map(k => [k, tcfToCLB(secondlanguageScores[k], k)])
            );
        } else if (secondlanguageTest === "TEF" || secondlanguageTest === "TEF_Canada") {  
          secondClbScores = Object.fromEntries(
              Object.keys(secondlanguageScores).map(k => {
                  const clb = tefToCLB(secondlanguageScores[k], k);
                  console.log(`✅ TEF_Canada ${k}: ${secondlanguageScores[k]} → CLB: ${clb}`);
                  return [k, clb];
              })
          );
        }
    }

    // Compute CRS Scores
    const languageScore = Object.values(clbScores).reduce((sum, clb) => sum + (clbToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][clb] || 0), 0);
    const secondLanguageScore = Object.values(secondClbScores).reduce((sum, clb) => sum + (secondLanguageToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][clb] || 0), 0);
    const ageScore = ageToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][age] || 0;
    const educationScore = educationToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][educationLevel] || 0;
    const canadianExperienceScore = canadianExperienceToCRS[canadianExperience] || 0;
    const foreignExperienceScore = foreignExperienceToCRS[foreignExperience] || 0;
    return {  
        languageScore, 
        secondLanguageScore, 
        ageScore, 
        educationScore, 
        canadianExperienceScore,foreignExperienceScore,
        totalScore: languageScore + secondLanguageScore + ageScore + educationScore + + canadianExperienceScore + foreignExperienceScore, 
    };
};

module.exports = { calculateCRS };

  