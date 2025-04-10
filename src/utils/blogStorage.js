const BLOG_KEY = 'blogs';

export const getBlogs = () => {
  return JSON.parse(localStorage.getItem(BLOG_KEY)) || [];
};

export const saveBlogs = (blogs) => {
  localStorage.setItem(BLOG_KEY, JSON.stringify(blogs));
};

export const addBlog = (blog) => {
  const blogs = getBlogs();
  blogs.unshift(blog); // show newest first
  saveBlogs(blogs);
};

export const deleteBlog = (id) => {
  const blogs = getBlogs().filter((b) => b.id !== id);
  saveBlogs(blogs);
};

export const updateBlog = (updated) => {
  const blogs = getBlogs().map((b) => (b.id === updated.id ? updated : b));
  saveBlogs(blogs);
};

export const initDummyBlogs = () => {
  if (!localStorage.getItem(BLOG_KEY)) {
    const dummy = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      title: `Dummy Blog #${i + 1}`,
      description: `This is dummy blog number ${i + 1}.`,
      image: `/images/blog${i + 1}.jpg`,
      createdAt: new Date().toISOString(),
    }));
    saveBlogs(dummy);
  }
};
