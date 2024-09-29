import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { auth, getData, sendData } from '../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const blogsData = await getData("blogs", user.uid);
          setBlogs(blogsData || []);
        } catch (err) {
          setError("Failed to load blogs.");
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const sendDatatoFirestore = async (data) => {
    try {
      await sendData({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
      }, 'blogs');
      
      setBlogs((prevBlogs) => [
        ...prevBlogs,
        {
          title: data.title,
          description: data.description,
          uid: auth.currentUser.uid,
        },
      ]);
      reset();
    } catch (error) {
      console.error(error);
      setError("Failed to publish blog.");
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-5xl font-bold dark:text-white mt-7 text-center text-orange-500">
          Dashboard
        </h1>
      </div>
      <form onSubmit={handleSubmit(sendDatatoFirestore)} className="w-full max-w-lg mx-auto p-6 border-4 border-orange-500 rounded-lg shadow-lg">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Title"
          className="input input-bordered w-full border-2 border-orange-500 p-2 mb-4"
        />
        {errors.title && <span className='text-red-600'>This field is required</span>}

        <textarea
          {...register("description", { required: true })}
          rows="4"
          className="textarea textarea-bordered w-full border-2 border-orange-500 p-2"
          placeholder="Description"
        ></textarea>
        {errors.description && <span className='text-red-600'>This field is required</span>}
        
        <button
          type="submit"
          className="w-full py-3 bg-[#fd9800] text-white rounded-lg"
        >
          Publish blog
        </button>
      </form>

      {loading ? (
        <span className="loading m-8 loading-spinner loading-lg text-info"></span>
      ) : error ? (
        <span className="text-red-600">{error}</span>
      ) : blogs.length > 0 ? (
        blogs.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 my-4 mx-auto max-w-3xl border border-orange-500">
            <h1 className="text-2xl font-bold text-orange-600 mb-2">{item.title}</h1>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))
      ) : (
        <span className="text-gray-600">No blogs available.</span>
      )}
    </>
  );
};

export default Dashboard;
