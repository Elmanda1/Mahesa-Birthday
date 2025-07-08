// quizData.js
export const quizQuestions = [
  {
    id: 1,
    question: "Apa makanan favorit Mahesa?",
    options: ["Nasi Gudeg", "Rendang", "Gado-gado", "Bakso"],
    correct: 0,
    hint: "Makanan khas Yogyakarta"
  },
  {
    id: 2,
    question: "Kapan hari ulang tahun Mahesa?",
    options: ["15 Januari", "22 Februari", "10 Maret", "8 Juli"],
    correct: 3,
    hint: "Bulan ini!"
  },
  // ... more questions
];

// memoryData.js
export const memoryTimeline = [
  {
    id: 1,
    year: "2020",
    title: "Pertama Kali Kenal",
    description: "Saat pertama kali bertemu di kampus...",
    image: "/images/memory1.jpg",
    color: "#FF6B9D"
  },
  {
    id: 2,
    year: "2021",
    title: "Liburan Pertama",
    description: "Trip ke Bali yang tak terlupakan...",
    image: "/images/memory2.jpg",
    color: "#4ECDC4"
  },
  // ... more memories
];

// profileData.js
export const birthdayProfile = {
  name: "Mahesa",
  fullName: "Mahesa Dwi Putra",
  birthDate: "8 Juli 1995",
  age: 28,
  nickname: "Hesa",
  bio: "Seorang yang selalu ceria dan penuh semangat...",
  favorites: {
    food: "Nasi Gudeg",
    movie: "Inception",
    music: "Pop Rock",
    place: "Pantai"
  },
  achievements: [
    "Juara 1 Lomba Coding",
    "Wisuda Cum Laude",
    "Marathon Finisher"
  ],
  photos: [
    "/images/profile1.jpg",
    "/images/profile2.jpg",
    "/images/profile3.jpg"
  ]
};