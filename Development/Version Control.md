<h1 align='center'>Version Control</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

Version control, also known as source control, is the practice of tracking and managing changes to software code. Using version control software is a best practice for high performing software and DevOps teams. Version control also helps developers move faster and allows software teams to preserve efficiency and agility as the team scales to include more developers.

## Git
Git is a free and open-source distributed version control system, which is designed to handle everything from small to very large projects with speed and efficiency.

It's important to remember that **GitHub is not Git**. GitHub is just a hosting service. There are many other companies who offer hosting services that do the same thing as GitHub, such as GitLab and Bitbucket.

In Git, the workflow is mainly divided into three areas:
- **Working Area / Directory**: where we can add, modify or delete content. These are untracked files, meaning that they are not being handled by Git.
- **Staging Area or Index**: where the files from the working area are staged and snapshots are added. It's how Git knows what change are going to be made between the current commit and the new one (a commit is a snapshot in time).
- **Git Repository**: It is basically where you perform all the changes that need to be made i.e. perform commits to branch, checkout branch, make changes etc.

## Commit message convention
Following the Conventional Commits Specification (https://www.conventionalcommits.org/)
The commit message should be structured as follows:
```sh
———————————————————————————————————————
<type>[optional scope]: <description>
<BLANK_LINE>
[optional body]
<BLANK_LINE>
[optional footer(s)]
———————————————————————————————————————
```

Find an example below:
```sh
———————————————————————————————————————
feat[auth]: Add JWT token expiration handling
Ensure that tokens expire after 1 hour and implement auto-refresh.
Fixes: #123
Signed-off-by: Random Guy <random@example.com>
———————————————————————————————————————
```

Types (based on the Angular convention)
- `feat`: A new feature
- `fix`: A bug fix/hotfix
- `build`: Changes that affect the build system or external dependencies (e.g., upgrading dependencies, modifying build scripts)
- `chore`: Routine changes that don’t affect the codebase directly (e.g., updating dependencies, maintenance tasks)
- `ci`: Changes to CI/CD configuration files or scripts (e.g., GitHub Actions, Jenkins, Travis, CircleCI)
- `docs`: Documentation updates (e.g., README, comments, inline documentation)
- `style`: Code style changes (e.g., formatting, missing semicolons, white-space fixes) that do not affect functionality
- `refactor`: Code refactoring without changing functionality (e.g., improving code structure, renaming variables)
- `perf`: Performance improvements (e.g., optimizing loops, reducing memory usage)
- `test`: Adding or modifying tests (e.g., unit tests, integration tests)


#### Daily Git Workflow
1. Pull changes from main branch before start working on a new feature using `git pull`.
2. See what changes were made using `git log` or `git show COMMIT_SHA` to see the details.
3. Create a new branch for the feature using `git checkout -b BRANCH`.
4. Develop feature.
5. Stage and Commit changes without pushing.
6. Pull from main branch into feature branch and Rebase feature branch using `git pull --git  ALIAS MAIN`.
7. Push force to feature branch using `git push ALIAS BRANCH -f`.
8.  - _option 1_:
        - Pull from feature branch into main branch and Rebase main branch using `git pull --rebase ALIAS BRANCH`.
        - Push to main branch using `git push`.
    - _option 2_:
        - Create a Pull Request on a management tool, such as GitHub, so that it can be validated and merged into the code base.

### Git CLI cheatsheet
Some definitions:
- The `origin` is an alias on your system for a particular remote repository. It's not actually a property of that repository.
- A _Upstream Branch_ is a remote branch.

_Setup_
```sh
# List configurations
$ git config --list
$ git config --get init.defaultbranch  # Get specific configuration

# Configure user information used across all local repositories
$ git config --global user.name USERNAME
$ git config --global user.email EMAIL
$ git config --global core.editor EDITOR
$ git config --global core.editor "code --wait" # Example for VS Code

# Initialize a directory as a Git repository
$ git init DIR

# Clone an entire repository from a hosted location via URL
$ git clone URL [DIR]

# Add SSH key as signing key to have commits verified
$ git config --global gpg.format ssh
$ git config --global user.signingkey /PATH/TO/.SSH/KEY.PUB
$ git config --global commit.gpgsign true

# Add a Git URL as an alias
$ git remote add ALIAS URL

# Update a target repository based on mirroring another one
$ git clone --bare REPO_TO_UPDATE_URL
$ git push --mirror REPO_TO_MIRROR_URL
```

_Stage & Snapshot_
```sh
# Stage all changes in DIR for the next commit. Replace DIR with a FILE to stage a specific file
$ git add DIR

# Unstage changes while retaining them in working directory
$ git reset DIR

# Undo changes
$ git restore DIR

# Save current state of the directory and the index before switching branches
$ git stash push DIR

# Pop stashed changes (recover saved changes)
$ git stash pop

# Commit the staged snapshot, but instead of launching a text editor, use MESSAGE as the commit message [-m]
$ git commit -m "MESSAGE"
$ git commit --amend -m "NEW MESSAGE"  # Amend local commit message. Use forced push afterwards?

# Delete the FILE from project and stage the removal for commit
$ git rm FILE

# Untrack changes
$ git rm -r --cached DIR
```
_Inspect & Compare_
```sh
# The following commands only use the local repository history

# Show which changes that are staged, unstaged, and untracked
$ git status

# Show unstaged changes of working directory.
$ git diff

# Show the differences of what is in branchA that is not in branchB
$ git diff branchB...branchA

# Show the last 5 commits on the current branch's history
$ git log

# Show log message and textual diff of a specific commit
$ git show COMMIT_SHA
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
$ git checkout -b BRANCH  # Creates a new branch and checkouts to it

# Delete local branch
$ git branch -d BRANCH
```
_Share & Update_
```sh
# Updates all the remote tracking branches in local repository (no merge)
$ git fetch
$ git fetch ALIAS BRANCH  # Fetch down specific BRANCH

# Merge a remote BRANCH into the tracked branch to bring it up to date
$ git merge ALIAS/BRANCH
$ git merge  # Merges with tracked remote branch. Only one branch is merged

# Apply the changes introduced by some existing commits between branches
$ git cherry-pick COMMIT_SHA

# Fetch and merge any commits from the tracking remote branch. Essentially: git_pull = git_fetch + git_merge
$ git pull
$ git pull --rebase  # Pull and Rebase on tracked branch
$ git pull --rebase ALIAS BRANCH  # Pull from BRANCH and Rebase on tracked branch

# Apply any commits of current branch ahead of the specified BRANCH.
# Rebasing requires to fetch, stash and commit changes first
$ git rebase BRANCH  # Rebase BRANCH
$ git rebase  # Rebase tracked branch
$ git rebase -i --root  # Rebase all commits in interactive mode
$ git rebase -i HEAD~N  # Used when squashing
$ git rebase --abort  # Abort rebase process

# Push local branch commits to the remote repository branch
$ git push  # Push to tracked branch
$ git push ALIAS BRANCH  # Push to BRANCH (also used to transform local branch into a remote branch)

# Delete remote branch
$ git push -d ALIAS BRANCH

# Delete most recent local commit without losing changes
$ git reset --soft HEAD~1
# Reset staging area and working directory to match most recent commit and overwrite all changes in the working directory
$ git reset --hard ALIAS/BRANCH

# Add new submodule from another repo
$ git submodule add URL
# Update submodule
$ git submodule update --remote --recursive
```
_Git hacks_
```sh
# Delete last N pushed commits
$ git reset --hard LAST_GOOD_COMMIT_SHA
$ git push --force

# Allow for empty commits
$ git commit --allow-empty -m "Empty commit"
```
