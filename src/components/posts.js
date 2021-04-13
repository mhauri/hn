import PostCard from "./posts/card";

const Posts = ({data}) => {
  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-3xl px-4 md:px-0 pt-10">
      <div className="border-b border-color mb-5">
        <h1 className="pb-0 mb-0">Personal Hacker News Reader</h1>
        <span className="pb-5 block text-gray-600 text-xs">By <a href="https://hauri.dev" className="text-accent hover:text-black dark:hover:text-gray-50">Marcel Hauri</a></span>
      </div>


      {data && data.map((data) => <PostCard key={data.id} data={data}/>)}
    </main>
  );
};

export default Posts;