/* ============================================================
   EOV asset dumper. Runs in your own browser, so it sees exactly
   what the page really loaded, including lazy-loaded galleries
   and video sources that a scraper cannot reach.

   HOW TO USE
   1. Open https://www.eov.ae/ in Chrome.
   2. Scroll slowly all the way to the bottom. This matters.
      Wix only loads gallery images when they come into view.
   3. Right-click anywhere, Inspect, then click the Console tab.
   4. Paste this whole file, press Enter.
   5. It prints a table and copies the full URL list to your clipboard.
   6. Repeat on /about, /digital-presence, /digital-solutions,
      /innovation-consultation, /contact.
   ============================================================ */

(() => {
  const out = new Set();

  // every <img>, at original resolution (strip the Wix /v1/... resize path)
  document.querySelectorAll('img').forEach(el => {
    const src = el.currentSrc || el.src || '';
    const m = src.match(/(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/);
    if (m) out.add(m[1]);
  });

  // srcset entries, in case a bigger variant exists
  document.querySelectorAll('[srcset]').forEach(el => {
    (el.getAttribute('srcset') || '').split(',').forEach(part => {
      const m = part.trim().match(/(https:\/\/static\.wixstatic\.com\/media\/[^/\s]+)/);
      if (m) out.add(m[1]);
    });
  });

  // CSS background images
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg.includes('wixstatic')) {
      const m = bg.match(/(https:\/\/static\.wixstatic\.com\/media\/[^/")]+)/);
      if (m) out.add(m[1]);
    }
  });

  // real <video> elements and their sources
  const vids = new Set();
  document.querySelectorAll('video').forEach(v => {
    if (v.src) vids.add(v.src);
    v.querySelectorAll('source').forEach(s => { if (s.src) vids.add(s.src); });
    if (v.poster) out.add(v.poster);
  });

  // Wix video ids anywhere in the DOM. The f000 suffix is the giveaway.
  const html = document.documentElement.outerHTML;
  const ids = new Set();
  (html.match(/[0-9a-f]{6}_[0-9a-f]{20,}f000/g) || []).forEach(id => ids.add(id));
  ids.forEach(id => {
    ['1080p', '720p', '480p'].forEach(q =>
      vids.add(`https://video.wixstatic.com/video/${id}/${q}/mp4/file.mp4`));
    out.add(`https://static.wixstatic.com/media/${id}.jpg`);
  });

  const images = [...out];
  const videos = [...vids];

  console.log('%cIMAGES: ' + images.length, 'font-weight:bold;font-size:14px');
  console.table(images);
  console.log('%cVIDEOS (candidate URLs, try 1080p first): ' + videos.length,
              'font-weight:bold;font-size:14px;color:#c00');
  console.table(videos);

  const all = images.join('\n') + '\n\n--- VIDEOS ---\n' + videos.join('\n');
  copy(all);
  console.log('%cCopied to clipboard. Paste into a text file.', 'color:green;font-weight:bold');
  return { images: images.length, videos: videos.length };
})();

/* ------------------------------------------------------------
   TO ACTUALLY SAVE A VIDEO, easiest first:

   A) DevTools, no tools needed
      Network tab, filter Media, reload, let the video play.
      Right-click the file.mp4 row, Open in new tab, then save.
      Works because your browser sends the right Referer.

   B) Terminal, if you have yt-dlp or curl
      curl -e "https://www.eov.ae/" -o opec_vienna.mp4 \
        "https://video.wixstatic.com/video/747fdf_688f2cc08d8844f3ac6f2a60e7335ecff000/1080p/mp4/file.mp4"

   C) Best quality, and the one I would actually do
      Log into EOV's Wix account, Media Manager. The originals are
      there at full resolution with upload dates, and there will be
      more files than were ever placed on a page.
   ------------------------------------------------------------ */
