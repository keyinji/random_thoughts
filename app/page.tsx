import { revalidateTag } from "next/cache";

export interface Text {
  id?: number;
  title: string;
  description: string;
}

export default async function Home() {
  const res = await fetch(
    "https://64c13e78fa35860baea048d7.mockapi.io/thoughts",
    {
      cache: "no-cache",
      next: {
        tags: ["text"]
      }
    }
  );

  const text: Text[] = await res.json();

  const add = async (e: FormData) => {
    'use server'
    const title = e.get("title")?.toString();
    const description = e.get("description")?.toString();

    if (!title || !description) return null;

    const newText: Text = {
      title,
      description,
    }

    await fetch("https://64c13e78fa35860baea048d7.mockapi.io/thoughts", {
      method: 'POST',
      body: JSON.stringify(newText),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    revalidateTag("text")
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl text-green-600">Create Post!</h1>
        <form action={add} className="flex flex-col w-full md:w-3/5 p-4">
          <input
            className="border border-gray-300 p-2 rounded-md"
            name="title"
            placeholder="Title"
            required
          />
          <textarea
            className="border border-gray-300 p-2 rounded-md h-24 my-2"
            name="description"
            placeholder="Description"
            required
          />
          <button
            className="text-white bg-green-600 border rounded-md mt-4 h-8 hover:bg-green-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="md:columns-3 gap-3 m-2">
        {text.map((text) => (
          <div className="p-2 border mb-4 border-green-500 rounded-md break-inside-avoid-column" key={text.id}>
            <h1 className="text-2xl font-bold">{text.title}</h1>
            <p>{text.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
