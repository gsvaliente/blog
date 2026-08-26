---
title: "Linux Permission Introduction"
date: "2026-08-26"
tags: ["linux", "beginner", "security"]
description: "We explore how permissions work in Linux. From who can access each thing to how to change owners"
---

Not everyone has the same access to do things through the Linux machine

The information regarding users and their Ids, groups, home directory etc is located in
`/etc/passwd`
There are no passwords located here, for that go to `etc/shadow`

### Useful Information

- `id`: prints the info of the current user
- `whoami`: prints the username
- `w`: prints the running users and its instances like who is logged in
- `groups`: prints the groups the user belongs too

### User Manipulation

- `sudo adduser newuser`: creates a new user
- `sudo deluser newuser`: deletes the user, but does not delete the home directory
- `sudo deluser --remove-home`: deletes the user and home directory

## File Permissions

Since everything can be considered a file in Linux, everything has certain restrictions on who can Read, Write and eXecture it.

- `chmod`: is used to change those permissions
- `chown`: is used to change ownership
- `chgrp`: is used to change group
