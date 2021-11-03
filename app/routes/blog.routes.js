module.exports = app => {
    const blogs = require("../controllers/blog.controller.js");

    var router = require("express").Router();

    router.post('/add-new', blogs.create)

    router.get('/', blogs.findAll)

    router.get('/details/:id', blogs.findOne);

    app.use('/api/blog', router)
}