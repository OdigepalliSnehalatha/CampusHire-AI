@echo off
setlocal
set DIRNAME=%~dp0
set TOOLS_MVN=%DIRNAME%..\tools\apache-maven-3.9.6\bin\mvn.cmd

if exist "%TOOLS_MVN%" (
    call "%TOOLS_MVN%" %*
    exit /b %ERRORLEVEL%
)

mvn %*
exit /b %ERRORLEVEL%
