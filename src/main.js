/**
 * Shohan's Varsity Admission Coaching - Kushtia
 * Client-side Controller & Dynamic Interactivity
 * Pure JavaScript (No TypeScript)
 */

// 1. DATA DEFINITIONS
export const COACHING_INFO = {
  name: "সোহান'স ভার্সিটি অ্যাডমিশন কোচিং",
  shortName: "সোহান'স",
  englishName: "Shohan's Varsity Admission Coaching • Kushtia",
  motto: "স্বপ্নের পথে অবিচল...",
  address: "কুষ্টিয়া সরকারি কলেজের সামনে, কুষ্টিয়া, বাংলাদেশ",
  branchNotice: "একমাত্র কেন্দ্রীয় ক্যাম্পাস (অন্য কোনো শাখা বা উপ-শাখা নেই)",
  phones: ["০১৭১৩-০৪৮৩৬২", "০১৭২২-৮৬১৯৯৯"],
  phonesRaw: ["01713048362", "01722861999"],
  hours: "প্রতিদিন সকাল ৮:০০ টা – রাত ৮:০০ টা",
  email: "shohanscoaching.kushtia@gmail.com",
  facebookPage: "facebook.com/shohansadmissionkushtia",
  logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8vEXcKLSLNoNlZL4va51ZV-urS6aO9uxm_48wSBMDdU7PTDa_cVXTh6gFXHAPJg5X9HWW9GZ2YCpSh200Otadm0yjR84dB3XM4OJXyQ60Q_ub3j_i9xaZCSVFspTZtTvdWobIaSYw4j44ljvk2fnAe4L9lsF18kdqWz6die4z4tUwpL4abzuga91YyjSLfcJYgbB36FHRmykBxW-YrPFY3hu5B2oCMZ0FJAC_z-mGhK3aybVItOAxd2DjGWg7Dm27eA",
  heroBackground: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYaO_i4D5qLBlShStAnuwmsAup39Pl3-Be8gpuWVaBE4eFUxfprFK0-4nzf5WzLF-FUPmxbJgTbUnYYh7wvwPaYmgchzffevWJj5twqbZPzVpN4A0Tw73AEHHLBPwP-waezznTcxNZav062wpxqPKBrBH-cFuFitNwDfTFfVkgIfT6gMSTV26wFLNMZyG2k7gsfusP8shhxWLv5SHwRj7yo1MxlnOw8UEgLWAj7OCgiflrbPw3M1paDKDAuD2wtax4ww",
  gateImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd--Jig-5OCyJLDWz0aC9XSyvYkE9MB1WCD0oCMB9Lgl6EWpIR9RhzxZAzTrRfq3YHjez6gwcsR-CAswbYg7VP2V-2qGsJwgiHRK4gg6FcC83IgPiCL3sd23gwz1IYsUlB11qn0b_VusMP9UqRExsmYB3uC6OeEIOpX2yjCF4ecmmBs7gQdn9_6W_ngOBY_lH-fIbPQ1lo3mlQKTEN-hrjyhEsX3dETcRtPl9tg4WHpzbuJyi1XIvsjkYmlDHu75q3Pg"
};

