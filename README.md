RSS-reader
==========

A node.js application for keeping tracking of your favorite RSS feeds. [View live demo](http://read-rss.herokuapp.com/).

Simply paste the RSS feed URL into the input and click "Fetch feed". If you decide to click "Save this!", the RSS feed will be saved and available for consumption in the sidebar.

![screenshot-rssreader](https://cloud.githubusercontent.com/assets/7177481/3490141/3969fb42-055c-11e4-8718-96e6677b40d6.png)


## Technical specs
RSS reader utilizes the [Google Feed API](https://developers.google.com/feed/v1/) to fetch RSS feeds. The backend is built with the Node.js Express framework and uses MongoDB.

```
  "engines": {
    "node": "0.11.x"
  },
  "dependencies": {
    "express": "4.x",
    "body-parser": "1.4.3",
    "method-override": "2.0.2",
    "mongoose": "3.8.12"
  }
```
