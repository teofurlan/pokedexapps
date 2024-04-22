export const TypesSuggestions = ({
  suggestions,
  addTag,
  clearValue,
  clearSuggestionList,
}) => {
  const selectSuggestion = (event: React.MouseEvent) => {
    event.preventDefault();
    addTag((event.target as HTMLElement).textContent);
    clearSuggestionList()
    clearValue()
  };
  return (
    <div className="absolute w-full rounded-md top-full flex flex-col">
      {suggestions.map((type) => (
        <button
          key={type}
          className="flex items-center pl-4 h-10 bg-sky-200 w-full border-b border-slate-500 last-of-type:border-0 rounded-md drop-shadow-xl transition-all duration-150"
          onClick={selectSuggestion}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
