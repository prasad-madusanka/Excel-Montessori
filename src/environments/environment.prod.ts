export const environment = {
  production: true,

  //End points
  ADMIN_OPTIONS: 'http://localhost:3000/excel/users',

  SIGN_IN: 'http://localhost:3000/excel/login',

  SE_NON_PAYMENT: 'http://localhost:3000/excel/entries/non-payment',
  SE_PAYMENT: 'http://localhost:3000/excel/entries/payment',

  STUDENT: 'http://localhost:3000/excel/student',

  ADMISSION: 'http://localhost:3000/excel/payments/admission',

  SCHOOL_FEE: 'http://localhost:3000/excel/payments/monthly-fee',

  OTHER_PAYMENTS: 'http://localhost:3000/excel/payments/other',

  REPORTS: 'http://localhost:3000/excel/reports/',

  SCHOOL_ONLY: 'School only',
  ADMISSION_DAYCARE_ONLY: 'Admission - Day Care only',
  ADMISSION_SCHOOL_ONLY: 'Admission - School only',
  ADMISSION_SCHOOL_WITH_DAYCARE: 'Admission - School with Day Care',

  DAY_CARE_FEE_CATEGORIES: ['Above 2Y - Full Day / Month', 'Above 2Y - Half Day / Month', 'Under 2Y - Full Day / Month', 'Under 2Y - Half Day / Month', 'Daily Basis - Full Day', 'Daily Basis - Half Day', 'Saturday Care - Full Day', 'Saturday Care - Half Day']
};
