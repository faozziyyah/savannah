import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

export type user = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const UserPosts = () => {

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<user | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // user
        //const userRes = await fetch(`http://localhost:3001/users/${id}`);
        //const userData = await userRes.json();
        //setUser(userData);
        //console.log(userData)

        // posts
        const postsRes = await fetch(`http://localhost:3001/posts?userId=${id}`);
        const postsData = await postsRes.json();
        setPosts(postsData);
        console.log(postsData)

      } catch (error) {
        console.error("Error fetching user or posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();

  }, [id]);

  return (
    <div className='flex w-full flex-col gap-12'>

        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[80%] m-auto">

            {/* ➕ Add Post Card */}
            <div className="flex items-center justify-center border-2 border-dashed rounded-2xl h-40 cursor-pointer hover:bg-gray-50 transition">
              <button className="flex flex-col items-center text-gray-500 hover:text-green-600">
                <span className="text-4xl font-bold">+</span>
                <span className="mt-1 text-sm">Add Post</span>
              </button>
            </div>

            {posts.length ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-2xl shadow-sm bg-white hover:shadow-md transition h-[300px]"
            >
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500">No posts yet.</p>
        )}
      </div>

    </div>
  )
}

export default UserPosts