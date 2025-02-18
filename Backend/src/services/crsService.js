//#region // exam proficincy
const ieltsToCLB = (score, type) => {     
    const mapping = {         
        listening: { "8.5 - 9": 10, "8": 9, "7.5": 8, "6 - 7": 7, "5.5": 6, "5": 5, "4.5": 4 },         
        reading: { "8 - 9": 10, "7 - 7.5": 9, "6.5": 8, "6": 7, "5 - 5.5": 6, "4 - 4.5": 5, "3.5": 4 },         
        writing: { "7.5 - 9": 10, "7": 9, "6.5": 8, "6": 7, "5.5": 6, "5": 5, "4 - 4.5": 4 },         
        speaking: { "7.5 - 9": 10, "7": 9, "6.5": 8, "6": 7, "5.5": 6, "5": 5, "4 - 4.5": 4 }     
    };

    const scoreStr = score.toString();
    if (mapping[type][scoreStr] !== undefined) {
        return mapping[type][scoreStr];
    }
    const availableScores = Object.keys(mapping[type]).map(parseFloat);
    const nearestScore = availableScores.reduce((prev, curr) => 
        Math.abs(curr - score) < Math.abs(prev - score) ? curr : prev
    );

    return mapping[type][nearestScore.toFixed(1)] || 0; 
}

const celpipToCLB = (score) => {
    if (typeof score === "string" && score.includes("-")) {
        const [low, high] = score.split("-").map(Number);
        return Math.max(3, Math.min(10, high));
    }
    return Math.max(3, Math.min(10, Number(score)));
};
  
 
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
            { min: 28, max: 38, clb: 4 }, { min: 0, max: 27, clb: 3 }
        ],
        reading: [
            { min: 88, max: 90, clb: 10 }, { min: 78, max: 87, clb: 9 }, { min: 69, max: 77, clb: 8 },
            { min: 60, max: 68, clb: 7 }, { min: 51, max: 59, clb: 6 }, { min: 42, max: 50, clb: 5 },
            { min: 33, max: 41, clb: 4 }, { min: 0, max: 32, clb: 3 }
        ],
        speaking: [
            { min: 89, max: 90, clb: 10 }, { min: 84, max: 88, clb: 9 }, { min: 76, max: 83, clb: 8 },
            { min: 68, max: 75, clb: 7 }, { min: 59, max: 67, clb: 6 }, { min: 51, max: 58, clb: 5 },
            { min: 42, max: 50, clb: 4 }, { min: 0, max: 41, clb: 3 }
        ],
        writing: [
            { min: 90, max: 90, clb: 10 }, { min: 88, max: 89, clb: 9 }, { min: 79, max: 87, clb: 8 },
            { min: 69, max: 78, clb: 7 }, { min: 60, max: 68, clb: 6 }, { min: 51, max: 59, clb: 5 },
            { min: 41, max: 50, clb: 4 }, { min: 0, max: 40, clb: 3 }
        ]
    };

    const clb = mapping[type].find(range =>
        minScore >= range.min && maxScore <= range.max
    )?.clb || 0;
    return clb;
};

  
const tefToCLB = (score, type) => {
    const mapping = {
        reading: { 263: 10, 248: 9, 233: 8, 207: 7, 181: 6, 151: 5, 121: 4 },
        writing: { 393: 10, 371: 9, 349: 8, 310: 7, 271: 6, 226: 5, 181: 4 },
        listening: { 316: 10, 298: 9, 280: 8, 249: 7, 217: 6, 181: 5, 145: 4 },
        speaking: { 393: 10, 371: 9, 349: 8, 310: 7, 271: 6, 226: 5, 181: 4 }
    };
    const rangeMatch = score.match(/\d+/g); 
    if (!rangeMatch) return 0; 

    const rangeValues = rangeMatch.map(Number); 
    const avgScore = rangeValues.reduce((a, b) => a + b, 0) / rangeValues.length; // Average
    if ((type === "reading" && avgScore >= 263) || (type === "listening" && avgScore >= 316)) {
        return 10;
    }
    const thresholds = Object.keys(mapping[type]).map(Number).sort((a, b) => b - a);
    for (let threshold of thresholds) {
        if (avgScore >= threshold) return mapping[type][threshold];
    }

    return 0; 
};


