import { useEffect, useRef } from "react";
import { SearchModal } from "./searchModal";

export type SimpleItem = { code: string; name: string };

type RelatedListSectionProps = {
  title: string;
  items: SimpleItem[];
  openSearch: boolean;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  searchType: "module" | "course";
  onAddFromSearch: (code: string, name: string) => void;
  onRemove: (code: string) => void;
};

export function RelatedListSection({
  title,
  items,
  openSearch,
  onOpenSearch,
  onCloseSearch,
  searchType,
  onAddFromSearch,
  onRemove,
}: RelatedListSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleOpenSearch = () => {
    // Open first so the modal container mounts
    onOpenSearch();
    // After state update, schedule scrolls to ensure elements exist
    const rafId = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Try scrolling to the search container on next tick
      setTimeout(() => {
        searchRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 0);
    });
    return () => window.cancelAnimationFrame(rafId);
  };

  useEffect(() => {
    if (!openSearch) return;
    const attemptScroll = () => {
      searchRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    // Try immediately, then retry after layout settles
    attemptScroll();
    const t1 = setTimeout(attemptScroll, 0);
    const t2 = setTimeout(attemptScroll, 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [openSearch]);
  return (
    <div className="col-12" ref={sectionRef}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <label className="form-label m-0">{title}</label>

        <button
          type="button"
          className="btn btn-link p-0 d-inline-flex align-items-center justify-content-center"
          aria-label={`Add ${searchType}`}
          onClick={handleOpenSearch}
        >
          <i className="bi bi-plus icon-small" />
        </button>
      </div>

      {openSearch && (
        <div ref={searchRef} style={{ scrollMarginTop: '80px' }}>
          <SearchModal
            add={(code: string, name: string) => onAddFromSearch(code, name)}
            onClose={onCloseSearch}
            type={searchType}
          />
        </div>
      )}

      <div className="border rounded p-3" style={{ backgroundColor: 'var(--card-bg)' }}>
        {items && items.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {items.map((it) => (
              <span
                key={it.code}
                className="badge text-bg-secondary d-flex align-items-center"
                style={{
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <span className="me-2 text-wrap text-start" style={{ flex: '1 1 auto' }}>{it.code} - {it.name}</span>
                <button
                  type="button"
                  className="btn p-0 d-inline-flex align-items-center justify-content-center ms-1"
                  aria-label={`Remove ${it.code}`}
                  onClick={() => onRemove(it.code)}
                  style={{ flex: '0 0 auto' }}
                >
                  <i className="bi bi-dash icon-small" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted mb-0">No {title.toLowerCase()}</p>
        )}
      </div>
    </div>
  );
}
