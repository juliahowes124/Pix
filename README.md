# Pix - Photo Editing App

## Set up the database

1. `brew install postgresql`
2. `brew services start postgresql`
3. `createdb pixly`
4. in /pixly-api: `psql pixly -f pixly.sql`

## Start up the app

in /pixly-api: 
1. `npm install`
2. `npm start`

in /pixly-spa:
1. `npm install`
2. `npm start`