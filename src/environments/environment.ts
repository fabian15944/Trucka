// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  urlbackend: 'http://200.76.187.147:3000/api/', // ruta que conectar o consume la api de la carpeta Backend
  urlstart: 'http://200.76.187.147:3006/api/', // ruta que conecta o consume la api de la carpeta Start
  urllogin: 'http://200.76.187.147:3005/api/',  // ruta que conecta o consume la api de la carpeta Login
  // urlbackend: 'http://localhost:3000/api/', 
  // urlstart: 'http://localhost:3006/api/', 
  // urllogin: 'http://localhost:3005/api/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
