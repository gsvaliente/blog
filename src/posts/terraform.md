---
title: "Terraform - Infra As Code"
date: "2026-08-26"
tags: ["aws", "IaC", "beginner"]
description: "Basics of Terraform and Infrastrucre as Code"
---

How we manage infrastrucure, achieving a desired state vs the current state of the infrastructure.

The industry standard for declaring InfrastructureAsCode (IaC)
The basic lifecycle is:

- Create
- Modify
- Delete

The goal is to achieve the desired state, compared to the current state of the infrastructure.
This is done in the following cycle:

1. Write the config
2. Communicate with desired provider
3. Provider communicates with the API

### Why IaC is important

Probably the most important point is that it is API-drive. This means that it talks directly to the cloud provider. There is no longer a need to have a human intermediary trying to manage our hired infrastructure

It also grants us with transparency in knowing exactly what is happening and when. There is no longer queues of other companies trying to create VMs in a server.

Automation and versioning: being in code means that we can use a version control like git to save and share our terraform code. To duplicate it exactly as we want it and avoid the clicking console.

### Terraform Plan and Apply

When creating or modifying the config it is imporatnt to know that there are two steps.
The first one is that it creates a plan and tells everything that will be modified, in the correct order that the modifications need to happen too. This is the important step to audit and check for everything before changes are applied.
It is important to note that is the the point in which terraform compares the new changes to the current state of the infrastrucuture.
Then when it applies is when the changes are actually happening. Creates a new state that the infrastrucure will be looking like.

### Terraform init

This is the command that initializes the terraform directory in the project. It does the lifting for us. Creates the backlog of all the dependencies and backend that we need to build the infrastrucure. This command can be ran many times. It is where we can potentially upgrade our dependencies if needed.

### Terraform apply

This is the command we use to execute the desired plan that was created. It is imporatant that we specify the plan that needs to be created, if there is no plan then a new plan will be created.
