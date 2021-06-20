set SSL_CRT_FILE=..\certs\handyprops.damasceno.pro.cert
set SSL_KEY_FILE=..\certs\handyprops.damasceno.pro.priv
set HTTPS=true
set PORT = 48654
set HOST=handyprops.damasceno.pro
set NODE_ENV='development'

cp config/webpackDevServer.config.js node_modules/react-scripts/config
REM cp modules_override/* node_modules -r
ipconfig.exe /flushdns