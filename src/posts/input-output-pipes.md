---
title: "stdin, stdout, and pipes: mastering the Linux command line"
date: "2026-08-28"
tags: ["linux", "beginner", "cli"]
description: "How stdin, stdout, stderr, and pipes work in the Linux command line"
---

# stdin, stdout, and pipes: mastering the Linux command line

Every command in the Linux console works with three standard streams:

- **Standard Input (stdin)**: the data a command reads, usually from your keyboard or from another command.
- **Standard Output (stdout)**: the data a command prints to the terminal.
- **Standard Error (stderr)**: the error messages a command prints to the terminal.

By default, commands read from stdin and write to stdout. The real power comes from connecting commands together: using the `|` (pipe) operator, we can translate the stdout of one command into the stdin of another.

For example:

```bash
cat /etc/passwd | wc -l
```

Without the pipe, `cat` would print the whole file to the terminal. With the pipe, the output is fed into `wc -l`, which counts how many lines the file has.

## Redirects

When we want a command to write to a file instead of the terminal, we use redirection.

### Overwrite

To overwrite a file without having to enter a text editor, we use a single `>`:

```bash
echo "Line 1" > test-file.txt
```

Here `>` is the redirect symbol: it sends stdout to `test-file.txt`, replacing anything that was already there.

### Append

To append to a file instead of replacing it, we use `>>`:

```bash
echo "Line 2" >> test-file.txt
```

This adds a second line, `Line 2`, to the end of the file.

### Error Redirect

To redirect what stderr produces, we use `2>` (overwrite) or `2>>` (append):

```bash
ls /non-existent 2> error.log
```

The error message is written to `error.log` while anything else still prints to the terminal.

### Combining Redirects

If we want to catch both stdout and stderr in the same file, we use `&>`:

```bash
ls /non-existent &> all-logs.log
```

This captures both the good output and the bad.

We can also save them to different files:

```bash
ls /non-existent > good-log.log 2> bad-log.log
```

## Pipes

To combine multiple commands, we use the `|` operator:

```bash
ls /etc/ | wc -l
```

This counts how many files are in the `/etc/` directory.

```bash
du -sh /Downloads/* | sort -h
```

This tells us the size of each file inside the Downloads directory and sorts the list.

## Sort

We can use the `sort` command to... sort. By default it goes from smallest to largest, but we can use the `-r` flag to reverse it.

## Uniq

`uniq` is similar to `sort`, but it removes duplicate lines that might be found. To use it properly, we need to sort first and then run `uniq`:

```bash
sort names.txt | uniq
```

This removes any duplicates after the list is sorted.

A very useful addition is the `-c` flag, which counts how many occurrences of each line there are. Given a file like:

```txt
Charlie
Alice
Bob
Alice
Bob
Alice
```

running `sort names.txt | uniq -c` produces the following output:

```bash
3 Alice
2 Bob
1 Charlie
```

## Xargs

Sometimes we want to take the result of one command and run another command on each of those items.

For example, if we want to remove many files at once, we can run:

```bash
ls /sample-dir | xargs rm
```

This translates to `rm item1, item2, item3` on each file that `ls` returned.

### Why is it useful?

When one command gives us a list of things, we can use `xargs` to work through the list one item at a time. For example:

```bash
grep -l "TODO" *.js | xargs rm
```

This deletes all of the `.js` files that contain `TODO`.