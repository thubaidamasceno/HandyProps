c:
cd \h\prj\handyprops.git
set NODE_ENV = 'production'

git commit -a -m ok
git push
ssh dng0@damasceno.pro "cd /srv/handyprops && git stash && git pull"
cd frontend
REM yarn build
REM react-scripts build
rm -rf www
cp -r build www
tar -zcvf www.tar.gz www
scp www.tar.gz dng0@damasceno.pro:/srv/handyprops/
ssh dng0@damasceno.pro "cd /srv/handyprops/ && tar -zxvf wwww.tar.gz"
