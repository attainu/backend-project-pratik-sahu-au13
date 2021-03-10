const Portfolio = require('../models/portfolioModel');

exports.getProfile = (req, res) => {
  try {
    res.render('portfolio/profile', { portfolio: new Portfolio() });
  } catch (error) {
    console.log(error.message);
    res.redirect('/');
  }
};

exports.getFillRoute = (req, res) => {
  //   if (req.session.userId) {
  res.render('portfolio/fill', { portfolio: new Portfolio() });
  //   }
  //   res.redirect('/auth/login');
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById({ _id: req.params.id });
    if (portfolio == null) res.redirect('/');
    res.render('portfolio/page', { portfolio: portfolio });
  } catch (error) {
    console.log(error.message);
    res.redirect('/');
  }
};

exports.createPortfolio = async (req, res) => {
  // console.log(req.body);
  let portfolio = new Portfolio(req.body);
  try {
    await portfolio.save();
    res.redirect(`/portfolio/${portfolio.id}`);
  } catch (error) {
    console.log(error.message);
    res.render('portfolio/fill', { portfolio: portfolio });
  }
};

// exports.editPortfolioRoute = (req, res) => {
//   Portfolio.findById(req.params.id, (err, portfolio) => {
//     res.render('portfolio/edit', { portfolio });
//   });
// };

// exports.editPortfolio = (req, res) => {
//   Portfolio.findByIdAndUpdate(req.params.id, req.body, (err, portfolio) => {
//     if (err) {
//       res.redirect('/');
//     } else {
//       res.redirect(`/portfolio/${req.params.id}`, { portfolio });
//     }
//   });
// };

exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
};
