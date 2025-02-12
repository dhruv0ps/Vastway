export type MaritalStatus = 
  | 'annulled_marriage'
  | 'common_law'
  | 'divorced'
  | 'legally_separated'
  | 'married'
  | 'never_married'
  | 'widowed';
export type CRSScores = {
    languageScore: number;
    secondLanguageScore: number;
    ageScore: number;
    educationScore: number;
    canadianExperienceScore: number;
    foreignExperienceScore: number;
    totalScore: number;
};
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