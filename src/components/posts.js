import PostCard from "./posts/card";

const Posts = ({data}) => {
  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-3xl px-4 md:px-0">
      {data && data.map((data) => <PostCard key={data.id} data={data}/>)}
    </main>
  );
};

export default Posts;