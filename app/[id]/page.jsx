import { BackIcon } from "@/icons";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic"; // WHY?

const supabase = createClient(
  "https://mrdrnmtpstkeoyaeavsa.supabase.co",
  process.env.SUPABASE_KEY,
  {
    auth: { persistSession: false },
  }
);

export default async function Question({ params: { id } }) {
  const { data: question } = await supabase
    .from("questions")
    .select()
    .eq("id", id)
    .single();

  console.log(question);

  return (
    <article className="flex flex-col gap-2 max-w-[750px] mx-auto">
      <Link href="/" className="inline-flex items-center gap-1">
        <BackIcon />
        <span>Back</span>
      </Link>
      <section className=" p-5 bg-neutral-800 rounded-lg">
        <p className="mb-5 text-green-400">QuestionsApp</p>
        <p>{question.text}</p>
      </section>
    </article>
  );
}
