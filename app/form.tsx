"use client";

import clsx from "clsx";
import {startTransition, useOptimistic, useRef, useState, useTransition} from "react";
import {redirectToPolls, saveFeature, savePoll, upvote, votePoll} from "./actions";
import { v4 as uuidv4 } from "uuid";
import {Feature, Poll} from "./types";
import {useRouter, useSearchParams} from "next/navigation";

function Item({
  isFirst,
  isLast,
  isReleased,
  hasVoted,
  feature,
  pending,
  mutate,
}: {
  isFirst: boolean;
  isLast: boolean;
  isReleased: boolean;
  hasVoted: boolean;
  feature: Feature;
  pending: boolean;
  mutate: any;
}) {
  let upvoteWithId = upvote.bind(null, feature);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [isPending, startTransition] = useTransition();

  return (
    <form
      action={upvoteWithId}
      onSubmit={(event) => {
        event.preventDefault();

        startTransition(async () => {
          mutate({
            updatedFeature: {
              ...feature,
              score: Number(feature.score) + 1,
            },
            pending: true,
          });
          await upvote(feature);
        });
      }}
      className={clsx(
        "p-6 mx-8 flex items-center border-t border-l border-r",
        isFirst && "rounded-t-md",
        isLast && "border-b rounded-b-md",
      )}
    >
      <button
        className={clsx(
          "ring-1 ring-gray-200 rounded-full w-8 min-w-[2rem] h-8 mr-4 focus:outline-none focus:ring focus:ring-blue-300",
          (isReleased || hasVoted) &&
            "bg-green-100 cursor-not-allowed ring-green-300",
          pending && "bg-gray-100 cursor-not-allowed",
        )}
        disabled={isReleased || hasVoted || pending}
        type="submit"
      >
        {isReleased ? "✅" : "👍"}
      </button>
      <h3 className="text font-semibold w-full text-left">{feature.title}</h3>
      <div className="bg-gray-200 text-gray-700 text-sm rounded-xl px-2 ml-2">
        {feature.score}
      </div>
    </form>
  );
}

type FeatureState = {
  newFeature: Feature;
  updatedFeature?: Feature;
  pending: boolean;
};

type PollState = {
  newPoll: Poll;
  updatedPoll?: Poll;
  pending: boolean;
  voted?: boolean;
};

