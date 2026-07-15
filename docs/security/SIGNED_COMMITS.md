# Signed Commits Guide

> OmniRoute requires GPG-signed commits on the `main` branch.

## Setup

### 1. Generate a GPG key

```bash
gpg --full-generate-key
```

Choose:
- Kind: RSA and RSA (4096 bits)
- Expiry: 2y
- Name: your GitHub display name
- Email: your GitHub verified email

### 2. Add the key to GitHub

```bash
gpg --armor --export <key-id>
```

Copy the output, go to GitHub → Settings → SSH and GPG Keys → New GPG Key.

### 3. Configure Git

```bash
git config --global user.signingkey <key-id>
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

### 4. Verify

```bash
echo "test" | gpg --clearsign
```

## Signing commits

```bash
git commit -S -m "feat: add widget support"
```

## Signing tags

```bash
git tag -s v3.8.43 -m "v3.8.43"
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `gpg: signing failed: No secret key` | `export GPG_TTY=$(tty)` |
| Commit shows "Unverified" on GitHub | Email must match verified GitHub email |
| Key expired | Extend expiry: `gpg --edit-key <id>`, then `expire` |
| SSH key instead of GPG | GH supports SSH signing too |

## Enforcement

Branch protection rules on `main` require signed commits. PRs with unsigned commits
will fail the `Require signed commits` status check.
