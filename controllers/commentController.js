const Comment = require('../models/commentModel');
const Article = require('../models/articleModel');

exports.createComment = async (req, res) => {
  // console.log(req.body);
  await Article.findById(req.params.id, (err, article) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      let comment = new Comment({
        content: req.body.content,
      });
      try {
        comment.save();
        article.comments.push(comment);
        const success = article.save();
        if (success) {
          req.flash('message', 'Comment posted successfully');
        }
        // console.log(comment.author);
        res.redirect(`/articles/${article._id}`);
      } catch (error) {
        console.log(err);
        res.redirect('/');
      }
    }
  });
};
