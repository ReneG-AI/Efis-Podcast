@echo off
echo ===================================
echo    EFIS PODCAST - INICIANDO APP
echo ===================================
echo.

cd %~dp0
echo Directorio: %CD%
echo.

echo Ejecutando servidor Next.js...
call node_modules\.bin\next dev

pause 