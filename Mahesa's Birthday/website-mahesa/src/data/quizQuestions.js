// src/data/quizQuestions.js
export const quizQuestions = [
  {
    id: 1,
    question: "Apa warna favorit Mahesa?",
    options: ["Biru", "Hitam", "Merah", "Hijau"],
    correctAnswer: "Hitam",
    chatMemory: [
      {
        sender: "you",
        message: "Warna favorit kamu apa sih?",
        time: "14:32"
      },
      {
        sender: "me",
        message: "Hitam sih, soalnya elegan dan timeless",
        time: "14:32"
      },
      {
        sender: "you",
        message: "Kenapa hitam? Bukan karena dark mode addict? 😂",
        time: "14:33"
      },
      {
        sender: "me",
        message: "Hahaha bisa jadi! Tapi serius, hitam itu cocok dimana-mana",
        time: "14:33"
      }
    ],
    memoryContext: "Ingat waktu kita ngobrol tentang warna favorit? Kamu bilang hitam karena elegan dan timeless!"
  },
  {
    id: 2,
    question: "Game apa yang paling sering dimainkan?",
    options: ["Mobile Legends", "Valorant", "Genshin Impact", "Minecraft"],
    correctAnswer: "Valorant",
    chatMemory: [
      {
        sender: "you",
        message: "Lagi main game apa nih?",
        time: "20:15"
      },
      {
        sender: "me",
        message: "Valorant lagi, udah match ke-3 hari ini",
        time: "20:15"
      },
      {
        sender: "you",
        message: "Waduh addict banget, main agent apa?",
        time: "20:16"
      },
      {
        sender: "me",
        message: "Jett main, kalau ga bisa ya Sage",
        time: "20:16"
      }
    ],
    memoryContext: "Kamu selalu cerita tentang Valorant! Sampai match ke-3 dalam sehari 🎮"
  },
  {
    id: 3,
    question: "Jika bisa punya kekuatan super, Mahesa akan memilih?",
    options: ["Terbang", "Menghilang", "Teleportasi", "Membaca pikiran"],
    correctAnswer: "Teleportasi",
    chatMemory: [
      {
        sender: "you",
        message: "Kalau bisa punya superpower, kamu mau apa?",
        time: "16:45"
      },
      {
        sender: "me",
        message: "Teleportasi dong! Bisa kemana-mana instant",
        time: "16:45"
      },
      {
        sender: "you",
        message: "Alasannya apa? Biar ga macet? 😂",
        time: "16:46"
      },
      {
        sender: "me",
        message: "Bukan cuma itu, bisa traveling gratis ke mana aja!",
        time: "16:46"
      }
    ],
    memoryContext: "Dream superpower kamu adalah teleportasi biar bisa traveling gratis ke mana aja! ✨"
  }
];