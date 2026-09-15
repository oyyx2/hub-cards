export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
  tagline: string;
  experience: string[];
  motivation?: string;
  strengths?: string;
  interests?: string;
  phrase?: string;
  idea?: string;
  linkedin?: string;
  email?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "yuxue-ouyang",
    name: "Yuxue Ouyang",
    role: "President",
    photo: "/members/yuxue-ouyang.png",
    tagline: "SpongeBob SquarePants",
    experience: [
      "Coordinated product, technical, and community-facing work at an AI startup, including prompt optimization, product discussions, and Telegram community operations.",
    ],
    motivation:
      "I want our MSBA year to feel like a real community, not just a group of people taking the same classes. I hope to create more chances for students to connect, explore different sides of postgraduate life, and make use of the opportunities around us without adding unnecessary pressure.",
    strengths:
      "I am good at organizing people, aligning different perspectives, and pushing ideas through to execution.",
    interests: "Theatre, poetry, recreational sports, and exploring good food",
    phrase: "SpongeBob SquarePants",
    idea: "Build a balanced calendar of professional, social, and small-group activities so students can stay connected throughout the year — no extra stress, just more options to explore postgraduate life.",
    linkedin: "https://www.linkedin.com/in/yuxue-ouyang-179967428/",
  },
  {
    id: "boris-kriuk",
    name: "Boris Kriuk",
    role: "Vice President — Cabinet coordination and cross-functional execution",
    photo: "/members/boris-kriuk.png",
    tagline: "strategic",
    experience: [
      "CTO of STREVIO and AI researcher at HKUST, bridging AI research and practical business applications. Experience spans research communication, strategic planning and multidisciplinary collaboration.",
    ],
    motivation:
      "To contribute my technology and business experience to the MSBA community by strengthening cabinet coordination, aligning priorities across teams and translating student ideas into well-executed initiatives.",
    strengths:
      "Connecting strategic priorities with practical execution through cross-functional collaboration and a clear understanding of technology and business needs.",
    interests: "AI research, emerging technologies and entrepreneurship.",
    phrase: "strategic",
    idea: "Establish an AI & Industry Exchange Series connecting MSBA students with alumni, researchers and industry professionals. Sessions would combine applied AI case studies with discussions on business impact, implementation challenges and career opportunities.",
    linkedin: "https://www.linkedin.com/in/boris-kriuk/",
  },
  {
    id: "yifei-huang",
    name: "Yifei Huang",
    role: "Director of Finance",
    photo: "/members/yifei-huang.png",
    tagline: "Supportive",
    experience: [
      "Doing accounting intern at certified public accountant LLP, assists reviewing business expense,budgeting,and expenditures to ensure financial data accuracy, authenticity, and completeness.",
      "Helped  my undergraduate school on a budget plan for Illinois Fest, student workshops, and other events while collaborating with department advisors and fellow ambassadors to engage with students.",
    ],
    motivation:
      "Since joining HKUST, I have received a lot of support from the school and the community, which makes me want to give something back. I hope to connect with more students and create activities that bring people together and make them feel more involved. At the same time, I want to understand students’ needs and make sure their ideas and feedback can be heard, so we can create a more connected and supportive student community.",
    strengths:
      "Communication, active listening, teamwork, and event coordination. I am comfortable connecting with different students, listening to their feedback, and working with others to organize activities.",
    interests: "photography",
    phrase: "Supportive",
    idea: "Have a special Channel at Canvas for all the mandatory notice, Professional and special event registration portal also the Feedback channel.",
  },
  {
    id: "yongshi-chen",
    name: "Yongshi Chen",
    role: "Director of Operation",
    photo: "/members/yongshi-chen.jpg",
    tagline: "Dependable",
    experience: [
      "Planned and organized a class beach team-building activity, including the schedule, transportation, games and materials.",
      "Coordinated with classmates and suppliers to ensure smooth event execution.",
      "Managed on-site arrangements, handled unexpected issues and collected feedback after the event.",
    ],
    motivation:
      "To improve operational efficiency and turn ideas into well-organized, inclusive activities for the MSBA community.",
    strengths:
      "Warm and approachable, with strong planning, organizational and time-management skills. Able to turn ideas into action through effective coordination and reliable follow-through.",
    interests: "Badminton, travelling and exploring different cuisines.",
    phrase: "Dependable",
    idea: "Launch an “MSBA One-Stop Hub” integrating event updates, deadlines, shared resources and student feedback.",
    linkedin: "https://www.linkedin.com/in/yongshi-chen-3b77b9430",
  },
  {
    id: "yuanhao-zhang",
    name: "Yuanhao Zhang",
    role: "Director of Marketing",
    photo: "/members/yuanhao-zhang.jpg",
    tagline: "Proactive",
    experience: [
      "Communications experience at North Bristol NHS Trust, including social media analysis, content creation, promotional design and media coordination.",
      "As HSBC personal wealth planner intern, sometimes we also need to do many marketing events to attract our high net worth clients to come and engage.",
    ],
    motivation:
      "To use creative, data-driven marketing to increase student engagement and strengthen the visibility of the MSBA programme.",
    strengths: "Turning data insights into clear and engaging content.",
    interests: "Tennis, Basketball, Football",
    phrase: "Proactive",
    idea: "Creating some interesting series of events to make students feel more relaxed and get happiness and friendship in our program.",
    linkedin: "https://www.linkedin.com/in/philip-zhang-543797331/",
  },
];
