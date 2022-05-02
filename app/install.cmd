if test -f "/var/www/html"; then
  rm /var/www/html.bak
  mv /var/www/html /var/www/html.bak
fi 

cp -r /home/neeraj/Projects/stockpal/Playground/sample-backend-services-mesh/user-interface/app/build /var/www/html
