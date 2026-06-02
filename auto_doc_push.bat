@echo off
title Git Dokumentum Szinkronizalo v3 - JAVÍTOTT
cd /d "%~dp0"

:loop
echo [%time%] Ellenorzes...

:: 1. A zárolt .vs mappát kikerülve, csak a tényleges kódot és konfigurációkat adjuk hozzá
git add "Csharp/*.cs" 2>nul
git add "Csharp/*.csproj" 2>nul
git add "Csharp/*.sln" 2>nul
git add "Csharp/*.json" 2>nul
:: Hozzáadjuk magát a bat fájlt és a projekt gyökerét a biztonság kedvéért
git add auto_doc_push.bat
git add .

:: 2. Megbízható ellenőrzés: ha a 'git status -s' kimenete nem üres, akkor van változás!
set "valtozas="
for /f "tokens=*" %%i in ('git status -s') do (
    set valtozas=1
)

if defined valtozas (
    echo [INFO] Valtozas eszlelve! Feltoltes folyamatban...
    
    :: 3. Elmentjük a változásokat helyben, hogy a pull ne hasaljon el
    git commit -m "Automata terv-mentes (%date% %time%)"
    
    :: 4. Frissítés a felhőből (ha kell), majd feltolás
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