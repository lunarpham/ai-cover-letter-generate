import { useState, useRef } from "react";
import { Meta } from "../layout";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Plus, Sparkles, ArrowDownToLine, Copy, Save } from "lucide-react";
import { useGemini } from "@/lib/hooks/useGemini";
import { useProfile } from "@/lib/hooks/useProfile";
import { useLetterForm } from "@/lib/hooks/useLetterForm";
import { useExportPDF } from "@/lib/hooks/useExportPDF";
import { useClipboard } from "@/lib/hooks/useClipboard";
import { useLetterContent } from "@/lib/hooks/useLetterContent";
import { useEffect } from "react";
import { useSavedLetters } from "@/lib/hooks/useSavedLetter";

export default function Create() {
  const [documentTitle, setDocumentTitle] =
    useState<string>("Untitled Document");
  const [showSparkleAnimation, setShowSparkleAnimation] = useState(false);
  const [insertFromProfile, setInsertFromProfile] = useState<boolean>(false);
  const { profileData, isLoading: profileLoading } = useProfile();

  const { coverLetter, isGenerating, error, generateCoverLetter } = useGemini();
  const {
    formData,
    setFormData,
    handleInputChange,
    handleWorkExperienceChange,
    handleJobApplicationChange,
    handleToneChange,
    addWorkExperience,
    deleteWorkExperience,
    updateProfileData,
  } = useLetterForm();
  const { saveAsPdf } = useExportPDF();
  const { copyToClipboard } = useClipboard();
  const { editableCoverLetter, handleCoverLetterEdit } =
    useLetterContent(coverLetter);

  const { saveLetter } = useSavedLetters();

  const coverLetterRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (insertFromProfile && profileData) {
      updateProfileData(profileData);
    }
  }, [insertFromProfile, profileData]);

  // Add this function before the handleGenerate function

  const validateForm = (): boolean => {
    // Basic info validation
    if (!formData.contents.basicInfo.name) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.contents.basicInfo.birthday) {
      toast.error("Please enter your date of birth");
      return false;
    }
    if (!formData.contents.basicInfo.gender) {
      toast.error("Please select your gender");
      return false;
    }
    if (!formData.contents.basicInfo.email) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.contents.basicInfo.phone) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!formData.contents.basicInfo.occupation) {
      toast.error("Please enter your occupation");
      return false;
    }

    // Job application validation
    if (!formData.contents.jobApplication.companyName) {
      toast.error("Please enter the company name");
      return false;
    }
    if (!formData.contents.jobApplication.position) {
      toast.error("Please enter the position you're applying for");
      return false;
    }
    if (!formData.contents.jobApplication.sourceOfInfoAboutJob) {
      toast.error("Please enter where you found this job opportunity");
      return false;
    }
    if (!formData.contents.jobApplication.motivation) {
      toast.error("Please describe your motivation for applying");
      return false;
    }

    return true;
  };

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setShowSparkleAnimation(true);

    // Update form data to include today's date
    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        dateRequested: new Date(),
      },
    }));

    await generateCoverLetter(formData);
    setShowSparkleAnimation(false);
  };

  const handleSaveLetter = () => {
    if (!editableCoverLetter) {
      toast.error("No letter content to save");
      return;
    }

    saveLetter({
      title: documentTitle || "Untitled Cover Letter",
      contents: editableCoverLetter,
    });

    toast.success("Cover letter saved successfully");
  };

  return (
    <>
      <Meta
        metadata={{
          title: "Generate a new Cover Letter",
          description: "Create professional cover letters with AI assistance",
        }}
      />
      <div className="bg-gray-300 h-screen w-full flex">
        <div className="basis-7/12 p-6 flex gap-4 items-start">
          <div className="basis-13/14 h-full bg-white shadow-lg p-3 font-serif text-sm flex-grow overflow-y-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <p>Generating your cover letter...</p>
              </div>
            ) : error ? (
              <div className="text-red-500">Error: {error}</div>
            ) : coverLetter ? (
              <Textarea
                ref={coverLetterRef}
                className="h-full w-full resize-none border-none focus:outline-none"
                value={editableCoverLetter}
                onChange={handleCoverLetterEdit}
                placeholder="Your cover letter will appear here"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Your cover letter will appear here
              </div>
            )}
          </div>
          <div className="basis-1/14 flex flex-col items-center justify-start gap-2">
            <button
              onClick={() =>
                coverLetter && saveAsPdf(editableCoverLetter, documentTitle)
              }
              title="Save as PDF"
              className="w-full aspect-square rounded-full bg-white text-black hover:bg-blue-500 transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <ArrowDownToLine size={20} />
            </button>
            <button
              onClick={() =>
                editableCoverLetter && copyToClipboard(editableCoverLetter)
              }
              title="Copy to Clipboard"
              className="w-full aspect-square rounded-full bg-white text-black hover:bg-blue-500 transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={handleSaveLetter}
              title="Save Letter"
              className="w-full aspect-square rounded-full bg-white text-black hover:bg-blue-500 transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <Save size={20} />
            </button>
          </div>
        </div>
        <form className="basis-5/12 bg-white flex flex-col h-screen">
          <div className="bg-white/30 p-6 backdrop-blur-md">
            <input
              type="text"
              className="text-lg font-bold"
              placeholder="Untitled Document"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
          </div>
          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase text-gray-500">
                Basic Information
              </h3>
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.contents.basicInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 border-gray-300"
                required
              />
              <div className="flex space-x-2">
                <Input
                  type="date"
                  className="w-6/12 h-12"
                  value={formData.contents.basicInfo.birthday}
                  onChange={(e) =>
                    handleInputChange("birthday", e.target.value)
                  }
                  required
                />
                <Select
                  value={formData.contents.basicInfo.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  required
                >
                  <SelectTrigger className="w-6/12 h-12" size="md">
                    <SelectValue placeholder="Choose your Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="email"
                placeholder="Enter your Email"
                className="h-12"
                value={formData.contents.basicInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Enter your Phone Number"
                className="h-12"
                value={formData.contents.basicInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Enter your Occupation"
                className="h-12"
                value={formData.contents.basicInfo.occupation}
                onChange={(e) =>
                  handleInputChange("occupation", e.target.value)
                }
                required
              />
              <Input
                type="text"
                placeholder="Enter your Address"
                className="h-12"
                value={formData.contents.basicInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
              <div className="h-8 inline-flex items-center gap-2 mt-2">
                <Checkbox
                  id="insertInfo"
                  className="border-2 bg-black/10 checked:bg-blue-600"
                  checked={insertFromProfile}
                  onCheckedChange={(checked) =>
                    setInsertFromProfile(checked as boolean)
                  }
                />
                <Label htmlFor="insertInfo" className="text-sm font-normal">
                  {profileLoading
                    ? "Loading profile data..."
                    : "Insert my information from my profile"}
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase text-gray-500">
                Job Application
              </h3>
              <Input
                type="text"
                placeholder="Company Name"
                value={formData.contents.jobApplication.companyName}
                onChange={(e) =>
                  handleJobApplicationChange("companyName", e.target.value)
                }
                className="h-12 border-gray-300"
                required
              />
              <Input
                type="text"
                placeholder="Position Applied For"
                value={formData.contents.jobApplication.position}
                onChange={(e) =>
                  handleJobApplicationChange("position", e.target.value)
                }
                className="h-12 border-gray-300"
                required
              />
              <Input
                type="text"
                placeholder="I know this recruitment from..."
                value={formData.contents.jobApplication.sourceOfInfoAboutJob}
                onChange={(e) =>
                  handleJobApplicationChange(
                    "sourceOfInfoAboutJob",
                    e.target.value
                  )
                }
                className="h-12 border-gray-300"
                required
              />
              <Textarea
                placeholder="Describe your motivation for applying"
                className="h-32 border-gray-300 max-h-36"
                value={formData.contents.jobApplication.motivation}
                onChange={(e) =>
                  handleJobApplicationChange("motivation", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase text-gray-500">
                Work Experience
              </h3>
              <Textarea
                placeholder="Describe your work experience here..."
                className="h-32 border-gray-300 max-h-36"
                onChange={() => {}}
              ></Textarea>
              {formData.contents.workExperience.length > 0
                ? formData.contents.workExperience.map((experience, index) => (
                    <div
                      key={experience.id}
                      className="relative w-full rounded-lg bg-gray-200 p-3 text-sm group"
                    >
                      <button
                        className="absolute -top-2 -right-2 p-1 bg-gray-300 rounded-full text-red-500 hover:bg-red-200 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Delete work experience"
                        onClick={() => deleteWorkExperience(index)}
                      >
                        <X size={16} />
                      </button>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Company Name:</span>
                        <input
                          type="text"
                          className="focus:outline-none"
                          placeholder="Click to add"
                          value={experience.companyName}
                          onChange={(e) =>
                            handleWorkExperienceChange(
                              index,
                              "companyName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Start Time:</span>
                        <input
                          type="text"
                          className="focus:outline-none"
                          placeholder="Click to add"
                          value={experience.startTime}
                          onChange={(e) =>
                            handleWorkExperienceChange(
                              index,
                              "startTime",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">End Time:</span>
                        <input
                          type="text"
                          className="focus:outline-none"
                          placeholder="Click to add"
                          value={experience.endTime}
                          onChange={(e) =>
                            handleWorkExperienceChange(
                              index,
                              "endTime",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Position:</span>
                        <input
                          type="text"
                          className="focus:outline-none"
                          placeholder="Click to add"
                          value={experience.position}
                          onChange={(e) =>
                            handleWorkExperienceChange(
                              index,
                              "position",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-medium">Description:</span>
                        <textarea
                          className="w-full max-h-16 focus:outline-none"
                          placeholder="Describe your work experience here..."
                          value={experience.description}
                          onChange={(e) =>
                            handleWorkExperienceChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                    </div>
                  ))
                : null}
              <button
                className="w-full rounded-lg bg-gray-200 p-3 text-sm inline-flex gap-2 items-center justify-center hover:bg-gray-300 cursor-pointer"
                aria-label="Add work experience"
                onClick={addWorkExperience}
              >
                <Plus size={16} />
                <span>Add Work Experience</span>
              </button>
            </div>
          </div>
          <div className="w-full p-6">
            <div className="grid grid-cols-12 gap-2 items-center border rounded-full p-2">
              <div className="col-span-7">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`relative py-3 px-4 w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white inline-flex items-center justify-center gap-2 hover:to-fuchsia-500 hover:from-cyan-500 transition-colors duration-200 ${
                    isGenerating
                      ? "opacity-75 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles
                        size={20}
                        className="text-white animate-pulse"
                      />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>

              <div className="col-span-5">
                <Select
                  value={formData.contents.preferredTone}
                  onValueChange={handleToneChange}
                >
                  <SelectTrigger
                    size="md"
                    className="border-none w-full hover:bg-gray-200 rounded-full"
                  >
                    <SelectValue placeholder="Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tone</SelectLabel>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="concise">Concise</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
