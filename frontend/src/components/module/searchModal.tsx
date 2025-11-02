
import { useEffect, useRef, useState } from "react";
import "./searchModal.css";
import type { CourseProp, ModuleProp, ModuleSearchRequest } from "@/types";
import { usePostData } from "@/hooks";

type SearchModalProps = {
  add: (code: string, name: string) => void;
  onClose?: () => void;
  type: "module" | "course";
};

function SearchModal({
  add,
  onClose,
  type
}: SearchModalProps) {

  const [query, setQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState<(ModuleProp | CourseProp)[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Configure request/response types for search
  const { mutateData: search } = usePostData<ModuleSearchRequest, { results: ModuleProp[] | CourseProp[] }>({
    apiEndpoint: "http://10.2.40.218:8081/api/search",
    onSuccess: (data) => {
      // Backend returns { results: [...] }
      const items = data?.results || [];
      setSearchedItems(Array.isArray(items) ? items : []);
    },
    onError: (error) => {
      console.error('Search failed:', error);
      setSearchedItems([]);
    }
  });

  useEffect(() => {
    input.current?.focus();
  }, []);
  
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSearchedItems([]);
      return; 
    }
    const controller = setTimeout(() => {
      search({ query: q, type });
    }, 250); // debounce
    return () => clearTimeout(controller);
  }, [query, type]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Close when clicking outside the modal container
  useEffect(() => {
    if (!onClose) return;
    const onDocMouse = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      // If the click target is outside the root element, close
      if (e.target instanceof Node && !root.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onDocMouse);
    return () => document.removeEventListener('mousedown', onDocMouse);
  }, [onClose]);


  return (
    <div ref={rootRef} className="search d-flex justify-content-center align-items-center flex-column gap-4 p-4">
      <div className="search-input d-flex justify-content-center align-items-center">
        <input
          className="p-1"
          name="search"
          type="text"
          required={true}
          placeholder={`enter ${type}....`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={input}
        />
      </div>

      <div className="search-results">
        {query.trim().length < 2 ? (
          <div className="text-center py-3 text-muted">Type at least 2 characters to search</div>
        ) : !Array.isArray(searchedItems) || searchedItems.length === 0 ? (
          <div className="text-center py-3 text-muted">No results found</div>
        ) : (
          searchedItems.map((item) => {
            const name = type === "module"
              ? (item as ModuleProp).moduleName
              : (item as CourseProp).courseName;

            return (
              <span
                key={item.code}
                className="search-item"
                style={{
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <span className="me-2">{item.code} - {name}</span>
                <button
                  type="button"
                  className="btn p-1 d-inline-flex align-items-center justify-content-center ms-1"
                  aria-label={`Add ${item.code}`}
                  onClick={() => { add(item.code, name); input.current?.focus() }}
                >
                  <i className="bi bi-plus icon-small" />
                </button>
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}

export { SearchModal };
export default SearchModal;