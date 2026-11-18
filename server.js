import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';
const SESSION_SECRET = process.env.SESSION_SECRET || 'shohan_varsity_kushtia_secret_salt_2026';

// Paths
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
const teachersFile = path.join(dataDir, 'teachers.json');
const studentsFile = path.join(dataDir, 'students.json');
const distDir = path.join(__dirname, 'dist');

// Ensure directories exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure initial teachers data exists
if (!fs.existsSync(teachersFile)) {
  const initialTeachers = [
    {
      id: "teacher-anu",
      name: "আনোয়ার হোসেন অনু",
      designation: "পরিচালক, সোহান'স কোচিং",
      qualification: "বি এস সি ( অনার্স ), এম এস সি ( ANFT ), ইসলামী বিশ্ববিদ্যালয়",
      instructor: "রসায়ন",
      experience: "১৪ বছর",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCnkHiORk7U75tu-qMuyjnGWZeH-lw3XzlhUF3nUDATpkbunEvY_1UjpRsEwazyKvZ2GN4rUOPuKdMbvU3yCPTJNhm2U68UfXd84t4vD3p6NSUdqe8UM4z2yNK9laMfBHPYWncAidwCxn1HV7Zf4jM3Ywu4G3NeSz8ue4gWHIZhqeEd_g-cfeddbV_o6uOpUrM7Y4lGWSkW-akSIQaBlAqHVlJXkc5XVyZ9OxRno7QeufPtMuuj2e3ww-PqdwQ57yjOw",
      faculty: "science"
    },
    {
      id: "teacher-shohan",
      name: "মোঃ সোহানুর রহমান (সোহান)",
      designation: "পরিচালক, সোহান'স কোচিং",
      qualification: "বি এস সি ( অনার্স ), এম এস সি, ইসলামী বিশ্ববিদ্যালয়",
      instructor: "রসায়ন",
      experience: "১০ বছর",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9a8qIypA6yxaqvHCF7aSi9H2Mof7oLDArwpjOT0xGZK-CfFFlnKts3337w1CcmkTPhUeAqK02pzLGV9DZ7YTZpluTeUNYKwsPTzIBIq04sWeHahqgG-8F2Nv6ih1ipLu8L9aX1vRIiMWIDxEQRHXMkJyr5hGRDZ-KA_2REZ_FDu46ifcc66-bjYKRGoEtA9ZwqLNuq-I5N0ey6CCKVg5r1tg4cKT2A8FY3Ktro4HpGvYFIdwjhIFcuxnCGpxm5kl4Tg",
      faculty: "science"
    },
    {
      id: "teacher-sayeed",
      name: "মোঃ সাঈদ হোসেন",
      designation: "শিক্ষক, সোহান'স কোচিং",
      qualification: "বি এস সি ( অনার্স ), এম এস সি ( প্রাণিবিজ্ঞান ), রাজশাহী বিশ্ববিদ্যালয়",
      instructor: "জীববিজ্ঞান",
      experience: "৮ বছর",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6sPU2MvS2s0s54jzOvOGsEsygPGlJtq9WBzU2vuTRm1pYliPeEDbCJqPcDq7DOsC6hQm0gljlnMuuIy1NM-p2A1Xtl8HJko55O6ZgeSd2LWFyHx5CZzCmXkcIHiYxwQeh_Mjk_8tMfsHlVIKtMEUNiN3x8lUS_eQRJ71yBua_cTy1mlqABVzhhhjh_7R5C7NCHnAHArmwi36D6hrelThDuRbDApYtcqFkye0CWCnHrv7uz0CWhqrhCKf0lPIJVGMNDw",
      faculty: "science"
    },
    {
      id: "teacher-ruhul",
      name: "রুহুল আমিন",
      designation: "শিক্ষক, সোহান'স কোচিং",
      qualification: "বি এ ( অনার্স ), এম এ ( ইংরেজি ), ইসলামী বিশ্ববিদ্যালয়",
      instructor: "ইংরেজি ও সাধারণ জ্ঞান",
      experience: "৭ বছর",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzIHIFEPYoHicZ7WtWaciV2icTK2WeeCvbqBMspMwgcUGIDS2FlrKlCtFPQwD2tCqBbZ_55v0YHbiW3zZxUReJyW7nUAVks6ie1JzVBHHTLCxdkec-2L4RYniOG8dqwFb6w17PHTl0l7ed5t5wAjyrhdX8-iPHKi5c43E7OUT1iZboGdyGQb5gm-4WHlVmk-qjr1Gu4tRxUwcvVRQVonDzdoXbY6vGu0u8oFL79A27q7KG7UaOcUE3G72rL9zigMq3Zw",
      faculty: "humanities"
    },
    {
      id: "teacher-hosen-ali",
      name: "হোসেন আলী",
      designation: "শিক্ষক, সোহান'স কোচিং",
      qualification: "বি বি এ, এম বি এ ( অ্যাকাউন্টিং অ্যান্ড ইনফরমেশন সিস্টেমস ), ইসলামী বিশ্ববিদ্যালয়",
      instructor: "হিসাববিজ্ঞান ও ব্যবসায় শিক্ষা",
      experience: "৬ বছর",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAso7Q4je7rZElWviMybOgqnb8IFtLaMbK28BpY-ziRA0ok0B7dougfoGP-L0ukxePC4JiI8E9XUlSxPHyoEn51OoaCKwF-wsraP-sMg5eXHVPhY4FPBkz62aAIcjuV9aRjLAM7ZrwNNlc50CG78hirAxMtJwhSobKCcKCqKW2GcyWkz4LUYHImDaJbN0awQgOAp0B-dzJg70o71rM1NoxF5Mb2uCq2QR6QvNOaNaA2l0rRiMjZoJEW8zHetvI9HFac-g",
      faculty: "commerce"
    },
    {
      id: "teacher-apon",
      name: "মোঃ আপন হোসেন",
      designation: "শিক্ষক, সোহান'স কোচিং",
      qualification: "বি এস সি ইঞ্জিনিয়ারিং ( সিভিল ), কুয়েট",
      instructor: "উচ্চতর গণিত ও পদার্থবিজ্ঞান",
      experience: "৭ বছর",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36Vrn7zOaX_NOsv_Bu8yIVZA3m-LpXyujac12mYcRNLSmu_DEd2FKPeohMmd-iWYeUHmy4xJlkoFomGFxGBv_LouCZH4h7LPeKNuIIhCKIAwMqRjK0Z54hlJfRIBu7JUusMaL1G4fxZDG5YBSVG07Vg27dTMHQcymtW4P0eQd7z-1gjdyZ6GYgnDgUqZj96dQlL-OLTJzQRtQaP09-cFXOKj2hU2WzDeVNPD14foyUCHbN7VInJW-sdraDg-BHp7rpg",
      faculty: "science"
    }
  ];
  fs.writeFileSync(teachersFile, JSON.stringify(initialTeachers, null, 2), 'utf-8');
}

