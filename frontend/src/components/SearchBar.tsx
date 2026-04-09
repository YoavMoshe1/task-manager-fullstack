type Props = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export default function SearchBar({ value, onChange }: Props) {
    return (
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input search-input"
      />
    );
  }