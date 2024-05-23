import { PollCreateForm } from '@/../app/form';

export const metadata = {
    title: 'Farcaster polls',
    description: 'Poll example for farcaster',
};

function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg aria-label="Vercel Logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 19" {...props}>
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

export default async function Page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-20">
                <div className="my-8 flex h-16 w-16 items-center justify-center rounded-full bg-black sm:h-24 sm:w-24">
                    <VercelLogo className="mb-1 h-8 p-3 invert sm:h-16" />
                </div>
                <h1 className="mb-2 text-lg font-bold sm:text-2xl">Farcaster Polls</h1>
                <h2 className="text-md mx-4 sm:text-xl">Create a new poll with upto 4 options</h2>
                <div className="my-8 flex h-full max-w-4xl flex-wrap items-center justify-around rounded-md border border-gray-100 bg-white shadow-xl sm:w-full">
                    <PollCreateForm />
                </div>
            </main>
        </div>
    );
}
