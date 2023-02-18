<h1 align='center'>Version Control</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

Version control, also known as source control, is the practice of tracking and managing changes to software code. Using version control software is a best practice for high performing software and DevOps teams. Version control also helps developers move faster and allows software teams to preserve efficiency and agility as the team scales to include more developers.

## Git
Git is a free and open-source distributed version control system, which is designed to handle everything from small to very large projects with speed and efficiency.

It's important to remember that **GitHub is not Git**. GitHub is just a hosting service. There are many other companies who offer hosting services that do the same thing as GitHub, such as GitLab and Bitbucket.

In Git, the workflow is mainly divided into three areas:
- **Working Area / Directory**: where we can add, modify or delete content. These are untracked files, meaning that they are not being handled by Git.
- **Staging Area or Index**: where the files from the working area are staged and snapshots are added. It's how Git knows what change are going to be made between the current commit and the new one (a commit is a snapshot in time).
- **Git Repository**: It is basically where you perform all the changes that need to be made i.e. perform commits to branch, checkout branch, make changes etc.

### Git CLI cheat sheet
_Setup_
```sh
# List configurations
$ git config --list
$ git config --get init.defaultbranch  # Get specific configuration

# Configure user information used across all local repositories
$ git config --global user.name USERNAME
$ git config --global user.email EMAIL

# Initialize a directory as a Git repository
$ git init DIR

# Clone an entire repository from a hosted location via URL
$ git clone URL [DIR]
```

_Stage & Snapshot_
```sh
# Stage all changes in DIR for the next commit. Replace DIR with a FILE to stage a specific file
$ git add DIR

# Unstage changes while retaining them in working directory
$ git reset DIR

# Commit the staged snapshot, but instead of launching a text editor, use MESSAGE as the commit message (-m)
$ git commit -m "MESSAGE"
$ git commit --amend -m "NEW MESSAGE"  # Amend local commit message

# Delete the FILE from project and stage the removal for commit
$ git rm FILE
```
_Inspect & Compare_
```sh
# Show which changes that are staged, unstaged, and untracked
$ git status

# Show unstaged changes of working directory.
$ git diff

# Show the differences of what is in branchA that is not in branchB
$ git diff branchB...branchA

# Show all commits in the current branch's history
$ git log
```
_Branch & Merge_
```sh
# List local branches. An '*' will appear next to the currently active branch (tracked branch)
$ git branch

# List local and remote branches
$ git branch -r

# Create a new local branch at the current commit
$ git branch BRANCH

# Switch to another branch and check it out into the working directory
$ git checkout BRANCH

# Delete local branch
$ git branch -d BRANCH

# Merge the specified branch's history into the current one
$ git merge BRANCH
```
_Share & Update_
```sh
# Updates all the remote tracking branches in local repository
$ git fetch
$ git fetch ALIAS BRANCH  # Fetch down specific BRANCH

# Merge a remote BRANCH into the tracked branch to bring it up to date
$ git merge ALIAS/BRANCH
$ git merge  # Merges with tracked remote branch. Only one branch is merged

# Fetch and merge any commits from the tracking remote branch. Essentially: git_pull = git_fetch + git_merge
$ git pull
$ git pull --rebase  # Pull and Rebase on tracked branch
$ git pull --rebase ALIAS BRANCH  # Pull from BRANCH and Rebase tracked branch

# Apply any commits of current branch ahead of the specified BRANCH. Rebasing requires to fetch, stash and commit changes first
$ git rebase BRANCH  # Rebase BRANCH
$ git rebase  # Rebase tracked branch

# Push local branch commits to the remote repository branch
$ git push  # Push to tracked branch
$ git push ALIAS BRANCH  # Push to BRANCH (also used to transform local branch into a remote branch)

# Delete remote branch
$ git push ALIAS -d BRANCH

# Reset staging area and working directory to match most recent commit and overwrite all changes in the working directory
$ git reset --hard ALIAS/BRANCH

# Add a Git URL as an alias
$ git remote add ALIAS URL
```
_Git hacks_
```sh
# Delete most local commit without losing progress
$ git reset --soft HEAD~1

# Delete last N pushed commits
$ git reset --hard LAST_GOOD_COMMIT_SHA
$ git push --force
```

### Best practices
- Commit naming conventions
- Version/Tag naming conventions

---
TODO list:

Git Pull Rebase vs Git Pull Merge
While both of these options will combine the changes fetched from your remote, the outcome will look very different in your Git history.
Git pull merge is the default method for combining changes in Git, and will merge the unpublished changes with the published changes, resulting in a merge commit.
With Git pull rebase, on the other hand, the unpublished changes will be reapplied on top of the published changes and no new commit will be added to your history.
With this in mind, you can see that Git pull rebase will result in a linear and cleaner project history by removing the unneeded merge commit.
We're going to walk you through how to perform a Git pull rebase using the CLI and the legendary cross-platform GitKraken Client.

GitHub, GitLab

CI/CD Pipelines:
Push event	A push is made to the repository.
Tag event	Tags are created or deleted in the repository.
Issue event	A new issue is created or an existing issue is updated, closed, or reopened.
Comment event	A new comment is made on commits, merge requests, issues, and code snippets.
Merge request event	A merge request is created, updated, merged, or closed, or a commit is added in the source branch.
Wiki page event	A wiki page is created, updated, or deleted.
Pipeline event	A pipeline status changes.
Job event	A job status changes.
Deployment event	A deployment starts, succeeds, fails, or is canceled.
Group member event	A user is added or removed from a group, or a user's access level or access expiration date changes.
Subgroup event	A subgroup is created or removed from a group.
Feature flag event	A feature flag is turned on or off.
Release event	A release is created or updated.
