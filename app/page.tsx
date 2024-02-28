import { PollCreateForm } from "./form";

export let metadata = {
  title: "Farcaster Market Price Prediction Poll",
  description:
    "Vote to help the community be aware of market sentiment. No financial operation related.",
};

// Vercel Logo as a React Component
function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Vercel Logo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 19"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.04 2L2.082 18H22L12.04 2z"
        fill="#000"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Main Page Component
export default function Page() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex flex-col items-center justify-center text-white">
      <header className="p-5">
        <div className="flex justify-center items-center bg-opacity-20 bg-white rounded-full w-20 h-20 mb-5">
          <VercelLogo className="w-12 h-12" fill="white" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Farcaster Market Price Prediction Poll
        </h1>
        <h2 className="text-md sm:text-lg lg:text-xl">
          Create a new poll with up to 4 options
        </h2>
      </header>
      <main className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-12 text-center max-w-4xl w-full">
        <PollCreateForm />
      </main>
      <footer className="text-sm text-gray-300 mt-10">
        Remember, your vote helps the community gauge market sentiment. Let's
        predict together!
      </footer>
    </div>
  );
}
