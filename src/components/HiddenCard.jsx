import { useData } from "./DataContext";

const HiddenCard = ({ workid, hidden }) => {
  const { toggleHidden } = useData();

  return (
    <div className="flex flex-col items-center justify-center max-h-[485px] min-h-[395px] rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto">
      <h1 className="text-black text-center">This work is hidden</h1>
      <button
        className="inline-flex w-[50%] text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-black hover:bg-white/90 hover:text-black h-10 px-4 py-2"
        onClick={() => toggleHidden(workid, hidden)}
      >
        Unhide
      </button>
    </div>
  );
};

export default HiddenCard;
