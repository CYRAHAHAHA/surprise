export type MemoryItem = {
  url: string;
  caption: string;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  memories: MemoryItem[];
};

export type AppConfig = {
  password: string;
  passwordScene: {
    title: string;
    subtitle: string;
    label: string;
    placeholder: string;
    buttonText: string;
    errorText: string;
  };
  intro: {
    title: string;
    message: string;
    videoUrl: string;
    primaryCta: string;
    secondaryCta: string;
  };
  questions: Question[];
  proposal: {
    title: string;
    message: string;
    audioUrl: string;
    yesText: string;
    noText: string;
    successMessage: string;
  };
  questionScene: {
    correctText: string;
    incorrectText: string;
    memoryHint: string;
    loadingText: string;
  };
  snapshot: {
    title: string;
    subtitle: string;
  };
};

export const appConfig: AppConfig = {
  password: "oursecret",
  passwordScene: {
    title: "Secret Entrance",
    subtitle: "Whisper the password to unlock the surprises.",
    label: "Password",
    placeholder: "Type our secret",
    buttonText: "Unlock",
    errorText: "Try again, love.",
  },
  intro: {
    title: "Valentine's Quest",
    message: "I made a tiny journey for you. Ready for a quick adventure?",
    videoUrl: "/media/intro.mp4",
    primaryCta: "Okei",
    secondaryCta: "Ew no",
  },
  questions: [
    {
      id: 1,
      text: "Where was our very first photo together?",
      options: ["At the cafe", "At the park", "At the beach", "At the cinema"],
      answer: "At the cafe",
      memories: [
        { url: "/media/q1_1.jpg", caption: "That tiny table" },
        { url: "/media/q1_2.jpg", caption: "Your smile" },
        { url: "/media/q1_3.jpg", caption: "The latte art" },
      ],
    },
    {
      id: 2,
      text: "Which song did we play on repeat that week?",
      options: ["Golden Hour", "Until I Found You", "Adore You", "Best Part"],
      answer: "Golden Hour",
      memories: [
        { url: "/media/q2_1.jpg", caption: "Late-night drive" },
        { url: "/media/q2_2.jpg", caption: "City lights" },
      ],
    },
    {
      id: 3,
      text: "What nickname did you give the stray cat?",
      options: ["Mochi", "Bean", "Noodle", "Peach"],
      answer: "Mochi",
      memories: [
        { url: "/media/q3_1.jpg", caption: "Mochi in the sun" },
      ],
    },
    {
      id: 4,
      text: "Which dessert did we share on the rainy day?",
      options: ["Tiramisu", "Cheesecake", "Macarons", "Mango sticky rice"],
      answer: "Tiramisu",
      memories: [
        { url: "/media/q4_1.jpg", caption: "Two spoons" },
        { url: "/media/q4_2.jpg", caption: "Rainy window" },
      ],
    },
    {
      id: 5,
      text: "Our favorite photo booth prop?",
      options: ["Heart glasses", "Tiny crown", "Bow tie", "Halo"],
      answer: "Heart glasses",
      memories: [
        { url: "/media/q5_1.jpg", caption: "Hearts everywhere" },
        { url: "/media/q5_2.jpg", caption: "That silly pose" },
      ],
    },
    {
      id: 6,
      text: "Where did we get lost for an hour?",
      options: ["Night market", "Bookstore", "Botanical garden", "Vintage shop"],
      answer: "Night market",
      memories: [
        { url: "/media/q6_1.jpg", caption: "Neon signs" },
      ],
    },
    {
      id: 7,
      text: "Which drink do I always steal from you?",
      options: ["Iced latte", "Matcha", "Lemonade", "Chai"],
      answer: "Matcha",
      memories: [
        { url: "/media/q7_1.jpg", caption: "One sip?" },
        { url: "/media/q7_2.jpg", caption: "Always" },
      ],
    },
    {
      id: 8,
      text: "Which trip made us miss our train?",
      options: ["Seaside", "Mountains", "Old town", "Lake day"],
      answer: "Old town",
      memories: [
        { url: "/media/q8_1.jpg", caption: "Cobblestone streets" },
      ],
    },
    {
      id: 9,
      text: "What did we name the playlist?",
      options: ["Soft Sundays", "Us", "Pink Hour", "Little Forever"],
      answer: "Little Forever",
      memories: [
        { url: "/media/q9_1.jpg", caption: "Shared headphones" },
      ],
    },
    {
      id: 10,
      text: "What do I love most about you?",
      options: ["Your laugh", "Your kindness", "Your courage", "All of it"],
      answer: "All of it",
      memories: [
        { url: "/media/q10_1.jpg", caption: "Every day" },
        { url: "/media/q10_2.jpg", caption: "All of it" },
      ],
    },
  ],
  proposal: {
    title: "One last thing",
    message: "Will you be my Valentine?",
    audioUrl: "/media/proposal.mp3",
    yesText: "Yes",
    noText: "No",
    successMessage: "You just made me the happiest person ever.",
  },
  questionScene: {
    correctText: "Perfectly right.",
    incorrectText: "Still adorable. Here's the memory.",
    memoryHint: "Little bubbles drifting through my favorite moments.",
    loadingText: "Collecting the next moment...",
  },
  snapshot: {
    title: "Our Valentine Timeline",
    subtitle: "Tap any card to replay it.",
  },
};
