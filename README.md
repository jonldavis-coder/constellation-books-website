# New Constellation

Author website for the New Constellation trilogy by Jonathan Lee Davis.

Live site: https://jonathanleedavis.com/

The site is static HTML published from the `main` branch, at the repository root, on GitHub Pages. The custom domain is `jonathanleedavis.com`, set with a `CNAME` file. `.nojekyll` is present so GitHub Pages will not run Jekyll.

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

## Pages

- Home, with the series and all three books
- One page for each book, with both covers and the back-cover description
- About the Author
- Teacher & Professor Resources
- Meet the Author
- Contact
- Privacy (draft)
- HTML sitemap at `sitemap.html`
- XML sitemap at `sitemap.xml` and `robots.txt`
- `404.html`

## Amazon links

Edit `assets/js/links-config.js`. Each book has an `amazon` string. Leave it empty until a real `https` product URL exists. While it is empty, the button reads “Coming soon to Amazon” and stays disabled. When a URL is set, the button reads “Buy on Amazon”.

## Author visits

Edit `assets/js/booking-config.js`.

- `email` is the address used by the request forms. The committed value is a clearly marked placeholder. Replace it before sharing the forms. The site does not store messages. The form opens the visitor’s email app.
- `calendly.inPerson` and `calendly.virtual` start empty. Until an `https` Calendly URL is set, Meet the Author shows an availability-request form for a 30-minute interview. The form asks for name, school, school type (public school, private school, or college), role, preferred dates, and in-person versus virtual. When a URL is set, that event type embeds Calendly. When both URLs are set, the form is hidden.

## Placeholders

The only public wording for ISBN and release date is **TBA**. Do not replace TBA with a sentence that says a number is missing.

Recommended age or grade level on the teacher page is **TBA**.

The author photo is a placeholder.

Downloadable teacher guides are labeled “coming soon”.

## Cover images

Original JPG files are in `assets/images/originals/`. The pages use the optimized copies in `assets/images/covers/`. Open Graph images made from the covers are in `assets/images/og/`.

The front cover of *The Last Constellation* is only **864×1152** pixels (`assets/images/originals/the-last-constellation-front.jpg` and the web copy beside it). The other covers are 1600×2400. On the book page that front cover sits in a column no wider than 26rem (416px). The enlarge view does not scale any cover past its natural pixel width, so this low-resolution file is not stretched on screen. A higher-resolution front cover is needed before that cover can be shown larger.

## Wording

Public text uses the back-cover descriptions and the short author biography written for this site. Do not add quotations from readers, star ratings, or sales claims.
