# Contributing to Mat-Map

This doc explains exactly how we work together on this repo. If you're new to collaborative Git workflows, read this end to end once — after that it becomes muscle memory.

The short version: **Issue → Branch → Pull Request → Review → Merge → Delete branch.** Never push straight to `main`.

---

## 0. One-time setup

Before your first contribution:

```bash
git clone git@github.com:micah1of1/Mat-Map.git
cd mat-map
```

If you haven't set up SSH access to GitHub yet, ask Micah — it saves you from typing a password every push.

---

## 1. Find or create an Issue

Every piece of work starts as a **GitHub Issue**, not as code.

- Go to the repo → **Issues** tab
- Check if an issue already exists for what you want to work on
- If not, click **New Issue**, give it a clear title (e.g. "Fetch transit routes from Google Maps API"), and add a short description of what "done" looks like
- Assign it to yourself and add it to the relevant **Milestone** (M1–M5) and the **Project board**

**Why:** issues are how the team tracks who's doing what, so two people don't accidentally build the same thing.

---

## 2. Create a branch for that issue

Never write code directly on `main`. Always branch off it first.

```bash
git checkout main
git pull origin main          # make sure you're starting from the latest code
git checkout -b feature/fare-estimates
```
or `switch` , whatever floats your boat.

**Branch naming convention:**
- `feature/short-description` — new functionality (e.g. `feature/fare-estimates`)
- `fix/short-description` — bug fixes (e.g. `fix/eta-rounding-error`)
- `docs/short-description` — documentation only (e.g. `docs/api-setup-guide`)

Keep branch names lowercase, hyphenated, and tied to the issue you're solving.

---

## 3. Do the work, commit as you go

Make your changes, then stage and commit them in small, logical chunks — not one giant commit at the end.
Commits should be made up of **single** changes to be easily reversible.

```bash
git add .
git commit -m "Add fare calculation for matatu routes"
```

**Good commit messages:**

We use [Conventional Commits](https://www.conventionalcommits.org/) — prefix every commit with a type so it's instantly clear what kind of change it is:

| Prefix | Use for | Example |
|--------|---------|---------|
| `feat:` | A new feature | `feat: add fare lookup endpoint` |
| `fix:` | A bug fix | `fix: correct ETA rounding error` |
| `docs:` | Documentation only | `docs: update setup instructions` |
| `style:` | Formatting, no logic change (whitespace, linting) | `style: format fare.js with prettier` |
| `refactor:` | Code change that's neither a fix nor a feature | `refactor: simplify stage-parsing logic` |
| `test:` | Adding or fixing tests | `test: add unit tests for fare calculator` |
| `chore:` | Maintenance (deps, config, build scripts) | `chore: update google-maps package version` |

Format: `type: short description in present tense`, all lowercase after the prefix.

If a commit closes an issue, reference it: `feat: add fare lookup endpoint (closes #12)`

Push your branch to GitHub regularly so your work isn't sitting only on your machine:

```bash
git push -u origin feature/fare-estimates
```

(After the first push, `git push` alone works for that branch.)

---

## 4. Open a Pull Request (PR)

Once your feature/fix is ready (or even partway done and you want feedback):

1. Go to the repo on GitHub — you'll usually see a banner suggesting "Compare & pull request" for your recently pushed branch
2. Set the base branch to `main` and compare branch to yours
3. Give the PR a clear title and description:
   - What does this change?
   - Which issue does it close? (type `Closes #12` in the description — GitHub will auto-close the issue when the PR merges)
4. Request a review from at least one teammate

**Why a PR instead of pushing straight to `main`:** it gives someone else a chance to catch bugs, suggest improvements, and keeps `main` always in a working state.

---

## 5. Review

If you're the reviewer:
- Read the diff (the changed code) on the **Files changed** tab
- Leave comments on specific lines if something's unclear or could be improved
- Approve if it looks good, or request changes if not

If you're the author and changes are requested:
```bash
# make the fixes locally on the same branch
git add .
git commit -m "Address review feedback"
git push
```
The PR updates automatically — no need to open a new one.

---

## 6. Merge

Once approved:
- Click **Merge pull request** on GitHub (use "Squash and merge" to keep `main`'s history clean — turns all your small commits into one tidy commit)
- Confirm the merge

This automatically closes the linked issue if you wrote `Closes #12` in the PR description.

---

## 7. Delete the branch

After merging, the branch has done its job — delete it to keep things tidy.

- GitHub usually shows a **Delete branch** button right after merging — click it
- Locally, clean up too:
  ```bash
  git checkout main
  git pull origin main          # get the newly merged code
  git branch -d feature/fare-estimates   # delete your local branch
  ```

---

## Quick reference

```bash
git checkout main
git pull origin main
git checkout -b feature/my-thing

# ...make changes...
git add .
git commit -m "feat: describe the change"
git push -u origin feature/my-thing

# open PR on GitHub, get it reviewed, merge it there

git checkout main
git pull origin main
git branch -d feature/my-thing
```

## Rules of thumb

- **Never** commit directly to `main`
- **One branch = one issue/feature.** Don't mix unrelated changes in one PR
- **Pull before you branch**, so you're not building on stale code
- **Small, frequent commits** beat one giant commit
- If you're stuck or a PR is getting too big, ask in the group chat before disappearing into it for a week

Welcome to the team — if any step here doesn't make sense, ask rather than guess. Better to over-communicate early than untangle a merge conflict later.
