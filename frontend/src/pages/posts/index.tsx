import { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";
import Loader from '../../components/Loaders/loader';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { addPost } from '../../utils/posts';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const location = useLocation();
  const { name, email } = (location.state as { name?: string; email?: string }) || {};

  //console.log("User info from Link:", { name, email });

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
        //console.log(postsData)

      } catch (error) {
        console.error("Error fetching user or posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();

  }, [id]);

  const handleAddPost = async () => {
    try {

      setPosting(true);

      if (!id) {
        toast.error("User ID is missing, cannot create post!");
        return;
      }

      const payload = { ...newPost, userId: id! }; 
      const createdPost = await addPost(payload);
      
      /*const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });*/

      //if (!response.ok) throw new Error("Failed to create post");

      //let createdPost;
//
      //try {
      //  createdPost = await response.json();
      //  console.log("Raw response text:", await response.text());
      //} catch {
      //  createdPost = { ...payload, id: Date.now().toString() }; 
      //}

      setPosts((prev) => [...prev, createdPost]);
      toast.success("Post created successfully!");
      setNewPost({ title: "", body: "" });
      //window.location.reload();
      setIsModalOpen(false);

    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error instanceof Error ? error.message : "Error creating post!");
    } finally {
      setPosting(false);
    }
  };

  const handleDeletePost = async (postId: string | number) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // remove from state immediately
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");

    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10"><Loader /></p>;
  //if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className='flex w-[80%] m-auto flex-col gap-12'>

      <section className='flex flex-col'>

        <Link to="/" className="flex items-center text-black-500 mt-8 text-lg">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-[#535862]">Back to Users</h2>
        </Link>

        <p className='font-[500] text-[#181D27] text-xl lg:text-[36px] mt-4'>{name}</p>
        <p className='font-[500] text-[#535862] text-sm lg:text-[14px] mt-4'>{email} . {posts.length} posts</p>
      
      </section>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center border-2 border-gray-300 border-dashed h-[300px] rounded-2xl cursor-pointer hover:bg-gray-50 transition"
            >
              <button className="flex flex-col items-center text-gray-500 hover:text-gray-700">
                <span className="text-4xl font-bold">+</span>
                <span className="mt-1 text-sm">Add Post</span>
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] lg:w-6/12">

                  <h2 className="text-3xl font-[500] mb-4 text-[#181D27]">New Post</h2>

                  <section className=''>

                    <label className='text-[#535862] text-lg font-[500]'>Post title</label>

                    <input type="text" placeholder="Give your post a title" value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full border p-2 rounded mb-3 mt-2 border-gray-200 px-[16px] py-[10px] placeholder:text-gray-400"
                    />

                  </section>

                  <section className=''>

                    <label className='text-[#535862] text-lg font-[500]'>Post content</label>

                    <textarea placeholder="Write something mind-blowing" value={newPost.body}
                      onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} rows={5}
                      className="w-full border p-2 rounded mb-3 mt-2 border-gray-200 px-[16px] py-[10px] placeholder:text-gray-400"
                    />

                  </section>

                  <section className="flex justify-end gap-2">
                    
                    <button className="px-4 py-2 rounded text-gray-700 font-[400] text-[18px] border-2 border-gray-200 cursor-pointer" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>

                    <button onClick={handleAddPost} disabled={posting}
                      className="px-4 py-2 rounded bg-gray-700 text-white font-[400] text-[18px] cursor-pointer"
                    >
                      {posting ? (
                        <div className='flex items-center'>

                          <span className="mr-2">Publish</span>

                            <ThreeDots height="20" width="30" radius="9" color="#ffffff"
                              ariaLabel="three-dots-loading" visible={true}
                            /> 

                        </div>
                      ) : (
                        "Publish"
                      )}
                    </button>

                  </section>

                </div>

              </div>
            )}

            {posts.length ? (
              posts.map((post) => (
                <div key={post.id}
                  className="p-4 border rounded-2xl border-gray-300 shadow-sm bg-white hover:shadow-md transition h-[300px] flex flex-col"
                >

                  <button onClick={() => handleDeletePost(post.id)}
                    className="text-red-400 hover:text-gray-400 self-end cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>

                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>

                  <p className="text-gray-600 text-sm">{post.body}</p>

                </div>
              ))
            ) : (
              <p className="col-span-full text-gray-500">No posts yet.</p>
            )}

      </main>

    </div>
  )
}

export default UserPosts