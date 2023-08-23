import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import React from "react";

export const dynamic = "force-dynamic"; // WHY?

const supabase = createClient(
  "https://mrdrnmtpstkeoyaeavsa.supabase.co",
  process.env.SUPABASE_KEY,
  {
    auth: { persistSession: false },
  }
);


export default async function Home() {
  const { data: questions } = await supabase.from("questions").select();

  async function handleSubmit(formData) {
    "use server";
    const question = formData.get("question");

    await supabase.from("questions").insert({ text: question });
    revalidatePath("/");
  }

  console.log(questions);

  return (
    <div className="grid gap-8 max-w-[750px] mx-auto">
      <form action={handleSubmit} className="grid gap-4">
        <section className="grid p-5 bg-neutral-800 rounded-lg">
          <p className="mb-5 text-green-400">QuestionsApp</p>
          <input
            type="text"
            className="p-2 rounded-xl"
            placeholder="Me pregunto si..."
            name="question"
          ></input>
        </section>
        <input
          type="submit"
          className="p-2 rounded-xl bg-gray-400"
          placeholder="Me pregunto si..."
        ></input>
      </form>
      <hr className="opacity-50" />
      <article className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
        {questions.map((quest) => (
          <section className=" p-5 bg-neutral-800 rounded-lg" key={quest.id}>
            <p className="mb-5 text-green-400">QuestionsApp</p>
            <p>{quest.text}</p>
          </section>
        ))}
      </article>
    </div>
  );
}