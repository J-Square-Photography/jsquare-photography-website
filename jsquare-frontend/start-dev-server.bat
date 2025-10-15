@echo off
echo ========================================
echo   J Square Photography Dev Server
echo ========================================
echo.

echo Checking for existing processes on port 3000...
set FOUND_PROCESS=0
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    echo Found process on port 3000 (PID: %%a)
    echo Killing only the process using port 3000...
    taskkill /F /PID %%a >nul 2>&1
    if %errorlevel%==0 (
        echo Successfully killed process on port 3000
        set FOUND_PROCESS=1
    )
    timeout /t 1 >nul
)

if %FOUND_PROCESS%==0 (
    echo No process found on port 3000
)
echo.

cd /d "D:\JSP Website redesign\jsquare-photography-website\jsquare-frontend"
echo Changed directory to: %cd%
echo.

echo Cleaning Next.js cache completely...
if exist ".next" (
    echo Removing .next directory...
    rmdir /s /q ".next" 2>nul
    if exist ".next" (
        echo Warning: Could not fully remove .next, trying with timeout...
        timeout /t 2 >nul
        rmdir /s /q ".next" 2>nul
    )
)

if exist "node_modules\.cache" (
    echo Removing node_modules cache...
    rmdir /s /q "node_modules\.cache" 2>nul
)

echo Cache cleaned successfully!
echo.

echo Checking for common Windows module issues...
echo (Note: Using standard Tailwind CSS to avoid lightningcss binary issues)
echo.

echo Installing dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo.

echo Starting Next.js development server...
echo.
echo ==========================================
echo  Server will start on http://localhost:3000
echo  Press Ctrl+C to stop the server
echo ==========================================
echo.

call npm run dev