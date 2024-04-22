export default function PagingButton({ direction, action }) {
  return (
    <button
      className="flex items-center justify-center text-bold bg-violet-800 w-14 h-10 font-bold text-2xl rounded-md hover:scale-105 hover:drop-shadow-2xl"
      onClick={action}
    >
      {direction === "left" ? (
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.828 11H20v2H7.828l5.364 5.364l-1.414 1.414L4 12l7.778-7.778l1.414 1.414z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m16.172 11l-5.364-5.364l1.414-1.414L20 12l-7.778 7.778l-1.414-1.414L16.172 13H4v-2z"
          />
        </svg>
      )}
    </button>
  );
}