const tcfToCLB = (score, type) => {
    const mapping = {
        reading: [
            { min: 549, max: 699, clb: 10 },
            { min: 524, max: 548, clb: 9 },
            { min: 503, max: 523, clb: 8 },
            { min: 458, max: 502, clb: 7 },
            { min: 398, max: 457, clb: 6 },
            { min: 331, max: 397, clb: 5 },
            { min: 0, max: 330, clb: 4 },
        ],
        writing: [
            { min: 16, max: 20, clb: 10 },
            { min: 14, max: 15, clb: 9 },
            { min: 12, max: 13, clb: 8 },
            { min: 10, max: 11, clb: 7 },
            { min: 7, max: 9, clb: 6 },
            { min: 6, max: 6, clb: 5 },
            { min: 4, max: 5, clb: 4 },
            { min: 0, max: 3, clb: 3 },
        ],
        listening: [
            { min: 549, max: 699, clb: 10 },
            { min: 523, max: 548, clb: 9 },
            { min: 503, max: 522, clb: 8 },
            { min: 458, max: 502, clb: 7 },
            { min: 398, max: 457, clb: 6 },
            { min: 331, max: 397, clb: 5 },
            { min: 0, max: 330, clb: 4 },
        ],
        speaking: [
            { min: 16, max: 20, clb: 10 },
            { min: 14, max: 15, clb: 9 },
            { min: 12, max: 13, clb: 8 },
            { min: 10, max: 11, clb: 7 },
            { min: 7, max: 9, clb: 6 },
            { min: 6, max: 6, clb: 5 },
            { min: 4, max: 5, clb: 4 },
            { min: 0, max: 3, clb: 3 },
        ],
    };
    const rangeMatch = score.match(/\d+/g);
    if (!rangeMatch) return 0; 

    const rangeValues = rangeMatch.map(Number); 
    const highestScore = Math.max(...rangeValues); 
    return mapping[type].find((range) => highestScore >= range.min && highestScore <= range.max)?.clb || 0;
};