// Ensure initial students data exists (with faculty field)
if (!fs.existsSync(studentsFile)) {
  const initialStudents = [
    {
      id: "student-chabrin",
      name: "ছাবরিন সুলতানা",
      university: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
      department: "আইন বিভাগ",
      faculty: "humanities",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHaeKS7xALas8DlrH7I6TRUW3WnUyf9P2XDVuLu0-l0UvJ5Oz8ZwHrj7Cf7r6ZZCtpX8pHSvxBZlqsAGi3uBlWtOocgxWjYqFjUNm-VbnWb6hTNgipTosKtbe3Vop9ryIkDS8n5kfgCu3pOUFNxldUy06AmZcWgFdw0uv8gzrtIZJPOpdfBi1aInfAcCi6bcgt_GWqy5YBuwK28BIqjAyvLvFjPlryViKnO660Wi9N9vIMfAY_ZT-egWl0RZANpsUC6w"
    },
    {
      id: "student-bonya",
      name: "বন্যা রানী সাহা",
      university: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
      department: "গণিত বিভাগ",
      faculty: "science",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6XB6tRgWAq_P-oAMhvcBG7mWUGd-rQhui26TblLH8sRLuA9Ym4IwrpzUT7d6LYpsL_z_FVhuKaCIoVtWN7A_eK80MeLzoc2Ulm8vueKf0oacGuLzFNnRE75UCov5FptEHKABHytkK4-cqVOjj5GwTRAekS1RMqI0VJumwK9UfGxCy670c3rGF7A3uMBy5MzGnVCuY1oK1x1JGJiQK1pikBPTYnhoA_CpVkvrCGo3a7eEuNUE1JlJpHNuk4R4Sozy4aQ"
    }
  ];
  fs.writeFileSync(studentsFile, JSON.stringify(initialStudents, null, 2), 'utf-8');
}

