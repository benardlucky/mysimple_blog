module.exports = mongoose => {
    const Blog = mongoose.model(
      "blog",
      mongoose.Schema(
        {
          title: String,
          slug: String,
          content: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Blog;
  };