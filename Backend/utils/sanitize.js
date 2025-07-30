// import mongoSanitize from 'mongo-sanitize';

// export function deepSanitize(obj) {
//   if (typeof obj !== 'object' || obj === null) return obj;

//   for (const key in obj) {
//     if (key.startsWith('$') || key.includes('.')) {
//       obj[key] = mongoSanitize(obj[key]);
//     } else {
//       obj[key] = deepSanitize(obj[key]);
//     }
//   }

//   return obj;
// }
