import React from 'react'


export interface Text {
  id?: number;
  title: string;
  body: string;
}

const getPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();

  return posts;
};

export default async function Posts() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <div className="">
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Text) => (
          <div key={post.id}>
            <li>{post.title}</li>
            <li>{post.body}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