// Helper functions for reading & writing data
function readData(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Express Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS & Dev Headers Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// ==========================================
// AUTHENTICATION & SECURITY (JWT + Rate Limit)
// ==========================================

// In-memory rate limiting map: ip -> { count, lockedUntil }
const loginRateLimit = new Map();

function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
}

function createToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// Authentication Guard Middleware
function requireAuth(req, res, next) {
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.headers['x-admin-token']) {
    token = req.headers['x-admin-token'];
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return res.status(401).json({
      error: 'অননুমোদিত প্রবেশ। অনুগ্রহ করে অ্যাডমিন প্যানেলে লগইন করুন।',
      code: 'UNAUTHORIZED'
    });
  }

  req.admin = payload;
  next();
}

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const attempt = loginRateLimit.get(ip) || { count: 0, lockedUntil: 0 };

  // Check if locked out
  if (attempt.lockedUntil && now < attempt.lockedUntil) {
    const remainingMins = Math.ceil((attempt.lockedUntil - now) / 60000);
    return res.status(429).json({
      error: `অতিরিক্ত ভুল চেষ্টার কারণে একাউন্ট সাময়িকভাবে লক করা হয়েছে। দয়া করে ${remainingMins} মিনিট পর পুনরায় চেষ্টা করুন।`,
      lockedUntil: attempt.lockedUntil
    });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'পাসওয়ার্ড প্রদান করা আবশ্যক।' });
  }

  // Safe timing comparison
  const isMatch = password === ADMIN_PASSWORD;

  if (!isMatch) {
    attempt.count = (attempt.count || 0) + 1;
    if (attempt.count >= 5) {
      attempt.lockedUntil = now + 15 * 60 * 1000; // 15 minutes lockout
      loginRateLimit.set(ip, attempt);
      return res.status(429).json({
        error: '৫ বার ভুল পাসওয়ার্ড দেওয়ার কারণে একাউন্ট ১৫ মিনিটের জন্য লক করা হয়েছে।',
        lockedUntil: attempt.lockedUntil
      });
    }

    loginRateLimit.set(ip, attempt);
    const remainingAttempts = 5 - attempt.count;
    return res.status(401).json({
      error: `ভুল পাসওয়ার্ড! আর মাত্র ${remainingAttempts} বার চেষ্টা করার সুযোগ রয়েছে।`,
      remainingAttempts
    });
  }

  // Login successful: reset rate limit for this IP
  loginRateLimit.delete(ip);

  // 12 hours token expiry
  const expiresAt = now + 12 * 60 * 60 * 1000;
  const token = createToken({
    role: 'admin',
    exp: expiresAt,
    iat: now
  });

  return res.json({
    success: true,
    message: 'সফলভাবে লগইন সম্পন্ন হয়েছে।',
    token,
    expiresAt
  });
});

// GET /api/auth/verify
app.get('/api/auth/verify', requireAuth, (req, res) => {
  res.json({ authenticated: true, role: 'admin', exp: req.admin.exp });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'সফলভাবে লগআউট সম্পন্ন হয়েছে।' });
});

// ==========================================
// IMAGE UPLOAD API (Max 2MB, jpg/png/webp)
// ==========================================

