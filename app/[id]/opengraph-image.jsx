import { ImageResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Route segment config
export const runtime = "edge";

// Image metadata
// export const alt = "About Acme";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({params: {id}}) {
  const supabase = createClient(
    "https://mrdrnmtpstkeoyaeavsa.supabase.co",
    process.env.SUPABASE_KEY,
    {
      auth: { persistSession: false },
    }
  );

  const { data: question } = await supabase
    .from("questions")
    .select()
    .eq("id", id)
    .single();
  // // Font
  // const interSemiBold = fetch(
  //   new URL('./Inter-SemiBold.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <div>QuestionsX</div>
        <div>{question.text}</div>
      </div>
      // ImageResponse options
      // {
      //   // For convenience, we can re-use the exported opengraph-image
      //   // size config to also set the ImageResponse's width and height.
      //   ...size,
      //   fonts: [
      //     {
      //       name: 'Inter',
      //       data: await interSemiBold,
      //       style: 'normal',
      //       weight: 400,
      //     },
      //   ],
      // }
    )
  );
}
