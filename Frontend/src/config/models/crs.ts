export type MaritalStatus = 
  | 'annulled_marriage'
  | 'common_law'
  | 'divorced'
  | 'legally_separated'
  | 'married'
  | 'never_married'
  | 'widowed';

export  interface LanguageScores {
    speaking: string;
    listening: string;
    reading: string;
    writing: string;
  }
  export type WorkExperience =
  | 'none'
  | 'one_year'
  | 'two_years'
  | 'three_years'
  | 'four_years'
  | 'five_plus_years';
export type EducationLevel = 
  | 'secondary'
  | 'one_two_year'
  | 'three_year_plus';
 export type NocTeer = 
  | 'teer_00'
  | 'teer_0_1_2_3'
  | 'teer_4_5';


  export interface CoreFactors {
    language: number;
    secondLanguage: number;
    age: number;
    education: number;
    canadianExperience: number;
    foreignExperience: number;
  }
  
  export interface SkillFactors {
    educationSkill: number;
    educationCanadianExperience: number;
    foreignWorkSkill: number;
    foreignWorkCanadianExperience: number;
    qualification: number;
  }
  
  export interface SpouseFactors {
    education: number;
    language: number;
    canadianExperience: number;
  }
  
  export interface AdditionalFactors {
    frenchBonus: number;
    siblingBonus: number;
    jobOffer: number;
    canadianEducation: number;
    PNP: number;
  }
  
 
  export interface CRSScores {
   
    languageScore: number;
    secondLanguageScore: number;
    ageScore: number;
    educationScore: number;
    canadianExperienceScore: number;
    foreignExperienceScore: number;
  
   
    frenchBonus: number;
    siblingBonus: number;
    jobOfferPoints: number;
    canadianEducationBonus: number;
    PNP: number;
    additionalPointsScore: number;
  
    // Skill Transferability Factors
    educationLanguageScore: number;
    educationExperienceScore: number;
    foreignExperienceLanguageScore: number;
    canadianExperienceLanguageScore: number;
    qualificationScore: number;
    skillTransferabilityScore: number;
  
    // Spouse Factors
    spouseEducationScore: number;
    spouseLanguageScore: number;
    spouseCanadianExperienceScore: number;
    spouseFactorsScore: number;
  
    // Subtotals
    skillSubtotal: number;
    spouseSubtotal: number;
    additionalSubtotal: number;
    coreSubtotal:number;
    
    skillFactors : {
      educationSkill :number;
      foreignWorkCanadianExperience : number;
      foreignWorkSkill:number
      educationCanadianExperience:number
        qualification :number
}
    
    // Total Score
    totalScore: number;
  
    // Detailed Breakdowns
    individualTotal: {
      coreFactors: CoreFactors;
      skillFactors: SkillFactors;
      spouseFactors: SpouseFactors;
      additionalFactors: AdditionalFactors;
    };
  }