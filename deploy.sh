#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create .nojekyll file to bypass Jekyll processing
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# If you're deploying to a custom domain
# echo "www.example.com" > dist/CNAME

# Initialize git in the dist folder
echo "Initializing git in the dist folder..."
cd dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch
echo "Pushing to gh-pages branch..."
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

# Go back to the project root
cd ..

echo "Deployment complete!"
