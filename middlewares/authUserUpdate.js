const rescue = require('express-rescue');
const { BlogPost } = require('../models');

module.exports = rescue(async (req, res, next) => {
    const { id } = req.params;
    const user = req.payload;
    console.log(user);
//    console.log(id);
    const blog = await BlogPost.findByPk(id);
   
    // console.log(blog.dataValues.userId);
    
    if (!blog) return res.status(404).json({ message: 'Post does not exist' });

    if (user.id !== blog.dataValues.userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    next();
});
