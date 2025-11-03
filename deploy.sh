#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment process...${NC}"

# Step 1: Git add all changes
echo -e "${BLUE}📦 Adding all changes to git...${NC}"
git add .

# Check if there are any changes to commit
if git diff --cached --quiet; then
    echo -e "${RED}❌ No changes to commit${NC}"
    exit 1
fi

# Step 2: Show status and get commit message
echo -e "${BLUE}📋 Current git status:${NC}"
git status --short

echo ""
echo -e "${GREEN}✏️  Enter your commit message:${NC}"
read -p "Commit message: " commit_message

# Check if commit message is not empty
if [ -z "$commit_message" ]; then
    echo -e "${RED}❌ Commit message cannot be empty${NC}"
    exit 1
fi

# Step 3: Commit with the message
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "$commit_message"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Commit failed${NC}"
    exit 1
fi

# Step 4: Push to remote
echo -e "${BLUE}🌐 Pushing to remote repository...${NC}"
git push

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful! 🎉${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    exit 1
fi