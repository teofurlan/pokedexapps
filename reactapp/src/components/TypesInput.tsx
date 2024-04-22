import { TypeTag } from "./TypeTag";

export const TypesInput = ({
  holder = "",
  error = "",
  addTag,
  deleteTag,
  clearError,
  typesTags = [],
}) => {

  return (
    // Render de error only if the errorText has some value
    <>
      {error && (
        <div
          className="flex items-center bg-red-300 bg-opacity-80 rounded-sm p-1.5 gap-2"
          id="name-error"
        >
          <svg
            className="text-red-600 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768a384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0a48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32"
            />
          </svg>
          <span className="block text-red-500 text-base">{error}</span>
        </div>
      )}
      <div id="tagContainer" className="flex gap-2 w-full relative">
        <input
          type="text"
          min="1"
          name='types'
          placeholder={holder}
          className="my-1 w-full p-2 border border-gray-300 rounded-lg"
          onFocus={() => {
            clearError("types");
          }}
          onKeyDown={addTag}
        />
        {typesTags.map((type) => (
          <TypeTag key={type} deleteTag={deleteTag}>
            {type}
          </TypeTag>
        ))}
      </div>
    </>
  );
};
