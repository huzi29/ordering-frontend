export default function SearchBar({ setSearch }) {
    return (
      <input 
        type="text" 
        placeholder="Search by SKU or Title..." 
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
    );
  }
  