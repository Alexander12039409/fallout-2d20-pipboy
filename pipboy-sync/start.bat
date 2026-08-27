@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
    echo.
    echo  Нужен Node.js: https://nodejs.org
    echo  Установите LTS и снова запустите этот файл.
    echo.
    pause
    exit /b 1
)
echo.
echo  Pip-Boy session server
echo  ----------------------
node server.js
echo.
pause
