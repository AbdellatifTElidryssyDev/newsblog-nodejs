const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

// api key const

APIKEY = "56e7c25106ea41d0a2e9c7fb8122c871";

newsRouter.get("", async (req, res) => {
  try {
    const newsAPI = await axios.get(
      `http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-30&sortBy=publishedAt&apiKey=${APIKEY}`
    );
    res.render("news", { articles: newsAPI.data.articles });
  } catch (err) {
    if (err.response) {
      res.render("news", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.requiest) {
      res.render("news", { articles: null });
      console.log(err.requiest);
    } else {
      res.render("news", { articles: null });
      console.error("Error", err.message);
    }
  }
});

newsRouter.get("/:id", async (req, res) => {
  let articleID = req.params.id;

  try {
    const newsAPI = await axios.get(
      `https://newsapi.org/v2/sources/${articleID}?apiKey=${APIKEY}`
    );
    res.render("newsSingle", { article: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("newsSingle", { article: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.requiest) {
      res.render("newsSingle", { article: null });
      console.log(err.requiest);
    } else {
      res.render("newsSingle", { article: null });
      console.error("Error", err.message);
    }
  }
});

newsRouter.post("", async (req, res) => {
  let search = req.body.search;
  try {
    const newsAPI = await axios.get(
      `http://newsapi.org/v2/everything?q=${search}&apiKey=${APIKEY}`
    );
    res.render("newsSearch", { articles: newsAPI.data.articles });
  } catch (err) {
    if (err.response) {
      res.render("newsSearch", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.requiest) {
      res.render("newsSearch", { articles: null });
      console.log(err.requiest);
    } else {
      res.render("newsSearch", { articles: null });
      console.error("Error", err.message);
    }
  }
});

module.exports = newsRouter;
