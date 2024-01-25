import { useData } from "./DataContext";
import Card from "./Card";
import HiddenCard from "./HiddenCard";
import { FaPlusCircle } from "react-icons/fa";

const Works = () => {
  const { workList, isClosed, setIsClosed } = useData();

  return (
    <div
      className={
        isClosed
          ? "flex-1 grid gap-6 px-6 pb-5 pt-5 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1"
          : "flex-1 grid gap-6 px-6 pb-5 pt-5 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 max-md:hidden"
      }
    >
      <div
        className="rounded-lg pb-4 border bg-card text-card-foreground shadow-sm w-full max-w-md min-h-[400px] mx-auto md:hidden"
        onClick={() => setIsClosed(false)}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-bold text-3xl">Submit new project</h1>
          <FaPlusCircle size={50} />
        </div>
      </div>
      {workList.map((_work) =>
        !_work.hidden ? (
          <Card key={_work._id} work={_work} />
        ) : (
          <HiddenCard
            key={_work._id}
            workid={_work._id}
            hidden={!_work.hidden}
          />
        )
      )}
    </div>
  );
};

export default Works;
