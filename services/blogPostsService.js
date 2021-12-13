const blogPostSchema = require('../schemas/blogPostsSchema');
const { BlogPost, User, Category } = require('../models');

const createBlogPost = async (title, content, categoryIds, userId) => {
    const existTitle = blogPostSchema.validateTitle(title);
    const existContent = blogPostSchema.validateContent(content);
    const existCategoryId = await blogPostSchema.validateCategoryId(categoryIds);

    if (existCategoryId) return existCategoryId;
    if (existTitle) return existTitle;
    if (existContent) return existContent;

    const getBlogPost = await BlogPost.create({ title, content, userId });

    return getBlogPost;
};

const getAllBlogPosts = async () => {
    const blogPosts = await BlogPost.findAll({
        include: [
          { model: User,
            as: 'user', 
            attributes: { exclude: ['password'] },
          },
          {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
          },
        ],

    });

    console.log(blogPosts);
    return blogPosts;
};

const getBlogPostById = async (id) => {
    const existBlogPost = await BlogPost.findOne({
        where: { id },
         include: [
            { model: User,
              as: 'user', 
              attributes: { exclude: ['password'] },
            },
            {
              model: Category,
              as: 'categories',
              through: { attributes: [] },
            },
          ],
    });

    return existBlogPost;
};

const updateBlogPost = async (id, title, content, categoryId) => {
    const existFields = blogPostSchema.validatedEditFields(title, content, categoryId);

    if (existFields) return existFields;

    await BlogPost.update(    
          { title, content },
          { where: { id } },
    );

    const blogPostUpdated = await getBlogPostById(id);
  
    //  console.log(blogPostUpdated);

    return blogPostUpdated;
};

const deletePost = async (id) => {
 //  const existPostId = blogPostSchema.validateIdPost(id);

 //  if (existPostId) return existPostId;

  await BlogPost.destroy({
      where: { id },
    });
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deletePost,
};