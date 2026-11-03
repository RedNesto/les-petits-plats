'use client';

import styles from "./SearchFilter.module.css";
import { useMemo, useState } from "react";
import { normalizeForSearch } from "@/app/utils";

type SearchFilterProps = {
  label: string;
  items: string[];
  selectedTags: string[];
  setSelectionAction: (tag: string, selected: boolean) => void;
};

export default function SearchFilterList({ label, items, selectedTags, setSelectionAction }: SearchFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const normalizedSearchValue = useMemo(() => normalizeForSearch(searchValue), [searchValue]);
  const searchResults = useMemo(() => {
    return items
      .filter(candidate => !selectedTags.includes(candidate) && normalizeForSearch(candidate).includes(normalizedSearchValue))
      .map((item, index) =>
        (<li key={index} onClick={() => setSelectionAction(item, true)}><p>{item}</p></li>)
      );
  }, [items, selectedTags, normalizedSearchValue, setSelectionAction]);


  const onHeaderClick = () => setExpanded(!expanded);

  const dropdownClasses = [styles.filterDropdown];
  if (expanded) {
    dropdownClasses.push(styles.expanded);
  }

  return (
    <div className={styles.container}>
      <div className={dropdownClasses.join(" ")}>
        <button className={styles.filterDropdownHeader} onClick={onHeaderClick}>
          {label}
          <svg className={styles.filterDropdownArrow} aria-label="Indicateur d'ouverture" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 0.5L7 6.5L13.5 0.5" strokeLinecap="round" stroke="#1B1B1B"/>
          </svg>
        </button>
        <div className={styles.expandable}>
          <div className={styles.searchBar}>
            <input value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <svg style={{opacity: searchValue.length !== 0 ? 1 : 0}} onClick={() => setSearchValue("")} width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 6.5L3.5 3.5M3.5 3.5L0.5 0.5M3.5 3.5L6.5 0.5M3.5 3.5L0.5 6.5" strokeLinecap="round" strokeLinejoin="round" stroke="#7A7A7A"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.75 5C9.75 7.62335 7.62335 9.75 5 9.75C2.37665 9.75 0.25 7.62335 0.25 5C0.25 2.37665 2.37665 0.25 5 0.25C7.62335 0.25 9.75 2.37665 9.75 5Z" strokeWidth="0.5" stroke="#7A7A7A"/>
              <path d="M9.17678 9.32322L13.6768 13.8232" strokeWidth="0.5" stroke="#7A7A7A"/>
            </svg>
          </div>
          <ul className={styles.searchResultsContainer}>
            {selectedTags.length > 0 && (
              <>
                {selectedTags.map((selectedTag, index) =>
                  <li key={-index} className={styles.selected} onClick={() => setSelectionAction(selectedTag, false)}>
                    <p>{selectedTag}</p>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
                      <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" strokeLinecap="round" strokeLinejoin="round" stroke="#FFD15B"/>
                    </svg>
                  </li>
                )}
                {searchResults.length > 0 && <div className={styles.separator}></div>}
              </>
            )}
            {searchResults}
          </ul>
        </div>
      </div>
    </div>
  );
}
