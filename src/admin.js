/**
 * Shohan's Varsity Admission Coaching - Kushtia
 * Secure Admin Panel Controller
 * Handles Auth, Session, Rate Limiting Feedback, Image Compression, and CRUD
 */

const TOKEN_KEY = 'shohan_varsity_admin_jwt';

// Application State
let adminToken = localStorage.getItem(TOKEN_KEY) || null;
let teachersList = [];
let studentsList = [];
let currentTeacherFilter = 'all';
let currentStudentFilter = 'all';
let pendingDelete = null; // { type: 'teacher'|'student', id: string, name: string }

// ==========================================
// TOAST NOTIFICATIONS (Bengali UI)
// ==========================================

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-sm font-semibold transition-all duration-300 transform translate-y-2 opacity-0 font-bn ${
    type === 'success'
      ? 'bg-emerald-900/95 text-emerald-100 border-emerald-700'
      : type === 'error'
      ? 'bg-rose-900/95 text-rose-100 border-rose-700'
      : 'bg-[#0b1d3a]/95 text-slate-100 border-slate-700'
  }`;

  const iconSvg =
    type === 'success'
      ? '<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
      : type === 'error'
      ? '<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      : '<svg class="w-5 h-5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

  toast.innerHTML = `
    <div class="flex items-center gap-2.5 min-w-0">
      ${iconSvg}
      <span class="truncate">${message}</span>
    </div>
    <button type="button" class="text-white/60 hover:text-white p-1 cursor-pointer">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  });

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  });

  // Auto dismiss after 3.5s
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }
  }, 3500);
}

// ==========================================
// CLIENT-SIDE IMAGE COMPRESSION (Max 900px, 85% WebP/JPG)
// ==========================================

