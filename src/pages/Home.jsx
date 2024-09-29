import React, { useEffect, useState } from 'react';
import { auth, getAllData } from '../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchBlogs = async () => {
    try {
      const blogsData = await getAllData("blogs");
      setBlogs(blogsData);
      console.log(blogsData);
      
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchBlogs();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);
      } else {
        console.log("User is logged out.");
      }
    });

    return () => unsubscribe();
  }, []);


  if (loading) {
    return <span className="loading m-8 loading-spinner loading-lg text-info"></span>;
  }


  if (error) {
    return <div className="error m-8 text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <div className="">
        <h1 className="text-5xl font-bold  dark:text-white mt-7 text-center text-orange-500">
          Discover All Blogs
        </h1>
      </div>
      {blogs.length > 0 ? (
        blogs.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-16 my-12 mx-auto max-w-4xl border border-gray-300"
          >
            <h1 className="text-4xl font-bold text-orange-600 mb-6">{item.title}</h1>
            <p className="text-lg text-gray-600">{item.description}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-xl">No blogs found.</div>
      )}
      <br /><br /><br />
    </>
  );
};

export default Home;