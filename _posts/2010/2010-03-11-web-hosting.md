---
title: Web hosting
date: 2010-03-11T10:52:59+00:00
excerpt: "I'm asking for suggestions for web hosts, because my current host is crappy."
layout: post
categories:
  - Technology
tags:
  - Netfirms
  - programming
---
Alright, everybody, I previously [mentioned](the-end-of-an-era.html) that I had to move my web hosting. Now I&#8217;m asking for suggestions for web hosts, because my current host is crappy. They seemed to have everything I needed, at reasonable prices, but it turns out that they don&#8217;t.

Most notably, their support for scheduled tasks (cron jobs) is terrible. While the interface is terrible, the actual jobs also don&#8217;t seem to run on schedule. I had a job that was scheduled to run every four hours; it ran every four to six hours. I have a job that I scheduled to run every hour; it ran every hour for three hours, then ran again six hours later, then never ran again. I&#8217;ve added another job to run every 15 minutes, and it doesn&#8217;t seem to run at all.

As well, although it&#8217;s not a huge issue, the host does not (and will not) provide the IMAP module for PHP, meaning that crackerMail will not run. Sure, I can use other programs, including the host&#8217;s webmail service, but that&#8217;s not what I want.

I can&#8217;t set up multiple administrators. Maybe I was spoiled in being able to have multiple control panels for multiple domains, with multiple administrators, but it was a very useful feature.

So, if anyone knows of a good, inexpensive web host who might be able to provide all these things, let me know.
