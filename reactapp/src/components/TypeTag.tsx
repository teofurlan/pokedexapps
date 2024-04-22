import { capitalizeFirstLetter, getTypeColor } from "../utility/types";

export const TypeTag = ({ children, deleteTag }) => {
  const handleDeletion = (event) => {
    event.preventDefault()
    deleteTag(capitalizeFirstLetter(children))
  }

  return (
    <div
      className="flex flex-row items-center justify-center rounded-lg my-1 px-2"
      style={{ backgroundColor: `${getTypeColor(children)}` }}
      data-tag=""
    >
      <span className="mr-2">{children}</span>
      <button
        className="flex items-center justify-center text-black size-[1.2rem]"
        onClick={handleDeletion}
        tabIndex={-1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
          ></path>
        </svg>
      </button>
    </div>
  );
};
