import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import LanguageComponent from './Langaugecomponent';
import { MaritalStatus, LanguageScores, WorkExperience, EducationLevel, NocTeer, CRSScores } from '../../../../config/models/crs';
import { crsApi } from '../../../../config/apiRoutes/crsRoutes';
import Score from './score';
import AgeDropdown from '../../../../util/AgeDropDown';


const Crscalculator: React.FC = () => {
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('never_married');
  const [spouseIsPR, setSpouseIsPR] = useState<boolean | null>(null);
  const [spouseAccompanying, setSpouseAccompanying] = useState<boolean | null>(null);
  const [age, setAge] = useState<number>(20);
  const [languageTest, setLanguageTest] = useState<string>("");
  const [spouselanguageTest, setSpouseLanguageTest] = useState<string>("");
  const [languageScores, setLanguageScores] = useState<LanguageScores>({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
  });
  const [spouseLanguageScores, setSpouseLanguageScores] = useState<LanguageScores>({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
  });
  const [canadianExperience, setCanadianExperience] = useState<WorkExperience>("none");
  const [spouseCanadianExperience, setSpouseCanadianExperience] = useState<WorkExperience>("none");
  const [foreignExperience, setForeignExperience] = useState<WorkExperience>('none');
  const [secondlanguageTest, secondsetLanguageTest] = useState<string>("");
  const [secondlanguageScores, secondsetLanguageScores] = useState<LanguageScores>({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
  });

  // const [hasCanadianEducation, setHasCanadianEducation] = useState<boolean | null>(null);
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(null);
  const [spouseeducationLevel, setSpouseEducationLevel] = useState<EducationLevel | null>(null)
  const [testResultsValid, setTestResultsValid] = useState<boolean | null>(null);
  const [secondtestResultsValid, secondsetTestResultsValid] = useState<boolean | null>(null);
  const isMarriedOrCommonLaw = maritalStatus === 'married' || maritalStatus === 'common_law';
  const isEligible = testResultsValid !== false;
  const [hasQualification, setHasQualification] = useState<boolean | null>(null);
  const [hasJobOffer, setHasJobOffer] = useState<boolean | null>(null);
  const [nocTeer, setNocTeer] = useState<NocTeer | null>(null);
  const [hasNomination, setHasNomination] = useState<boolean | null>(null);
  const [hasSiblingInCanada, setHasSiblingInCanada] = useState<boolean | null>(null);
  const [data, setData] = useState<CRSScores>()
  const [hasCanadianDegree, setHasCanadianDegree] = useState<boolean | null>(null);
  const [canadianEducationLevel, setCanadianEducationLevel] = useState<EducationLevel | null>(null)


  const getCrsScore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      maritalStatus,
      age,
      educationLevel,
      languageTest,
      languageScores,
      secondlanguageTest,
      secondlanguageScores, canadianExperience, foreignExperience,
      hasCanadianDegree,
      canadianEducationLevel, spouseAccompanying,
      hasSiblingInCanada, hasJobOffer, nocTeer, hasNomination, hasQualification, spouseCanadianExperience, spouseLanguageScores, spouseeducationLevel, spouselanguageTest
    }
    const response = await crsApi.calculateCRS(requestBody)
    setData(response.data)
    // setShowResults(true)
  }
  const handleReset = () => {
    setData(undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">Canada CRS Score Calculator</h1>
          </div>

          <form onSubmit={getCrsScore}>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

              {/* Marital Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your marital status?
                </label>
                <select
                  value={maritalStatus}
                  onChange={(e) => {
                    setMaritalStatus(e.target.value as MaritalStatus);
                    setSpouseIsPR(null);
                    setSpouseAccompanying(null);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="annulled_marriage">Annulled Marriage</option>
                  <option value="common_law">Common-Law</option>
                  <option value="divorced">Divorced/Separated</option>
                  <option value="legally_separated">Legally Separated</option>
                  <option value="married">Married</option>
                  <option value="never_married">Never Married / Single</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              {/* Conditional Questions for Married/Common-Law */}
              {isMarriedOrCommonLaw && (
                <div className="mb-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is your spouse or common-law partner a citizen or permanent resident of Canada?
                    </label>
                    <div className="space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="spousePR"
                          checked={spouseIsPR === true}
                          onChange={() => setSpouseIsPR(true)}
                          className="form-radio text-primary"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="spousePR"
                          checked={spouseIsPR === false}
                          onChange={() => setSpouseIsPR(false)}
                          className="form-radio text-primary"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  {spouseIsPR === false && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Will your spouse or common-law partner come with you to Canada?
                      </label>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="spouseAccompanying"
                            checked={spouseAccompanying === true}
                            onChange={() => setSpouseAccompanying(true)}
                            className="form-radio text-primary"
                          />
                          <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="spouseAccompanying"
                            checked={spouseAccompanying === false}
                            onChange={() => setSpouseAccompanying(false)}
                            className="form-radio text-primary"
                          />
                          <span className="ml-2">No</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Age */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How old are you?
                </label>

                <AgeDropdown
                  value={age}
                  onChange={(selectedAge) => {
                    setAge(selectedAge);

                  }}
                />

              </div>



              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose the best answer to describe this level of education:
                </label>
                <select
                  value={educationLevel || ''}
                  onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select education level</option>
                  <option value="0">None, or less than secondary (high school)</option>
                  <option value="5">Secondary diploma (high school graduation)</option>
                  <option value="15">One-year program at a university, college, trade or technical school, or other institute</option>
                  <option value="30">Two-year program at a university, college, trade or technical school, or other institute</option>
                  <option value="50">Bachelor's degree (three or more year program at a university, college, trade or technical school, or other institute)</option>
                  <option value="60">Two or more certificates, diplomas or degrees. One must be for a program of three or more years</option>
                  <option value="70">Master's degree, or professional degree needed to practice in a licensed profession</option>
                  <option value="80">Doctoral level university degree (PhD)</option>
                </select>
              </div>

              {/* Canadian Degree Question */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you earned a Canadian degree, diploma, or certificate?
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="canadianDegree"
                      checked={hasCanadianDegree === true}
                      onChange={() => setHasCanadianDegree(true)}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="canadianDegree"
                      checked={hasCanadianDegree === false}
                      onChange={() => {
                        setHasCanadianDegree(false);
                        setCanadianEducationLevel(null);
                      }}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
              {/* Canadian Education Level - Show only if they have a Canadian degree */}
              {hasCanadianDegree === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose the best answer to describe your Canadian education level:
                  </label>
                  <select
                    value={canadianEducationLevel || ''}
                    onChange={(e) => setCanadianEducationLevel(e.target.value as EducationLevel)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="0">Second (high school) or less</option>
                    <option value="5">One-or-two-year diploma or certificate</option>
                    <option value="15">Degree,diploma or certificate of three years or longer OR a Master's,professional or doctoral degree of at least one acedemic year </option>
                  </select>
                </div>
              )}

              {/* Language Test Results Validity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are your test results less than two years old?
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="testResults"
                      checked={testResultsValid === true}
                      onChange={() => setTestResultsValid(true)}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="testResults"
                      checked={testResultsValid === false}
                      onChange={() => setTestResultsValid(false)}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>


              {testResultsValid === true && (
                <div className="mb-6">

                  <LanguageComponent setLanguageTest={setLanguageTest}
                    languageTest={languageTest}
                    languageScores={languageScores}
                    setLanguageScores={setLanguageScores}
                    mode='all' />
                </div>
              )}
              {testResultsValid === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have another test result ?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="anothertestResults"
                        checked={secondtestResultsValid === true}
                        onChange={() => secondsetTestResultsValid(true)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="anothertestResults"
                        checked={secondtestResultsValid === false}
                        onChange={() => secondsetTestResultsValid(false)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              )}
              {testResultsValid && secondtestResultsValid === true && (
                <LanguageComponent
                  setLanguageTest={secondsetLanguageTest}
                  languageTest={secondlanguageTest}
                  languageScores={secondlanguageScores}
                  setLanguageScores={secondsetLanguageScores}
                  isSecondLanguage={true}
                  firstLanguageTest={languageTest}
                  mode="TEF_TCF" />
              )}
              {testResultsValid === true && isEligible === true && (<div className="mb-6">
                <h2 className="text-xl font-semibold mb-4"> Work Experience</h2>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  In the last 10 years, how many years of skilled work experience in Canada do you have?
                </label>
                <select
                  value={canadianExperience}
                  onChange={(e) => setCanadianExperience(e.target.value as WorkExperience)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="none">None or less than a year</option>
                  <option value="one_year">1 year</option>
                  <option value="two_years">2 years</option>
                  <option value="three_years">3 years</option>
                  <option value="four_years">4 years</option>
                  <option value="five_plus_years">5 years or more</option>
                </select>
              </div>

              )}
              {testResultsValid === true && isEligible === true && (
                <div className="mb-6">

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    In the last 10 years, how many total years of foreign skilled work experience do you have?
                  </label>
                  <select
                    value={foreignExperience}
                    onChange={(e) => setForeignExperience(e.target.value as WorkExperience)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="none">None or less than a year</option>
                    <option value="one_year">1 year</option>
                    <option value="two_years">2 years</option>
                    <option value="three_years">3 years or more</option>
                    
                  </select>
                </div>)}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have a certificate of qualification from a Canadian province, territory or federal body?
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="qualification"
                      checked={hasQualification === true}
                      onChange={() => setHasQualification(true)}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="qualification"
                      checked={hasQualification === false}
                      onChange={() => setHasQualification(false)}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
              {testResultsValid === true && isEligible === true && (<div>
                <h2 className="text-xl font-semibold mb-4">Qualification & Job Offer</h2>

                {/* Canadian Qualification */}

                {/* //Here additional points begin here  */}
                {/* Job Offer */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have a valid job offer supported by a Labour Market Impact Assessment (if needed)?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="jobOffer"
                        checked={hasJobOffer === true}
                        onChange={() => setHasJobOffer(true)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="jobOffer"
                        checked={hasJobOffer === false}
                        onChange={() => setHasJobOffer(false)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                {/* NOC TEER - Only show if has job offer */}
                {hasJobOffer === true && isEligible === true && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Which NOC TEER is the job offer?
                    </label>
                    <select
                      value={nocTeer || ''}
                      onChange={(e) => setNocTeer(e.target.value as NocTeer)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select NOC TEER</option>
                      <option value="teer_00">NOC TEER 0 Major group 00</option>
                      <option value="teer_0_1_2_3">NOC TEER 1, 2 or 3, or any TEER 0 other than Major group 00</option>
                      <option value="teer_4_5">NOC TEER 4 or 5</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      Find out your job's TEER if you don't know.
                    </p>
                  </div>

                )}
              </div>
              )}
              {isEligible === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have a nomination certificate from a province or territory?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="nomination"
                        checked={hasNomination === true}
                        onChange={() => setHasNomination(true)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="nomination"
                        checked={hasNomination === false}
                        onChange={() => setHasNomination(false)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

              )}
              {isEligible === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you or your spouse/common-law partner have a sibling living in Canada who is a citizen or permanent resident?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="siblingCanada"
                        checked={hasSiblingInCanada === true}
                        onChange={() => setHasSiblingInCanada(true)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="siblingCanada"
                        checked={hasSiblingInCanada === false}
                        onChange={() => setHasSiblingInCanada(false)}
                        className="form-radio text-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              )}



              {spouseAccompanying === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is the highest level of education for which your spouse or common-law partner's has:
                  </label>
                  <select
                    value={spouseeducationLevel || ''}
                    onChange={(e) => setSpouseEducationLevel(e.target.value as EducationLevel)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select education level</option>
                    <option value="0">None, or less than secondary (high school)</option>
                    <option value="5">Secondary diploma (high school graduation)</option>
                    <option value="15">One-year program at a university, college, trade or technical school, or other institute</option>
                    <option value="30">Two-year program at a university, college, trade or technical school, or other institute</option>
                    <option value="50">Bachelor's degree (three or more year program at a university, college, trade or technical school, or other institute)</option>
                    <option value="60">Two or more certificates, diplomas or degrees. One must be for a program of three or more years</option>
                    <option value="70">Master's degree, or professional degree needed to practice in a licensed profession</option>
                    <option value="80">Doctoral level university degree (PhD)</option>
                  </select>
                </div>

              )}
              {spouseAccompanying === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    In the last 10 years, how many years of skilled work experience in Canada does your spouse/common-law partner have?
                  </label>
                  <select
                    value={spouseCanadianExperience}
                    onChange={(e) => setSpouseCanadianExperience(e.target.value as WorkExperience)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="none">None or less than a year</option>
                    <option value="one_year">1 year</option>
                    <option value="two_years">2 years</option>
                    <option value="three_years">3 years</option>
                    <option value="four_years">4 years</option>
                    <option value="five_plus_years">5 years or more</option>
                  </select>
                </div>
              )}
              {spouseAccompanying === true && (
                <div>
                  <LanguageComponent languageScores={spouseLanguageScores}
                    setLanguageScores={setSpouseLanguageScores} setLanguageTest={setSpouseLanguageTest}
                    languageTest={spouselanguageTest} mode='all' />
                </div>
              )}
            </div>
            {isEligible && (

              <button
                type='submit'
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"

              >
                Get CRS Score
              </button>)}
          </form>




          <>
            {data && (
              <Score data={data} onReset={handleReset} />
            )}</>

          {!isEligible && (
            <div className="text-center space-y-3">

              <h2 className="text-xl font-semibold text-red-600">Not Eligible</h2>
              <p className="text-gray-700 max-w-md mx-auto">
                Based on your answers, you do not appear to be eligible for Express Entry at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default Crscalculator;