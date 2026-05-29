@echo off
title Git Dokumentum Szinkronizalo v3
cd /d "%~dp0"

:loop
echo [%time%] Ellenorzes...

:: 1. Mindent hozzaadunk (a .gitignore megvedi a C# kodot, a .bat pedig bekerül, igy nincs hiba!)
git add .

:: 2. Megnezzuk, hogy van-e tenyleges valtozas (uj PNG, modositott Word stb.)
git status --porcelain | findstr /R "^" >nul
if %errorlevel% == 0 (
    echo [INFO] Valtozas eszlelve! Feltoltes folyamatban...
    
    :: 3. Automatikus frissites a felhobol, ha elteres lenne
    git pull origin main --rebase
    
    :: 4. Elmentjuk es feltoljük
    git commit -m "Automata terv-mentes (%date% %time%)"
    git push origin main
    echo [INFO] Sikeresen feltoltve a GitHubra!
)

:: 30 masodperc varakozas
timeout /t 30 /nobreak >nul
goto loop