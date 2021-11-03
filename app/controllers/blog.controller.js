const db = require('../models')

var slugify = require('slugify')

const Blog = db.blogs;


exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ status: 'failed', message: 'Title is important' })
        return
    }

    if(req.body.title == "") {
        res.status(400).send({ message: 'Title cannot be empty' })
        return
    }

    if(!req.body.content) {
        res.status(400).send({ message: 'Content is important' })
        return
    }
    
    if(req.body.content == "") {
        res.status(400).send({ message: 'Content cannot cannot be empty' })
        return
    }

    const slug = slugify(req.body.title)

    const blog = new Blog({
        title: req.body.title,
        slug: slug,
        content: req.body.content,
        published: req.body.published ? req.body.published : true
    })

    blog.save().then(data => {
        res.send({ message: 'Blog Added Successfully!' })
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An Error Occurred!"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Blog.findById(id).then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An Error Occurred!"
        })
    })
}

exports.findAll = (req, res) => {
    Blog.find().sort({ createdAt: 'descending' }).then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).send({
            message: error.message || "An Error Occurred!"
        })
    })
}