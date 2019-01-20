// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //End points
  ADMIN_OPTIONS: 'http://localhost:3000/excel/users',

  SE_NON_PAYMENT: 'http://localhost:3000/excel/entries/non-payment',
  SE_PAYMENT: 'http://localhost:3000/excel/entries/payment',

  STUDENT: 'http://localhost:3000/excel/student',

  SCHOOL_WITH_DAYCARE: 'School with Day Care',
  SCHOOL_ONLY: 'School only',
  ADMISSION_DAYCARE_ONLY: 'Admission - Day Care only',
  ADMISSION_SCHOOL_ONLY: 'Admission - School only',
  ADMISSION_SCHOOL_WITH_DAYCARE: 'Admission - School with Day Care'

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
