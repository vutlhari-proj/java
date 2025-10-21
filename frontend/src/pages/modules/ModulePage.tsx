import { useSessionData } from "@/hooks";
import type { ModuleExtendedProp } from "@/types/module";
import { useSearchParams } from "react-router-dom";
import { courseModuleConfigs } from "@/config";
import { Navbar } from "@/components";
import './modulePage.css';
import { ModuleCard, Loading } from "@/components";
import { ModuleModal } from "@/components/module/ModuleModal";
import { useState } from "react";

export function ModulePage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [showModal, setShowModal] = useState(false);

  const {
    data: moduleData,
    isLoading,
    error,
    hasData,
    refetch
  } = useSessionData<ModuleExtendedProp>({
    cacheKey: code ? courseModuleConfigs(code).module.cacheKey : "module-fallback",
    apiEndpoint: code ? courseModuleConfigs(code).module.apiEndpoint : "",
    isArray: false, // Single module object, not array
    defaultValue: undefined
  });

  // Validation for required code parameter after hooks
  if (!code) {
    return (
      <>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-warning">Module code is required</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-danger d-flex flex-column align-items-center">
            <p>Error loading module: {error}</p>
            <button
              className="btn btn-outline-danger btn-sm mt-2"
              onClick={() => refetch()}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  const module = moduleData as ModuleExtendedProp | null;

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <title>{module?.code || 'Module'}</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="container d-flex flex-column justify-content-center align-items-center gap-2 w-100 p-0 rounded-4">
        <div className="d-flex align-items-center gap-3">
          <h1>Module Information</h1>
          <div className="img-container pointer d-flex align-items-center" onClick={handleEditClick}>
            <img src="/images/icons/pencil.svg" alt="Edit Module Info" className="img" />
            <span className="tooltip">Edit Module</span>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : hasData && module ? (
          <ModuleCard module={module} />
        ) : (
          <div className="alert alert-warning">
            No module data available for code: {code}
          </div>
        )}
      </div>

      {/* Modal positioned in the center of the page */}
      <ModuleModal 
        module={module} 
        show={showModal} 
        onHide={handleModalClose} 
      />
    </>
  );
}