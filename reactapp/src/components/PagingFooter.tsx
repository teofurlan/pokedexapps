import PagingButton from "./PagingButton";

export default function PagingFooter({children, leftAction, rightAction}) {
  return (
    <div className="flex gap-3 items-center justify-center mt-3 text-yellow-400">
      <PagingButton
        direction={"left"}
        action={leftAction}
        // action={() => dispatch("getPreviousPage")}
      />
      <div className="flex items-center justify-center text-bold bg-violet-800 w-20 h-10 font-bold text-xl rounded-md">
        {children}
      </div>
      <PagingButton
        direction={"right"}
        action={rightAction}
      />
    </div>
  );
}
