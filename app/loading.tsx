export default function Loading() {
  return (
    <div className="container">
      <div className="pageTitle">H O M E</div>
      <div className="flex flex-col gap-3">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 animate-pulse p-3 w-full rounded-lg h-36 bg-neutral-400"
          >
            <div className="w-full h-7 bg-neutral-300 rounded-lg" />
            <div className="w-full h-24 bg-neutral-300 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