export async function compressImageFile(file, maxDimension = 900, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('ফাইল পাওয়া যায়নি'));

    // Check size limit (max 2MB raw file)
    if (file.size > 2 * 1024 * 1024) {
      return reject(new Error('ছবির সাইজ সর্বোচ্চ ২ মেগাবাইট (2 MB) হতে পারবে।'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('ছবি পড়তে সমস্যা হয়েছে।'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('ছবির ফরম্যাট সঠিক নয়।'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while scaling down
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.getElementById('compression-canvas') || document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to data URI (webp preferred, fallback to jpeg)
        let mime = 'image/webp';
        let dataUrl = canvas.toDataURL(mime, quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          mime = 'image/jpeg';
          dataUrl = canvas.toDataURL(mime, quality);
        }

        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ==========================================
// API REQUEST HELPER
// ==========================================

async function apiFetch(endpoint, options = {}) {
  const headers = options.headers || {};
  if (adminToken) {
    headers['Authorization'] = `Bearer ${adminToken}`;
  }
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  // Handle Unauthorized (Session Expired)
  if (response.status === 401 && !endpoint.includes('/api/auth/login')) {
    logout(false);
    showToast('আপনার সেশন শেষ হয়ে গেছে। অনুগ্রহ করে আবার লগইন করুন।', 'error');
    throw new Error('UNAUTHORIZED');
  }

  return response;
}

// Upload helper: uploads base64 string to /api/upload
async function uploadImageToServer(base64Image) {
  const res = await apiFetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ image: base64Image }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'ছবি আপলোড করতে ব্যর্থ হয়েছে।');
  }
  return data.url;
}

// ==========================================
// AUTHENTICATION LOGIC
// ==========================================

function switchView(isAuth) {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');

  if (isAuth) {
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
  } else {
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
    const pwdInput = document.getElementById('admin-password');
    if (pwdInput) {
      pwdInput.value = '';
      pwdInput.focus();
    }
  }
}

async function verifySession() {
  if (!adminToken) {
    switchView(false);
    return;
  }

  try {
    const res = await fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (res.ok) {
      switchView(true);
      loadAllData();
    } else {
      logout(false);
    }
  } catch (err) {
    console.error('Session verify error:', err);
    switchView(false);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const passwordInput = document.getElementById('admin-password');
  const errorMsgEl = document.getElementById('login-error-msg');
  const submitBtn = document.getElementById('login-submit-btn');
  const btnText = document.getElementById('login-btn-text');
  const btnSpinner = document.getElementById('login-btn-spinner');

  const password = passwordInput.value.trim();
  if (!password) {
    errorMsgEl.textContent = 'দয়া করে অ্যাডমিন পাসওয়ার্ড প্রদান করুন।';
    errorMsgEl.classList.remove('hidden');
    return;
  }

  // Set loading state
  submitBtn.disabled = true;
  btnText.textContent = 'যাচাই করা হচ্ছে...';
  btnSpinner.classList.remove('hidden');
  errorMsgEl.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok && data.success && data.token) {
      adminToken = data.token;
      localStorage.setItem(TOKEN_KEY, data.token);
      showToast('সফলভাবে অ্যাডমিন প্যানেলে লগইন হয়েছে!', 'success');
      switchView(true);
      loadAllData();
    } else {
      errorMsgEl.textContent = data.error || 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।';
      errorMsgEl.classList.remove('hidden');
      passwordInput.focus();
      passwordInput.select();
    }
  } catch (err) {
    console.error('Login error:', err);
    errorMsgEl.textContent = 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হচ্ছে না। ব্যাকএন্ড চালু আছে কি না পরীক্ষা করুন।';
    errorMsgEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'প্রবেশ করুন';
    btnSpinner.classList.add('hidden');
  }
}

export function logout(notify = true) {
  if (adminToken) {
    apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }
  adminToken = null;
  localStorage.removeItem(TOKEN_KEY);
  switchView(false);
  if (notify) {
    showToast('সফলভাবে লগআউট সম্পন্ন হয়েছে।', 'info');
  }
}

// ==========================================
// TABS & NAVIGATION
// ==========================================

function switchTab(tab) {
  const panelTeachers = document.getElementById('panel-teachers');
  const panelStudents = document.getElementById('panel-students');
  const btnTeachers = document.getElementById('tab-btn-teachers');
  const btnStudents = document.getElementById('tab-btn-students');

  if (tab === 'teachers') {
    panelTeachers.classList.remove('hidden');
    panelStudents.classList.add('hidden');

    btnTeachers.classList.add('bg-sky-600', 'text-white', 'shadow-xs');
    btnTeachers.classList.remove('text-slate-300', 'hover:bg-white/5');

    btnStudents.classList.remove('bg-sky-600', 'text-white', 'shadow-xs');
    btnStudents.classList.add('text-slate-300', 'hover:bg-white/5');
  } else {
    panelStudents.classList.remove('hidden');
    panelTeachers.classList.add('hidden');

    btnStudents.classList.add('bg-sky-600', 'text-white', 'shadow-xs');
    btnStudents.classList.remove('text-slate-300', 'hover:bg-white/5');

    btnTeachers.classList.remove('bg-sky-600', 'text-white', 'shadow-xs');
    btnTeachers.classList.add('text-slate-300', 'hover:bg-white/5');
  }
}

// ==========================================
// TEACHERS MANAGEMENT
// ==========================================

export async function loadTeachers() {
  try {
    const res = await apiFetch('/api/teachers');
    if (res.ok) {
      teachersList = await res.json();
      renderAdminTeachers();
      updateBadges();
    }
  } catch (err) {
    console.error('Failed to load teachers:', err);
    showToast('শিক্ষকদের তালিকা লোড করতে সমস্যা হয়েছে।', 'error');
  }
}

function getFacultyBadge(faculty) {
  switch (faculty) {
    case 'science':
      return '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">বিজ্ঞান অনুষদ</span>';
    case 'humanities':
      return '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">মানবিক অনুষদ</span>';
    case 'commerce':
      return '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">ব্যবসায় শিক্ষা</span>';
    default:
      return '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">সাধারণ</span>';
  }
}

function renderAdminTeachers() {
  const grid = document.getElementById('admin-teachers-grid');
  const empty = document.getElementById('admin-teachers-empty');
  if (!grid) return;

  const filtered = teachersList.filter((t) => {
    if (currentTeacherFilter === 'all') return true;
    return t.faculty === currentTeacherFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = filtered
    .map(
      (teacher) => `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
      <!-- Image & Faculty Badge -->
      <div class="relative aspect-[4/4.6] bg-slate-100 overflow-hidden border-b border-slate-200">
        <img
          src="${teacher.image}"
          alt="${teacher.name}"
          class="w-full h-full object-cover object-top group-hover:scale-102 transition duration-300"
          loading="lazy"
        />
        <div class="absolute top-2.5 right-2.5">
          ${getFacultyBadge(teacher.faculty)}
        </div>
      </div>

      <!-- Info -->
      <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between font-bn space-y-3">
        <div class="space-y-1.5 text-xs sm:text-sm">
          <h4 class="font-bold text-slate-900 text-base leading-tight">${teacher.name}</h4>
          <p class="text-sky-700 font-semibold">${teacher.designation}</p>
          <p class="text-slate-600 text-xs leading-relaxed"><span class="font-bold text-slate-700">যোগ্যতা:</span> ${teacher.qualification}</p>
          <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span><strong class="text-slate-700">বিষয়:</strong> <span class="text-rose-600 font-semibold">${teacher.instructor}</span></span>
            <span><strong class="text-slate-700">অভিজ্ঞতা:</strong> ${teacher.experience}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onclick="window.openEditTeacher('${teacher.id}')"
            class="flex-1 min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <svg class="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <span>সম্পাদনা</span>
          </button>

          <button
            type="button"
            onclick="window.confirmDeleteTeacher('${teacher.id}', '${teacher.name.replace(/'/g, "\\'")}')"
            class="min-h-[40px] px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
            title="মুছে ফেলুন"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <span class="hidden xs:inline">মুছুন</span>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');
}

export function openTeacherModal(teacher = null) {
  const modal = document.getElementById('modal-teacher');
  const title = document.getElementById('teacher-modal-title');
  const form = document.getElementById('teacher-form');
  const editIdInput = document.getElementById('teacher-edit-id');
  const previewImg = document.getElementById('teacher-photo-preview-img');
  const placeholder = document.getElementById('teacher-photo-placeholder');
  const existingUrlInput = document.getElementById('teacher-existing-image-url');

  form.reset();

  if (teacher) {
    title.textContent = 'শিক্ষকের তথ্য সম্পাদনা করুন';
    editIdInput.value = teacher.id;
    document.getElementById('teacher-name').value = teacher.name || '';
    document.getElementById('teacher-designation').value = teacher.designation || '';
    document.getElementById('teacher-qualification').value = teacher.qualification || '';
    document.getElementById('teacher-instructor').value = teacher.instructor || '';
    document.getElementById('teacher-experience').value = teacher.experience || '';
    document.getElementById('teacher-faculty').value = teacher.faculty || 'science';

    if (teacher.image) {
      existingUrlInput.value = teacher.image;
      previewImg.src = teacher.image;
      previewImg.classList.remove('hidden');
      placeholder.classList.add('hidden');
    } else {
      existingUrlInput.value = '';
      previewImg.classList.add('hidden');
      placeholder.classList.remove('hidden');
    }
  } else {
    title.textContent = 'নতুন শিক্ষক যুক্ত করুন';
    editIdInput.value = '';
    existingUrlInput.value = '';
    previewImg.src = '';
    previewImg.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function closeTeacherModal() {
  const modal = document.getElementById('modal-teacher');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

async function handleTeacherFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('teacher-edit-id').value;
  const name = document.getElementById('teacher-name').value.trim();
  const designation = document.getElementById('teacher-designation').value.trim();
  const qualification = document.getElementById('teacher-qualification').value.trim();
  const instructor = document.getElementById('teacher-instructor').value.trim();
  const experience = document.getElementById('teacher-experience').value.trim();
  const faculty = document.getElementById('teacher-faculty').value;
  const photoInput = document.getElementById('teacher-photo-input');
  const existingImageUrl = document.getElementById('teacher-existing-image-url').value;

  const saveBtn = document.getElementById('teacher-save-btn');
  const saveText = document.getElementById('teacher-save-text');
  const saveSpinner = document.getElementById('teacher-save-spinner');

  if (!name || !designation || !qualification || !instructor || !experience || !faculty) {
    showToast('অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।', 'error');
    return;
  }

  // Determine image URL
  let imageUrl = existingImageUrl;
  const newFile = photoInput.files && photoInput.files[0];

  if (!newFile && !imageUrl) {
    showToast('শিক্ষকের ছবি আপলোড করা আবশ্যক।', 'error');
    return;
  }

  saveBtn.disabled = true;
  saveText.textContent = 'সংরক্ষণ হচ্ছে...';
  saveSpinner.classList.remove('hidden');

  try {
    // If a new photo was selected, compress and upload
    if (newFile) {
      saveText.textContent = 'ছবি অপ্টিমাইজ হচ্ছে...';
      const compressedBase64 = await compressImageFile(newFile);
      saveText.textContent = 'ছবি আপলোড হচ্ছে...';
      imageUrl = await uploadImageToServer(compressedBase64);
    }

    saveText.textContent = 'সংরক্ষণ হচ্ছে...';

    const payload = {
      name,
      designation,
      qualification,
      instructor,
      experience,
      faculty,
      image: imageUrl,
    };

    let res;
    if (editId) {
      res = await apiFetch(`/api/teachers/${editId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    } else {
      res = await apiFetch('/api/teachers', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'সংরক্ষণ করতে সমস্যা হয়েছে।');
    }

    showToast(editId ? 'শিক্ষকের তথ্য সফলভাবে আপডেট হয়েছে!' : 'নতুন শিক্ষক সফলভাবে যুক্ত হয়েছে!', 'success');
    closeTeacherModal();
    loadTeachers();
  } catch (err) {
    console.error('Teacher save error:', err);
    showToast(err.message || 'শিক্ষকের তথ্য সংরক্ষণ করা যায়নি।', 'error');
  } finally {
    saveBtn.disabled = false;
    saveText.textContent = 'সংরক্ষণ করুন';
    saveSpinner.classList.add('hidden');
  }
}

// ==========================================
// STUDENTS MANAGEMENT
// ==========================================

export async function loadStudents() {
  try {
    const res = await apiFetch('/api/students');
    if (res.ok) {
      studentsList = await res.json();
      renderAdminStudents();
      updateBadges();
    }
  } catch (err) {
    console.error('Failed to load students:', err);
    showToast('শিক্ষার্থীদের তালিকা লোড করতে সমস্যা হয়েছে।', 'error');
  }
}

function renderAdminStudents() {
  const grid = document.getElementById('admin-students-grid');
  const empty = document.getElementById('admin-students-empty');
  if (!grid) return;

  const filtered = studentsList.filter((s) => {
    if (currentStudentFilter === 'all') return true;
    return s.faculty === currentStudentFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = filtered
    .map(
      (student) => `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
      <!-- Image & Faculty Badge -->
      <div class="relative aspect-square sm:aspect-[4/4.8] bg-slate-100 overflow-hidden border-b border-slate-200">
        <img
          src="${student.image}"
          alt="${student.name}"
          class="w-full h-full object-cover object-top group-hover:scale-102 transition duration-300"
          loading="lazy"
        />
        <div class="absolute top-2.5 right-2.5">
          ${getFacultyBadge(student.faculty)}
        </div>
      </div>

      <!-- Info -->
      <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-between font-bn space-y-3">
        <div class="space-y-1 text-xs sm:text-sm">
          <h4 class="font-bold text-slate-900 text-sm sm:text-base leading-tight">${student.name}</h4>
          <p class="text-sky-600 font-semibold">${student.university}</p>
          <p class="text-slate-600 text-xs"><span class="font-semibold text-slate-700">বিভাগ:</span> ${student.department}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onclick="window.openEditStudent('${student.id}')"
            class="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <span>সম্পাদনা</span>
          </button>

          <button
            type="button"
            onclick="window.confirmDeleteStudent('${student.id}', '${student.name.replace(/'/g, "\\'")}')"
            class="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
            title="মুছে ফেলুন"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <span>মুছুন</span>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');
}

export function openStudentModal(student = null) {
  const modal = document.getElementById('modal-student');
  const title = document.getElementById('student-modal-title');
  const form = document.getElementById('student-form');
  const editIdInput = document.getElementById('student-edit-id');
  const previewImg = document.getElementById('student-photo-preview-img');
  const placeholder = document.getElementById('student-photo-placeholder');
  const existingUrlInput = document.getElementById('student-existing-image-url');
  const uniSelect = document.getElementById('student-uni-select-input');
  const otherWrapper = document.getElementById('student-uni-other-wrapper');
  const otherInput = document.getElementById('student-uni-other-input');

  form.reset();
  otherWrapper.classList.add('hidden');

  if (student) {
    title.textContent = 'শিক্ষার্থীর তথ্য সম্পাদনা করুন';
    editIdInput.value = student.id;
    document.getElementById('student-name').value = student.name || '';
    document.getElementById('student-department').value = student.department || '';
    document.getElementById('student-faculty').value = student.faculty || 'science';

    // Handle University select matching
    let foundOption = false;
    for (let i = 0; i < uniSelect.options.length; i++) {
      if (uniSelect.options[i].value === student.university) {
        uniSelect.selectedIndex = i;
        foundOption = true;
        break;
      }
    }

    if (!foundOption) {
      uniSelect.value = 'other';
      otherWrapper.classList.remove('hidden');
      otherInput.value = student.university || '';
    }

    if (student.image) {
      existingUrlInput.value = student.image;
      previewImg.src = student.image;
      previewImg.classList.remove('hidden');
      placeholder.classList.add('hidden');
    } else {
      existingUrlInput.value = '';
      previewImg.classList.add('hidden');
      placeholder.classList.remove('hidden');
    }
  } else {
    title.textContent = 'নতুন শিক্ষার্থী যুক্ত করুন';
    editIdInput.value = '';
    existingUrlInput.value = '';
    previewImg.src = '';
    previewImg.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function closeStudentModal() {
  const modal = document.getElementById('modal-student');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

async function handleStudentFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('student-edit-id').value;
  const name = document.getElementById('student-name').value.trim();
  const faculty = document.getElementById('student-faculty').value;
  const department = document.getElementById('student-department').value.trim();
  const uniSelect = document.getElementById('student-uni-select-input');
  const otherInput = document.getElementById('student-uni-other-input');
  const photoInput = document.getElementById('student-photo-input');
  const existingImageUrl = document.getElementById('student-existing-image-url').value;

  const saveBtn = document.getElementById('student-save-btn');
  const saveText = document.getElementById('student-save-text');
  const saveSpinner = document.getElementById('student-save-spinner');

  // University calculation
  let university = uniSelect.value;
  if (university === 'other') {
    university = otherInput.value.trim();
    if (!university) {
      showToast('দয়া করে বিশ্ববিদ্যালয়ের নাম উল্লেখ করুন।', 'error');
      otherInput.focus();
      return;
    }
  }

  if (!name || !university || !department || !faculty) {
    showToast('অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।', 'error');
    return;
  }

  // Determine image URL
  let imageUrl = existingImageUrl;
  const newFile = photoInput.files && photoInput.files[0];

  if (!newFile && !imageUrl) {
    showToast('শিক্ষার্থীর ছবি আপলোড করা আবশ্যক।', 'error');
    return;
  }

  saveBtn.disabled = true;
  saveText.textContent = 'সংরক্ষণ হচ্ছে...';
  saveSpinner.classList.remove('hidden');

  try {
    if (newFile) {
      saveText.textContent = 'ছবি অপ্টিমাইজ হচ্ছে...';
      const compressedBase64 = await compressImageFile(newFile);
      saveText.textContent = 'ছবি আপলোড হচ্ছে...';
      imageUrl = await uploadImageToServer(compressedBase64);
    }

    saveText.textContent = 'সংরক্ষণ হচ্ছে...';

    const payload = {
      name,
      university,
      department,
      faculty,
      image: imageUrl,
    };

    let res;
    if (editId) {
      res = await apiFetch(`/api/students/${editId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    } else {
      res = await apiFetch('/api/students', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'সংরক্ষণ করতে সমস্যা হয়েছে।');
    }

    showToast(editId ? 'শিক্ষার্থীর তথ্য সফলভাবে আপডেট হয়েছে!' : 'নতুন শিক্ষার্থী সফলভাবে যুক্ত হয়েছে!', 'success');
    closeStudentModal();
    loadStudents();
  } catch (err) {
    console.error('Student save error:', err);
    showToast(err.message || 'শিক্ষার্থীর তথ্য সংরক্ষণ করা যায়নি।', 'error');
  } finally {
    saveBtn.disabled = false;
    saveText.textContent = 'সংরক্ষণ করুন';
    saveSpinner.classList.add('hidden');
  }
}

// ==========================================
// DELETE CONFIRMATION SYSTEM
// ==========================================

export function confirmDelete(type, id, name) {
  pendingDelete = { type, id, name };
  const modal = document.getElementById('modal-confirm-delete');
  const title = document.getElementById('delete-modal-title');
  const desc = document.getElementById('delete-modal-desc');

  if (type === 'teacher') {
    title.textContent = 'শিক্ষকের তথ্য মুছে ফেলবেন?';
    desc.textContent = `আপনি কি নিশ্চিতভাবে শিক্ষক "${name}"-এর সকল তথ্য মুছে ফেলতে চান? এটি পুনরায় ফেরত আনা যাবে না।`;
  } else {
    title.textContent = 'শিক্ষার্থীর তথ্য মুছে ফেলবেন?';
    desc.textContent = `আপনি কি নিশ্চিতভাবে শিক্ষার্থী "${name}"-এর সকল তথ্য মুছে ফেলতে চান? এটি পুনরায় ফেরত আনা যাবে না।`;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
  const modal = document.getElementById('modal-confirm-delete');
  modal.classList.add('hidden');
  pendingDelete = null;
  document.body.style.overflow = '';
}

async function executeDelete() {
  if (!pendingDelete) return;

  const { type, id, name } = pendingDelete;
  const confirmBtn = document.getElementById('delete-confirm-btn');
  const confirmText = document.getElementById('delete-confirm-text');
  const confirmSpinner = document.getElementById('delete-confirm-spinner');

  confirmBtn.disabled = true;
  confirmText.textContent = 'মুছে ফেলা হচ্ছে...';
  confirmSpinner.classList.remove('hidden');

  try {
    const endpoint = type === 'teacher' ? `/api/teachers/${id}` : `/api/students/${id}`;
    const res = await apiFetch(endpoint, { method: 'DELETE' });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'মুছে ফেলতে ব্যর্থ হয়েছে।');
    }

    showToast(`"${name}" সফলভাবে মুছে ফেলা হয়েছে।`, 'success');
    closeDeleteModal();

    if (type === 'teacher') {
      loadTeachers();
    } else {
      loadStudents();
    }
  } catch (err) {
    console.error('Delete error:', err);
    showToast(err.message || 'মুছে ফেলা সম্ভব হয়নি।', 'error');
  } finally {
    confirmBtn.disabled = false;
    confirmText.textContent = 'হ্যাঁ, মুছে ফেলুন';
    confirmSpinner.classList.add('hidden');
  }
}

// ==========================================
// BADGES & STATS
// ==========================================

function updateBadges() {
  const teachersBadge = document.getElementById('badge-teachers-count');
  const studentsBadge = document.getElementById('badge-students-count');
  if (teachersBadge) teachersBadge.textContent = teachersList.length;
  if (studentsBadge) studentsBadge.textContent = studentsList.length;
}

function loadAllData() {
  loadTeachers();
  loadStudents();
}

// ==========================================
// GLOBAL EVENT LISTENERS & SETUP
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Password Visibility Toggle
  const togglePwdBtn = document.getElementById('toggle-password-visibility');
  const pwdInput = document.getElementById('admin-password');
  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener('click', () => {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        togglePwdBtn.classList.add('text-sky-600');
      } else {
        pwdInput.type = 'password';
        togglePwdBtn.classList.remove('text-sky-600');
      }
    });
  }

  // 2. Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // 3. Logout Button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logout(true));
  }

  // 4. Tabs Navigation
  const tabTeachers = document.getElementById('tab-btn-teachers');
  const tabStudents = document.getElementById('tab-btn-students');
  if (tabTeachers) tabTeachers.addEventListener('click', () => switchTab('teachers'));
  if (tabStudents) tabStudents.addEventListener('click', () => switchTab('students'));

  // 5. Teacher Modal & Form
  const btnOpenTeacherModal = document.getElementById('btn-open-teacher-modal');
  if (btnOpenTeacherModal) btnOpenTeacherModal.addEventListener('click', () => openTeacherModal(null));
  const teacherForm = document.getElementById('teacher-form');
  if (teacherForm) teacherForm.addEventListener('submit', handleTeacherFormSubmit);

  // Teacher Photo Live Preview
  const teacherPhotoInput = document.getElementById('teacher-photo-input');
  if (teacherPhotoInput) {
    teacherPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      const previewImg = document.getElementById('teacher-photo-preview-img');
      const placeholder = document.getElementById('teacher-photo-placeholder');
      if (file) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.classList.remove('hidden');
        placeholder.classList.add('hidden');
      }
    });
  }

  // Teacher Faculty Filters
  document.querySelectorAll('.teacher-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentTeacherFilter = btn.getAttribute('data-teacher-filter');
      document.querySelectorAll('.teacher-filter-btn').forEach((b) => {
        b.classList.remove('bg-[#0b1d3a]', 'text-white');
        b.classList.add('text-slate-600');
      });
      btn.classList.add('bg-[#0b1d3a]', 'text-white');
      btn.classList.remove('text-slate-600');
      renderAdminTeachers();
    });
  });

  // 6. Student Modal & Form
  const btnOpenStudentModal = document.getElementById('btn-open-student-modal');
  if (btnOpenStudentModal) btnOpenStudentModal.addEventListener('click', () => openStudentModal(null));
  const studentForm = document.getElementById('student-form');
  if (studentForm) studentForm.addEventListener('submit', handleStudentFormSubmit);

  // Student University Other Toggle
  const studentUniSelect = document.getElementById('student-uni-select-input');
  const studentUniOtherWrapper = document.getElementById('student-uni-other-wrapper');
  if (studentUniSelect && studentUniOtherWrapper) {
    studentUniSelect.addEventListener('change', (e) => {
      if (e.target.value === 'other') {
        studentUniOtherWrapper.classList.remove('hidden');
        const otherInput = document.getElementById('student-uni-other-input');
        if (otherInput) otherInput.focus();
      } else {
        studentUniOtherWrapper.classList.add('hidden');
      }
    });
  }

  // Student Photo Live Preview
  const studentPhotoInput = document.getElementById('student-photo-input');
  if (studentPhotoInput) {
    studentPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      const previewImg = document.getElementById('student-photo-preview-img');
      const placeholder = document.getElementById('student-photo-placeholder');
      if (file) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.classList.remove('hidden');
        placeholder.classList.add('hidden');
      }
    });
  }

  // Student Faculty Filters
  document.querySelectorAll('.student-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentStudentFilter = btn.getAttribute('data-student-filter');
      document.querySelectorAll('.student-filter-btn').forEach((b) => {
        b.classList.remove('bg-[#0b1d3a]', 'text-white');
        b.classList.add('text-slate-600');
      });
      btn.classList.add('bg-[#0b1d3a]', 'text-white');
      btn.classList.remove('text-slate-600');
      renderAdminStudents();
    });
  });

  // 7. Delete Modal Actions
  const deleteConfirmBtn = document.getElementById('delete-confirm-btn');
  const deleteCancelBtn = document.getElementById('delete-cancel-btn');
  if (deleteConfirmBtn) deleteConfirmBtn.addEventListener('click', executeDelete);
  if (deleteCancelBtn) deleteCancelBtn.addEventListener('click', closeDeleteModal);

  // 8. ESC key to close open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTeacherModal();
      closeStudentModal();
      closeDeleteModal();
    }
  });

  // 9. Initial Session Verification
  verifySession();
});

// Window Exports for Inline HTML Callbacks
window.openTeacherModal = openTeacherModal;
window.closeTeacherModal = closeTeacherModal;
window.openStudentModal = openStudentModal;
window.closeStudentModal = closeStudentModal;
window.confirmDeleteTeacher = (id, name) => confirmDelete('teacher', id, name);
window.confirmDeleteStudent = (id, name) => confirmDelete('student', id, name);
window.openEditTeacher = (id) => {
  const teacher = teachersList.find((t) => t.id === id);
  if (teacher) openTeacherModal(teacher);
};
window.openEditStudent = (id) => {
  const student = studentsList.find((s) => s.id === id);
  if (student) openStudentModal(student);
};
