# Feature: [Feature] Make installation script detect termux.

> GitHub Issue: #1764 — opened by @isaacmoren1034-boop on 2026-04-29T08:04:41Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

Due architecture of termux (as in previous cases like with better-sqlite3), wreq-js cannot load native arm64 module of libgcc (even if required library installed like in screenshots)

<img width="1371" height="163" alt="Image" src="https://github.com/user-attachments/assets/da01d29b-bbd7-4315-9127-a9b3516d2d30" />

<img width="2905" height="628" alt="Image" src="https://github.com/user-attachments/assets/54e5ff31-a837-4b5e-b643-aade7a15b0f5" />

### Proposed Solution

In first - I wanted to wreq-js be as additional packet, so users could just skip installation with --no-additional.
But after some tests I could find out way simple, but buggy solution.
After just commenting out detection function (and badly rewrite, sorry just noob in programming) in wreq-js.js script (like in screenshot), 

<img width="2852" height="974" alt="Image" src="https://github.com/user-attachments/assets/36df3927-fc25-4cad-af38-fb2e9c43f1e9" />

omniroute finally start out without any problem.

<img width="2906" height="1553" alt="Image" src="https://github.com/user-attachments/assets/b1e8a3ec-fab9-4eb2-ac2a-638e248e4d26" />

### Alternatives Considered

_No response_

### Acceptance Criteria

As temp. solution. just make simple script that would install wreq-js.js script with already comment out detection functions. (like in that crap screenshot).
It's still a little bit buggy (couldn't catch all and save screenshots, but they're not critical). But OmniRoute still works, provider's oauth and keys files are saving and etc. Maybe if I catch i'll post here.

### Area

Docker / Deployment, Other, Proxy / Routing, Dashboard / UI

### Related Provider(s)

_No response_

### Additional Context

Thank you.

### Expected Test Plan

_No response_

## 💬 Community Discussion

*No comments.*

### Participants

- @isaacmoren1034-boop

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Refined and scoped for implementation.

### What it solves

- OmniRoute fails to start or install properly on Termux because `wreq-js` attempts to load a native `libgcc` arm64 module which is incompatible.

### How it should work (high level)

1. Update the `postinstall` script to check `process.env.PREFIX` for termux.
2. If termux is detected, gracefully skip or patch the wreq-js installation/loading.

### Affected areas

- scripts/postinstall.mjs, open-sse/executors/wreq.ts

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
