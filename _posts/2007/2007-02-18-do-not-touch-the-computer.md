---
title: Do not touch the computer
date: 2007-02-18T12:43:00+00:00
excerpt: "Oh man. So one of the girls at work asks if I can look at her son's computer; it only boots to a blank screen. No"
layout: post
categories:
  - People
  - Technology
tags:
  - computers
---
Oh man. So one of the girls at work asks if I can look at her son&#8217;s computer; it only boots to a blank screen. No problem. Sounds like a standard virus- or spyware-type affliction. She mentioned that her brother-in-law (or nephew, or niece&#8217;s husband, or someone) had already looked at it and couldn&#8217;t fix it. This should have been a bright, flashing, red warning light for me, but it wasn&#8217;t. I had her bring the computer in, I&#8217;d run some spyware and virus scanning on it and it&#8217;d be fine. No such luck. I fire it up and get a shiny boot error &#8220;Primary Sata 0 not found&#8221;. Alrighty then! So, now I have to take the machine home and find out what&#8217;s going on.

I get home, crack open the machine and check the cables. Everything seems fine. Boot &#8230; error. Shit. Try my own cable; nope. Pull out the hard drive (not an easy task on the Dell Dimension) and connect it to my other computer &#8230; Ha! The other computer doesn&#8217;t have SATA connectors on the motherboard. Okay, open the _other_ other computer, connect the SATA hard drive, boot up. Everything&#8217;s fine, the SATA drive is recognized. I run the anti-spyware and anti-virus on the SATA drive and it only takes a couple of minutes. Hunh, wierd. Poke around on the drive, and find the 120GB drive only reads as 20GB, and there&#8217;s no files in My Documents and only a bare minimum of files in WINNT. I unplug my primary drive and leave the SATA drive, it boots up and tells me that the Windows installation is not complete. Great!

So I plug it all back into the origianl machine and try booting again. No luck; no drive. A blinding flash of inspiration hits. The message says &#8220;sata 0&#8221; and I&#8217;m plugged into sata-1. So is it Sata-1 and Sata-2 or Sata-0 and Sata-1? Ahh &#8230; Sata-0 and Sata-1. So I plug into Sata-0 and start booting &#8230; incomplete Windows install. I put in the CD and start again. I check the partitions and find 20GB partitioned and 100GB not partitioned. Yay. Not only is the install not complete, but even the partitions are buggered. Since now it&#8217;s not going to matter whether there was previous data on the drive (and I&#8217;m not going to go through the trouble of trying to recover it), I re-install Windows, re-partition the drive to 1 giant 120GB partition (well, it&#8217;s about 110GB when all is said and done) and re-install all the software that came with the machine. Too bad all the downloaded music is gone, but that&#8217;s what you get from letting an idiot try to fix your computer!