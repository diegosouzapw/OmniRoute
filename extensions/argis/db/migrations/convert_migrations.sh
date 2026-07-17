#!/usr/bin/env bash
set -euo pipefail
# Convert existing migration files to golang-migrate format
# Format: {version}_{name}.up.sql and {version}_{name}.down.sql

set -e

MIGRATIONS_DIR="$(dirname "$0")"
BACKUP_DIR="${MIGRATIONS_DIR}/_backup_$(date +%Y%m%d_%H%M%S)"

echo "Converting migration files to golang-migrate format..."
echo "Backup directory: ${BACKUP_DIR}"

# Create backup
mkdir -p "${BACKUP_DIR}"
cp "${MIGRATIONS_DIR}"/*.sql "${BACKUP_DIR}/" 2>/dev/null || true

# Convert each migration file
for file in "${MIGRATIONS_DIR}"/[0-9][0-9][0-9]_*.sql; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    basename=$(basename "$file" .sql)
    version=$(echo "$basename" | cut -d'_' -f1)
    name=$(echo "$basename" | cut -d'_' -f2-)
    
    # Remove leading zeros from version for golang-migrate
    version_num=$((10#$version))
    version_padded=$(printf "%06d" $version_num)
    
    up_file="${MIGRATIONS_DIR}/${version_padded}_${name}.up.sql"
    down_file="${MIGRATIONS_DIR}/${version_padded}_${name}.down.sql"
    
    echo "Converting: $file -> ${up_file} and ${down_file}"
    
    # Copy content to .up.sql
    cp "$file" "$up_file"
    
    # Create basic .down.sql (DROP statements)
    # This is a template - you'll need to customize the down migrations
    cat > "$down_file" <<EOF
-- Rollback migration: ${name}
-- WARNING: This is a generated template. Review and customize before use.

-- Drop indexes (reverse order)
-- TODO: Add specific DROP INDEX statements

-- Drop tables (reverse order)
-- TODO: Add specific DROP TABLE statements

-- Drop extensions (if any)
-- DROP EXTENSION IF EXISTS "vector";
-- DROP EXTENSION IF EXISTS "uuid-ossp";
EOF
    
    # Remove original file
    rm "$file"
done

echo "Conversion complete!"
echo "IMPORTANT: Review and customize the .down.sql files before using migrations."
echo "Backup saved to: ${BACKUP_DIR}"
