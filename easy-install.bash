#!/bin/bash

# Function to recursively find package.json files and run 'pnpm install'
function install_packages() {
    # Find all directories containing a package.json file, excluding node_modules
    find . -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \; | while read -r dir; do
        echo "Entering directory: $dir"
        cd "$dir" || { echo "Failed to enter $dir"; exit 1; }
        # Run the pnpm install command
        echo "Running 'pnpm install' in $dir"
        pnpm install
        # Return to the previous directory
        cd - > /dev/null || { echo "Failed to return to previous directory"; exit 1; }
    done
}

install_packages