app.post('/api/upload', requireAuth, (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'ছবির ফাইল প্রদান করা আবশ্যক।' });
    }

    // Match base64 data URI format
    const matches = image.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({
        error: 'শুধুমাত্র JPG, PNG বা WEBP ফরম্যাটের ছবি আপলোড করা যাবে।'
      });
    }

    const extRaw = matches[1].toLowerCase();
    const ext = extRaw === 'jpeg' ? 'jpg' : extRaw;
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // 2 MB limit check
    const MAX_SIZE = 2 * 1024 * 1024;
    if (buffer.length > MAX_SIZE) {
      return res.status(400).json({
        error: 'ছবির সাইজ অতিরিক্ত বড়। সর্বোচ্চ ২ মেগাবাইট (2 MB) গ্রহণযোগ্য।'
      });
    }

    const uniqueName = `img-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    const destinationPath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return res.json({
      success: true,
      url: publicUrl,
      size: buffer.length
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'ছবি আপলোড করতে সমস্যা হয়েছে।' });
  }
});

// ==========================================
// TEACHERS API
// ==========================================

// Public GET /api/teachers
app.get('/api/teachers', (req, res) => {
  const teachers = readData(teachersFile, []);
  res.json(teachers);
});

// Protected POST /api/teachers (Add teacher)
app.post('/api/teachers', requireAuth, (req, res) => {
  const { name, designation, qualification, instructor, experience, faculty, image } = req.body;

  if (!name || !designation || !qualification || !instructor || !experience || !faculty || !image) {
    return res.status(400).json({ error: 'শিক্ষকের সকল তথ্য এবং ছবি প্রদান করা আবশ্যক।' });
  }

  const allowedFaculties = ['science', 'humanities', 'commerce'];
  if (!allowedFaculties.includes(faculty)) {
    return res.status(400).json({ error: 'অনুষদ অবশ্যই বিজ্ঞান, মানবিক বা ব্যবসায় শিক্ষা হতে হবে।' });
  }

  const teachers = readData(teachersFile, []);
  const newTeacher = {
    id: `teacher-${Date.now()}`,
    name: name.trim(),
    designation: designation.trim(),
    qualification: qualification.trim(),
    instructor: instructor.trim(),
    experience: experience.trim(),
    faculty,
    image: image.trim()
  };

  teachers.push(newTeacher);
  writeData(teachersFile, teachers);

  return res.status(201).json({
    success: true,
    message: 'শিক্ষক সফলভাবে যুক্ত করা হয়েছে।',
    teacher: newTeacher
  });
});

// Protected PUT /api/teachers/:id (Edit teacher)
app.put('/api/teachers/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { name, designation, qualification, instructor, experience, faculty, image } = req.body;

  const teachers = readData(teachersFile, []);
  const index = teachers.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'শিক্ষক খুঁজে পাওয়া যায়নি।' });
  }

  if (faculty && !['science', 'humanities', 'commerce'].includes(faculty)) {
    return res.status(400).json({ error: 'অনুষদ অবশ্যই বিজ্ঞান, মানবিক বা ব্যবসায় শিক্ষা হতে হবে।' });
  }

  const updatedTeacher = {
    ...teachers[index],
    name: name !== undefined ? name.trim() : teachers[index].name,
    designation: designation !== undefined ? designation.trim() : teachers[index].designation,
    qualification: qualification !== undefined ? qualification.trim() : teachers[index].qualification,
    instructor: instructor !== undefined ? instructor.trim() : teachers[index].instructor,
    experience: experience !== undefined ? experience.trim() : teachers[index].experience,
    faculty: faculty !== undefined ? faculty : teachers[index].faculty,
    image: image !== undefined ? image.trim() : teachers[index].image
  };

  teachers[index] = updatedTeacher;
  writeData(teachersFile, teachers);

  return res.json({
    success: true,
    message: 'শিক্ষকের তথ্য সফলভাবে আপডেট করা হয়েছে।',
    teacher: updatedTeacher
  });
});

// Protected DELETE /api/teachers/:id (Delete teacher)
app.delete('/api/teachers/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  let teachers = readData(teachersFile, []);
  const exists = teachers.some(t => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'শিক্ষক খুঁজে পাওয়া যায়নি।' });
  }

  teachers = teachers.filter(t => t.id !== id);
  writeData(teachersFile, teachers);

  return res.json({
    success: true,
    message: 'শিক্ষকের তথ্য সফলভাবে মুছে ফেলা হয়েছে।'
  });
});

// ==========================================
// ACHIEVEMENT STUDENTS API
// ==========================================

// Public GET /api/students
app.get('/api/students', (req, res) => {
  const students = readData(studentsFile, []);
  res.json(students);
});

// Protected POST /api/students (Add student)
app.post('/api/students', requireAuth, (req, res) => {
  const { name, university, department, faculty, image } = req.body;

  if (!name || !university || !department || !faculty || !image) {
    return res.status(400).json({ error: 'শিক্ষার্থীর সকল তথ্য এবং ছবি প্রদান করা আবশ্যক।' });
  }

  const allowedFaculties = ['science', 'humanities', 'commerce'];
  if (!allowedFaculties.includes(faculty)) {
    return res.status(400).json({ error: 'অনুষদ অবশ্যই বিজ্ঞান, মানবিক বা ব্যবসায় শিক্ষা হতে হবে।' });
  }

  const students = readData(studentsFile, []);
  const newStudent = {
    id: `student-${Date.now()}`,
    name: name.trim(),
    university: university.trim(),
    department: department.trim(),
    faculty,
    image: image.trim()
  };

  students.push(newStudent);
  writeData(studentsFile, students);

  return res.status(201).json({
    success: true,
    message: 'সাফল্য অর্জনকারী শিক্ষার্থী সফলভাবে যুক্ত করা হয়েছে।',
    student: newStudent
  });
});

// Protected PUT /api/students/:id (Edit student)
app.put('/api/students/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { name, university, department, faculty, image } = req.body;

  const students = readData(studentsFile, []);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'শিক্ষার্থী খুঁজে পাওয়া যায়নি।' });
  }

  if (faculty && !['science', 'humanities', 'commerce'].includes(faculty)) {
    return res.status(400).json({ error: 'অনুষদ অবশ্যই বিজ্ঞান, মানবিক বা ব্যবসায় শিক্ষা হতে হবে।' });
  }

  const updatedStudent = {
    ...students[index],
    name: name !== undefined ? name.trim() : students[index].name,
    university: university !== undefined ? university.trim() : students[index].university,
    department: department !== undefined ? department.trim() : students[index].department,
    faculty: faculty !== undefined ? faculty : students[index].faculty,
    image: image !== undefined ? image.trim() : students[index].image
  };

  students[index] = updatedStudent;
  writeData(studentsFile, students);

  return res.json({
    success: true,
    message: 'শিক্ষার্থীর তথ্য সফলভাবে আপডেট করা হয়েছে।',
    student: updatedStudent
  });
});

// Protected DELETE /api/students/:id (Delete student)
app.delete('/api/students/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  let students = readData(studentsFile, []);
  const exists = students.some(s => s.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'শিক্ষার্থী খুঁজে পাওয়া যায়নি।' });
  }

  students = students.filter(s => s.id !== id);
  writeData(studentsFile, students);

  return res.json({
    success: true,
    message: 'শিক্ষার্থীর তথ্য সফলভাবে মুছে ফেলা হয়েছে।'
  });
});

// ==========================================
// STATIC FRONTEND SERVING (Production Build)
// ==========================================

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  // SPA fallback for HTML pages
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    const htmlPath = path.join(distDir, req.path.endsWith('.html') ? req.path : `${req.path}.html`);
    if (fs.existsSync(htmlPath)) {
      return res.sendFile(htmlPath);
    }
    return res.sendFile(path.join(distDir, 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'সার্ভারে অভ্যন্তরীণ ত্রুটি দেখা দিয়েছে।' });
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(` Shohan's Varsity Admission Coaching Kushtia Server `);
  console.log(`====================================================`);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Uploads available at: http://localhost:${PORT}/uploads`);
  console.log(`🔒 Admin Auth: Rate limiting active (max 5 failed attempts)`);
  console.log(`====================================================`);
});
