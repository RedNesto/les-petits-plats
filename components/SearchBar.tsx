import styles from "./SearchBar.module.css";

export default function SearchBar({ searchValue, setSearchValue }: {
  searchValue: string,
  setSearchValue: (value: string) => void
}) {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Rechercher une recette, un ingrédient, ..." value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)}></input>

      <div className={styles.searchIcon}>
        <svg aria-label="Icône de recherche" width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="51" height="52" rx="10" fill="#1B1B1B"/>
          <path
            d="M31.5 22C31.5 27.2467 27.2467 31.5 22 31.5C16.7533 31.5 12.5 27.2467 12.5 22C12.5 16.7533 16.7533 12.5 22 12.5C27.2467 12.5 31.5 16.7533 31.5 22Z"
            stroke="white"/>
          <path d="M30.3536 30.6464L39.3536 39.6464" stroke="white"/>
        </svg>
      </div>
    </div>
  );
};
