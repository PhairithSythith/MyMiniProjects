@echo off
title Git Dokumentum Szinkronizalo
cd /d "%~dp0"

:loop
echo [%time%] Ellenorzes...

:: Csak a doksikat adjuk hozza
git add *.docx *.txt *.pdf *.png *.jpg 2>nul

:: Ellenorizzuk, hogy van-e valtozas
git diff --cached --quiet
if %errorlevel% == 1 (
    echo [INFO] uj vagy modositott dokumentum eszlelve! feltoltes...
    git commit -m "Automata terv-mentes (%date% %time%)"
    git push origin main
    echo [INFO] Kesz! Dokumentumok a GitHubon.
)

:: 60 masodperc varakozas
timeout /t 60 /nobreak >nul
goto loop