const canadianExperienceToCRS = {
    withSpouse: {
        "none": 0,            
        "one_year": 35,       
        "two_years": 46,      
        "three_years": 56,    
        "four_years": 63,     
        "five_plus_years": 70 
    },
    withoutSpouse: {
        "none": 0,            
        "one_year": 40,       
        "two_years": 53,      
        "three_years": 64,    
        "four_years": 72,     
        "five_plus_years": 80 
    }
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
const spouseEducationToCRS = {
    "0": 0,
    "5": 2,
    "15": 6,
    "30": 7,
    "50": 8,
    "60": 9,
    "70": 10,
    "80": 10
};

const spouseLanguageToCRS = {
    "4": 0,
    "5": 1,
    "6": 1,
    "7": 3,
    "8": 3,
    "9": 5,
    "10": 5
};

const spouseCanadianExperienceToCRS = {
    "none": 0,
    "one_year": 5,
    "two_years": 7,
    "three_years": 8,
    "four_years": 9,
    "five_plus_years": 10
};
const convertSpouseLanguageToCLB = (spouselanguageTest, spouseLanguageScores) => {
    let clbScores = {};

    if (spouselanguageTest === "IELTS") {
        clbScores = Object.fromEntries(
            Object.keys(spouseLanguageScores).map(k => [k, ieltsToCLB(spouseLanguageScores[k], k)])
        );
    } else if (spouselanguageTest === "Celpip-g") {
        clbScores = Object.fromEntries(
            Object.keys(spouseLanguageScores).map(k => [k, celpipToCLB(spouseLanguageScores[k])])
        );
    } else if (spouselanguageTest === "TCF_Canada") {
        clbScores = Object.fromEntries(
            Object.keys(spouseLanguageScores).map(k => [k, tcfToCLB(spouseLanguageScores[k], k)])
        );
    } else if (spouselanguageTest === "TEF_Canada") {
        clbScores = Object.fromEntries(
            Object.keys(spouseLanguageScores).map(k => [k, tefToCLB(spouseLanguageScores[k], k)])
        );
    }
    else if (spouselanguageTest === "PTE_CORE") {
        clbScores = Object.fromEntries(
            Object.keys(spouseLanguageScores).map(k => [k, pteToCLB(spouseLanguageScores[k],k)])
        );
    }

    return clbScores;
};
 //#region//French bonus calculate
const calculateFrenchBonus = (firstLanguageTest, firstClbScores, secondLanguageTest, secondClbScores) => {
    let bonusPoints = 0;
    const normalizedFirstTest = firstLanguageTest?.toUpperCase();
    const normalizedSecondTest = secondLanguageTest?.toUpperCase();
    const isFrenchFirst = normalizedFirstTest === "TEF_CANADA" || normalizedFirstTest === "TCF_CANADA";
    const isEnglishFirst = normalizedFirstTest === "IELTS" || normalizedFirstTest === "CELPIP-G" || normalizedFirstTest === "PTE_CORE";
    const isFrenchSecond = normalizedSecondTest === "TEF_CANADA" || normalizedSecondTest === "TCF_CANADA";
    const isEnglishSecond = normalizedSecondTest === "IELTS" || normalizedSecondTest === "CELPIP-G" || normalizedSecondTest === "PTE_CORE";

    const hasFrenchNCLC7 = isFrenchFirst || isFrenchSecond
        ? ["speaking", "listening", "reading", "writing"].every(skill => {
            const score = isFrenchFirst ? firstClbScores[skill] : secondClbScores[skill];
            return score >= 7;
        })
        : false;
    if (hasFrenchNCLC7) {
        if (
            isFrenchSecond && 
            (!isEnglishFirst || !secondClbScores || 
            ["speaking", "listening", "reading", "writing"].every(skill => !secondClbScores[skill] || secondClbScores[skill] <= 4))
        ) {
            bonusPoints = 25;
           
        } 
        else if (
            isFrenchSecond && isEnglishFirst &&
            ["speaking", "listening", "reading", "writing"].every(skill => secondClbScores[skill] >= 5)
        ) {
            bonusPoints = 50;
        } 
        else if (
            isEnglishFirst && isFrenchSecond &&
            ["speaking", "listening", "reading", "writing"].every(skill => firstClbScores[skill] >= 5)
        ) {
            bonusPoints = 50;
        }
        else if (
            isEnglishFirst && isFrenchSecond &&
            ["speaking", "listening", "reading", "writing"].every(skill => firstClbScores[skill] <= 4 || !firstClbScores[skill])
        ) {
            bonusPoints = 25;
        }
    }

    console.log("Final French Bonus Points:", bonusPoints);
    return bonusPoints;
};

const calculateCRS = ({maritalStatus, age, educationLevel, languageScores, languageTest, secondlanguageTest, 
    secondlanguageScores,canadianExperience, foreignExperience,hasSiblingInCanada,hasJobOffer
    ,nocTeer,canadianEducationLevel,hasNomination, hasQualification,spouseeducationLevel, spouseLanguageScores, spouseCanadianExperience, spouselanguageTest,
    spouseAccompanying,


}) => {
    const hasSpouse = (maritalStatus === "married" || maritalStatus === "common_law") && spouseAccompanying === true;

    let clbScores = {};
    if (languageTest === "IELTS") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, ieltsToCLB(languageScores[k], k)])
        );
    } else if (languageTest === "PTE_CORE") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, pteToCLB(languageScores[k], k)])
        );
    } else if (languageTest === "Celpip-g") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, celpipToCLB(languageScores[k])])
        );
    } if (languageTest === "TCF_Canada") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, tcfToCLB(languageScores[k], k)])
        );
    } else if (languageTest === "TEF_Canada") {
        clbScores = Object.fromEntries(
            Object.keys(languageScores).map(k => [k, tefToCLB(languageScores[k], k)])
        );

    }
    let spouseEducationScore = hasSpouse ? (spouseEducationToCRS[spouseeducationLevel] || 0) : 0;
    const spouseCLBScores = convertSpouseLanguageToCLB(spouselanguageTest, spouseLanguageScores);
    let spouseLanguageScore = hasSpouse
        ? Object.values(spouseCLBScores).reduce((sum, clb) => sum + (spouseLanguageToCRS[clb] || 0), 0)
        : 0;
    let spouseCanadianExperienceScore = hasSpouse
        ? spouseCanadianExperienceToCRS[spouseCanadianExperience] || 0
        : 0;
  const totalSpouseScore = spouseEducationScore + spouseLanguageScore + spouseCanadianExperienceScore;
 //#region  // Skill factor hai 
    const isCLB7Plus = ["speaking", "listening", "reading", "writing"].every(skill => clbScores[skill] >= 7);
    const isCLB9Plus = ["speaking", "listening", "reading", "writing"].every(skill => clbScores[skill] >= 9);
    const isCLB5Plus = ["speaking", "listening", "reading", "writing"].every(skill => clbScores[skill] >= 5);

    const educationSkillFactor = {
        "5": isCLB9Plus ? 0 : isCLB7Plus ? 0 : 0,
        "15": isCLB9Plus ? 25 : isCLB7Plus ? 13 : 0,
        "30": isCLB9Plus ? 25 : isCLB7Plus ? 13 : 0,
        "50": isCLB9Plus ? 25 : isCLB7Plus ? 13 : 0,
        "60": isCLB9Plus ? 50 : isCLB7Plus ? 25 : 0,
        "70": isCLB9Plus ? 50 : isCLB7Plus ? 25 : 0,
        "80": isCLB9Plus ? 50 : isCLB7Plus ? 25 : 0
    };  
    const educationSkillBonus = educationSkillFactor[educationLevel] || 0;
    const educationCanadianExperienceFactor = {
        "0": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 0 : 0),
      
        "5": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 0 : 0),
      
        "15": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 25 : 13),
      
        "30": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 25 : 13),
      
        "50": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 25 : 13),
      
        "60": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 50 : 25),
      
        "70": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 50 : 25),
      
        "80": canadianExperience === "none" ? 0 : (["two_years", "three_years", "four_years", "five_plus_years"].includes(canadianExperience) ? 50 : 25)
      };
      const educationCanadianExperienceBonus = educationCanadianExperienceFactor[educationLevel] || 0;
      
    const foreignWorkSkillFactor = {
        "one_year": isCLB9Plus ? 25 : isCLB7Plus ? 13 : 0,
        "two_years": isCLB9Plus ? 25 : isCLB7Plus ? 13 : 0,
        "three_years": isCLB9Plus ? 50 : isCLB7Plus ? 25 : 0
    };
    const foreignWorkSkillBonus = foreignWorkSkillFactor[foreignExperience] || 0;
    const foreignWorkCanadianExperienceFactor = {
        "one_year": canadianExperience === "two_years" || canadianExperience === "three_years" || canadianExperience === "four_years" || canadianExperience === "five_plus_years" ? 25 : 13,
        "two_years": canadianExperience === "two_years" || canadianExperience === "three_years" || canadianExperience === "four_years" || canadianExperience === "five_plus_years" ? 25 : 13,
        "three_years": canadianExperience === "two_years" || canadianExperience === "three_years" || canadianExperience === "four_years" || canadianExperience === "five_plus_years" ? 50 : 25
    };
    const foreignWorkCanadianExperienceBonus = foreignWorkCanadianExperienceFactor[foreignExperience] || 0;
    let qualificationBonus = 0;
    if (hasQualification) {
        qualificationBonus = isCLB7Plus ? 50 : isCLB5Plus ? 25 : 0;
    }
    let jobOfferPoints = 0;
    if (hasJobOffer && nocTeer) {
        if (nocTeer === "teer_00") {
            jobOfferPoints = 200;
        } else if (nocTeer === "teer_0_1_2_3") {
            jobOfferPoints = 50;
        }

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
        } else if (secondlanguageTest === "TCF_Canada") {
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
    let canadianEducationBonus = 0;
    if (canadianEducationLevel == 5) {
        canadianEducationBonus = 15;
    } else if (canadianEducationLevel == 15) {
        canadianEducationBonus = 30;
    }
    const siblingBonus = hasSiblingInCanada ? 15 : 0;
    const PNP = hasNomination ? 600 : 0;
    const frenchBonus = calculateFrenchBonus(languageTest, clbScores, secondlanguageTest, secondClbScores);
    const languageScore = Object.values(clbScores).reduce((sum, clb) => sum + (clbToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][clb] || 0), 0);
    const secondLanguageScore = Object.values(secondClbScores).reduce((sum, clb) => sum + (secondLanguageToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][clb] || 0), 0);
    const ageScore = ageToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][age] || 0;
    const educationScore = educationToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][educationLevel] || 0;
    const canadianExperienceScore = canadianExperienceToCRS[hasSpouse ? "withSpouse" : "withoutSpouse"][canadianExperience] || 0;
    const maxAdditionalPoints = 600;

   
    const additionalPoints = Math.min(
        maxAdditionalPoints, 
        frenchBonus + siblingBonus + jobOfferPoints + canadianEducationBonus + PNP
    );
    
    const maxSkillFactorPoints = 100;
    const educationSkillTransferability = Math.min(50, educationSkillBonus + educationCanadianExperienceBonus);
    const foreignWorkSkillTransferability = Math.min(50, foreignWorkSkillBonus + foreignWorkCanadianExperienceBonus);
    const totalSkillFactors = Math.min(maxSkillFactorPoints, educationSkillTransferability + foreignWorkSkillTransferability + qualificationBonus);
    
    
    return {  
       
        languageScore, 
        secondLanguageScore, 
        ageScore, 
        educationScore, 
        canadianExperienceScore,
       
    
        
        frenchBonus,
        siblingBonus,
        jobOfferPoints,
        canadianEducationBonus,
        PNP,
        additionalPoints, 
        skillFactors: {
            educationSkill: educationSkillBonus,
            educationCanadianExperience: educationCanadianExperienceBonus,
            foreignWorkSkill: foreignWorkSkillBonus,
            foreignWorkCanadianExperience: foreignWorkCanadianExperienceBonus,
            qualification: qualificationBonus
        },
    
        skillSubtotal: totalSkillFactors,  
    
     
        spouseEducationScore,
        spouseLanguageScore,
        spouseCanadianExperienceScore,
        totalSpouseScore,
    
      
        coreSubtotal: languageScore + secondLanguageScore + ageScore + educationScore + canadianExperienceScore ,
        spouseSubtotal: totalSpouseScore,
        additionalSubtotal: additionalPoints, 
        totalScore: (
            languageScore + secondLanguageScore + ageScore + educationScore + canadianExperienceScore +
          totalSkillFactors + additionalPoints + totalSpouseScore
        ),
    
       
        individualTotal: {
            coreFactors: {
                language: languageScore,
                secondLanguage: secondLanguageScore,
                age: ageScore,
                education: educationScore,
                canadianExperience: canadianExperienceScore,
               
            },
            skillFactors: {
                educationSkill: educationSkillBonus,
                educationCanadianExperience: educationCanadianExperienceBonus,
                foreignWorkSkill: foreignWorkSkillBonus,
                foreignWorkCanadianExperience: foreignWorkCanadianExperienceBonus,
                qualification: qualificationBonus
            },
            spouseFactors: {
                education: spouseEducationScore,
                language: spouseLanguageScore,
                canadianExperience: spouseCanadianExperienceScore
            },
            additionalFactors: {
                frenchBonus,
                siblingBonus,
                jobOffer: jobOfferPoints,
                canadianEducation: canadianEducationBonus,
                PNP
            }
        },
    }   
};

module.exports = { calculateCRS };

  