---
title: "Input - Output - Pipes"
date: "2026-08-28"
tags: ["linux", "beginner", "cli"]
description: "We explore what stdin, stdout, stderr and pipes in the Linux CLI"
---

When typing in the console most commands can have one of the following three "options"
When using the `|` (pipe), we can translate the output of a command into the input of another one.

example:
`cat /etc/passwd | wc -l`
This would print the file, but instead of printing, you use that as a way to count how many lines the car would bring out

- Standard Input
- Standard Output
- Standard Error

## Redirectes

#### Overwrite

When we want to overwrite a file without having to enter a text editor we use
`echo "Line 1" > test-file.txt`
the `>` is the redirect symbol

#### Append

When we want to append we use the `>>`
`echo "Line 2" >> test-file.txt`

This would add a second line with "Line 2"

#### Error Redirect

When we want to append or overwrite what the stderr is giving we can use the
`2>` or `2>>`
for example:
`ls /non-existent 2> error.log`

#### Combination of Redirects

If we want to catch both stdout and stderr we can use the `&>`
example:
`ls /non-existent &> all-logs.log`

So this catches both the good and the bad

We can also separate them if we want to save them to different files
`ls /non-existent > good-log.log 2> bad-log.log`

## Pipes

To combine multiple commands we use the `|`
Example:
`ls /etc/ | wc -l`: this will count how many files are in the /etc/ directory
`du -sh /Downloads/* | sort -h`: this will tell us the size of each file inside of the Downloads directory and sort it

## Sort

We can use the sort command to... sort.
By default it goes from smallest to largest but we can use the `-r` flag and reverse it

## Uniq

This is similar to sort, but it removes the duplicates that might be found
To be used properly we need to sort first then uniq
Example:
`sort names.txt | uniq`: this will remove any duplicates after the list is sorted

One very useful thing to add is the `-c` flag, which will count how many occurances something has

```txt
Charlie
Alice
Bob
Alice
Bob
Alice
```

If this is the file, we run the:
`sort names.txt | uniq -c` we will get the following output

```bash
3 Alice
2 Bob
1 Charlie
```

## Xargs

When we want to use the result of a first command, and run another command to those things

For example if we cant to remove many files at once we can run the

````bash
```bash
  ls /sample-dir | xargs rm
````

This translates to rm item1, item2, item3

#### Why is it useful?

When we have a list of things that one command gives, we can use xargs to modify one by one this list

example:

```bash
grep -l "TODO" *.js | xargs rm
```

This will delete all of the .js files.
