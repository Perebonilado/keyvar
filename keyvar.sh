#!/bin/bash

FILE_PATH=".env"

NEW_EMAIL_USER="Email_user = support@keyvarsolutions.com"
NEW_EMAIL_PASS="Email_pass = uwrs nbvj bslp ugny"

sed -i "s/^Email_user=.*/$NEW_EMAIL_USER/" $FILE_PATH
sed -i "s/^Email_pass=.*/$NEW_EMAIL_PASS/" $FILE_PATH

echo "Variables replaced successfully in $FILE_PATH"
