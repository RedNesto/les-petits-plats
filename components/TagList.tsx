import styles from "./TagList.module.css";

type Tag = {
  filterIndex: number;
  label: string;
}

type TagListProps = {
  tags: Tag[];
  removeTag: (filterIndex: number, tag: string) => void;
}

export default function TagList({ tags, removeTag }: TagListProps) {
  return (
    <div className={styles.searchTagList}>
      {tags.map((tag, index) =>
        <div key={index} className={styles.searchTag}>
          {tag.label}
          <svg onClick={() => removeTag(tag.filterIndex, tag.label)} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0833 11.0833L6.08331 6.08334M6.08331 6.08334L1.08331 1.08334M6.08331 6.08334L11.0833 1.08334M6.08331 6.08334L1.08331 11.0833" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round" stroke="#1B1B1B"/>
          </svg>
        </div>
      )}
    </div>
  );
}
