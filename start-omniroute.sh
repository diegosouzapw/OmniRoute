#!/bin/bash
export HOME=/home/openclaw
export PATH="$HOME/.local/share/fnm:$PATH"
eval "$(fnm env)"
fnm use 22

export NODE_ENV=production
export PORT=20128
export OMNIROUTE_PORT=20128
export DATA_DIR=/home/openclaw/.config/omniroute
export JWT_SECRET=i1V+RLH+5isrAETSeS+X60Z91QAfX6qNdhJbw26T2bk=
export ANTIGRAVITY_OAUTH_CLIENT_SECRET=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

cd /home/openclaw/omniroute-src
exec npm run start
