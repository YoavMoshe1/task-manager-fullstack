type Props = {
    onAddClick: () => void;           // open Add modal
    search: string;                  // current search value
    setSearch: (value: string) => void; // update search
  };
  
  import SearchBar from "./SearchBar";
  
  export default function TopBar({ onAddClick, search, setSearch }: Props) {
    return (
      <div className="top-bar">
        {/* Add button */}
        <button onClick={onAddClick} className="button">
          Add
        </button>
  
        {/* Search input */}
        <SearchBar value={search} onChange={setSearch} />
      </div>
    );
  }