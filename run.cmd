cd app
npm run build 
cd ..

docker build . -t ui

docker run -p 8080:80 ui
