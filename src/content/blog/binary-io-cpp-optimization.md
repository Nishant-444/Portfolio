---
title: 'Why Text Files Are Slow: Faster C++ Banking Ops'
description: 'Parsing text was the bottleneck in BankEase, not disk. Swapping fstream text I/O for raw binary serialisation made account transactions 300% faster.'
pubDate: 2025-03-15
tags: ['C++', 'Performance', 'Systems Programming', 'File I/O']
---

When building BankEase, a banking simulation engine, I initially used standard text file I/O — `fstream` with `<<` operators — to store user records. It was readable, but slow.

As the dataset grew to thousands of accounts, the overhead of parsing text (converting the string `"1000.50"` into the float `1000.50`) became the bottleneck. The disk wasn't the problem. The parser was.

## The solution: binary I/O

I rewrote the storage engine to use binary serialisation. Instead of writing human-readable characters, I dumped the raw memory of the C++ objects directly to disk.

The old way — slow parsing:

```cpp
file << account.id << " " << account.balance << endl;
```

The new way — raw memory copy:

```cpp
file.write(reinterpret_cast<char*>(&account), sizeof(Account));
```

This single change achieved 300% faster read/write operations for account transactions.

## The trade-offs worth knowing

Binary I/O isn't free. The file is no longer human-readable, and `reinterpret_cast` over a whole struct only works while the type stays trivially copyable — no pointers, no `std::string` members, no virtual functions. It also bakes in your platform's padding and endianness, so a file written on one machine isn't guaranteed to load on another.

For a self-contained simulation those constraints are fine, and the speed is worth it. For anything crossing machines, you want a real serialisation format instead.
