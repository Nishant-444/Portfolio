---
title: 'Surviving Production on 1GB of RAM'
description: 'How I kept a full-stack video platform alive on an AWS t2.micro — Nginx as gatekeeper, PM2 memory ceilings, and a swap file that outsmarted the OOM killer.'
pubDate: 2026-02-04
tags: ['AWS', 'Nginx', 'PM2', 'Linux', 'Performance']
---

Hosting a full-stack video platform on an AWS t2.micro instance is not for the faint of heart. You have exactly 1GB of RAM. One memory leak, one unoptimized process, and the server crashes.

Here is how I engineered VizTube to survive in this harsh environment.

## 1. Nginx as the gatekeeper

I configured Nginx as a reverse proxy. Instead of letting Node.js handle static assets — which eats memory — Nginx serves images and CSS files efficiently, leaving Node.js to handle only the API logic.

## 2. PM2 process management

I used PM2 not just to keep the app running, but to limit it. I set strict memory restart limits. If a process exceeded 400MB, PM2 would gracefully restart it before it crashed the entire server.

```bash
pm2 start dist/index.js --name viztube-api --max-memory-restart 400M
```

## 3. Swap memory

I configured a 2GB swap file on the Linux instance. Disk-based memory is slow, but it prevented the OOM killer from terminating my database process during traffic spikes.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## What it taught me

Constraints breed creativity. You don't need a massive server to build scalable software; you just need to understand your resources.
