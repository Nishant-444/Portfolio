---
title: 'Why I Moved VizTube from MongoDB to PostgreSQL'
description: 'Orphaned comments, manual joins, and no real transactions. The relational integrity problems that pushed VizTube off MongoDB and onto PostgreSQL with Prisma.'
pubDate: 2025-12-29
tags: ['PostgreSQL', 'MongoDB', 'Prisma', 'Databases', 'Architecture']
---

When I started building VizTube, I chose MongoDB. It was flexible, easy to set up, and the JSON-like structure felt natural with JavaScript.

But as the platform grew, I hit a wall. Managing complex relationships — user subscriptions, video likes, comment threads — became a nightmare of manual data joins and inconsistent states.

## The breaking point

I found myself writing convoluted code just to ensure that when a user deleted their account, their comments didn't turn into orphan data. MongoDB's eventual consistency wasn't cutting it for a system that needed strict relational integrity.

## The solution: PostgreSQL + Prisma

I migrated the entire backend to PostgreSQL, using Prisma ORM to manage the schema and migrations. The benefits were immediate:

1. **ACID compliance.** Transactions became reliable. No more partial updates.
2. **Relational integrity.** Foreign keys kept data consistent automatically — cascade deletes replaced hand-written cleanup code.
3. **Simpler queries.** What used to be three database calls and a `map` became a single SQL join.

The migration also set up something I couldn't have done as cleanly on MongoDB: adding `pgvector` later meant my embeddings live in the same database as the relational video data, so a semantic search and a permissions check happen in one round-trip.

## The takeaway

NoSQL is great for rapid prototyping. But for structured, interconnected data, a relational database is usually the better long-term choice — and the cost of switching only goes up the longer you wait.
