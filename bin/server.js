const express = require("express");
const next = require("next");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "src", dev });
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const accountRouter = require("../api/account");
const bookmarkRouter = require("../api/bookmark");

const PORT = parseInt(process.env.PORT, 10) || 5002;

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(cookieParser());

    server.use("/api", accountRouter);
    server.use("/api/bookmark", bookmarkRouter);

    const robotsOptions = {
      root: join(__dirname, "../static"),
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      }
    };

    server.get("/robots.txt", (req, res) => {
      res.status(200).sendFile("robots.txt", robotsOptions);
    });

    const sitemapOptions = {
      root: join(__dirname, "../static"),
      headers: {
        "Content-Type": "text/xml;charset=UTF-8"
      }
    };
    server.get("/sitemap.xml", (req, res) =>
      res.status(200).sendFile("sitemap.xml", sitemapOptions)
    );

    const faviconOptions = {
      root: join(__dirname, "../static")
    };
    server.get("/favicon.ico", (req, res) =>
      res.status(200).sendFile("favicon.ico", faviconOptions)
    );

    const manifestOptions = {
      root: join(__dirname, "../static")
    };
    server.get("/manifest.json", (req, res) =>
      res.status(200).sendFile("manifest.json", manifestOptions)
    );

    const ogpOptions = {
      root: join(__dirname, "../static")
    };
    server.get("/ogp.png", (req, res) =>
      res.status(200).sendFile("ogp.png", ogpOptions)
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> App on :${PORT}`);
    });

    server.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      console.error("Log", err);
      res.status(statusCode).json({
        type: "error",
        message: err.message
      });
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
