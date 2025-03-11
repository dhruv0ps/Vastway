import type React from "react"
import { useState } from "react"
import { Calculator } from "lucide-react"
import LanguageComponent from "./Langaugecomponent"
import type {
  MaritalStatus,
  LanguageScores,
  WorkExperience,
  EducationLevel,
  NocTeer,
  CRSScores,
} from "../../../../config/models/crs"
import { crsApi } from "../../../../config/apiRoutes/crsRoutes"
import Score from "./score"
import AgeDropdown from "../../../../util/AgeDropDown"

const Crscalculator: React.FC = () => {
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>()
  const [spouseIsPR, setSpouseIsPR] = useState<boolean | null>(null)
  const [spouseAccompanying, setSpouseAccompanying] = useState<boolean | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [languageTest, setLanguageTest] = useState<string>("")
  const [spouselanguageTest, setSpouseLanguageTest] = useState<string>("")
  const [languageScores, setLanguageScores] = useState<LanguageScores>({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
  })
  const [spouseLanguageScores, setSpouseLanguageScores] = useState<LanguageScores>({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
  })
  const [canadianExperience, setCanadianExperience] = useState<WorkExperience>("none")
  const [spouseCanadianExperience, setSpouseCanadianExperience] = useState<WorkExperience>("none")
  const [foreignExperience, setForeignExperience] = useState<WorkExperience>("none")
  const [secondlanguageTest, secondsetLanguageTest] = useState<string>("")
  const [secondlanguageScores, secondsetLanguageScores] = useState<LanguageScores>({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [hasCanadianEducation, setHasCanadianEducation] = useState<boolean | null>(null);
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(null)
  const [spouseeducationLevel, setSpouseEducationLevel] = useState<EducationLevel | null>(null)
  const [testResultsValid, setTestResultsValid] = useState<boolean | null>(null)
  const [secondtestResultsValid, secondsetTestResultsValid] = useState<boolean | null>(null)
  const isMarriedOrCommonLaw = maritalStatus === "married" || maritalStatus === "common_law"
  const isEligible = testResultsValid !== false
  const [hasQualification, setHasQualification] = useState<boolean | null>(null)
  const [hasJobOffer, setHasJobOffer] = useState<boolean | null>(null)
  const [nocTeer, setNocTeer] = useState<NocTeer | null>(null)
  const [hasNomination, setHasNomination] = useState<boolean | null>(null)
  const [hasSiblingInCanada, setHasSiblingInCanada] = useState<boolean | null>(null)
  const [data, setData] = useState<CRSScores>()
  const [hasCanadianDegree, setHasCanadianDegree] = useState<boolean | null>(null)
  const [canadianEducationLevel, setCanadianEducationLevel] = useState<EducationLevel | null>(null)
  const [step, setStep] = useState<number>(1)

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const getCrsScore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const requestBody = {
        maritalStatus,
        age,
        educationLevel,
        languageTest,
        languageScores,
        secondlanguageTest,
        secondlanguageScores,
        canadianExperience,
        foreignExperience,
        hasCanadianDegree,
        canadianEducationLevel,
        spouseAccompanying,
        hasSiblingInCanada,
        hasJobOffer,
        nocTeer,
        hasNomination,
        hasQualification,
        spouseCanadianExperience,
        spouseLanguageScores,
        spouseeducationLevel,
        spouselanguageTest,
      }
      const response = await crsApi.calculateCRS(requestBody)
      setData(response.data)
    } catch (error) {
      console.error("Error calculating CRS score:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setData(undefined)
    setStep(1)
  }

  // Helper function to check if language scores are filled
  const areLanguageScoresFilled = (scores: LanguageScores) => {
    return scores.speaking !== "" && scores.listening !== "" && scores.reading !== "" && scores.writing !== ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">Canada CRS Score Calculator</h1>
          </div>

          {/* Progress indicator */}
          {/* <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((step / 10) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-1">Step {step}</p>
          </div> */}

          <form onSubmit={getCrsScore}>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">CRS Calculator</h2>
              <p className="text-sm text-gray-600">
                This tool will help you calculate your <strong>Comprehensive Ranking System (CRS) score</strong>
                based on the answers you provide below.
              </p>
              {/* Marital Status */}
              {step >= 1 && (
                <div className="mb-6 mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">1) What is your marital status?</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => {
                      setMaritalStatus(e.target.value as MaritalStatus)
                      setSpouseIsPR(null)
                      setSpouseAccompanying(null)
                      handleNextStep()
                    }}
                    className="w-52 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="annulled_marriage">Annulled Marriage</option>
                    <option value="common_law">Common-Law</option>
                    <option value="divorced">Divorced/Separated</option>
                    <option value="legally_separated">Legally Separated</option>
                    <option value="married">Married</option>
                    <option value="never_married">Never Married / Single</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              )}

              {/* Conditional Questions for Married/Common-Law */}
              {step >= 2 && isMarriedOrCommonLaw && (
                <div className="mb-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      2)Is your spouse or common-law partner a citizen or permanent resident of Canada?
                    </label>
                    <select
                      value={spouseIsPR === null ? "" : spouseIsPR ? "yes" : "no"}
                      onChange={(e) => {
                        setSpouseIsPR(e.target.value === "yes" ? true : e.target.value === "no" ? false : null)
                        if (e.target.value !== "") {
                          handleNextStep()
                        }
                      }}
                      className="w-40 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {spouseIsPR === false && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        2)Will your spouse or common-law partner come with you to Canada?
                      </label>
                      <select
                        value={spouseAccompanying === null ? "" : spouseAccompanying ? "yes" : "no"}
                        onChange={(e) => {
                          setSpouseAccompanying(
                            e.target.value === "yes" ? true : e.target.value === "no" ? false : null,
                          )
                          if (e.target.value !== "") {
                            handleNextStep()
                          }
                        }}
                        className="w-40 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Age */}
              {step >= (isMarriedOrCommonLaw ? 3 : 2) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">3)How old are you?</label>
                  <AgeDropdown
                    value={age}
                    onChange={(selectedAge) => {
                      setAge(selectedAge)
                      handleNextStep()
                    }}
                  />
                </div>
              )}

              {/* Education Level */}
              {step >= (isMarriedOrCommonLaw ? 4 : 3) && age !== null && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    4)Choose the best answer to describe this level of education:
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Enter the highest level of education for which you:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                    <li>Earned a <strong>Canadian degree, diploma, or certificate</strong>, or</li>
                    <li>
                      Had an <strong>Educational Credential Assessment (ECA)</strong> if you studied outside Canada.
                      (ECAs must be from an approved agency, within the last five years.)
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Note:</strong> A Canadian degree, diploma, or certificate must be earned at an
                    accredited university, college, trade, or technical school in Canada.
                    Distance learning counts for education points, but not for bonus points in your profile or application.
                  </p>
                  <select
                    value={educationLevel || ""}
                    onChange={(e) => {
                      setEducationLevel(e.target.value as EducationLevel)
                      handleNextStep()
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select education level</option>
                    <option value="0">None, or less than secondary (high school)</option>
                    <option value="5">Secondary diploma (high school graduation)</option>
                    <option value="15">
                      One-year program at a university, college, trade or technical school, or other institute
                    </option>
                    <option value="30">
                      Two-year program at a university, college, trade or technical school, or other institute
                    </option>
                    <option value="50">
                      Bachelor's degree (three or more year program at a university, college, trade or technical school,
                      or other institute)
                    </option>
                    <option value="60">
                      Two or more certificates, diplomas or degrees. One must be for a program of three or more years
                    </option>
                    <option value="70">
                      Master's degree, or professional degree needed to practice in a licensed profession
                    </option>
                    <option value="80">Doctoral level university degree (PhD)</option>
                  </select>
                </div>
              )}

              {/* Canadian Degree Question */}
              {step >= (isMarriedOrCommonLaw ? 5 : 4) && educationLevel !== null && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    4b) Have you earned a Canadian degree, diploma, or certificate?
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Note: To answer "Yes", you must meet all the following conditions:</strong>
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                    <li>
                      <strong>English or French as a Second Language</strong> must not have made up more than half your study.
                    </li>
                    <li>
                      You must not have studied under an <strong>award that required you to return</strong> to your home country
                      after graduation to apply your skills and knowledge.
                    </li>
                    <li>
                      You must have studied at a <strong>school within Canada</strong> (foreign campuses do not count).
                    </li>
                    <li>
                      You had to be <strong>enrolled full-time</strong> for at least eight months, unless you completed the study
                      or training program (in whole or in part) between <strong>March 2020 and August 2022</strong>.
                    </li>
                    <li>
                      You had to have been <strong>physically present in Canada</strong> for at least eight months, unless you
                      completed the study or training program (in whole or in part) between <strong>March 2020 and August 2022</strong>.
                    </li>
                  </ul>
                  <select
                    value={hasCanadianDegree === null ? "" : hasCanadianDegree ? "yes" : "no"}
                    onChange={(e) => {
                      const value = e.target.value === "yes" ? true : e.target.value === "no" ? false : null
                      setHasCanadianDegree(value)
                      if (value === false) {
                        setCanadianEducationLevel(null)
                      }
                      if (e.target.value !== "") {
                        handleNextStep()
                      }
                    }}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              )}

              {/* Canadian Education Level - Show only if they have a Canadian degree */}
              {step >= (isMarriedOrCommonLaw ? 6 : 5) && hasCanadianDegree === true && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    4c) Choose the best answer to describe your Canadian education level:
                  </label>
                  <select
                    value={canadianEducationLevel || ""}
                    onChange={(e) => {
                      setCanadianEducationLevel(e.target.value as EducationLevel)
                      handleNextStep()
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="0">Second (high school) or less</option>
                    <option value="5">One-or-two-year diploma or certificate</option>
                    <option value="15">
                      Degree, diploma or certificate of three years or longer OR a Master's, professional or doctoral
                      degree of at least one academic year
                    </option>
                  </select>
                </div>
              )}

              {/* Language Test Results Validity */}
              {step >= (isMarriedOrCommonLaw ? (hasCanadianDegree ? 7 : 6) : hasCanadianDegree ? 6 : 5) && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong> 5)Official languages:</strong> Canada's official languages are <strong>English and French</strong>.
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    You need to submit <strong>language test results</strong> that are <strong>less than two years old</strong> for
                    all programs under Express Entry, even if <strong>English or French is your first language</strong>.
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    i. Are your test results less than two years old?
                  </label>
                  <select
                    value={testResultsValid === null ? "" : testResultsValid ? "yes" : "no"}
                    onChange={(e) => {
                      setTestResultsValid(e.target.value === "yes" ? true : e.target.value === "no" ? false : null)
                      if (e.target.value !== "") {
                        handleNextStep()
                      }
                    }}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              )}

              {/* First Language Test */}
              {step >= (isMarriedOrCommonLaw ? (hasCanadianDegree ? 8 : 7) : hasCanadianDegree ? 7 : 6) &&
                testResultsValid === true && (
                  <div className="mb-6">
                    <LanguageComponent
                      setLanguageTest={setLanguageTest}
                      languageTest={languageTest}
                      languageScores={languageScores}
                      setLanguageScores={(scores) => {
                        setLanguageScores(scores)
                        if (areLanguageScoresFilled(scores) && languageTest) {
                          handleNextStep()
                        }
                      }}
                      mode="all"
                    />
                  </div>
                )}

              {/* Second Language Test Question */}
              {step >= (isMarriedOrCommonLaw ? (hasCanadianDegree ? 9 : 8) : hasCanadianDegree ? 8 : 7) &&
                testResultsValid === true &&
                areLanguageScoresFilled(languageScores) &&
                languageTest && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      iii. Do you have another test result?
                    </label>
                    <select
                      value={secondtestResultsValid === null ? "" : secondtestResultsValid ? "yes" : "no"}
                      onChange={(e) => {
                        const value = e.target.value === "yes" ? true : e.target.value === "no" ? false : null;
                        secondsetTestResultsValid(value);

                        // **Reset the second language scores and test if "No" is selected**
                        if (value === false) {
                          secondsetLanguageTest("");
                          secondsetLanguageScores({
                            speaking: "",
                            listening: "",
                            reading: "",
                            writing: "",
                          });
                        }

                        if (e.target.value !== "") {
                          handleNextStep();
                        }
                      }}
                      className="w-40 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}

              {/* Second Language Test */}
              {step >= (isMarriedOrCommonLaw ? (hasCanadianDegree ? 10 : 9) : hasCanadianDegree ? 9 : 8) &&
                testResultsValid &&
                secondtestResultsValid === true && (
                  <div className="mb-6">
                    <LanguageComponent
                      setLanguageTest={secondsetLanguageTest}
                      languageTest={secondlanguageTest}
                      languageScores={secondlanguageScores}
                      setLanguageScores={(scores) => {
                        secondsetLanguageScores(scores)
                        if (areLanguageScoresFilled(scores) && secondlanguageTest) {
                          handleNextStep()
                        }
                      }}
                      isSecondLanguage={true}
                      firstLanguageTest={languageTest}
                      mode="TEF_TCF"
                    />
                  </div>
                )}

              {/* Work Experience Section */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 11
                      : 10
                    : secondtestResultsValid === true
                      ? 10
                      : 9
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 10
                      : 9
                    : secondtestResultsValid === true
                      ? 9
                      : 8) &&
                testResultsValid === true &&
                isEligible === true && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">6) Work Experience</h2>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      i. In the last 10 years, how many years of skilled work experience in Canada do you have?
                    </label>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                      <li>
                        It must have been <strong>paid</strong> and <strong>full-time</strong> (or an equal amount in part-time).
                      </li>
                      <li>
                        You must have been <strong>physically in Canada</strong> and working for a <strong>Canadian employer</strong>.
                        This includes <strong>remote work</strong>.
                      </li>
                      <li>
                        "Skilled work" in the <strong>National Occupational Classification (NOC)</strong> is **TEER 0, 1, 2, or 3** category jobs.
                      </li>
                      <li>
                        If you aren’t sure of the <strong>NOC TEER category</strong> for this job, you can{" "}
                        <a
                          href="https://noc.gc.ca/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          find your NOC here.
                        </a>
                      </li>
                    </ul>
                    <select
                      value={canadianExperience}
                      onChange={(e) => {
                        setCanadianExperience(e.target.value as WorkExperience)
                        handleNextStep()
                      }}
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

              {/* Foreign Work Experience */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 12
                      : 11
                    : secondtestResultsValid === true
                      ? 11
                      : 10
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 11
                      : 10
                    : secondtestResultsValid === true
                      ? 10
                      : 9) &&
                testResultsValid === true &&
                isEligible === true && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ii.  In the last 10 years, how many total years of foreign skilled work experience do you have?
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      To qualify, your work experience must meet the following conditions</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                      <li>
                        It must have been <strong>paid</strong> and <strong>full-time</strong> (or an equal amount in part-time).
                      </li>
                      <li>
                        It must be <strong>in only one occupation</strong> (NOC <strong>TEER category 0, 1, 2, or 3</strong>).
                      </li>
                    </ul>
                    <select
                      value={foreignExperience}
                      onChange={(e) => {
                        setForeignExperience(e.target.value as WorkExperience)
                        handleNextStep()
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="none">None or less than a year</option>
                      <option value="one_year">1 year</option>
                      <option value="two_years">2 years</option>
                      <option value="three_years">3 years or more</option>
                    </select>
                  </div>
                )}

              {/* Certificate of Qualification */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 13
                      : 12
                    : secondtestResultsValid === true
                      ? 12
                      : 11
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 12
                      : 11
                    : secondtestResultsValid === true
                      ? 11
                      : 10) && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      7) Do you have a certificate of qualification from a Canadian province, territory or federal body?
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Note:</strong> A <strong>certificate of qualification</strong> allows people to work in certain skilled
                      trades in Canada. Only the <strong>provinces, territories, and a federal body</strong> can issue these
                      certificates.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                      <li>
                        To obtain one, individuals must have their <strong>training, trade experience, and skills assessed</strong>,
                        and then pass a certification exam.
                      </li>
                      <li>
                        People usually need to travel to the province or territory for an assessment and may require
                        <strong>experience and training from a Canadian employer</strong>.
                      </li>
                      <li>
                        <strong>This is not the same as a nomination</strong> from a province or territory.
                      </li>
                    </ul>
                    <select
                      value={hasQualification === null ? "" : hasQualification ? "yes" : "no"}
                      onChange={(e) => {
                        setHasQualification(e.target.value === "yes" ? true : e.target.value === "no" ? false : null)
                        if (e.target.value !== "") {
                          handleNextStep()
                        }
                      }}
                      className="w-40 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}

              {/* Job Offer Section */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 14
                      : 13
                    : secondtestResultsValid === true
                      ? 13
                      : 12
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? 13
                      : 12
                    : secondtestResultsValid === true
                      ? 12
                      : 11) &&
                testResultsValid === true &&
                isEligible === true && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Additional Points</h2>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        8) Do you have a valid job offer supported by a Labour Market Impact Assessment (if needed)?
                      </label>
                      <p className="text-sm text-gray-600 mb-3">
                        A valid job offer must meet the following criteria:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                        <li><strong>Full-time</strong> employment.</li>
                        <li>Listed as <strong>TEER 0, 1, 2, or 3</strong> in the 2021 National Occupational Classification.</li>
                        <li>
                          Supported by a <strong>Labour Market Impact Assessment (LMIA)</strong> or exempt from needing one.
                        </li>
                        <li>For <strong>one year</strong> from the time you become a permanent resident.</li>
                      </ul>
                      <select
                        value={hasJobOffer === null ? "" : hasJobOffer ? "yes" : "no"}
                        onChange={(e) => {
                          setHasJobOffer(e.target.value === "yes" ? true : e.target.value === "no" ? false : null)
                          if (e.target.value !== "") {
                            handleNextStep()
                          }
                        }}
                        className="w-40 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {/* NOC TEER - Only show if has job offer */}
                    {hasJobOffer === true && isEligible === true && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          8a) Which NOC TEER is the job offer?
                        </label>
                        <p className="mt-2 text-sm text-gray-500 mb-2">
                          <a
                            href="https://noc.gc.ca/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            Find out your job's TEER category.
                          </a>
                        </p>
                        <select
                          value={nocTeer || ""}
                          onChange={(e) => {
                            setNocTeer(e.target.value as NocTeer)
                            if (e.target.value !== "") {
                              handleNextStep()
                            }
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select NOC TEER</option>
                          <option value="teer_00">NOC TEER 0 Major group 00</option>
                          <option value="teer_0_1_2_3">
                            NOC TEER 1, 2 or 3, or any TEER 0 other than Major group 00
                          </option>
                          <option value="teer_4_5">NOC TEER 4 or 5</option>
                        </select>
                        <p className="mt-2 text-sm text-gray-500">Find out your job's TEER if you don't know.</p>
                      </div>
                    )}
                  </div>
                )}

              {/* Provincial Nomination */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 16
                        : 15
                      : hasJobOffer
                        ? 15
                        : 14
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 15
                        : 14
                      : hasJobOffer
                        ? 14
                        : 13
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 15
                        : 14
                      : hasJobOffer
                        ? 14
                        : 13
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 14
                        : 13
                      : hasJobOffer
                        ? 13
                        : 12) &&
                isEligible === true && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      9) Do you have a nomination certificate from a province or territory?
                    </label>
                    <select
                      value={hasNomination === null ? "" : hasNomination ? "yes" : "no"}
                      onChange={(e) => {
                        setHasNomination(e.target.value === "yes" ? true : e.target.value === "no" ? false : null)
                        if (e.target.value !== "") {
                          handleNextStep()
                        }
                      }}
                      className="w-40 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}

              {/* Sibling in Canada */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 17
                        : 16
                      : hasJobOffer
                        ? 16
                        : 15
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 16
                        : 15
                      : hasJobOffer
                        ? 15
                        : 14
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 16
                        : 15
                      : hasJobOffer
                        ? 15
                        : 14
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 15
                        : 14
                      : hasJobOffer
                        ? 14
                        : 13) &&
                isEligible === true && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      10) Do you or your spouse/common-law partner have a sibling living in Canada who is a citizen or
                      permanent resident?
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Note: To answer "Yes", the sibling must meet all the following conditions:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                      <li>Be <strong>18 years old or older</strong>.</li>
                      <li>Be related to you or your partner by <strong>blood, marriage, common-law partnership, or adoption</strong>.</li>
                      <li>Have a <strong>parent in common</strong> with you or your partner.</li>
                    </ul>

                    <p className="text-sm text-gray-600 mb-3">
                      A brother or sister is considered related to you by:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                      <li><strong>Blood</strong> (biological sibling).</li>
                      <li><strong>Adoption</strong> (legally adopted sibling).</li>
                      <li><strong>Marriage</strong> (step-brother or step-sister).</li>
                    </ul>
                    <select
                      value={hasSiblingInCanada === null ? "" : hasSiblingInCanada ? "yes" : "no"}
                      onChange={(e) => {
                        setHasSiblingInCanada(e.target.value === "yes" ? true : e.target.value === "no" ? false : null)
                        if (e.target.value !== "") {
                          handleNextStep()
                        }
                      }}
                      className="w-40 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}

              {/* Spouse Education Level - Only if spouse is accompanying */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 18
                        : 17
                      : hasJobOffer
                        ? 17
                        : 16
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 17
                        : 16
                      : hasJobOffer
                        ? 16
                        : 15
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 17
                        : 16
                      : hasJobOffer
                        ? 16
                        : 15
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 16
                        : 15
                      : hasJobOffer
                        ? 15
                        : 14) &&
                spouseAccompanying === true && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Spouse Information</h2>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      11) What is the highest level of education for which your spouse or common-law partner's has:
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Have you <strong>earned a Canadian degree, diploma, or certificate</strong>; or
                      had an <strong>Educational Credential Assessment (ECA)</strong>? (ECAs must be from an
                      approved agency within the last <strong>five years</strong>).
                    </p>

                    <p className="text-sm text-gray-600 mb-3">
                      To get the correct number of points, make sure you choose the answer that best reflects your case. For example:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                      <li>
                        If you have <strong>TWO Bachelor’s degrees</strong>, or <strong>one Bachelor’s AND a two-year college diploma</strong>,
                        choose – <strong>“Two or more certificates, diplomas, or degrees. One must be for a program of three or more years.”</strong>
                      </li>
                    </ul>
                    <select
                      value={spouseeducationLevel || ""}
                      onChange={(e) => {
                        setSpouseEducationLevel(e.target.value as EducationLevel)
                        handleNextStep()
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select education level</option>
                      <option value="0">None, or less than secondary (high school)</option>
                      <option value="5">Secondary diploma (high school graduation)</option>
                      <option value="15">
                        One-year program at a university, college, trade or technical school, or other institute
                      </option>
                      <option value="30">
                        Two-year program at a university, college, trade or technical school, or other institute
                      </option>
                      <option value="50">
                        Bachelor's degree (three or more year program at a university, college, trade or technical
                        school, or other institute)
                      </option>
                      <option value="60">
                        Two or more certificates, diplomas or degrees. One must be for a program of three or more years
                      </option>
                      <option value="70">
                        Master's degree, or professional degree needed to practice in a licensed profession
                      </option>
                      <option value="80">Doctoral level university degree (PhD)</option>
                    </select>
                  </div>
                )}

              {/* Spouse Canadian Experience */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 19
                        : 18
                      : hasJobOffer
                        ? 18
                        : 17
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 18
                        : 17
                      : hasJobOffer
                        ? 17
                        : 16
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 18
                        : 17
                      : hasJobOffer
                        ? 17
                        : 16
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 17
                        : 16
                      : hasJobOffer
                        ? 16
                        : 15) &&
                spouseAccompanying === true && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      12)  In the last 10 years, how many years of skilled work experience in Canada does your
                      spouse/common-law partner have?
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      To qualify, your work experience must meet the following conditions:
                    </p>
                    <select
                      value={spouseCanadianExperience}
                      onChange={(e) => {
                        setSpouseCanadianExperience(e.target.value as WorkExperience)
                        handleNextStep()
                      }}
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

              {/* Spouse Language Test */}
              {step >=
                (isMarriedOrCommonLaw
                  ? hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 20
                        : 19
                      : hasJobOffer
                        ? 19
                        : 18
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 19
                        : 18
                      : hasJobOffer
                        ? 18
                        : 17
                  : hasCanadianDegree
                    ? secondtestResultsValid === true
                      ? hasJobOffer
                        ? 19
                        : 18
                      : hasJobOffer
                        ? 18
                        : 17
                    : secondtestResultsValid === true
                      ? hasJobOffer
                        ? 18
                        : 17
                      : hasJobOffer
                        ? 17
                        : 16) &&
                spouseAccompanying === true && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      13)  Did your spouse or common-law partner take a language test? If so, which one?
                    </label>

                    {/* Added Language Test Explanation */}
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Test results must be less than two years old.</strong>
                    </p>
                    <LanguageComponent
                      languageScores={spouseLanguageScores}
                      setLanguageScores={setSpouseLanguageScores}
                      setLanguageTest={setSpouseLanguageTest}
                      languageTest={spouselanguageTest}
                      mode="all"
                    />
                  </div>
                )}
            </div>

            {/* Submit Button */}
            {isEligible && (
              <div className="flex justify-between items-center">
                {/* Left-aligned "Calculate Again" button (if data exists) */}
                {data && (
                  <button
                    className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    onClick={handleReset}
                  >
                    Calculate again
                  </button>
                )}

                {/* Right-aligned "Get CRS Score" button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    "Get CRS Score"
                  )}
                </button>
              </div>
            )}

          </form>

          <>{data && <Score data={data} onReset={handleReset}
          />
          }
          </>

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
  )
}

export default Crscalculator