export default function FeatureForm({ features }: { features: Feature[] }) {
  let formRef = useRef<HTMLFormElement>(null);
  let [state, mutate] = useOptimistic(
    { features, pending: false },
    function createReducer(state, newState: FeatureState) {
      if (newState.newFeature) {
        return {
          features: [...state.features, newState.newFeature],
          pending: newState.pending,
        };
      } else {
        return {
          features: [
            ...state.features.filter(
              (f) => f.id !== newState.updatedFeature!.id,
            ),
            newState.updatedFeature,
          ] as Feature[],
          pending: newState.pending,
        };
      }
    },
  );

  let sortedFeatures = state.features.sort((a, b) => {
    // First, compare by score in descending order
    if (Number(a.score) > Number(b.score)) return -1;
    if (Number(a.score) < Number(b.score)) return 1;

    // If scores are equal, then sort by created_at in ascending order
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  let featureStub = {
    id: uuidv4(),
    title: "", // will used value from form
    created_at: new Date().toISOString(),
    score: "1",
  };
  let saveWithNewFeature = saveFeature.bind(null, featureStub);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="mx-8 w-full">
        <form
          className="relative my-8"
          ref={formRef}
          action={saveWithNewFeature}
          onSubmit={(event) => {
            event.preventDefault();
            let formData = new FormData(event.currentTarget);
            let newFeature = {
              ...featureStub,
              title: formData.get("feature") as string,
            };

            formRef.current?.reset();
            startTransition(async () => {
              mutate({
                newFeature,
                pending: true,
              });

              await saveFeature(newFeature, formData);
            });
          }}
        >
          <input
            aria-label="Suggest a feature for our roadmap"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="I want..."
            required
            type="text"
            name="feature"
            disabled={state.pending}
          />
          <button
            className={clsx(
              "flex items-center justify-center absolute right-2 top-2 px-4 h-10 text-lg border bg-black text-white rounded-md w-24 focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-800",
              state.pending && "bg-gray-700 cursor-not-allowed",
            )}
            type="submit"
            disabled={state.pending}
          >
            Request
          </button>
        </form>
      </div>
      <div className="w-full">
        {sortedFeatures.map((feature: any, index: number) => (
          <Item
            key={feature.id}
            isFirst={index === 0}
            isLast={index === sortedFeatures.length - 1}
            isReleased={false}
            hasVoted={false}
            feature={feature}
            pending={state.pending}
            mutate={mutate}
          />
        ))}
      </div>
    </>
  );
}

export function PollCreateForm() {
  let formRef = useRef<HTMLFormElement>(null);
  let [state, mutate] = useOptimistic(
      { pending: false },
      function createReducer(state, newPoll: PollState) {
        if (newPoll.newPoll) {
          return {
            pending: newPoll.pending,
          };
        } else {
          return {
            pending: newPoll.pending,
          };
        }
      },
  );

  let pollStub = {
    id: uuidv4(),
    created_at: new Date().getTime(),
    title: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,
  };
  let saveWithNewPoll = savePoll.bind(null, pollStub);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [isPending, startTransition] = useTransition();

  return (
      <>
        <div className="mx-8 w-full">
          <form
              className="relative my-8"
              ref={formRef}
              action={saveWithNewPoll}
              onSubmit={(event) => {
                event.preventDefault();
                let formData = new FormData(event.currentTarget);
                let newPoll = {
                  ...pollStub,
                  title: formData.get("title") as string,
                  option1: formData.get("option1") as string,
                  option2: formData.get("option2") as string,
                  option3: formData.get("option3") as string,
                  option4: formData.get("option4") as string,
                  votes1: 0,
                  votes2: 0,
                  votes3: 0,
                  votes4: 0,
                };

                formRef.current?.reset();
                startTransition(async () => {
                  mutate({
                    newPoll,
                    pending: true,
                  });

                  await savePoll(newPoll, formData);
                });
              }}
          >
            <input
                aria-label="Poll Title"
                className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                maxLength={150}
                placeholder="Title..."
                required
                type="text"
                name="title"
            />
            <input
                aria-label="Option 1"
                className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                maxLength={150}
                placeholder="Option 1"
                required
                type="text"
                name="option1"
            />
            <input
                aria-label="Option 2"
                className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                maxLength={150}
                placeholder="Option 2"
                required
                type="text"
                name="option2"
            />
            <input
                aria-label="Option 3"
                className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                maxLength={150}
                placeholder="Option 3 (optional)"
                type="text"
                name="option3"
            />
            <input
                aria-label="Option 4"
                className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                maxLength={150}
                placeholder="Option 4 (optional)"
                type="text"
                name="option4"
            />
              <div className={"pt-2 flex justify-end"}>
                  <button
                      className={clsx(
                          "flex items-center p-1 justify-center px-4 h-10 text-lg border bg-blue-500 text-white rounded-md w-24 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-700 focus:bg-blue-700",
                          state.pending && "bg-gray-700 cursor-not-allowed",
                      )}
                      type="submit"
                      disabled={state.pending}
                  >
                      Create
                  </button>
              </div>
          </form>
        </div>
          <div className="w-full">
          </div>
      </>
  );
}

function PollOptions({poll, onChange} : {poll: Poll, onChange: (index: number) => void}) {
    return (
        <div className="mb-4 text-left">
            {[poll.option1, poll.option2, poll.option3, poll.option4].filter(e => e !== "").map((option, index) => (
                <label key={index} className="block">
                    <input
                        type="radio"
                        name="poll"
                        value={option}
                        onChange={() => onChange(index + 1)}
                        className="mr-2"
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}

function PollResults({poll} : {poll: Poll}) {
    return (
        <div className="mb-4">
            <img src={`/api/image?id=${poll.id}&results=true&date=${Date.now()}`} alt='poll results'/>
            {/*<div className="mb-4 text-left">*/}
            {/*    {[poll.option1, poll.option2, poll.option3, poll.option4].filter(e => e !== "").map((option, index) => (*/}
            {/*        <label key={index} className="block">*/}
            {/*            {option} - {*/}
            {/*            // @ts-ignore*/}
            {/*            poll[`votes${index + 1}`]*/}
            {/*        }*/}
            {/*        </label>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
}

export function PollVoteForm({poll, viewResults}: { poll: Poll, viewResults?: boolean }) {
    const [selectedOption, setSelectedOption] = useState(-1);
    const router = useRouter();
    const searchParams = useSearchParams();
    viewResults = true;     // Only allow voting via the api
    let formRef = useRef<HTMLFormElement>(null);
    let voteOnPoll = votePoll.bind(null, poll);
    let [isPending, startTransition] = useTransition();
    let [state, mutate] = useOptimistic(
        { showResults: viewResults },
        function createReducer({showResults}, state: PollState) {
            if (state.voted || viewResults) {
                return {
                    showResults: true,
                };
            } else {
                return {
                    showResults: false,
                };
            }
        },
    );

    const handleVote = (index: number) => {
        setSelectedOption(index)
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4">
            <div className="font-bold text-xl mb-2">{poll.title}</div>
            <form
                className="relative my-8"
                ref={formRef}
                action={ () => voteOnPoll(selectedOption)}
                onSubmit={(event) => {
                    event.preventDefault();
                    let formData = new FormData(event.currentTarget);
                    let newPoll = {
                        ...poll,
                    };

                    // @ts-ignore
                    newPoll[`votes${selectedOption}`] += 1;


                    formRef.current?.reset();
                    startTransition(async () => {
                        mutate({
                            newPoll,
                            pending: false,
                            voted: true,
                        });

                        await redirectToPolls();
                        // await votePoll(newPoll, selectedOption);
                    });
                }}
            >
                {state.showResults ? <PollResults poll={poll}/> : <PollOptions poll={poll} onChange={handleVote}/>}
                {state.showResults ? <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >Back</button> :
                    <button
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" + (selectedOption < 1 ? " cursor-not-allowed" : "")}
                        type="submit"
                        disabled={selectedOption < 1}
                    >
                        Vote
                    </button>
                }
            </form>
        </div>
);
}