import React from 'react';
import { CRSScores } from "../../../../config/models/crs";
import {  CheckCircle2 } from 'lucide-react';

interface ScoreProps {
  data: CRSScores;
  onReset: () => void;
}

const Score: React.FC<ScoreProps> = ({ data }) => {
  const coreFactors = [
    { label: 'Age', score: data.ageScore },
    { label: 'Education', score: data.educationScore },
    { label: 'First Language', score: data.languageScore },
    { label: 'Second Language', score: data.secondLanguageScore },
    { label: 'Canadian Experience', score: data.canadianExperienceScore },
  ];

  const skillTransferability = [
    { label: 'Education + Language', score: data.skillFactors.educationSkill },
    { label: 'Education + Experience', score: data.skillFactors.educationCanadianExperience },
    { label: 'Foreign Experience + Language', score: data.skillFactors.foreignWorkSkill },
    { label: 'Canadian Experience + Language', score: data.skillFactors.foreignWorkCanadianExperience },
    { label: 'Certificate of Qualification', score: data.skillFactors.qualification },
  ];

  const spouseFactors = [
    { label: 'Spouse Education', score: data.spouseEducationScore },
    { label: 'Spouse Language', score: data.spouseLanguageScore },
    { label: 'Spouse Canadian Experience', score: data.spouseCanadianExperienceScore },
  ];

  const additionalPoints = [
    { label: 'Provincial Nomination', score: data.PNP },
    { label: 'Job Offer', score: data.jobOfferPoints },
    { label: 'Canadian Education', score: data.canadianEducationBonus },
    { label: 'French Language Skills', score: data.frenchBonus },
    { label: 'Sibling in Canada', score: data.siblingBonus },
  ];

  const ScoreSection = ({ title, factors, subtotal, maxPoints }: { 
    title: string; 
    factors: { label: string; score: number }[]; 
    subtotal: number;
    maxPoints?: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-lg mb-1 text-gray-800">{title}</h3>
      {maxPoints && (
        <p className="text-sm text-gray-500 mb-4">{maxPoints}</p>
      )}
      <div className="space-y-2">
        {factors.map((factor, index) => (
          <div key={index} className="flex justify-between items-center py-1 text-gray-600 hover:bg-gray-50 rounded px-2">
            <span>{factor.label}</span>
            <span className="font-medium">{factor.score}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 mt-3 pt-3">
          <div className="flex justify-between items-center text-gray-800 font-semibold">
            <span>Subtotal</span>
            <span className="text-lg">{subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8 ">
      {/* <div className="mt-8 mb-2 flex justify-end">
        <button
          className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          onClick={onReset}
        >
          <ArrowLeft size={18} />
          Calculate again
        </button>
      </div> */}
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="text-green-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Your CRS Score Results</h2>
          </div>
          <p className="text-gray-600">
            Your Express Entry Comprehensive Ranking System (CRS) score is calculated based on core human capital factors,
            spouse factors, skill transferability, and additional points. The maximum possible score is 1,200 points.
          </p>
          
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <span className="text-blue-800 font-medium">Your Total CRS Score</span>
            <span className="text-2xl font-bold text-blue-800">{data.totalScore}</span>
          </div>
        </div>
      </div>

      {/* Score Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreSection 
          title="Core/Human Capital Factors" 
          factors={coreFactors} 
          subtotal={data.coreSubtotal} 
        />
        
        <ScoreSection 
          title="Spouse Factors" 
          factors={spouseFactors} 
          subtotal={data.spouseSubtotal} 
        />
        
        <ScoreSection 
          title="Skill Transferability Factors" 
          factors={skillTransferability} 
          subtotal={data.skillSubtotal}
          maxPoints="Maximum 100 points"
        />
        
        <ScoreSection 
          title="Additional Points" 
          factors={additionalPoints} 
          subtotal={data.additionalSubtotal}
          maxPoints="Maximum 600 points"
        />
      </div>
    </div>
  );
};

export default Score;