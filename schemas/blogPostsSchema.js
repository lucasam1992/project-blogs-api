 const { Category } = require('../models');
 // const validateToken = require('../middlewares/validateToken');

const TITLEFIELD = {
    message: '"title" is required',
    code: 400,
};

const CONTENTFIELD = {
    message: '"content" is required',
    code: 400,
};

const CATEGORYIDFIELD = {
    message: '"categoryIds" is required',
    code: 400,
};

const CATEGORYIDDOESNTEXIST = {
    message: '"categoryIds" not found',
    code: 400,
};

const CATEGORIESDOESNTCHANGED = {
    message: 'Categories cannot be edited',
    code: 400,
};

/*
const POSTDOESNTEXIST = {
    message: 'Post does not exist',
    code: 404,
};

const validateIdPost = async (postId) => {
    const existPostId = await BlogPost.findByPk(postId);

    if (!existPostId) return POSTDOESNTEXIST;
};
*/

const validateTitle = (title) => {
    if (!title) return TITLEFIELD;
};

const validateContent = (content) => {
    if (!content) return CONTENTFIELD;
};

const validateCategoryId = async (categoryIds) => {
    if (!categoryIds) return CATEGORYIDFIELD;

    const existCategoryId = await Category.findAll({ 
        where: { id: categoryIds },
    });

    if (existCategoryId.length !== categoryIds.length) return CATEGORYIDDOESNTEXIST;
};

const validatedEditFields = (title, content, categoryId) => {
    if (!title) return TITLEFIELD;
    if (!content) return CONTENTFIELD;
    if (categoryId) return CATEGORIESDOESNTCHANGED;
};

module.exports = {
    validateTitle,
    validateContent,
    validateCategoryId,
    validatedEditFields,
  //  validateIdPost,
};