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
  const [credits, setCredits] = useState(module?.credits || 0);
  const [preReqs, setPreReqs] = useState(module?.prerequisiteCodes || []);
  const [courses, setCourses] = useState(module?.courses || []);
  const [isDirty, setIsDirty] = useState(false); 

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
      setPreReqs(module.prerequisiteCodes || []);
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
      prerequisiteCodes: preReqs.map(pr => pr.code),
      courseCodes: courses.map(c => c.code)
    });
  };


  const removeCourse = (code: string) =>{
    setCourses(courses.filter(c => c.code !== code));
    setIsDirty(true);
  }

  return (
    <Modal
      className="modal"
      show={show}
      onHide={onHide}
      centered
      size="xl"
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
          <div className="col-12">
            <div className="d-flex align-items-center gap-2 mb-2">
              <label className="form-label m-0">Associated Courses</label>

              <button
                type="button"
                className="btn btn-link p-0 d-inline-flex align-items-center justify-content-center"
                aria-label="Add course"
                onClick={() => {/* open add-course UI */}}
              >
                <i className="bi bi-plus icon-small" />
              </button>
            </div>

            <div className="border rounded p-3" style={{ backgroundColor: 'var(--card-bg)' }}>
              {courses && courses.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {courses.map((course) => (
                    <span
                      key={course.code}
                      className="badge text-bg-secondary d-inline-flex align-items-center"
                      style={{
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <span className="me-2">{course.code} - {course.courseName}</span>
                      <button
                        type="button"
                        className="btn p-0 d-inline-flex align-items-center justify-content-center ms-1"
                        aria-label={`Remove ${course.code}`}
                        onClick={() => { removeCourse(course.code) }}
                      >
                        <i className="bi bi-dash icon-small" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No associated courses</p>
              )}
            </div>
          </div>
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
    </Modal>
  );
}