# Lab 01: Git Basics

## Goal

In this lab you will create your first local Git repository, connect it to a private remote repository on GitHub, add a `README.md` file with your student information, and publish your work.

Each task includes both the practical step and the underlying idea so that you understand what Git is doing.

## 1. Install Git for the Command Line

Before creating a repository, install Git on your computer and make sure it is available from the terminal or command prompt.

Official installation page: [Git Downloads](https://git-scm.com/downloads)

### Task

Install Git for your operating system:

- Windows: install Git from the [official Git for Windows distribution](https://git-scm.com/download/win).
- macOS: install Git using Xcode Command Line Tools or a package manager such as Homebrew.
- Linux: install Git with your distribution package manager.

After installation, confirm that Git is available:

```bash
git --version
```

### Concept

Git is a version control system. A version control system records changes to files over time, allowing you to keep a history of your work and publish that work to shared servers such as [GitHub](https://github.com/).

In this lab, you will use Git from the command line because it exposes the core workflow clearly and works the same way across different tools and editors.

## 2. Create a Folder for the Lab

### Task

Create a new folder for this exercise and move into it:

```bash
mkdir lab01-git
cd lab01-git
```

### Concept

Git does not store projects in a special global place. Instead, each project usually lives in its own normal directory on your computer. When you initialize Git in that directory, Git starts tracking the contents of that project.

## 3. Create a Local Repository

### Task

Initialize Git in the current directory:

```bash
git init
```

Then check the status:

```bash
git status
```

### Concept

A repository is the place where Git stores the history and metadata of a project. In simple terms, a repository is a project directory managed by Git.

At this stage, the repository is local, which means it exists only on your computer. You can already track files and create history even before connecting to GitHub.

## 4. Inspect the `.git` Folder

### Task

After running `git init`, look for a folder named `.git` inside your project directory.

Depending on your operating system and file explorer settings, this folder may be hidden:

- Windows: hidden folders may not appear in File Explorer until hidden items are enabled.
- macOS: hidden files and folders can be toggled in Finder.
- Linux: many file managers hide names starting with `.` by default.

If you use the terminal, you can list hidden files with:

```bash
ls -la
```

### Concept

The `.git` folder is what makes the directory a Git repository. It contains Git's internal data, such as configuration and project history.

You should understand that `.git` exists, but you should not manually edit its contents. Git commands manage that internal structure for you.

## 5. Create an Empty Private Repository on GitHub

### Task

Sign in to your personal [GitHub](https://github.com/) account and create a new repository with these characteristics:

- Owner: your personal account
- Visibility: private
- Initialization: empty repository

Do not add a `README`, `.gitignore`, or license on GitHub. The remote repository should start empty.

### Concept

[GitHub](https://github.com/) is not Git itself. Git is the version control system running on your machine, while GitHub is a hosting service for remote repositories.

A remote repository is a copy of your project history stored on another server. In this lab, GitHub will store the remote version of your local repository so that you can publish your work and access it from other machines.

## 6. Connect the Local Repository to GitHub

### Task

Copy the repository URL from GitHub and add it as the remote named `origin`:

```bash
git remote add origin <your-github-repository-url>
```

Check that the remote was added correctly:

```bash
git remote -v
```

### Concept

A remote is a named connection from your local repository to another repository.

The name `origin` is a common convention for the main remote repository, but it is only a name. What matters is that Git now knows where to send your local history when you decide to publish it.

## 7. Create a `README.md` File with Your Student Information

### Task

Create a file named `README.md` in the repository root.

Add your student information, for example:

```md
# Lab 01

- Name: Your Name
- Student number: Your Student Number
- Course: Web Programming and Architecture
```

After saving the file, run:

```bash
git status
```

### Concept

Git tracks files in the working directory, but newly created files are not automatically prepared for the next snapshot.

The `README.md` file is commonly used to describe a project. In this lab it is also a simple example of content that you will track and publish.

## 8. Stage the File with `git add`

### Task

Stage the `README.md` file:

```bash
git add README.md
```

Then inspect the state again:

```bash
git status
```

### Concept

The command `git add` places changes in the staging area. The staging area is the set of changes that you want Git to include in the next recorded snapshot.

Using `git add README.md` stages one specific file. This is useful when you want precise control over what will be included next.

### About `git add --all`

You can also stage all tracked and untracked changes in the repository with:

```bash
git add --all
```

This form is broader than `git add README.md` because it updates the staging area with all current changes, including new files, modified files, and deleted files.

Use `git add --all` when you intentionally want to prepare every change in the repository for the next commit.

## 9. Create the First Commit

### Task

Create your first commit:

```bash
git commit -m "Add initial README with student information"
```

### Concept

A commit is a recorded snapshot of the staged changes together with a message that explains what was changed.

Commits are the core building blocks of Git history. After this step, your local repository contains a first saved version of the project.

## 10. Push the Repository to GitHub

### Task

Publish the local repository to GitHub:

```bash
git push -u origin main
```

If your default branch name is not `main`, use the branch name shown by Git in your local repository.

### Concept

The command `git push` sends local commits to a remote repository.

In this command:

- `origin` is the remote name.
- `main` is the branch being published.
- `-u` sets the upstream relationship so that future pushes and pulls can use shorter commands.

In practical terms, `git push` copies the commit history from your local repository to GitHub.

## 11. Verify the Result on GitHub

### Task

Open the repository page on GitHub and confirm that:

- the repository is private
- the `README.md` file is visible
- the commit history contains your first commit

### Concept

Verification matters because version control is not only about running commands. It is also about understanding the state of the local repository and confirming that the remote repository contains what you intended to publish.

## Summary of Commands Used

```bash
git --version
mkdir lab01-git
cd lab01-git
git init
git status
ls -la
git remote add origin <your-github-repository-url>
git remote -v
git add README.md
git add --all
git commit -m "Add initial README with student information"
git push -u origin main
```

## What You Should Understand After This Lab

By the end of this lab, you should be able to explain:

- what Git is used for
- what a local repository is
- why the `.git` folder exists
- what a remote repository on GitHub is
- what `git add` does
- when `git add --all` is useful
- what `git push` does