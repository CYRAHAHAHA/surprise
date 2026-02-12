export type MemoryItem = {
  url: string;
  caption: string;
};

export type QuestionSceneCopy = {
  correctText: string;
  incorrectText: string;
  memoryHint: string;
  loadingText: string;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  memories: MemoryItem[];
  sceneCopy?: QuestionSceneCopy;
  /** Optional background image for this specific question */
  backdrop?: string;
};

export type BackgroundConfig = {
  /** Background image for the password/unlock scene */
  passwordScene: string;
  /** Background image for the intro/hook scene */
  introScene: string;
  /** Background image for questions */
  questionScene: string;
  /** Background image for the proposal scene */
  proposalScene: string;
  /** Background image for the snapshot/gallery scene */
  snapshotScene: string;
  /** Default fallback background */
  default: string;
};

export type BackgroundMusicConfig = {
  enabled: boolean;
  /** Path to background music file (mp3, wav, ogg) */
  src: string;
  /** Volume from 0 to 1 */
  volume: number;
  /** Whether music should loop */
  loop: boolean;
};

export type AppConfig = {
  password: string;
  /** Background images for each scene - edit paths here! */
  backgrounds: BackgroundConfig;
  /** Background music settings */
  backgroundMusic: BackgroundMusicConfig;
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
    videoUrl?: string;
    videoUrls?: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  sfx?: {
    enabled?: boolean;
    volume?: number;
    sounds?: {
      click?: string;
      correct?: string;
      incorrect?: string;
      transition?: string;
      success?: string;
    };
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
  password: "20050305",

  // ============================================================
  // 🎨 BACKGROUND IMAGES - Edit these paths to customize!
  // Place your images in the /public folder and reference them here
  // ============================================================
  backgrounds: {
    passwordScene: "/backgrounds/password-bg.jpg", // Unlock/password screen
    introScene: "/backgrounds/intro-bg.jpg", // Welcome/intro screen
    questionScene: "/backgrounds/questions/q5.jpg", // Quiz questions
    proposalScene: "/backgrounds/proposal-bg.jpg", // Final proposal scene
    snapshotScene: "/backgrounds/questions/q4.jpg", // Memory gallery
    default: "/backgrounds/default-bg.jpg", // Fallback background
  },

  // ============================================================
  // 🎵 BACKGROUND MUSIC - Edit these settings!
  // Place your music file in /public folder
  // ============================================================
  backgroundMusic: {
    enabled: true,
    src: "/music/background-music.mp3", // Your romantic background music
    volume: 0.1, // 0 to 1 (0.1 = 10% volume)
    loop: true, // Loop the music
  },

  passwordScene: {
    title: "Addressed to [REDACTED]",
    subtitle: "Need type password first :D",
    label: "Password",
    placeholder: "birthdays 8 digits",
    buttonText: "Unlock",
    errorText: "Unlimited tries u got dis",
  },
  intro: {
    title: "Remember dis?",
    message:
      "For you to make an informed choice, I made this quiz to remind you of what I am",
    videoUrls: ["/data/1.mp4", "/data/2.mp4"],
    primaryCta: "Okei",
    secondaryCta: "No la u den",
  },

  // ============================================================
  // 🔊 SOUND EFFECTS - Edit these paths for cuter sounds!
  // Place your sound files in /public/sfx folder
  // ============================================================
  sfx: {
    enabled: true,
    volume: 0.4,
    sounds: {
      click: "/sfx/click.wav", // Button click sound
      correct: "/sfx/correct.wav", // Correct answer - make it cute! 🎉
      incorrect: "/sfx/incorrect.wav", // Wrong answer - gentle & cute 💕
      transition: "/sfx/transition.wav", // Scene transition sound
      success: "/sfx/success.wav", // Final success/celebration sound
    },
  },

  questions: [
    {
      id: 1,
      text: "What is my VERY FIRST first FIRST impression of you?",
      options: ["Genuine", "Cute", "Popular", "Pretty"],
      answer: "Popular",
      backdrop: "/backgrounds/questions/q1.jpg", // 🎨 Question 1 backdrop
      sceneCopy: {
        correctText: "Of course you would get it right bb of course !!",
        incorrectText: "Cute guess !!",
        memoryHint: "February 2025: Will we see the end tgt...?",
        loadingText: "Loading February 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/13_feb_2025_9.mp4",
          caption: "13 feb 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/14_feb_2025_2.mp4",
          caption: "14 feb 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/14_feb_2025_3.mp4",
          caption: "14 feb 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/14_feb_2025_5.mp4",
          caption: "14 feb 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/14_feb_2025_6.mp4",
          caption: "14 feb 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/15_feb_2025_3.mp4",
          caption: "15 feb 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/16_feb_2025_1.mp4",
          caption: "16 feb 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/16_feb_2025_3.mp4",
          caption: "16 feb 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/16_feb_2025_4.mp4",
          caption: "16 feb 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/17_feb_2025_2.mp4",
          caption: "17 feb 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/17_feb_2025_3.mp4",
          caption: "17 feb 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/17_feb_2025_7.mp4",
          caption: "17 feb 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/18_feb_2025_6.mp4",
          caption: "18 feb 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/18_feb_2025_8.mp4",
          caption: "18 feb 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/18_feb_2025_9.mp4",
          caption: "18 feb 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/19_feb_2025_16.mp4",
          caption: "19 feb 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/19_feb_2025_21.mp4",
          caption: "19 feb 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/19_feb_2025_8.mp4",
          caption: "19 feb 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/20_feb_2025_2.mp4",
          caption: "20 feb 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/20_feb_2025_6.mp4",
          caption: "20 feb 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/20_feb_2025_7.mp4",
          caption: "20 feb 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/21_feb_2025_10.mp4",
          caption: "21 feb 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/21_feb_2025_3.mp4",
          caption: "21 feb 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/21_feb_2025_4.mp4",
          caption: "21 feb 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/22_feb_2025_11.mp4",
          caption: "22 feb 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/22_feb_2025_20.mp4",
          caption: "22 feb 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/22_feb_2025_3.mp4",
          caption: "22 feb 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/23_feb_2025_4.mp4",
          caption: "23 feb 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/24_feb_2025_1.mp4",
          caption: "24 feb 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/24_feb_2025_7.mp4",
          caption: "24 feb 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/25_feb_2025_16.mp4",
          caption: "25 feb 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/25_feb_2025_24.mp4",
          caption: "25 feb 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/25_feb_2025_4.mp4",
          caption: "25 feb 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/26_feb_2025_10.mp4",
          caption: "26 feb 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/27_feb_2025_1.mp4",
          caption: "27 feb 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/27_feb_2025_10.mp4",
          caption: "27 feb 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/27_feb_2025_5.mp4",
          caption: "27 feb 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/28_feb_2025_19.mp4",
          caption: "28 feb 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/28_feb_2025_20.mp4",
          caption: "28 feb 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/01_Feb-25/28_feb_2025_7.mp4",
          caption: "28 feb 2025 7",
        },
      ],
    },
    {
      id: 2,
      text: "What is your first FIRST impression of me?",
      options: ["Funny", "Man-bun", "Cannot swim", "Smol School"],
      answer: "Man-bun",
      backdrop: "/backgrounds/questions/q2.jpg", // 🎨 Question 2 backdrop
      sceneCopy: {
        correctText: "Of course you'd choose manbun",
        incorrectText: "i mean ya la but u den",
        memoryHint:
          "1 month til you're flying... we still like ea other after a month!",
        loadingText: "Loading March 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/03_mar_2025_17.mp4",
          caption: "03 mar 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/03_mar_2025_19.mp4",
          caption: "03 mar 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/04_mar_2025_11.mp4",
          caption: "04 mar 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/04_mar_2025_17.mp4",
          caption: "04 mar 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/06_mar_2025_2.mp4",
          caption: "06 mar 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/06_mar_2025_3.mp4",
          caption: "06 mar 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/07_mar_2025_16.mp4",
          caption: "07 mar 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/07_mar_2025_9.mp4",
          caption: "07 mar 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/08_mar_2025_6.mp4",
          caption: "08 mar 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/09_mar_2025_1.mp4",
          caption: "09 mar 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/09_mar_2025_13.mp4",
          caption: "09 mar 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/11_mar_2025_25.mp4",
          caption: "11 mar 2025 25",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/11_mar_2025_28.mp4",
          caption: "11 mar 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/11_mar_2025_6.mp4",
          caption: "11 mar 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/12_mar_2025_14.mp4",
          caption: "12 mar 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/12_mar_2025_19.mp4",
          caption: "12 mar 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/12_mar_2025_2.mp4",
          caption: "12 mar 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/14_mar_2025_1.mp4",
          caption: "14 mar 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/14_mar_2025_11.mp4",
          caption: "14 mar 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/16_mar_2025_13.mp4",
          caption: "16 mar 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/16_mar_2025_16.mp4",
          caption: "16 mar 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/18_mar_2025_12.mp4",
          caption: "18 mar 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/19_mar_2025_8.mp4",
          caption: "19 mar 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/20_mar_2025_2.mp4",
          caption: "20 mar 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/20_mar_2025_21.mp4",
          caption: "20 mar 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/21_mar_2025_5.mp4",
          caption: "21 mar 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/22_mar_2025_13.mp4",
          caption: "22 mar 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/22_mar_2025_19.mp4",
          caption: "22 mar 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/24_mar_2025_3.mp4",
          caption: "24 mar 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/26_mar_2025_1.mp4",
          caption: "26 mar 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/26_mar_2025_8.mp4",
          caption: "26 mar 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/27_mar_2025_5.mp4",
          caption: "27 mar 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/27_mar_2025_9.mp4",
          caption: "27 mar 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/28_mar_2025_2.mp4",
          caption: "28 mar 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/29_mar_2025_10.mp4",
          caption: "29 mar 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/29_mar_2025_7.mp4",
          caption: "29 mar 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/30_mar_2025_36.mp4",
          caption: "30 mar 2025 36",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/30_mar_2025_4.mp4",
          caption: "30 mar 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/31_mar_2025_4.mp4",
          caption: "31 mar 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/02_Mar-25/31_mar_2025_9.mp4",
          caption: "31 mar 2025 9",
        },
      ],
    },
    {
      id: 3,
      text: "What do I remember most from our first date",
      options: [
        "Keep your rice bowl",
        "You drink more",
        "Take Grab go your house first",
        "Dead Rat",
      ],
      answer: "Dead Rat",
      backdrop: "/backgrounds/questions/q3.jpg", // 🎨 Question 3 backdrop
      sceneCopy: {
        correctText: "haha yay",
        incorrectText: "soli bb hahaha",
        memoryHint: "Welcome to Europe !!",
        loadingText: "Loading April 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/01_apr_2025_16.mp4",
          caption: "01 apr 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/01_apr_2025_24.mp4",
          caption: "01 apr 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/02_apr_2025_5.mp4",
          caption: "02 apr 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/02_apr_2025_7.mp4",
          caption: "02 apr 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/03_apr_2025_13.mp4",
          caption: "03 apr 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/04_apr_2025_42.mp4",
          caption: "04 apr 2025 42",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/05_apr_2025_11.mp4",
          caption: "05 apr 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/06_apr_2025_38.mp4",
          caption: "06 apr 2025 38",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/07_apr_2025_34.mp4",
          caption: "07 apr 2025 34",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/08_apr_2025_24.mp4",
          caption: "08 apr 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/09_apr_2025_27.mp4",
          caption: "09 apr 2025 27",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/10_apr_2025_2.mp4",
          caption: "10 apr 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/10_apr_2025_3.mp4",
          caption: "10 apr 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/11_apr_2025_13.mp4",
          caption: "11 apr 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/11_apr_2025_29.mp4",
          caption: "11 apr 2025 29",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/12_apr_2025_22.mp4",
          caption: "12 apr 2025 22",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/12_apr_2025_46.mp4",
          caption: "12 apr 2025 46",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/13_apr_2025_11.mp4",
          caption: "13 apr 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/13_apr_2025_24.mp4",
          caption: "13 apr 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/14_apr_2025_2.mp4",
          caption: "14 apr 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/14_apr_2025_37.mp4",
          caption: "14 apr 2025 37",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/15_apr_2025_18.mp4",
          caption: "15 apr 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/15_apr_2025_2.mp4",
          caption: "15 apr 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/16_apr_2025_1.mp4",
          caption: "16 apr 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/16_apr_2025_18.mp4",
          caption: "16 apr 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/17_apr_2025_10.mp4",
          caption: "17 apr 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/17_apr_2025_24.mp4",
          caption: "17 apr 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/18_apr_2025_13.mp4",
          caption: "18 apr 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/19_apr_2025_10.mp4",
          caption: "19 apr 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/19_apr_2025_2.mp4",
          caption: "19 apr 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/20_apr_2025_3.mp4",
          caption: "20 apr 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/21_apr_2025_5.mp4",
          caption: "21 apr 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/22_apr_2025_41.mp4",
          caption: "22 apr 2025 41",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/23_apr_2025_33.mp4",
          caption: "23 apr 2025 33",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/24_apr_2025_6.mp4",
          caption: "24 apr 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/25_apr_2025_44.mp4",
          caption: "25 apr 2025 44",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/26_apr_2025_61.mp4",
          caption: "26 apr 2025 61",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/27_apr_2025_17.mp4",
          caption: "27 apr 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/29_apr_2025_3.mp4",
          caption: "29 apr 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/03_Apr-25/30_apr_2025_11.mp4",
          caption: "30 apr 2025 11",
        },
      ],
    },
    {
      id: 4,
      text: "What was my gear when I asked you to be my valentine while out at 3am in 2 degrees weather?",
      options: [
        "No jacket",
        "Jacket with no gloves and no shoes",
        "Jacket with shoes, no gloves",
        "Jacket with gloves and shoes",
      ],
      answer: "Jacket with no gloves and no shoes",
      backdrop: "/backgrounds/questions/q4.jpg", // 🎨 Question 4 backdrop
      sceneCopy: {
        correctText: "Not cold at all.",
        incorrectText: "no ba it was colder ba",
        memoryHint: "MAY WAS LOVELY !!",
        loadingText: "Loading May 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/01_may_2025_11.mp4",
          caption: "01 may 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/02_may_2025_63.mp4",
          caption: "02 may 2025 63",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/03_may_2025_8.mp4",
          caption: "03 may 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/04_may_2025_1.mp4",
          caption: "04 may 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/05_may_2025_2.mp4",
          caption: "05 may 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/06_may_2025_2.mp4",
          caption: "06 may 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/07_may_2025_30.mp4",
          caption: "07 may 2025 30",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/08_may_2025_9.mp4",
          caption: "08 may 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/09_may_2025_19.mp4",
          caption: "09 may 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/10_may_2025_22.mp4",
          caption: "10 may 2025 22",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/10_may_2025_4.mp4",
          caption: "10 may 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/11_may_2025_15.mp4",
          caption: "11 may 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/11_may_2025_24.mp4",
          caption: "11 may 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/12_may_2025_24.mp4",
          caption: "12 may 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/12_may_2025_28.mp4",
          caption: "12 may 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/13_may_2025_14.mp4",
          caption: "13 may 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/13_may_2025_32.mp4",
          caption: "13 may 2025 32",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/14_may_2025_16.mp4",
          caption: "14 may 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/14_may_2025_2.mp4",
          caption: "14 may 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/15_may_2025_1.mp4",
          caption: "15 may 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/15_may_2025_5.mp4",
          caption: "15 may 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/16_may_2025_16.mp4",
          caption: "16 may 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/16_may_2025_8.mp4",
          caption: "16 may 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/17_may_2025_15.mp4",
          caption: "17 may 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/17_may_2025_24.mp4",
          caption: "17 may 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/18_may_2025_12.mp4",
          caption: "18 may 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/18_may_2025_16.mp4",
          caption: "18 may 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/19_may_2025_29.mp4",
          caption: "19 may 2025 29",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/19_may_2025_6.mp4",
          caption: "19 may 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/20_may_2025_15.mp4",
          caption: "20 may 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/21_may_2025_8.mp4",
          caption: "21 may 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/22_may_2025_16.mp4",
          caption: "22 may 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/23_may_2025_11.mp4",
          caption: "23 may 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/24_may_2025_7.mp4",
          caption: "24 may 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/25_may_2025_6.mp4",
          caption: "25 may 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/26_may_2025_6.mp4",
          caption: "26 may 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/27_may_2025_12.mp4",
          caption: "27 may 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/28_may_2025_4.mp4",
          caption: "28 may 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/29_may_2025_23.mp4",
          caption: "29 may 2025 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/04_May-25/30_may_2025_1.mp4",
          caption: "30 may 2025 1",
        },
      ],
    },
    {
      id: 5,
      text: "Your favourite guy from here",
      options: ["Nicky", "Parry", "Rangy", "Yirongy"],
      answer: "Yirongy",
      backdrop: "/backgrounds/questions/q5.jpg", // 🎨 Question 5 backdrop
      sceneCopy: {
        correctText: "Who else",
        incorrectText: "huhhhhhhhhhhhhhhhhhhhhhhhhhh",
        memoryHint: "SHAWNNNNNNN and end of trip sed",
        loadingText: "Loading June 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/01_jun_2025_11.mp4",
          caption: "01 jun 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/01_jun_2025_23.mp4",
          caption: "01 jun 2025 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/02_jun_2025_3.mp4",
          caption: "02 jun 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/02_jun_2025_8.mp4",
          caption: "02 jun 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/03_jun_2025_13.mp4",
          caption: "03 jun 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/04_jun_2025_8.mp4",
          caption: "04 jun 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/05_jun_2025_14.mp4",
          caption: "05 jun 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/06_jun_2025_11.mp4",
          caption: "06 jun 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/07_jun_2025_11.mp4",
          caption: "07 jun 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/08_jun_2025_14.mp4",
          caption: "08 jun 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/09_jun_2025_9.mp4",
          caption: "09 jun 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/10_jun_2025_10.mp4",
          caption: "10 jun 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/10_jun_2025_14.mp4",
          caption: "10 jun 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/11_jun_2025_16.mp4",
          caption: "11 jun 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/11_jun_2025_2.mp4",
          caption: "11 jun 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/12_jun_2025_1.mp4",
          caption: "12 jun 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/12_jun_2025_36.mp4",
          caption: "12 jun 2025 36",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/13_jun_2025_15.mp4",
          caption: "13 jun 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/13_jun_2025_2.mp4",
          caption: "13 jun 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/16_jun_2025_20.mp4",
          caption: "16 jun 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/16_jun_2025_23.mp4",
          caption: "16 jun 2025 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/17_jun_2025_12.mp4",
          caption: "17 jun 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/18_jun_2025_4.mp4",
          caption: "18 jun 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/18_jun_2025_8.mp4",
          caption: "18 jun 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/19_jun_2025_16.mp4",
          caption: "19 jun 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/19_jun_2025_7.mp4",
          caption: "19 jun 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/20_jun_2025_15.mp4",
          caption: "20 jun 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/20_jun_2025_3.mp4",
          caption: "20 jun 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/21_jun_2025_23.mp4",
          caption: "21 jun 2025 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/21_jun_2025_27.mp4",
          caption: "21 jun 2025 27",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/22_jun_2025_10.mp4",
          caption: "22 jun 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/22_jun_2025_9.mp4",
          caption: "22 jun 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/23_jun_2025_11.mp4",
          caption: "23 jun 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/23_jun_2025_2.mp4",
          caption: "23 jun 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/24_jun_2025_3.mp4",
          caption: "24 jun 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/24_jun_2025_8.mp4",
          caption: "24 jun 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/25_jun_2025_1.mp4",
          caption: "25 jun 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/26_jun_2025_6.mp4",
          caption: "26 jun 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/27_jun_2025_30.mp4",
          caption: "27 jun 2025 30",
        },
        {
          url: "/chosen_round_videos_trimmed_low/05_Jun-25/28_jun_2025_32.mp4",
          caption: "28 jun 2025 32",
        },
      ],
    },
    {
      id: 6,
      text: "My most fearful phrase is 'u-",
      options: ["hates me'", "donch cares'", "lol'", "knows'"],
      answer: "lol'",
      backdrop: "/backgrounds/questions/q6.jpg", // 🎨 Question 6 backdrop
      sceneCopy: {
        correctText: "u knows one",
        incorrectText: "love u bb",
        memoryHint: "BACK IN SG?!",
        loadingText: "Loading July 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/01_jul_2025_1.mp4",
          caption: "01 jul 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/05_jul_2025_11.mp4",
          caption: "05 jul 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/06_jul_2025_35.mp4",
          caption: "06 jul 2025 35",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/07_jul_2025_67.mp4",
          caption: "07 jul 2025 67",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/08_jul_2025_9.mp4",
          caption: "08 jul 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/09_jul_2025_20.mp4",
          caption: "09 jul 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/10_jul_2025_19.mp4",
          caption: "10 jul 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/10_jul_2025_21.mp4",
          caption: "10 jul 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/11_jul_2025_28.mp4",
          caption: "11 jul 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/11_jul_2025_38.mp4",
          caption: "11 jul 2025 38",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/12_jul_2025_37.mp4",
          caption: "12 jul 2025 37",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/12_jul_2025_44.mp4",
          caption: "12 jul 2025 44",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/13_jul_2025_11.mp4",
          caption: "13 jul 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/13_jul_2025_25.mp4",
          caption: "13 jul 2025 25",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/14_jul_2025_36.mp4",
          caption: "14 jul 2025 36",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/14_jul_2025_51.mp4",
          caption: "14 jul 2025 51",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/15_jul_2025_21.mp4",
          caption: "15 jul 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/15_jul_2025_22.mp4",
          caption: "15 jul 2025 22",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/16_jul_2025_26.mp4",
          caption: "16 jul 2025 26",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/16_jul_2025_9.mp4",
          caption: "16 jul 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/17_jul_2025_24.mp4",
          caption: "17 jul 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/17_jul_2025_28.mp4",
          caption: "17 jul 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/18_jul_2025_38.mp4",
          caption: "18 jul 2025 38",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/18_jul_2025_66.mp4",
          caption: "18 jul 2025 66",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/19_jul_2025_11.mp4",
          caption: "19 jul 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/19_jul_2025_36.mp4",
          caption: "19 jul 2025 36",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/20_jul_2025_33.mp4",
          caption: "20 jul 2025 33",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/20_jul_2025_38.mp4",
          caption: "20 jul 2025 38",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/21_jul_2025_11.mp4",
          caption: "21 jul 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/21_jul_2025_5.mp4",
          caption: "21 jul 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/22_jul_2025_13.mp4",
          caption: "22 jul 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/23_jul_2025_41.mp4",
          caption: "23 jul 2025 41",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/24_jul_2025_1.mp4",
          caption: "24 jul 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/25_jul_2025_18.mp4",
          caption: "25 jul 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/26_jul_2025_45.mp4",
          caption: "26 jul 2025 45",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/27_jul_2025_5.mp4",
          caption: "27 jul 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/28_jul_2025_46.mp4",
          caption: "28 jul 2025 46",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/29_jul_2025_6.mp4",
          caption: "29 jul 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/30_jul_2025_1.mp4",
          caption: "30 jul 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/06_Jul-25/31_jul_2025_31.mp4",
          caption: "31 jul 2025 31",
        },
      ],
    },
    {
      id: 7,
      text: "I can",
      options: [
        "swim to save you",
        "solo buy you hdb",
        "eat your food",
        "drive you around",
      ],
      answer: "eat your food",
      backdrop: "/backgrounds/questions/q7.jpg", // 🎨 Question 7 backdrop
      sceneCopy: {
        correctText: "of course",
        incorrectText: "no la u den",
        memoryHint: "School is comin but we do be meetin",
        loadingText: "Loading Aug 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/01_aug_2025_28.mp4",
          caption: "01 aug 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/01_aug_2025_7.mp4",
          caption: "01 aug 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/02_aug_2025_19.mp4",
          caption: "02 aug 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/02_aug_2025_23.mp4",
          caption: "02 aug 2025 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/03_aug_2025_14.mp4",
          caption: "03 aug 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/03_aug_2025_26.mp4",
          caption: "03 aug 2025 26",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/04_aug_2025_10.mp4",
          caption: "04 aug 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/04_aug_2025_7.mp4",
          caption: "04 aug 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/05_aug_2025_10.mp4",
          caption: "05 aug 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/06_aug_2025_6.mp4",
          caption: "06 aug 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/07_aug_2025_10.mp4",
          caption: "07 aug 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/09_aug_2025_28.mp4",
          caption: "09 aug 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/10_aug_2025_27.mp4",
          caption: "10 aug 2025 27",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/11_aug_2025_24.mp4",
          caption: "11 aug 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/11_aug_2025_8.mp4",
          caption: "11 aug 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/12_aug_2025_1.mp4",
          caption: "12 aug 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/12_aug_2025_11.mp4",
          caption: "12 aug 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/13_aug_2025_15.mp4",
          caption: "13 aug 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/13_aug_2025_27.mp4",
          caption: "13 aug 2025 27",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/14_aug_2025_1.mp4",
          caption: "14 aug 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/14_aug_2025_12.mp4",
          caption: "14 aug 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/15_aug_2025_1.mp4",
          caption: "15 aug 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/15_aug_2025_13.mp4",
          caption: "15 aug 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/16_aug_2025_18.mp4",
          caption: "16 aug 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/17_aug_2025_18.mp4",
          caption: "17 aug 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/17_aug_2025_24.mp4",
          caption: "17 aug 2025 24",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/18_aug_2025_21.mp4",
          caption: "18 aug 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/19_aug_2025_10.mp4",
          caption: "19 aug 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/20_aug_2025_21.mp4",
          caption: "20 aug 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/20_aug_2025_9.mp4",
          caption: "20 aug 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/21_aug_2025_10.mp4",
          caption: "21 aug 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/21_aug_2025_7.mp4",
          caption: "21 aug 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/22_aug_2025_15.mp4",
          caption: "22 aug 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/22_aug_2025_17.mp4",
          caption: "22 aug 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/28_aug_2025_17.mp4",
          caption: "28 aug 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/28_aug_2025_5.mp4",
          caption: "28 aug 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/29_aug_2025_28.mp4",
          caption: "29 aug 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/29_aug_2025_5.mp4",
          caption: "29 aug 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/30_aug_2025_42.mp4",
          caption: "30 aug 2025 42",
        },
        {
          url: "/chosen_round_videos_trimmed_low/07_Aug-25/31_aug_2025_35.mp4",
          caption: "31 aug 2025 35",
        },
      ],
    },
    {
      id: 8,
      text: "Where did we first play?",
      options: ["Munich", "Prague", "Hallstatt", "Budapesht"],
      answer: "Munich",
      backdrop: "/backgrounds/questions/q8.jpg", // 🎨 Question 8 backdrop
      sceneCopy: {
        correctText: "oops hahhahaa",
        incorrectText: "ooopsss hahahhaa play play play",
        memoryHint: "Schooooooollllllll",
        loadingText: "Loading Sep 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/01_sep_2025_37.mp4",
          caption: "01 sep 2025 37",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/03_sep_2025_13.mp4",
          caption: "03 sep 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/03_sep_2025_2.mp4",
          caption: "03 sep 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/04_sep_2025_2.mp4",
          caption: "04 sep 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/05_sep_2025_12.mp4",
          caption: "05 sep 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/06_sep_2025_11.mp4",
          caption: "06 sep 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/07_sep_2025_11.mp4",
          caption: "07 sep 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/08_sep_2025_14.mp4",
          caption: "08 sep 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/08_sep_2025_28.mp4",
          caption: "08 sep 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/09_sep_2025_14.mp4",
          caption: "09 sep 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/09_sep_2025_2.mp4",
          caption: "09 sep 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/09_sep_2025_21.mp4",
          caption: "09 sep 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/10_sep_2025_17.mp4",
          caption: "10 sep 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/11_sep_2025_10.mp4",
          caption: "11 sep 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/11_sep_2025_26.mp4",
          caption: "11 sep 2025 26",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/12_sep_2025_14.mp4",
          caption: "12 sep 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/15_sep_2025_1.mp4",
          caption: "15 sep 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/16_sep_2025_6.mp4",
          caption: "16 sep 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/18_sep_2025_14.mp4",
          caption: "18 sep 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/18_sep_2025_18.mp4",
          caption: "18 sep 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/18_sep_2025_21.mp4",
          caption: "18 sep 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/19_sep_2025_23.mp4",
          caption: "19 sep 2025 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/20_sep_2025_2.mp4",
          caption: "20 sep 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/21_sep_2025_21.mp4",
          caption: "21 sep 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/21_sep_2025_28.mp4",
          caption: "21 sep 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/22_sep_2025_20.mp4",
          caption: "22 sep 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/22_sep_2025_21.mp4",
          caption: "22 sep 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/23_sep_2025_1.mp4",
          caption: "23 sep 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/23_sep_2025_10.mp4",
          caption: "23 sep 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/23_sep_2025_17.mp4",
          caption: "23 sep 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/24_sep_2025_13.mp4",
          caption: "24 sep 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/25_sep_2025_4.mp4",
          caption: "25 sep 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/25_sep_2025_5.mp4",
          caption: "25 sep 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/27_sep_2025_5.mp4",
          caption: "27 sep 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/08_Sep-25/29_sep_2025_9.mp4",
          caption: "29 sep 2025 9",
        },
      ],
    },
    {
      id: 9,
      text: "What do I still feel damn negative aura about?",
      options: [
        "Ryanair",
        "Destroying your coaster",
        "Burning your pot",
        "Cooking shit food for you",
      ],
      answer: "Burning your pot",
      backdrop: "/backgrounds/questions/q9.jpg", // 🎨 Question 9 backdrop
      sceneCopy: {
        correctText: "yaaaaaa sed",
        incorrectText: "yes that too ig",
        memoryHint:
          "enhypen, luggage market, edelman, there was alot... and eating my house !!",
        loadingText: "Loading Oct 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/01_oct_2025_28.mp4",
          caption: "01 oct 2025 28",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/01_oct_2025_8.mp4",
          caption: "01 oct 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/02_oct_2025_14.mp4",
          caption: "02 oct 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/02_oct_2025_25.mp4",
          caption: "02 oct 2025 25",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/02_oct_2025_26.mp4",
          caption: "02 oct 2025 26",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/02_oct_2025_6.mp4",
          caption: "02 oct 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/03_oct_2025_11.mp4",
          caption: "03 oct 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/04_oct_2025_12.mp4",
          caption: "04 oct 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/04_oct_2025_22.mp4",
          caption: "04 oct 2025 22",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/05_oct_2025_12.mp4",
          caption: "05 oct 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/07_oct_2025_27.mp4",
          caption: "07 oct 2025 27",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/08_oct_2025_21.mp4",
          caption: "08 oct 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/10_oct_2025_14.mp4",
          caption: "10 oct 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/10_oct_2025_15.mp4",
          caption: "10 oct 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/13_oct_2025_17.mp4",
          caption: "13 oct 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/13_oct_2025_4.mp4",
          caption: "13 oct 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/15_oct_2025_2.mp4",
          caption: "15 oct 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/16_oct_2025_13.mp4",
          caption: "16 oct 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/19_oct_2025_8.mp4",
          caption: "19 oct 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/20_oct_2025_13.mp4",
          caption: "20 oct 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/20_oct_2025_3.mp4",
          caption: "20 oct 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/20_oct_2025_7.mp4",
          caption: "20 oct 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/21_oct_2025_1.mp4",
          caption: "21 oct 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/21_oct_2025_13.mp4",
          caption: "21 oct 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/22_oct_2025_5.mp4",
          caption: "22 oct 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/22_oct_2025_9.mp4",
          caption: "22 oct 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/24_oct_2025_6.mp4",
          caption: "24 oct 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/25_oct_2025_3.mp4",
          caption: "25 oct 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/28_oct_2025_17.mp4",
          caption: "28 oct 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/28_oct_2025_20.mp4",
          caption: "28 oct 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/09_Oct-25/31_oct_2025_7.mp4",
          caption: "31 oct 2025 7",
        },
      ],
    },
    {
      id: 10,
      text: "What do I love most about you?",
      options: [
        "Your laughter",
        "Your genuineness to mi mudder",
        "Your U DEN",
        "All of it",
      ],
      answer: "All of it",
      backdrop: "/backgrounds/questions/q10.jpg", // 🎨 Question 10 backdrop
      sceneCopy: {
        correctText: "All of it.",
        incorrectText: "Still all of it.",
        memoryHint: "Lots of things including me being bz sed !!",
        loadingText: "Loading Nov 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/08_nov_2025_11.mp4",
          caption: "08 nov 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/08_nov_2025_13.mp4",
          caption: "08 nov 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/08_nov_2025_14.mp4",
          caption: "08 nov 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/08_nov_2025_18.mp4",
          caption: "08 nov 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/08_nov_2025_20.mp4",
          caption: "08 nov 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/08_nov_2025_9.mp4",
          caption: "08 nov 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/09_nov_2025_1.mp4",
          caption: "09 nov 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/09_nov_2025_10.mp4",
          caption: "09 nov 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/09_nov_2025_11.mp4",
          caption: "09 nov 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/09_nov_2025_2.mp4",
          caption: "09 nov 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/09_nov_2025_6.mp4",
          caption: "09 nov 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/09_nov_2025_8.mp4",
          caption: "09 nov 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/10_nov_2025_14.mp4",
          caption: "10 nov 2025 14",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/10_nov_2025_15.mp4",
          caption: "10 nov 2025 15",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/10_nov_2025_5.mp4",
          caption: "10 nov 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/10_nov_2025_6.mp4",
          caption: "10 nov 2025 6",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/12_nov_2025_8.mp4",
          caption: "12 nov 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/18_nov_2025_10.mp4",
          caption: "18 nov 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/18_nov_2025_11.mp4",
          caption: "18 nov 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/19_nov_2025_8.mp4",
          caption: "19 nov 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/19_nov_2025_9.mp4",
          caption: "19 nov 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/20_nov_2025_4.mp4",
          caption: "20 nov 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/20_nov_2025_5.mp4",
          caption: "20 nov 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/21_nov_2025_16.mp4",
          caption: "21 nov 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/21_nov_2025_17.mp4",
          caption: "21 nov 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/21_nov_2025_7.mp4",
          caption: "21 nov 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/21_nov_2025_8.mp4",
          caption: "21 nov 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/22_nov_2025_17.mp4",
          caption: "22 nov 2025 17",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/22_nov_2025_18.mp4",
          caption: "22 nov 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/22_nov_2025_8.mp4",
          caption: "22 nov 2025 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/22_nov_2025_9.mp4",
          caption: "22 nov 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/23_nov_2025_12.mp4",
          caption: "23 nov 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/23_nov_2025_13.mp4",
          caption: "23 nov 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/23_nov_2025_21.mp4",
          caption: "23 nov 2025 21",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/23_nov_2025_22.mp4",
          caption: "23 nov 2025 22",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/23_nov_2025_3.mp4",
          caption: "23 nov 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/23_nov_2025_4.mp4",
          caption: "23 nov 2025 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/24_nov_2025_1.mp4",
          caption: "24 nov 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/24_nov_2025_10.mp4",
          caption: "24 nov 2025 10",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/24_nov_2025_11.mp4",
          caption: "24 nov 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/24_nov_2025_19.mp4",
          caption: "24 nov 2025 19",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/24_nov_2025_2.mp4",
          caption: "24 nov 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/25_nov_2025_1.mp4",
          caption: "25 nov 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/25_nov_2025_18.mp4",
          caption: "25 nov 2025 18",
        },
        {
          url: "/chosen_round_videos_trimmed_low/10_Nov-25/28_nov_2025_9.mp4",
          caption: "28 nov 2025 9",
        },
      ],
    },
    {
      id: 11,
      text: "How did I feel meeting your parents first time?",
      options: ["scared", "scared", "scared", "scared"],
      answer: "scared",
      backdrop: "/backgrounds/questions/q11.jpg", // 🎨 Question 11 backdrop
      sceneCopy: {
        correctText: "scared",
        incorrectText: "scared",
        memoryHint:
          "WAHHHHH owe had some time here and woah meet the parents !!",
        loadingText: "Loading Dec 2025...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/02_dec_2025_26.mp4",
          caption: "02 dec 2025 26",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/04_dec_2025_2.mp4",
          caption: "04 dec 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/04_dec_2025_3.mp4",
          caption: "04 dec 2025 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/05_dec_2025_13.mp4",
          caption: "05 dec 2025 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/06_dec_2025_16.mp4",
          caption: "06 dec 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/08_dec_2025_11.mp4",
          caption: "08 dec 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/08_dec_2025_2.mp4",
          caption: "08 dec 2025 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/11_dec_2025_5.mp4",
          caption: "11 dec 2025 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/11_dec_2025_9.mp4",
          caption: "11 dec 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/12_dec_2025_7.mp4",
          caption: "12 dec 2025 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/14_dec_2025_20.mp4",
          caption: "14 dec 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/16_dec_2025_16.mp4",
          caption: "16 dec 2025 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/22_dec_2025_11.mp4",
          caption: "22 dec 2025 11",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/25_dec_2025_20.mp4",
          caption: "25 dec 2025 20",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/29_dec_2025_1.mp4",
          caption: "29 dec 2025 1",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/29_dec_2025_12.mp4",
          caption: "29 dec 2025 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/29_dec_2025_9.mp4",
          caption: "29 dec 2025 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/11_Dec-25/31_dec_2025_13.mp4",
          caption: "31 dec 2025 13",
        },
      ],
    },
    {
      id: 12,
      text: "Enough of the negativity, how much can I squat?",
      options: ["142.5kg", "120kg", "160kg", "150kg"],
      answer: "142.5kg",
      backdrop: "/backgrounds/questions/q12.jpg", // 🎨 Question 12 backdrop
      sceneCopy: {
        correctText: "yes.",
        incorrectText: "no lah",
        memoryHint:
          "HAPPY NEW YEAR WAHHH and you ate w my mother HAHA YAY i loved that !!",
        loadingText: "Loading Jan 2026...",
      },
      memories: [
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/02_jan_2026_2.mp4",
          caption: "02 jan 2026 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/03_jan_2026_9.mp4",
          caption: "03 jan 2026 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/04_jan_2026_3.mp4",
          caption: "04 jan 2026 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/05_jan_2026_7.mp4",
          caption: "05 jan 2026 7",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/06_jan_2026_2.mp4",
          caption: "06 jan 2026 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/06_jan_2026_37.mp4",
          caption: "06 jan 2026 37",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/07_jan_2026_13.mp4",
          caption: "07 jan 2026 13",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/11_jan_2026_8.mp4",
          caption: "11 jan 2026 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/19_jan_2026_12.mp4",
          caption: "19 jan 2026 12",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/20_jan_2026_8.mp4",
          caption: "20 jan 2026 8",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/22_jan_2026_2.mp4",
          caption: "22 jan 2026 2",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/22_jan_2026_9.mp4",
          caption: "22 jan 2026 9",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/23_jan_2026_23.mp4",
          caption: "23 jan 2026 23",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/23_jan_2026_4.mp4",
          caption: "23 jan 2026 4",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/27_jan_2026_5.mp4",
          caption: "27 jan 2026 5",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/28_jan_2026_3.mp4",
          caption: "28 jan 2026 3",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/31_jan_2026_16.mp4",
          caption: "31 jan 2026 16",
        },
        {
          url: "/chosen_round_videos_trimmed_low/12_Jan-26/31_jan_2026_23.mp4",
          caption: "31 jan 2026 23",
        },
      ],
    },
  ],
  proposal: {
    title:
      "Now that you're reminded of this thing of a SG man you're dating right now...",
    message: "",
    audioUrl: "/media/proposal.mp3",
    yesText: "Yes",
    noText: "No",
    successMessage: "Thank you for enriching my life 💖",
  },
  questionScene: {
    correctText: "Perfectly right.",
    incorrectText: "Still adorable. Here's the memory.",
    memoryHint: "Little bubbles drifting through my favorite moments.",
    loadingText: "Collecting the next moment...",
  },
  snapshot: {
    title: "The Valentine Timeline",
    subtitle: "type 'kellygoh' to return back here from home page",
  },
};
