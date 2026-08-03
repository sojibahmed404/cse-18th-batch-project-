const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);
const src = path.join(root, 'src');

const dirs = [
  'prisma',
  'src/config',
  'src/types',
  'src/utils',
  'src/middleware',
  'src/modules/auth',
  'src/modules/users',
  'src/modules/students',
  'src/modules/teachers',
  'src/modules/semesters',
  'src/modules/courses',
  'src/modules/assignments',
  'src/modules/notices',
  'src/modules/routines',
  'src/modules/events',
  'src/modules/gallery',
  'src/modules/notifications',
  'src/modules/analytics',
  'src/modules/search',
  'src/modules/upload'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
});

console.log("Directories created successfully.");
