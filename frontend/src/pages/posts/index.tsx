import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Loader from '../../components/Loaders/loader';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
  //const [user, setUser] = useState<user | null>(null);
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

  if (loading) return <p className="text-center mt-10"><Loader /></p>;
  //if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className='flex w-[80%] m-auto flex-col gap-12'>

        <Link to="/" className="flex items-center text-black-500 mt-8 text-lg">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-semibold">Back to Users</h2>
        </Link>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <div className="flex items-center justify-center border-2 border-gray-300 border-dashed h-[300px] rounded-2xl cursor-pointer hover:bg-gray-50 transition">
              <button className="flex flex-col items-center text-gray-500 hover:text-green-600">
                <span className="text-4xl font-bold">+</span>
                <span className="mt-1 text-sm">Add Post</span>
              </button>
            </div>

            {posts.length ? (
              posts.map((post) => (
                <div key={post.id}
                  className="p-4 border rounded-2xl border-gray-300 shadow-sm bg-white hover:shadow-md transition h-[300px]"
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