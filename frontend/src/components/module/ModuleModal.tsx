import type { ModuleExtendedProp, ModuleRequest } from "@/types";
import { Modal } from "react-bootstrap";
import './moduleModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Add this line
import { moduleDataConfig } from "@/config/moduleDataConfig";
import { ModuleConfigs } from "@/types";
import { useState, useEffect } from "react";
import { usePutData } from "@/hooks";
import { formatModuleType } from "./moduleUtil";
import { RelatedListSection } from "./RelatedListSection";
interface ModuleModalProps {
  module: ModuleExtendedProp | null;
  show: boolean;
  onHide: () => void;
  refetch: () => Promise<void>;
}

export function ModuleModal({ module, show, onHide, refetch }: ModuleModalProps) {
  const config = moduleDataConfig();

  const [code, setCode] = useState(module?.code || '');
  const [name, setName] = useState(module?.moduleName || '');
  const [type, setType] = useState(module?.type || '');
  const [nqf, setNqf] = useState(module?.nqf_level || 0);
  const [isElective, setIsElective] = useState(module?.elective || false);
  const [credits, setCredits] = useState(module?.credits || 0);
  const [preReqs, setPreReqs] = useState(module?.prerequisites || []);
  const [courses, setCourses] = useState(module?.courses || []);
  const [isDirty, setIsDirty] = useState(false);
  const [showModuleSearch, setShowModuleSearch] = useState(false);
  const [showCourseSearch, setShowCourseSearch] = useState(false);
  // Initialize the PUT hook at component level
  const { mutateData: updateModule, isLoading } = usePutData<ModuleRequest>({
    apiEndpoint: ModuleConfigs().module.put.apiEndpoint,
    onSuccess: (data) => {
      console.log('Module updated successfully:', data);
      refetch();
      setIsDirty(false);
      onHide(); // Close modal on success
    },
    onError: (error) => {
      console.error('Failed to update module:', error);
    }
  });

  // Update state when module prop changes
  useEffect(() => {
    if (module) {
      setCode(module.code || '');
      setName(module.moduleName || '');
      setType(module.type || '');
      setNqf(module.nqf_level || 0);
      setCredits(module.credits || 0);
      setIsElective(module.elective || false);
      setPreReqs(module.prerequisites || []);
      setCourses(module.courses || []);
    }
  }, [module, onHide]);

  const handleOnclickSave = () => {
    updateModule({
      code,
      moduleName: name,
      type: type.replaceAll(' ', '_').trim(),
      nqf_level: nqf,
      credits,
      elective: isElective,
      prerequisites: preReqs.map(pr => pr.code),
      courseCodes: courses.map(c => c.code)
    });

    console.log(isElective);
  };

  const addPreq = (prereq: { code: string, moduleName: string }) => {
    setPreReqs([...preReqs, prereq]);
    setIsDirty(true);
  }


  const addCourse = (course: { code: string; courseName: string }) => {
    setCourses([...courses, course]);
    setIsDirty(true);
  };

  const removeCourse = (code: string) => {
    setCourses(courses.filter(c => c.code !== code));
    setIsDirty(true);
  };

  const removePrereq = (code: string) => {
    setPreReqs(preReqs.filter(p => p.code !== code));
    setIsDirty(true);
  };

  const prereqItems = preReqs.map(p => ({ code: p.code, name: p.moduleName }));
  const courseItems = courses.map(c => ({ code: c.code, name: c.courseName }));

  return (
    <>
      <Modal
        className="modal"
        show={show}
        onHide={onHide}
        centered
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Edit Module: {module?.code}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Module Code</label>
              <input
                type="text"
                className="form-control opacity-50"
                style={{ border: 'none', boxShadow: 'none' }}
                value={code}
                placeholder="Enter module code"
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Module Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder="Enter module name"
                onChange={(e) => { setName(e.target.value); setIsDirty(true); }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Module Type</label>
              <select
                className="form-select"
                defaultValue={formatModuleType(module?.type) || ''}
                onChange={(e) => { setType(e.target.value); setIsDirty(true); }}
              >
                <option value="">Select module type</option>
                {config.module_types.data.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">NQF Level</label>
              <select
                className="form-select"
                defaultValue={module?.nqf_level?.toString() || ''}
                onChange={(e) => { setNqf(Number(e.target.value)); setIsDirty(true); console.log(e.target.value) }}
              >
                <option value="">Select NQF level</option>
                {config.nqf_levels.data.map((level) => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Credits</label>
              <select
                className="form-select"
                defaultValue={module?.credits?.toString() || ''}
                onChange={(e) => { setCredits(Number(e.target.value)); setIsDirty(true); }}
              >
                <option value="">Select credits</option>
                {config.credits.data.map((credit) => (
                  <option key={credit} value={credit}>
                    {credit} credits
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Elective</label>
              <select
                className="form-select"
                defaultValue={module?.elective ? 'true' : 'false'}
                onChange={(e) => { setIsElective(Boolean(e.target.value)); setIsDirty(true); 
                  console.log((Boolean(e.target.value)))
                }}
              >
                <option value="">Select elective status</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>


            <RelatedListSection
              title="Prerequisite Modules"
              items={prereqItems}
              openSearch={showModuleSearch}
              onOpenSearch={() => setShowModuleSearch(true)}
              onCloseSearch={() => setShowModuleSearch(false)}
              searchType="module"
              onAddFromSearch={(code, name) => addPreq({ code, moduleName: name })}
              onRemove={removePrereq}
            />

            <RelatedListSection
              title="Associated Courses"
              items={courseItems}
              openSearch={showCourseSearch}
              onOpenSearch={() => setShowCourseSearch(true)}
              onCloseSearch={() => setShowCourseSearch(false)}
              searchType="course"
              onAddFromSearch={(code, name) => addCourse({ code, courseName: name })}
              onRemove={removeCourse}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-secondary" onClick={onHide} disabled={isLoading}>
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleOnclickSave}
            disabled={!isDirty || isLoading}
            title={!isDirty && !isLoading ? 'No changes to save' : undefined}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-2"></i>
                Save Changes
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal >

    </>
  );
}