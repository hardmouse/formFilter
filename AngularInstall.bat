@ECHO ON
npm install -g npm@4.6.1
npm install -g @angular/cli
npm install --save-dev @angular-devkit/build-angular
npm install --save libphonenumber-js
npm update --all
ng config -g cli.warnings.versionMismatch false
npm cache clean -force
