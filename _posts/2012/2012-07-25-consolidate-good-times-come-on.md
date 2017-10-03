---
title: Consolidate Good Times, Come On!
date: 2012-07-25T21:29:09+00:00
excerpt: Like a giant nerd, I have spent the last few days migrating two blogs and two commenting systems to Wordpress.
layout: post
categories:
  - Uncategorized
tags:
  - blogging
  - declutter
  - Disqus
  - minimalism
  - PHP
  - programming
  - WordPress
---
<img class="alignright size-full wp-image-1004" title="logo-v-rgb_300x214" src="https://dv8b8dkxht4vb.cloudfront.net/img/logo-v-rgb_300x214.jpg" alt="" width="300" height="214">

Like a giant nerd, I have spent the last few days migrating two blogs and two commenting systems to WordPress (WP). There&#8217;s a really good WordPress plug-in that quickly and easily imported my Tumblog into WordPress, but that was the only easy part.

After that, I had to write a PHP script that would get my DIY blogging database (posts and comments) into WP. And not lose the connection between posts and comments, because they&#8217;re entirely separate in both systems.

Finally, I had to write another PHP script to import my Disqus comments and associate them to the right WP posts. Unfortunately, Disqus would only provide me with a weird disassociated XML file that I ended up having to parse and insert into a database, for further parsing and sorting, before I could add the comments to WP.

All in all, not terrible, and a little bit fun. (My sister made fun of me a little.)