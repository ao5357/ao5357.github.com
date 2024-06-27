/**
 * @file
 * Load local versions of YouTube thumbnails for performance.
 */

'use strict';

import { createWriteStream, readFileSync, existsSync } from 'fs';
import fetch from 'node-fetch';

/* Get the data feed containing cached lists of videos. */
let rawdata = readFileSync('_data/youtube.json');
let videos = JSON.parse(rawdata);

/* Go through each video and save down a thumbnail. */
Array.prototype.forEach.call(videos, (video) => {
  const ytimg = 'https://i3.ytimg.com/vi/' + video.id + '/0.jpg';
  const path = 'assets/images/youtube/' + video.id + '.jpg';

  if (!existsSync(path)) {
    fetch(ytimg).then((res) =>
      res.body.pipe(createWriteStream(path))
    );
  }
});
