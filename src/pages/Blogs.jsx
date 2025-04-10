import { useEffect, useState } from 'react';
import {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  initDummyBlogs,
} from '../utils/blogStorage';
import { useNavigate } from 'react-router-dom';

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    initDummyBlogs();
    setBlogs(getBlogs());
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const blog = {
      id: editingId || Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    if (editingId) {
      updateBlog(blog);
      setEditingId(null);
    } else {
      addBlog(blog);
    }

    setFormData({ title: '', description: '', image: '' });
    setBlogs(getBlogs());
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, description: blog.description, image: blog.image });
    setEditingId(blog.id);
  };

  const handleDelete = (id) => {
    deleteBlog(id);
    setBlogs(getBlogs());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <button onClick={handleLogout} className="text-red-500 hover:underline">
          Logout
        </button>
      </div>

      <form onSubmit={handleAddOrUpdate} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">
          {editingId ? 'Edit Blog' : 'Add New Blog'}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image Path"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update' : 'Add'} Blog
        </button>
      </form>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded bg-white shadow">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-700 mb-2">{blog.description}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
