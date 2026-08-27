@echo off
chcp 65001 >nul
cd /d "%~dp0..\pipboy-sync"
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
echo  Локальный сервер Pip-Boy
echo  Мастер:  http://localhost:8787/master/
echo  Игрок:   http://localhost:8787/play/
echo.
node server.js
echo.
pause
