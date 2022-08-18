const express = require("express");
const Link = require("./../models/link");
const router = express.Router();

router.get("/new-link", (req, res) => {
  res.render("links/new-link", { link: new Link() });
});

router.get("/edit-link/:id", async (req, res) => {
  const link = await Link.findById(req.params.id);
  res.render("links/edit-link", { link: link });
});

router.post(
  "/",
  async (req, res, next) => {
    req.link = new Link();
    next();
  },
  saveLinkAndRedirect("new-link")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.link = await Link.findById(req.params.id);
    next();
  },
  saveLinkAndRedirect("edit-link")
);

router.delete("/:id", async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveLinkAndRedirect(path) {
  return async (req, res) => {
    let link = req.link;
    link.title = req.body.title;
    link.link = req.body.link;
    try {
      link = await link.save();
      res.redirect("/");
    } catch (e) {
      res.render(`links/${path}`, { link: link });
    }
  };
}

module.exports = router;
