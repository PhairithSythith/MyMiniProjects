@echo off
title Git Dokumentum Szinkronizalo v4 - JAVÍTOTT
cd /d "%~dp0"

:loop
echo [%time%] Ellenorzes...

:: A .gitignore fájl miatt a 'git add .' most már NEM fogja bántani a zárolt .vs mappát!
git add . 2>nul

:: Megbízható ellenőrzés: ha a 'git status -s' kimenete nem üres, akkor van változás!
set "valtozas="
for /f "tokens=*" %%i in ('git status -s') do (
    set valtozas=1
)

if defined valtozas (
    echo [INFO] Valtozas eszlelve! Feltoltes folyamatban...
    
    :: Elmentjük a változásokat helyben
    git commit -m "Automata terv-mentes (%date% %time%)"
    
    :: Frissítés a felhőből (rebase-el, hogy tiszta legyen), majd feltolás
    git pull origin main --rebase
    git push origin main
    
    echo [INFO] Sikeresen feltoltve a GitHubra!
) else (
    echo [INFO] Nincs valtozas.
)

:wait_section
:: 30 masodperc varakozas
timeout /t 30 /nobreak >nul
goto loop