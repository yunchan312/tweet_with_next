export default function Loading() {
  return (
    <div className="container">
      <div className="flex flex-col gap-2 animate-pulse p-3 w-full rounded-lg h-36 bg-neutral-400">
        <div className="w-full h-7 bg-neutral-300 rounded-lg" />
        <div className="w-full h-24 bg-neutral-300 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-44 grid grid-cols-[1fr_5fr]">
            <div className="h-full w-20 border-r-4" />
            <div className="pl-5 py-3">
              <div className="flex flex-col gap-2 animate-pulse p-3 rounded-lg h-36 bg-neutral-400">
                <div className="w-full h-7 bg-neutral-300 rounded-lg" />
                <div className="w-full h-24 bg-neutral-300 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
