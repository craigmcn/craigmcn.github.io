---
title: How Faulty Logic Can Ruin Your Day
date: 2012-05-14T16:12:31+00:00
excerpt: "Here’s the logic I wrote. It made perfectly good sense when I wrote it."
layout: post
categories:
  - Opinion
tags:
  - communication
  - error
  - programming
  - success
redirect_from:
  - /post/23061800539
---
Here’s the logic I wrote:

```
if (is_error) {
    echo error_message;
} else {
    echo success;
}
```

Makes sense? _If there is an error, display an error message, otherwise display the success message._

It made perfectly good sense when I wrote it.

What I didn’t count on was that an absolute failure didn’t produce an error, it produced nothing at all. But because there was no error, success was assumed. Talk about making an ass of you and me.

So now potentially 76 people (and maybe more) think they’re signed up for an activity, when they aren’t.

We’ve contacted the 76 people, but some activity spaces are full, so they may be upset; perhaps furiously so. And if we missed any, well, they don’t even know there was a problem.