export const TEACHERS_DATA = [
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

export const STUDENTS_DATA = [
  {
    id: "student-chabrin",
    name: "ছাবরিন সুলতানা",
    university: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    department: "আইন বিভাগ",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHaeKS7xALas8DlrH7I6TRUW3WnUyf9P2XDVuLu0-l0UvJ5Oz8ZwHrj7Cf7r6ZZCtpX8pHSvxBZlqsAGi3uBlWtOocgxWjYqFjUNm-VbnWb6hTNgipTosKtbe3Vop9ryIkDS8n5kfgCu3pOUFNxldUy06AmZcWgFdw0uv8gzrtIZJPOpdfBi1aInfAcCi6bcgt_GWqy5YBuwK28BIqjAyvLvFjPlryViKnO660Wi9N9vIMfAY_ZT-egWl0RZANpsUC6w"
  },
  {
    id: "student-bonya",
    name: "বন্যা রানী সাহা",
    university: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    department: "গণিত বিভাগ",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6XB6tRgWAq_P-oAMhvcBG7mWUGd-rQhui26TblLH8sRLuA9Ym4IwrpzUT7d6LYpsL_z_FVhuKaCIoVtWN7A_eK80MeLzoc2Ulm8vueKf0oacGuLzFNnRE75UCov5FptEHKABHytkK4-cqVOjj5GwTRAekS1RMqI0VJumwK9UfGxCy670c3rGF7A3uMBy5MzGnVCuY1oK1x1JGJiQK1pikBPTYnhoA_CpVkvrCGo3a7eEuNUE1JlJpHNuk4R4Sozy4aQ"
  }
];

export const COURSE_PROGRAMS = [
  {
    id: "science-unit-a",
    unitCode: "UNIT A / ENGINEERING / MEDICAL",
    title: "বিজ্ঞান বিভাগ ভর্তি প্রোগ্রাম",
    subtitle: "মেডিকেল, বুয়েট/ইঞ্জিনিয়ারিং ও ঢাবি বিজ্ঞান অনুষদ প্রস্তুতি",
    description: "পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত এবং জীববিজ্ঞানের মৌলিক ধারণা থেকে বিশ্ববিদ্যালয় ও মেডিকেল ভর্তি পরীক্ষার গভীর প্রস্তুতি।",
    highlights: [
      "বিষয়ভিত্তিক অভিজ্ঞ শিক্ষক দ্বারা সুশৃঙ্খল পাঠদান",
      "মেডিকেল ও প্রযুক্তি বিশ্ববিদ্যালয়ের স্পেশাল সল্ভ ক্লাস",
      "ওএমআর টেস্ট ও সেন্ট্রাল র‍্যাংকিং তালিকা প্রকাশ",
      "অধ্যায়ভিত্তিক বিশেষ লেকচার বুকলেট ও প্রশ্নব্যাংক",
      "দুর্বল বিষয়ের জন্য ব্যক্তিগত কেয়ার সেশন"
    ],
    subjects: ["পদার্থবিজ্ঞান (১ম ও ২য় পত্র)", "রসায়ন (১ম ও ২য় পত্র)", "উচ্চতর গণিত", "জীববিজ্ঞান (উদ্ভিদ ও প্রাণী)"],
    classesCount: 84,
    examsCount: 60,
    duration: "ভর্তি পরীক্ষা পর্যন্ত",
    batchTimes: ["সকাল ৮:০০ - ১০:০০", "সকাল ১০:৩০ - ১২:৩০", "বিকাল ৩:০০ - ৫:০০"]
  },
  {
    id: "humanities-unit-b",
    unitCode: "UNIT B / HUMANITIES / LAW",
    title: "মানবিক ও আইন বিভাগ প্রোগ্রাম",
    subtitle: "ঢাবি বি-ইউনিট, আইন ও শীর্ষ সাধারণ বিশ্ববিদ্যালয় প্রস্তুতি",
    description: "বাংলা, ইংরেজি এবং সাধারণ জ্ঞানের পুঙ্খানুপুঙ্খ বিশ্লেষণ ও কৌশল। ঢাকা বিশ্ববিদ্যালয় সহ দেশের শীর্ষ সাধারণ বিশ্ববিদ্যালয়ের জন্য সমন্বিত প্রস্তুতি।",
    highlights: [
      "ব্যাকরণ ও রিটেন পার্টের বিশেষ গাইডলাইন ও প্র্যাকটিস",
      "বাংলাদেশ ও আন্তর্জাতিক সাধারণ জ্ঞানের নিয়মিত আপডেট বুকলেট",
      "সাপ্তাহিক মডেল টেস্ট ও ওএমআর এভ্যালুয়েশন",
      "আইন ও সামাজিক বিজ্ঞান অনুষদ স্ট্যান্ডার্ড প্রশ্ন প্রস্তুতি",
      "বিগত ২০ বছরের প্রশ্নব্যাংক সম্পূর্ণ ব্যবচ্ছেদ"
    ],
    subjects: ["বাংলা (সাহিত্য ও ব্যাকরণ)", "ইংরেজি (Grammar, Vocabulary & Written)", "সাধারণ জ্ঞান (বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি)"],
    classesCount: 72,
    examsCount: 52,
    duration: "ভর্তি পরীক্ষা পর্যন্ত",
    batchTimes: ["সকাল ৯:০০ - ১১:০০", "বিকাল ৩:৩০ - ৫:৩০"]
  },
  {
    id: "business-unit-c",
    unitCode: "UNIT C / BUSINESS STUDIES",
    title: "ব্যবসায় শিক্ষা প্রোগ্রাম",
    subtitle: "ঢাবি সি-ইউনিট, গুচ্ছ ও ব্যবসায় অনুষদ প্রস্তুতি",
    description: "হিসাববিজ্ঞান, ব্যবসায় সংগঠন ও ব্যবস্থাপনা, ইংরেজি ও ফাইন্যান্সের জটিল গাণিতিক প্রশ্নের দ্রুত সমাধানের বিশেষ টেকনিক।",
    highlights: [
      "হিসাববিজ্ঞানের শর্টকাট টেকনিক ও নির্ভুল অনুশীলন",
      "ব্যবসায় নীতি ও প্র্যাকটিক্যাল কেস স্টাডি বিশ্লেষণ",
      "গুচ্ছ ও ঢাবি সি-ইউনিট স্ট্যান্ডার্ড ওএমআর টেস্ট",
      "ফিন্যান্স ও মার্কেটিং অপশনাল রিভিশন সাপোর্ট",
      "ক্যালকুলেটর ছাড়া দ্রুত গুণ-ভাগ করার মেথডোলজি"
    ],
    subjects: ["হিসাববিজ্ঞান", "ব্যবসায় সংগঠন ও ব্যবস্থাপনা", "ইংরেজি", "ফিন্যান্স / মার্কেটিং"],
    classesCount: 68,
    examsCount: 48,
    duration: "ভর্তি পরীক্ষা পর্যন্ত",
    batchTimes: ["সকাল ১০:০০ - ১২:০০", "বিকাল ৪:০০ - ৬:০০"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gallery-1",
    title: "সেন্ট্রাল এক্সাম হল (কুষ্টিয়া কেন্দ্র)",
    category: "মডেল টেস্ট পরিবেশ",
    tag: "exam",
    caption: "পূর্ণাঙ্গ পরীক্ষা কেন্দ্রের আদলে সুশৃঙ্খল এক্সাম হল। হাজারো শিক্ষার্থীর উপস্থিতিতে বিশ্ববিদ্যালয় ভর্তি পরীক্ষার ভীতি দূরীকরণে নিয়মিত বড় আকারের টেস্ট গ্রহণ।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKCcp-xaVDMh8Tf838-0Pnb7lbk44cMdPsReYZM2lgSak0klzMqDvsV7H-uSx2vzG2HsZUtxfKmiTyuCVHRfVZGMN3ZC9rjABbt7GB29hlIjV8n_eAHr3K_4nZwpoYSLyOFBIEorijz_FRElfhx4kF0o-gPZvdMUxm2XUrVNaHfScASi1k9Z7JXhgxqDy8Drj693bHJZQoWXkH98buQwJrZeBXezcn-bdDdGOJs3NCLqEHkeEarHup28EPswKTQjUGKQ"
  },
  {
    id: "gallery-2",
    title: "অভিজ্ঞ পরিদর্শকদের প্রত্যক্ষ নজরদারি",
    category: "পরীক্ষা পরিবীক্ষণ",
    tag: "exam",
    caption: "যথাযথ শৃঙ্খলা ও নির্ধারিত সময়ের মধ্যে ওএমআর ও সৃজনশীল উত্তরপত্র মূল্যায়ন। প্রতিটি পরীক্ষায় বিশ্ববিদ্যালয় ভর্তি পরীক্ষার আসল পরিবেশ নিশ্চিত করা হয়।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8BEmgjHn-Dce9ucmUrGkAvU7u1Me4xAmedEDvYQyPoNVod6fx9sQ7XXIZJ506LEG5Va1hBYic4M35uwUkoSFCD2jwN8G3H3NIXulgGfR8Spq7A2EJNMYJ7iIJ8SWNCyQwR_EDmV5msEamr_TlFaDoLjXPlTkrbSE0W_100cVPMjRaFEUvoIXliXoWbYtcK61seb5U0_CND1bTUqYuTVvxAzftcep0g0J8O0rPkn0pOg_lH0QM69m686cLOtZujbz8Fw"
  },
  {
    id: "gallery-3",
    title: "জীববিজ্ঞান স্পেশাল লেকচার সেশন",
    category: "বিষয়ভিত্তিক বিশেষ ক্লাস",
    tag: "class",
    caption: "Sayeed's Era of Biology - মেডিকেল ও বিশ্ববিদ্যালয় ভর্তি উপযোগী গভীর বিশ্লেষণধর্মী ও ভিজ্যুয়াল স্লাইড উপস্থাপনা।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChPCMW831zbhMfX0pJ7LgbVkGJev5QTuJLnm3qftT0FAlNfNcYy9TCUCjgsDFnFz7bhKi7VKtwrDGuWh5mo_TY0p9_jrjwLrl27JYyUFmOMkIC_wR4BdTfa1zkjQ2FbbWnQNxnTYJ1lWJ3AZoJT5PS0i6saHccljAkcdM0ahLLQVqrjUtbI23nbHvcee31R3llrr--fLtshCzeU4L3VgT5aIFauDuxBL3r4Br8MLD6KbxzdLN8OXmApQbZEr1KagZa8Q"
  },
  {
    id: "gallery-4",
    title: "সেন্ট্রাল সিসিটিভি ক্যামেরা পর্যবেক্ষণ কক্ষ",
    category: "নিরাপত্তা ও স্বচ্ছতা",
    tag: "cctv",
    caption: "সকল ক্লাসরুম ও পরীক্ষা হলের সামগ্রিক পরিবেশ সার্বক্ষণিক ডিজিটাল ক্যামেরা নজরদারিতে পরিচালিত। শিক্ষার্থীদের শতভাগ পাঠমনোযোগ নিশ্চিতকরণ।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFZjlR_8TAuC7Q-bl9Evbvm8PuI9zgGBqXCzHX5IZJc9kMC1efiYYPfesN5ilIfTIWmhsoVN88dsQ8USC2MvmdVFb_FO3niQu7YUnoLITT2ylrK5uWtr1-sloJcYN48jMpd_rOGMdjRllcDtrVFKji7o2TJEGDi59pcci4VC38IHiQWdgPnvfX9JYOdxJEAdfUegtzEOthq0HelIIJPwTVzrTFXAxF2gbCbHd84_5Yun01b5qJ8CMdIdeELBl_r6kUrQ"
  },
  {
    id: "gallery-5",
    title: "কুষ্টিয়া সরকারি কলেজের সম্মুখস্থ ক্যাম্পাস আঙ্গিনা",
    category: "বাস্তব পরিবেশ",
    tag: "gate",
    caption: "কুষ্টিয়া সরকারি কলেজ ও আশপাশের শিক্ষার্থীদের আস্থার কেন্দ্রস্থল। ক্লাস শেষে শিক্ষক ও শিক্ষার্থীদের মুক্ত আলোচনা ও কাউন্সেলিং।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdp4yH3yaqLBOqnfE_AWLmSJMmmbpbkceMRNH4T6nUDg3ExfdU1fJ6a6zlyIdpyAWCGhcgV2clFuFrDPIMKXzOHvJWMDh3YNKzQBZ9QEgvthi4XIrU5FONl4FIlkQ_AVBl2vljw2zor20anekSAidRLfzeV2ZHpKDQmEbS_P0By-au2xwRlLxkPKxwijuSSFpZSBycYm7gj146_RB977jNJ6G5FtJdOyoK4NskM71-SR27kwFpnUTr8SNFYx6jdPxR5Q"
  },
  {
    id: "gallery-6",
    title: "লেকচার শিট ও স্টাডি ম্যাটেরিয়াল বিতরণ ডেস্ক",
    category: "হাতে কলমে প্র্যাকটিস",
    tag: "class",
    caption: "প্রতিটি অধ্যায়ের শেষে শিক্ষার্থীদের হাতে তুলে দেওয়া হয় আপডেটেড এক্সক্লুসিভ লেকচার শিট ও সাম্প্রতিক প্রশ্নব্যাংক।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyPoAKYWMJEIjKbFnnBhCI0JwVpHS0wIa2FKPtqh8RcJH-MCgrOO8hXlRByswdv9CjY9gx5El0tGFOLtqACBMvFkyWWzd85tagXdYh7rYoihHdir0vPErtFh-Jq__0zitKXbqWLI920UUurkRvB-GxJRKK6Sx-4P-1Ab4PnEk4KLzK22vN2x5c1uIGT9saU_7bLVOJ4ZJ30fxPs2-wnr66qEGF-xp418F7MV0dIsEa9mD-57iekbI4B6fqnJxT8Kr2aQ"
  },
  {
    id: "gallery-7",
    title: "কুষ্টিয়া প্রধান ক্যাম্পাস ফটক ও অভ্যর্থনা কেন্দ্র",
    category: "ক্যাম্পাস প্রবেশদ্বার",
    tag: "gate",
    caption: "কুষ্টিয়া সরকারি কলেজের সামনে সোহান'স ভার্সিটি অ্যাডমিশন কোচিংয়ের একমাত্র কেন্দ্রীয় ক্যাম্পাস। সরাসরি অফিসে এসে ভর্তি তথ্য ও লেকচার শিট দেখা যায়।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd--Jig-5OCyJLDWz0aC9XSyvYkE9MB1WCD0oCMB9Lgl6EWpIR9RhzxZAzTrRfq3YHjez6gwcsR-CAswbYg7VP2V-2qGsJwgiHRK4gg6FcC83IgPiCL3sd23gwz1IYsUlB11qn0b_VusMP9UqRExsmYB3uC6OeEIOpX2yjCF4ecmmBs7gQdn9_6W_ngOBY_lH-fIbPQ1lo3mlQKTEN-hrjyhEsX3dETcRtPl9tg4WHpzbuJyi1XIvsjkYmlDHu75q3Pg"
  },
  {
    id: "gallery-8",
    title: "কেন্দ্রীয় শিক্ষক পরিষদের সম্মানিত শিক্ষকবৃন্দ",
    category: "শিক্ষক পরিষদ",
    tag: "class",
    caption: "কুষ্টিয়া ক্যাম্পাসের অভিজ্ঞ শিক্ষক পরিষদ। বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার নিবেদিতপ্রাণ মেন্টরদের সার্বক্ষণিক তত্ত্বাবধান।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYaO_i4D5qLBlShStAnuwmsAup39Pl3-Be8gpuWVaBE4eFUxfprFK0-4nzf5WzLF-FUPmxbJgTbUnYYh7wvwPaYmgchzffevWJj5twqbZPzVpN4A0Tw73AEHHLBPwP-waezznTcxNZav062wpxqPKBrBH-cFuFitNwDfTFfVkgIfT6gMSTV26wFLNMZyG2k7gsfusP8shhxWLv5SHwRj7yo1MxlnOw8UEgLWAj7OCgiflrbPw3M1paDKDAuD2wtax4ww"
  }
];

export const FAQS_DATA = [
  {
    question: "সোহান'স কোচিংয়ের অন্য কোনো জেলা বা উপজেলায় শাখা আছে কি?",
    answer: "না। সোহান'স ভার্সিটি অ্যাডমিশন কোচিংয়ের একমাত্র অনুমোদিত ক্যাম্পাস কুষ্টিয়া সরকারি কলেজের বিপরীতে অবস্থিত। কোনো ধরণের প্রতারণামূলক শাখা থেকে সতর্ক থাকার জন্য সবাইকে বিনীত অনুরোধ করা হচ্ছে।"
  },
  {
    question: "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার ক্লাসগুলো কি আলাদা ব্যাচে হয়?",
    answer: "হ্যাঁ, প্রতিটি শাখার জন্য স্বতন্ত্র ব্যাচ ও ডেডিকেটেড রুটিন রয়েছে। এছাড়া ক্লাসের পর কোনো টপিক বুঝতে সমস্যা থাকলে সরাসরি শিক্ষকদের সাথে আলাদা 'ডাউট সলভিং' সেশনের ব্যবস্থা থাকে।"
  },
  {
    question: "পরীক্ষা কি বিশ্ববিদ্যালয় ভর্তি পরীক্ষার অনুরূপ ওএমআর শিটে হয়?",
    answer: "অবশ্যই। আমাদের প্রতিটি সাপ্তাহিক টেস্ট ও মডেল টেস্ট আধুনিক ওএমআর শিট এবং বিশেষ কোডিং পদ্ধতিতে নেওয়া হয়। কম্পিউটারে খাতা মূল্যায়নের মাধ্যমে তাৎক্ষণিক মেধা তালিকা ও নেগেটিভ মার্কিং বিশ্লেষণ দেওয়া হয়।"
  },
  {
    question: "কুষ্টিয়ার বাইরের শিক্ষার্থীদের জন্য মেস বা হোস্টেলের কোনো সহায়তা দেওয়া হয় কি?",
    answer: "হ্যাঁ, দূর-দূরান্তের জেলা ও উপজেলা থেকে আগত শিক্ষার্থীদের জন্য ক্যাম্পাসের কাছাকাছি নিরাপদ ছাত্র ও ছাত্রী হোস্টেল খুঁজে পেতে আমাদের অফিসিয়াল হেল্পডেস্ক আন্তরিক সহায়তা দিয়ে থাকে।"
  }
];

// 2. STATE MANAGEMENT
let currentPage = 'home';
let currentFacultyFilter = 'all';
let currentStudentSearch = '';
let currentStudentUni = 'all';
let currentStudentDept = 'all';

// Gallery state
let currentGalleryFilter = 'all';
let activeGalleryIndex = 0;
let isSliderPlaying = true;
let sliderInterval = null;
let touchStartX = null;
let touchEndX = null;

// 3. ROUTER / PAGE SWITCHER (Multi-Page Architecture Support)
const validPages = ['home', 'about', 'courses', 'teachers', 'achievements', 'gallery', 'contact'];

export function navigateTo(pageId) {
  if (!validPages.includes(pageId)) {
    pageId = 'home';
  }
  const targetFile = pageId === 'home' ? '/index.html' : `/${pageId}.html`;
  const currentPath = window.location.pathname;
  const isCurrent = (pageId === 'home' && (currentPath === '/' || currentPath.endsWith('/index.html'))) ||
                    (pageId !== 'home' && currentPath.endsWith(`/${pageId}.html`));

  if (!isCurrent) {
    window.location.href = targetFile;
    return;
  }

  // If already on the page, smoothly scroll to top and close drawer
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function handleHashChange() {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (validPages.includes(hash)) {
    navigateTo(hash);
  }
}

// 4. MOBILE DRAWER CONTROLLER
export function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!drawer || !backdrop) return;

  const isOpen = !drawer.classList.contains('hidden');
  if (isOpen) {
    closeMobileMenu();
  } else {
    drawer.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    if (iconOpen) iconOpen.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

export function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (drawer) drawer.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
  if (iconOpen) iconOpen.classList.remove('hidden');
  if (iconClose) iconClose.classList.add('hidden');
  document.body.style.overflow = '';
}

// 5. RENDER TEACHERS
export function renderTeachers() {
  const container = document.getElementById('teachers-grid');
  if (!container) return;

  const filtered = TEACHERS_DATA.filter(t => {
    if (currentFacultyFilter === 'all') return true;
    return t.faculty === currentFacultyFilter;
  });

  container.innerHTML = filtered.map(teacher => `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div class="relative bg-slate-100 overflow-hidden aspect-[4/4.8]">
        <img
          src="${teacher.image}"
          alt="${teacher.name}"
          class="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
        />
      </div>

      <div class="p-5 space-y-2.5 text-sm font-bn">
        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">নাম:</span>
          <span class="text-slate-900 font-semibold">${teacher.name}</span>
        </div>
        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">পদবি/পরিচয়:</span>
          <span class="text-slate-700">${teacher.designation}</span>
        </div>
        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">শিক্ষাগত যোগ্যতা:</span>
          <span class="text-slate-700 leading-snug">${teacher.qualification}</span>
        </div>
        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">ইন্সট্রাক্টর:</span>
          <span class="text-[#e11d48] font-semibold">${teacher.instructor}</span>
        </div>
        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">অভিজ্ঞতা:</span>
          <span class="text-slate-700">${teacher.experience}</span>
        </div>
      </div>
    </div>
  `).join('');
}

export function setFacultyFilter(faculty) {
  currentFacultyFilter = faculty;
  document.querySelectorAll('.faculty-tab-btn').forEach(btn => {
    const f = btn.getAttribute('data-faculty');
    if (f === faculty) {
      btn.classList.add('bg-[#0284c7]', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-600');
    } else {
      btn.classList.remove('bg-[#0284c7]', 'text-white', 'shadow-sm');
      btn.classList.add('text-slate-600');
    }
  });
  renderTeachers();
}

// 6. RENDER STUDENTS
export function renderStudents() {
  const container = document.getElementById('students-grid');
  const emptyState = document.getElementById('students-empty');
  if (!container) return;

  const filtered = STUDENTS_DATA.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(currentStudentSearch.toLowerCase()) ||
      s.university.toLowerCase().includes(currentStudentSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(currentStudentSearch.toLowerCase());

    const matchesUni = currentStudentUni === 'all' || s.university.includes(currentStudentUni);
    const matchesDept = currentStudentDept === 'all' || s.department.includes(currentStudentDept);

    return matchesSearch && matchesUni && matchesDept;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = filtered.map(student => `
    <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div class="relative bg-white aspect-[4/4.8] overflow-hidden border-b border-slate-200">
        <img
          src="${student.image}"
          alt="${student.name}"
          class="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
        />
      </div>

      <div class="p-5 space-y-2.5 text-sm font-bn">
        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">নাম:</span>
          <span class="text-slate-900 font-semibold">${student.name}</span>
        </div>

        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">বিশ্ববিদ্যালয়:</span>
          <span class="text-[#0284c7] font-semibold">${student.university}</span>
        </div>

        <div class="flex items-start gap-1.5">
          <span class="font-bold text-slate-800 shrink-0">বিভাগ:</span>
          <span class="text-slate-700">${student.department}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 7. GALLERY SLIDER CONTROLLER
export function getFilteredGalleryItems() {
  if (currentGalleryFilter === 'all') return GALLERY_ITEMS;
  if (currentGalleryFilter === 'gate') return GALLERY_ITEMS.filter(item => item.id === 'gallery-5' || item.id === 'gallery-7');
  if (currentGalleryFilter === 'exam') return GALLERY_ITEMS.filter(item => item.id === 'gallery-1' || item.id === 'gallery-2');
  if (currentGalleryFilter === 'class') return GALLERY_ITEMS.filter(item => item.id === 'gallery-3' || item.id === 'gallery-6');
  if (currentGalleryFilter === 'cctv') return GALLERY_ITEMS.filter(item => item.id === 'gallery-4');
  return GALLERY_ITEMS;
}

export function updateGallerySlider() {
  const items = getFilteredGalleryItems();
  if (activeGalleryIndex >= items.length) {
    activeGalleryIndex = 0;
  }
  const track = document.getElementById('gallery-slider-track');
  const countEl = document.getElementById('gallery-slide-counter');
  const dotsContainer = document.getElementById('gallery-dots-container');

  if (track) {
    track.style.transform = `translateX(-${activeGalleryIndex * 100}%)`;
  }

  if (countEl) {
    countEl.textContent = `ছবি ${activeGalleryIndex + 1} / ${items.length}`;
  }

  // Update dots
  if (dotsContainer) {
    dotsContainer.innerHTML = items.map((_, idx) => `
      <button
        type="button"
        onclick="window.goToGallerySlide(${idx})"
        class="h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
          activeGalleryIndex === idx ? 'bg-sky-400 w-4 sm:w-6' : 'bg-white/50 w-1.5 sm:w-2 hover:bg-white'
        }"
        aria-label="Slide ${idx + 1}"
      ></button>
    `).join('');
  }

  // Highlight active thumbnail
  document.querySelectorAll('.gallery-thumb-btn').forEach((thumb, idx) => {
    if (idx === activeGalleryIndex) {
      thumb.classList.add('border-[#0284c7]', 'ring-2', 'ring-sky-300', 'scale-102', 'shadow-md');
      thumb.classList.remove('border-slate-200', 'opacity-70');
    } else {
      thumb.classList.remove('border-[#0284c7]', 'ring-2', 'ring-sky-300', 'scale-102', 'shadow-md');
      thumb.classList.add('border-slate-200', 'opacity-70');
    }
  });
}

export function renderGallery() {
  const items = getFilteredGalleryItems();
  const track = document.getElementById('gallery-slider-track');
  const thumbsContainer = document.getElementById('gallery-thumbnails');
  const albumGrid = document.getElementById('gallery-album-grid');

  if (track) {
    track.innerHTML = items.map(item => `
      <div class="w-full shrink-0 h-full relative">
        <img
          src="${item.image}"
          alt="${item.title}"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3.5 sm:p-6 lg:p-8 text-white">
          <span class="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-300 font-bold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
            ${item.category}
          </span>
          <h3 class="text-base sm:text-2xl lg:text-3xl font-extrabold mt-1 sm:mt-2 leading-tight">
            ${item.title}
          </h3>
          <p class="text-[11px] sm:text-xs md:text-sm text-slate-200 mt-0.5 sm:mt-1 max-w-3xl leading-relaxed line-clamp-2 sm:line-clamp-none">
            ${item.caption}
          </p>
        </div>
      </div>
    `).join('');
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = items.map((item, idx) => `
      <button
        type="button"
        onclick="window.goToGallerySlide(${idx})"
        class="gallery-thumb-btn relative rounded-xl overflow-hidden shrink-0 w-24 sm:w-auto aspect-[4/3] border-2 transition-all cursor-pointer group ${
          activeGalleryIndex === idx
            ? 'border-[#0284c7] ring-2 ring-sky-300 scale-102 shadow-md'
            : 'border-slate-200 hover:border-sky-400 opacity-70 hover:opacity-100'
        }"
      >
        <img
          src="${item.image}"
          alt="${item.title}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors flex items-end p-1">
          <span class="text-[9px] sm:text-[10px] text-white font-semibold drop-shadow line-clamp-1 leading-tight">
            ${item.title}
          </span>
        </div>
      </button>
    `).join('');
  }

  if (albumGrid) {
    albumGrid.innerHTML = items.map(item => `
      <div
        onclick="window.openImageLightbox('${item.image}', '${item.title.replace(/'/g, "\\'")}', '${item.caption.replace(/'/g, "\\'")}')"
        class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div class="relative aspect-[16/11] overflow-hidden bg-slate-100">
            <img
              src="${item.image}"
              alt="${item.title}"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-2.5 left-2.5 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
              ${item.category}
            </div>
          </div>
          <div class="p-4 space-y-1">
            <h4 class="font-bold text-slate-800 text-sm leading-snug group-hover:text-sky-600 transition-colors">
              ${item.title}
            </h4>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              ${item.caption}
            </p>
          </div>
        </div>
        <div class="px-4 pb-3 pt-1 border-t border-slate-100 text-[11px] text-[#0284c7] font-semibold flex items-center justify-between">
          <span>বড় করে দেখুন</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </div>
      </div>
    `).join('');
  }

  updateGallerySlider();
}

export function nextGallerySlide() {
  const items = getFilteredGalleryItems();
  activeGalleryIndex = (activeGalleryIndex + 1) % items.length;
  updateGallerySlider();
}

export function prevGallerySlide() {
  const items = getFilteredGalleryItems();
  activeGalleryIndex = (activeGalleryIndex - 1 + items.length) % items.length;
  updateGallerySlider();
}

export function goToGallerySlide(idx) {
  activeGalleryIndex = idx;
  updateGallerySlider();
}

export function setGalleryFilter(cat) {
  currentGalleryFilter = cat;
  activeGalleryIndex = 0;
  document.querySelectorAll('.gallery-category-btn').forEach(btn => {
    const c = btn.getAttribute('data-cat');
    if (c === cat) {
      btn.classList.add('bg-[#0284c7]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border');
    } else {
      btn.classList.remove('bg-[#0284c7]', 'text-white', 'shadow-md');
      btn.classList.add('bg-white', 'text-slate-700', 'border');
    }
  });
  renderGallery();
}

export function toggleGalleryAutoplay() {
  isSliderPlaying = !isSliderPlaying;
  const btn = document.getElementById('gallery-autoplay-btn');
  if (btn) {
    btn.innerHTML = isSliderPlaying
      ? `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>অটোপ্লে চালু</span>`
      : `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>অটোপ্লে বন্ধ</span>`;
  }
}

// 8. MODALS & LIGHTBOXES
export function openTeacherHeroLightbox() {
  const modal = document.getElementById('lightbox-teacher-hero');
  if (modal) modal.classList.remove('hidden');
}

export function closeTeacherHeroLightbox() {
  const modal = document.getElementById('lightbox-teacher-hero');
  if (modal) modal.classList.add('hidden');
}

export function openImageLightbox(src, title, caption) {
  const modal = document.getElementById('lightbox-generic');
  const imgEl = document.getElementById('lightbox-generic-img');
  const titleEl = document.getElementById('lightbox-generic-title');
  const capEl = document.getElementById('lightbox-generic-caption');

  if (modal && imgEl && titleEl && capEl) {
    imgEl.src = src;
    titleEl.textContent = title;
    capEl.textContent = caption;
    modal.classList.remove('hidden');
  }
}

export function closeImageLightbox() {
  const modal = document.getElementById('lightbox-generic');
  if (modal) modal.classList.add('hidden');
}

export function openCourseModal(programId) {
  const prog = COURSE_PROGRAMS.find(p => p.id === programId);
  if (!prog) return;

  const modal = document.getElementById('modal-course-details');
  if (!modal) return;

  document.getElementById('modal-course-unitcode').textContent = prog.unitCode;
  document.getElementById('modal-course-title').textContent = prog.title;
  document.getElementById('modal-course-subtitle').textContent = prog.subtitle;
  document.getElementById('modal-course-desc').textContent = prog.description;
  document.getElementById('modal-course-classes').textContent = `${prog.classesCount}+ টি`;
  document.getElementById('modal-course-exams').textContent = `${prog.examsCount}+ টি`;
  document.getElementById('modal-course-duration').textContent = prog.duration;

  // Subjects
  document.getElementById('modal-course-subjects').innerHTML = prog.subjects.map(s => `
    <span class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-50 text-sky-800 font-semibold text-xs border border-sky-200">
      ${s}
    </span>
  `).join('');

  // Highlights
  document.getElementById('modal-course-highlights').innerHTML = prog.highlights.map(h => `
    <li class="flex items-start gap-2 text-slate-600">
      <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      <span>${h}</span>
    </li>
  `).join('');

  // Batch times
  document.getElementById('modal-course-times').innerHTML = prog.batchTimes.map(t => `
    <span class="px-2.5 sm:px-3 py-1 bg-slate-100 rounded-md text-xs text-slate-700">
      ${t}
    </span>
  `).join('');

  // Apply action
  const applyBtn = document.getElementById('modal-course-apply-btn');
  if (applyBtn) {
    applyBtn.onclick = () => {
      closeCourseModal();
      applyCourse(prog.title);
    };
  }

  modal.classList.remove('hidden');
}

export function closeCourseModal() {
  const modal = document.getElementById('modal-course-details');
  if (modal) modal.classList.add('hidden');
}

export function applyCourse(courseTitle) {
  let unitValue = "বিজ্ঞান বিভাগ (মেডিকেল/ভার্সিটি 'ক'/প্রকৌশল)";
  if (courseTitle.includes('মানবিক')) {
    unitValue = "মানবিক বিভাগ (ভার্সিটি 'খ'/আইন)";
  } else if (courseTitle.includes('ব্যবসায়')) {
    unitValue = "ব্যবসায় শিক্ষা বিভাগ (ভার্সিটি 'গ')";
  }

  const select = document.getElementById('inquiry-unit');
  if (select) {
    select.value = unitValue;
    const formEl = document.getElementById('inquiry-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    window.location.href = `/contact.html?unit=${encodeURIComponent(unitValue)}`;
  }
}

// 9. CONTACT FORM & ADMISSION SLIP
export function handleInquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('inquiry-name').value;
  const phone = document.getElementById('inquiry-phone').value;
  const unit = document.getElementById('inquiry-unit').value;
  const college = document.getElementById('inquiry-college').value;
  const token = `SHN-KU-${Math.floor(100000 + Math.random() * 900000)}`;

  document.getElementById('slip-token').textContent = token;
  document.getElementById('slip-name').textContent = name;
  document.getElementById('slip-phone').textContent = phone;
  document.getElementById('slip-unit').textContent = unit;
  document.getElementById('slip-college').textContent = college || 'কুষ্টিয়া অঞ্চল';

  const modal = document.getElementById('modal-slip');
  if (modal) modal.classList.remove('hidden');
}

export function closeSlipModal() {
  const modal = document.getElementById('modal-slip');
  if (modal) modal.classList.add('hidden');
  document.getElementById('inquiry-form').reset();
}

export function copySlipToken() {
  const token = document.getElementById('slip-token').textContent;
  if (token) {
    navigator.clipboard.writeText(token);
    const feedback = document.getElementById('slip-copy-feedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 2000);
    }
  }
}

// 10. FAQS ACCORDION
export function toggleFaq(idx) {
  const ans = document.getElementById(`faq-ans-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (!ans || !icon) return;

  const isHidden = ans.classList.contains('hidden');
  if (isHidden) {
    ans.classList.remove('hidden');
    icon.classList.add('rotate-180', 'text-sky-600');
  } else {
    ans.classList.add('hidden');
    icon.classList.remove('rotate-180', 'text-sky-600');
  }
}

// 11. EXPOSE TO WINDOW FOR INLINE EVENT LISTENERS
window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.setFacultyFilter = setFacultyFilter;
window.openTeacherHeroLightbox = openTeacherHeroLightbox;
window.closeTeacherHeroLightbox = closeTeacherHeroLightbox;
window.openImageLightbox = openImageLightbox;
window.closeImageLightbox = closeImageLightbox;
window.openCourseModal = openCourseModal;
window.closeCourseModal = closeCourseModal;
window.applyCourse = applyCourse;
window.handleInquirySubmit = handleInquirySubmit;
window.closeSlipModal = closeSlipModal;
window.copySlipToken = copySlipToken;
window.toggleFaq = toggleFaq;
window.nextGallerySlide = nextGallerySlide;
window.prevGallerySlide = prevGallerySlide;
window.goToGallerySlide = goToGallerySlide;
window.setGalleryFilter = setGalleryFilter;
window.toggleGalleryAutoplay = toggleGalleryAutoplay;
window.openCurrentSlideLightbox = () => {
  const items = getFilteredGalleryItems();
  const current = items[activeGalleryIndex] || items[0];
  if (current) {
    openImageLightbox(current.image, current.title, current.caption);
  }
};

// 12. INITIALIZATION ON DOM LOAD
function initializeApp() {
  // Check URL query parameters for pre-selected unit (e.g. from course card)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedUnit = urlParams.get('unit');
  if (selectedUnit) {
    const unitSelect = document.getElementById('inquiry-unit');
    if (unitSelect) {
      unitSelect.value = decodeURIComponent(selectedUnit);
    }
  }

  // Render dynamic data if elements exist on current page
  renderTeachers();
  renderStudents();
  renderGallery();

  // Student Search Listener
  const searchInput = document.getElementById('student-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentStudentSearch = e.target.value;
      renderStudents();
    });
  }

  const uniSelect = document.getElementById('student-uni-select');
  if (uniSelect) {
    uniSelect.addEventListener('change', (e) => {
      currentStudentUni = e.target.value;
      renderStudents();
    });
  }

  const deptSelect = document.getElementById('student-dept-select');
  if (deptSelect) {
    deptSelect.addEventListener('change', (e) => {
      currentStudentDept = e.target.value;
      renderStudents();
    });
  }

  // Gallery Autoplay & Touch Events (only if gallery slider exists on this page)
  const sliderEl = document.getElementById('gallery-slider-container');
  if (sliderEl) {
    sliderInterval = setInterval(() => {
      if (isSliderPlaying) {
        nextGallerySlide();
      }
    }, 4500);

    sliderEl.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', (e) => {
      if (!touchStartX) return;
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (diff > 50) {
        nextGallerySlide();
      } else if (diff < -50) {
        prevGallerySlide();
      }
    }, { passive: true });
  }

  // Keyboard navigation for gallery & lightbox
  window.addEventListener('keydown', (e) => {
    if (currentPage === 'gallery') {
      if (e.key === 'ArrowRight') nextGallerySlide();
      if (e.key === 'ArrowLeft') prevGallerySlide();
    }
    if (e.key === 'Escape') {
      closeTeacherHeroLightbox();
      closeImageLightbox();
      closeCourseModal();
      closeSlipModal();
      closeMobileMenu();
    }
  });

  // Scroll To Top button visibility
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden');
      } else {
        scrollTopBtn.classList.add('hidden');
      }
    }
  }, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

