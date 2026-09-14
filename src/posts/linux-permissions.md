---
title: "Linux Permissions: users, groups, and file access"
date: "2026-08-26"
tags: ["linux", "beginner", "security"]
description: "How permissions work in Linux, from who can access each file to how to change ownership"
---

# Linux Permissions: users, groups, and file access

Not everyone has the same access to do things on a Linux machine. Each user has an identity, belongs to one or more groups, and is granted access to files accordingly.

The information about users — their IDs, groups, home directory, and more — is located in `/etc/passwd`. There are no passwords located here; for that, go to `/etc/shadow`.

## Useful Commands

- `id`: prints the information of the current user.
- `whoami`: prints the current username.
- `w`: prints who is logged in and what they are running.
- `groups`: prints the groups the current user belongs to.

## User Manipulation

- `sudo adduser newuser`: creates a new user.
- `sudo deluser newuser`: deletes the user, but does not delete the home directory.
- `sudo deluser --remove-home`: deletes the user and the home directory.

## File Permissions

In Linux, everything can be considered a file, and every file has restrictions on who can read, write, and execute it.

- `chmod`: changes those permissions.
- `chown`: changes ownership.
- `chgrp`: changes the owning group.