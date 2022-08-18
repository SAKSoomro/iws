const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const Link = require("./models/link");
const articleRouter = require("./routes/articles");
const linkRouter = require("./routes/links");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  const links = await Link.find();
  res.render("articles/index", { articles: articles, links: links });
});

app.use("/articles", articleRouter);
app.use("/links", linkRouter);

app.listen(3000);
