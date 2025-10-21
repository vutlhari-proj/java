import type { ModuleExtendedProp } from "@/types";
import { Modal } from "react-bootstrap";

interface ModuleModalProps {
  module: ModuleExtendedProp | null;
  show: boolean;
  onHide: () => void;
}

export function ModuleModal({ module, show, onHide }: ModuleModalProps) {
  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered // This centers the modal vertically and horizontally
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Module: {module?.code}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Module Name: {module?.moduleName}</p>
        <p>Code: {module?.code}</p>
        {/* Add your form content here */}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
        <button className="btn btn-primary">
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}