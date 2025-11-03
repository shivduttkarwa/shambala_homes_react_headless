@echo off
echo.
echo 🚀 Starting deployment process...
echo.

REM Step 1: Git add all changes
echo 📦 Adding all changes to git...
git add .

REM Check if there are changes to commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo ❌ No changes to commit
    pause
    exit /b 1
)

REM Step 2: Show status and get commit message
echo.
echo 📋 Current git status:
git status --short
echo.

set /p commit_message="✏️ Enter your commit message: "

REM Check if commit message is not empty
if "%commit_message%"=="" (
    echo ❌ Commit message cannot be empty
    pause
    exit /b 1
)

REM Step 3: Commit with the message
echo.
echo 💾 Committing changes...
git commit -m "%commit_message%"

if %errorlevel% neq 0 (
    echo ❌ Commit failed
    pause
    exit /b 1
)

REM Step 4: Push to remote
echo.
echo 🌐 Pushing to remote repository...
git push

if %errorlevel% equ 0 (
    echo.
    echo ✅ Deployment successful! 🎉
) else (
    echo ❌ Push failed
    pause
    exit /b 1
)

echo.
pause