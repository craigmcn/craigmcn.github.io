---
title: "Back Online"
date: 2017-08-24T11:45:00-07:00
excerpt: "I’m trying to divest myself of unnecessary technology assets so I’ve delegated hosting this site to Github and its Pages service."
layout: post
categories:
  - Opinion
tags:
  - thoughtfulthursday
  - technology
  - Github
  - minimalism
---
You probably didn’t even notice, but my site was offline for a couple of days this week. I’m trying to divest myself of unnecessary technology assets and this website is one of them, sort of. I’ve delegated hosting the site to [Github](https://github.com/) and its [Pages](https://pages.github.com/) service. I like it because the pages are just [Markdown](/markdown.html) and they get versioned in Git/Github. I use [Gitkraken](https://www.gitkraken.com/) as my Git client at home and Github when I’m not at home. Admittedly, it took a while to get the old site pages moved over and cleaned up, but it was a good exercise. I also delegated commenting to [Disqus](https://disqus.com/) and [https](https://en.wikipedia.org/wiki/HTTPS) to [Cloudflare](https://www.cloudflare.com/). I don’t have any servers to maintain and no bills to pay.

However, what has stopped me a few times is that the site is static and generated using [Jekyll](https://jekyllrb.com/), which likes to complain about the Markdown or the [YAML](http://www.yaml.org/start.html). Starting last week, it wouldn’t stop complaining. I tried removing the new file, I tried copying old files, I even deleted and recreated the Git repository. Nothing worked.

I contacted Github support and they pointed out an error in one of the files. Fixing the one issue led to more issues. They also suggested I install Jekyll locally and build my site locally to uncover more errors. Locally, the error are much more verbose than through Github. I did it, it was easy, I found the errors and fixed them. I feel like a champion!
