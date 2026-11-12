---
title: Search Console indexing exclusions and removed blog
date: 2026-11-11
status: audited-cleanup-prepared-for-pr
tags: [portfolio, search, indexing, sitemap, blog-removal]
---

# Search Console indexing exclusions and removed blog

Russell supplied the eight example URLs behind Google's email. Every reported URL was checked through public HTTP requests. These examples are expected alternatives, redirects, an RSS feed, and removed blog posts. The report does not identify an important canonical portfolio page with an indexing block.

Google's [Page indexing documentation](https://support.google.com/webmasters/answer/7440203) explains that alternate URLs and redirect sources need not be indexed. Its [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) recommends consistent preferred URLs in canonical tags and sitemaps.

## The eight reported URLs

| Reported reason | URL or paths | Current result | Decision |
| --- | --- | --- | --- |
| Alternate page with proper canonical tag, 2 URLs | `/work/?tag=professional` and `/work/?tag=experimental` | Both return 200 and declare `https://www.ilovemolecule.com/work/` as canonical | Keep the filters. They are alternate views of Work |
| Page with redirect, 3 URLs | `https://ilovemolecule.com/`, `http://ilovemolecule.com/`, and `https://ilovemolecule.com/index.xml` | Each returns a 301 to the corresponding HTTPS www address, whose final response is 200 | Keep the permanent redirects |
| Crawled, currently not indexed, 1 URL | `https://www.ilovemolecule.com/index.xml` | Returns 200 XML with an RSS root and current project links | This utility feed does not need to be a search landing page |
| Crawled, currently not indexed, 2 URLs | `/devblog/2023-08-02/` and `/devblog/2019-10-01/` | Both already return actual HTTP 404 responses | Keep removed, as Russell requested |

The reported crawl dates for the old posts were July 4 and June 13, 2026. They describe earlier visits, rather than the current responses. The current source tree contains no `content/devblog/` files, and the public feed contains no old blog links. Google [documents 404 as appropriate for removed content without a replacement](https://support.google.com/webmasters/answer/7440203#not_found_404). The old URLs can remain in Search Console's excluded-page history as Google revisits them.

These expected exclusions do not require removing canonical tags, requesting indexing for old blog URLs, or changing the preferred www domain. Public HTTP checks establish accessibility and metadata, rather than proving Google's current index status for every portfolio page.

## Additional cleanup prepared locally

The live sitemap still had 19 entries, including an empty `/posts/` section, the Blowfish `/users/` example, the placeholder `/moodboard/`, and the redirecting `/experiments/` page.

- Deleted the leftover `content/posts/_index.md`. The empty Posts page and its feed are no longer generated. The previously removed development blog remains absent.
- Added `_build.list: never` to Users, Moodboard, and Experiments. With the pinned Hugo 0.115.4, this excludes those routes from sitemap page collections. Their existing direct URLs can still render.
- The local sitemap now has 15 URLs, preserving Home, Work, About, Contact, Film + television, and all individual project pages. Each declares itself canonical and has no refresh redirect or noindex directive.

The source changes are prepared for the follow-up PR, alongside the Node.js 24 workflow edits, contact-form requirement, touch controls, and source-footage planning notes. The sitemap cleanup is not yet deployed.

## Evidence and verification

The [audit JSON](assets/search-console-indexing-audit-2026-11-11.json) records the eight reported URLs, supplied crawl dates, live HTTP responses, redirect chains, canonical tags, feed checks, the 19 live sitemap URLs, and the 15 local sitemap URLs. The wider public audit also checked all sitemap entries, legacy aliases, filtered Work URLs, and the index.html alternate.

All intended portfolio sitemap pages returned HTTP 200, declared self-referential canonical URLs, and had no meta or header indexing blocks. The public robots file allows crawling and references the correct HTTPS www sitemap.

The pinned Hugo test build and minified production build succeed. All 22 Python checks pass. The new output checks reject redirect or placeholder entries in the sitemap, indexing blocks on advertised pages, duplicate sitemap URLs, and any reappearance of removed blog pages or links in discovery output. Existing About presentation and original-copy checks still pass.

The local preview is restarted and checked after the website changes. No Search Console account settings, validation requests, or indexing submissions were changed.

## After publishing the cleanup

- Check the live sitemap has the 15 intended canonical URLs and `/posts/` returns 404.
- Keep the two old development-blog URLs returning 404.
- Use URL Inspection on important canonical portfolio pages if their indexing status needs confirmation.
- Allow Google to recrawl the old URLs. It is acceptable for deliberately removed or alternate URLs to remain excluded.
