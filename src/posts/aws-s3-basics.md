---
title: "AWS S3 Basics: Creating Your First Bucket"
date: "2026-01-20"
tags: ["aws", "s3", "storage", "beginner"]
description: "A beginner's guide to creating and configuring Amazon S3 buckets"
---

# AWS S3 Basics: Creating Your First Bucket

Amazon S3 (Simple Storage Service) is the foundation of AWS storage. In this post, I'll walk through creating your first S3 bucket.

## Prerequisites

- AWS account
- AWS CLI configured or access to AWS Console
- Basic understanding of cloud storage concepts

## Creating an S3 Bucket

### Via AWS Console

1. Log in to the AWS Management Console
2. Navigate to S3 service
3. Click "Create bucket"
4. Enter a globally unique bucket name
5. Choose the AWS region closest to your users
6. Configure bucket settings (block public access, encryption, etc.)
7. Review and create

### Via AWS CLI

```bash
# Create a bucket
aws s3 mb s3://my-first-bucket-name --region us-east-1

# Verify bucket creation
aws s3 ls
```

## Key S3 Concepts

| Concept | Description |
|---------|-------------|
| **Bucket** | Container for objects (files) |
| **Object** | File stored in a bucket |
| **Key** | The name/path of the object within the bucket |
| **Region** | Geographic location where data is stored |
| **Versioning** | Keep multiple versions of an object |
| **Lifecycle Management** | Automate object transitions and expirations |

## Common Use Cases

- Static website hosting
- Backup and archival
- File storage and sharing
- Content delivery foundation
- Data lake storage

## Cost Considerations

S3 pricing is based on:
- Storage GB per month
- Requests (PUT, GET, DELETE)
- Data transfer out to internet
- Storage class (Standard, Infrequent Access, Glacier)

## Next Steps

In my next post, I'll cover:
- IAM policies for S3 access control
- Bucket policies and ACLs
- S3 versioning and cross-region replication
- Setting up a static website on S3