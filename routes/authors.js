const express = require('express');
const router = express.Router();
const Author = require('../models/authors');

router.get('/', (req, res) => {
    res.render('authors/index');
});

router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    author.save((err) => {
        if (err) {
            res.render('authors/new', {
                author: author,
                arrorMessage: 'Error Creating Author'
            });
        } else {
            // res.redirect(`authors/${newAuthor.id}`);
            res.redirect('authors');
        }
    });
});

module.exports = router;