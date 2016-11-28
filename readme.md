#WEDEVELOP - Node JS Starter Project

##Instalacion

1. Download

   ```
   git clone https://github.com/wedevelopmx/node-starter.git
   ```

2. NPM dependencies

   ```
   npm install
   ```

3. Bower Dependencies

   ```
   bower install
   ```
   See third party segment.

4. Building App

   ```
   grunt build
   ```

5. Running application

   ```
   npm start
   ```

   Now you can access the application on [http://localhost:3000](http://localhost:3000)

## Third Party Software

We are using a predefined theme known as FLATKIT, we host our licence code in bitbucket private repository. Ask for access to the repository to our project manager, he will upload your SSH, and your environment will download the repository when you execute bower. Same process is expected if you are deploying the application to cloud environment.

If you are not part of we develop you can purchase a license on [Flatkit Oficial Page](http://flatfull.com/themes/flatkit/), then you have to place it under folder /public/vendor before executing grunt.

## Know Issues

1. Please install sqlite3 package manually

  Node newer version may have troubles to install sqlite3 dependency using npm. You can overcome this issue by running below command:

  ```
  bower install sqlite3
  ```

2.  Grunt Sass &amp; Node Sass

  For newer versions of node, grunt dependency "node-sass" is not able to compile correctly, you can overcome this issue by running below command:

  ```
  cd node_modules/grunt-sass/node_modules/node-sass
  npm install
  node scripts/install.js
  ```

  After this process you can bring up the application. 

## License

Copyright (c) 2016 [WeDevelop](http://wedevelop.mx/ "WeDevelop")

No permission is granted to use this code in any fashion. Please contact company in order to get a demo.
