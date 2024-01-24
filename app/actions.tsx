"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import {Feature, Poll} from "./types";
import {redirect} from "next/navigation";

export async function saveFeature(feature: Feature, formData: FormData) {
  let newFeature = {
    ...feature,
    title: formData.get("feature") as string,
  };
  await kv.hset(`item:${newFeature.id}`, newFeature);
  await kv.zadd("items_by_score", {
    score: Number(newFeature.score),
    member: newFeature.id,
  });

  revalidatePath("/");
}

export async function savePoll(poll: Poll, formData: FormData) {
  let newPoll = {
    ...poll,
    created_at: Date.now(),
    title: formData.get("title") as string,
    option1: formData.get("option1") as string,
    option2: formData.get("option2") as string,
    option3: formData.get("option3") as string,
    option4: formData.get("option4") as string,
  }
  await kv.hset(`poll:${poll.id}`, poll);
  await kv.zadd("polls_by_date", {
    score: Number(poll.created_at),
    member: newPoll.id,
  });

  revalidatePath("/polls");
  redirect(`/polls/${poll.id}`);
}

export async function votePoll(poll: Poll, optionIndex: number) {
  await kv.hincrby(`poll:${poll.id}`, `votes${optionIndex}`, 1);

  revalidatePath(`/polls/${poll.id}`);
  redirect(`/polls/${poll.id}?results=true`);
}

export async function upvote(feature: Feature) {
  const newScore = Number(feature.score) + 1;
  await kv.hset(`item:${feature.id}`, {
    ...feature,
    score: newScore,
  });

  await kv.zadd("items_by_score", { score: newScore, member: feature.id });

  revalidatePath("/");
}
