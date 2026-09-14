---
title: "Terraform: Infrastructure as Code"
date: "2026-08-26"
tags: ["aws", "iac", "beginner"]
description: "Basics of Terraform and Infrastructure as Code"
---

# Terraform: Infrastructure as Code

Terraform is the industry standard for declaring Infrastructure as Code (IaC). It lets us manage infrastructure by describing a desired state and having Terraform work to reach it, instead of clicking around a cloud provider's console.

The basic lifecycle is:

- Create
- Modify
- Delete

The goal is to achieve the desired state, compared to the current state of the infrastructure. This is done in the following cycle:

1. Write the config
2. Communicate with the desired provider
3. Provider communicates with the API

## Why IaC is important

Probably the most important point is that Terraform is API-driven. This means that it talks directly to the cloud provider. There is no longer a need for a human intermediary trying to manage the infrastructure we rent from the provider.

It also gives us transparency in knowing exactly what is happening and when. There are no more queues of other companies trying to create VMs on the same server.

Automation and versioning: because our infrastructure is written as code, we can use a version control tool like git to save and share our Terraform code. We can duplicate it exactly as we want and avoid the console clicking.

## Terraform Plan and Apply

When creating or modifying the config it is important to know that there are two steps.

The first one is that Terraform creates a plan and tells us everything that will be modified, in the correct order the modifications need to happen. This is the important step to audit and check everything before changes are applied.

It is important to note that this is the point in which Terraform compares the new changes to the current state of the infrastructure.

Then when we apply, the changes are actually happening. Terraform creates a new state to match what the infrastructure will look like.

## Terraform init

This is the command that initializes the Terraform directory in the project. It does the lifting for us: it creates the lock file with all the dependencies and sets up the backend we need to build the infrastructure. This command can be run many times. It is also where we can potentially upgrade our dependencies if needed.

## Terraform apply

This is the command we use to execute the plan that is created. It is important to note that apply creates a plan if we don't specify one; if there is already a plan, it executes it.