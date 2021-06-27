certbot -n --agree-tos --non-interactive \
	-d handyprops.damasceno.pro \
	-d demo.handyprops.damasceno.pro \
	-d www.handyprops.damasceno.pro \
	-m thubaidamasceno@gmail.com certonly  \
	--cert-name handyprops.damasceno.pro  \
	--preferred-challenges http  \
	--http-01-port 8008 --webroot  -w ./www  \
	--keep-until-expiring --rsa-key-size 4096  \
	--config-dir ./certs/

cd certs
cp live/handyprops.damasceno.pro/cert.pem ./handyprops.damasceno.pro.cert
cp live/handyprops.damasceno.pro/privkey.pem ./handyprops.damasceno.pro.priv
cp live/handyprops.damasceno.pro/fullchain.pem ./handyprops.damasceno.pro.full
cp live/handyprops.damasceno.pro/chain.pem ./handyprops.damasceno.pro.chain

chmod +r handyprops.damasceno.pro.*
