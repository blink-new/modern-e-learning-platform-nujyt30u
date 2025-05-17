export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'student' | 'instructor' | 'admin'
  enrolledCourses: string[]
  completedCourses: string[]
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: {
    id: string
    name: string
    avatar: string
  }
  thumbnail: string
  category: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number // in minutes
  modules: CourseModule[]
  enrollmentCount: number
  rating: number
  reviews: number
  price: number | null // null means free
  created: string
  updated: string
}

export interface CourseModule {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: 'video' | 'reading' | 'quiz' | 'assignment'
  duration: number // in minutes
  content: string
  completed?: boolean
}

export interface Progress {
  courseId: string
  completedLessons: string[]
  lastAccessed: string
  quizScores: {
    [quizId: string]: number
  }
}

// Mock current user
export const currentUser: User = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
  role: "student",
  enrolledCourses: ["c1", "c3", "c4"],
  completedCourses: []
}

// Mock courses data
export const courses: Course[] = [
  {
    id: "c1",
    title: "Web Development Fundamentals",
    description: "Master the core concepts of HTML, CSS, and JavaScript to build responsive websites from scratch. This course covers all the essential skills you need to start your journey as a web developer.",
    instructor: {
      id: "i1",
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
    },
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    difficulty: "Beginner",
    duration: 720, // 12 hours
    modules: [
      {
        id: "m1",
        title: "HTML Basics",
        description: "Learn the building blocks of the web",
        lessons: [
          {
            id: "l1",
            title: "Introduction to HTML",
            description: "Understanding HTML structure and elements",
            type: "video",
            duration: 15,
            content: "https://example.com/videos/intro-html",
            completed: true
          },
          {
            id: "l2",
            title: "HTML Document Structure",
            description: "Learn how to structure an HTML document properly",
            type: "reading",
            duration: 10,
            content: "HTML documents follow a standard structure..."
          },
          {
            id: "l3",
            title: "HTML Elements Quiz",
            description: "Test your knowledge of HTML elements",
            type: "quiz",
            duration: 15,
            content: "10 multiple choice questions"
          }
        ]
      },
      {
        id: "m2",
        title: "CSS Styling",
        description: "Make your websites beautiful with CSS",
        lessons: [
          {
            id: "l4",
            title: "CSS Selectors",
            description: "Learn how to target HTML elements with CSS selectors",
            type: "video",
            duration: 20,
            content: "https://example.com/videos/css-selectors"
          },
          {
            id: "l5",
            title: "Box Model",
            description: "Understanding the CSS box model",
            type: "reading",
            duration: 15,
            content: "The CSS box model consists of..."
          }
        ]
      }
    ],
    enrollmentCount: 3542,
    rating: 4.7,
    reviews: 328,
    price: null, // Free course
    created: "2023-06-15",
    updated: "2023-11-22"
  },
  {
    id: "c2",
    title: "Data Science Essentials",
    description: "Explore the fundamentals of data science including statistics, data visualization, and machine learning basics. Learn how to extract meaningful insights from complex datasets.",
    instructor: {
      id: "i2",
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=150&auto=format&fit=crop"
    },
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    category: "Data Science",
    tags: ["Python", "Statistics", "Data Visualization", "Machine Learning"],
    difficulty: "Intermediate",
    duration: 960, // 16 hours
    modules: [
      {
        id: "m1",
        title: "Introduction to Data Science",
        description: "Understanding the data science workflow",
        lessons: [
          {
            id: "l1",
            title: "What is Data Science?",
            description: "Overview of data science and its applications",
            type: "video",
            duration: 25,
            content: "https://example.com/videos/data-science-intro"
          },
          {
            id: "l2",
            title: "Data Science Lifecycle",
            description: "Understanding the stages of a data science project",
            type: "reading",
            duration: 15,
            content: "The data science lifecycle consists of..."
          }
        ]
      }
    ],
    enrollmentCount: 2187,
    rating: 4.5,
    reviews: 176,
    price: 49.99,
    created: "2023-05-10",
    updated: "2023-10-15"
  },
  {
    id: "c3",
    title: "UX/UI Design Principles",
    description: "Learn the fundamentals of user experience and interface design. Create intuitive, user-friendly designs that solve real problems and delight users.",
    instructor: {
      id: "i3",
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&auto=format&fit=crop"
    },
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
    category: "Design",
    tags: ["UX Design", "UI Design", "Prototyping", "User Research"],
    difficulty: "Beginner",
    duration: 840, // 14 hours
    modules: [
      {
        id: "m1",
        title: "Introduction to UX Design",
        description: "Understanding user experience design fundamentals",
        lessons: [
          {
            id: "l1",
            title: "What is UX Design?",
            description: "Core concepts and principles of UX design",
            type: "video",
            duration: 20,
            content: "https://example.com/videos/ux-intro",
            completed: true
          }
        ]
      }
    ],
    enrollmentCount: 1865,
    rating: 4.8,
    reviews: 214,
    price: 39.99,
    created: "2023-07-20",
    updated: "2023-12-05"
  },
  {
    id: "c4",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native. Learn how to create beautiful, responsive interfaces that work on both iOS and Android.",
    instructor: {
      id: "i4",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop"
    },
    thumbnail: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1000&auto=format&fit=crop",
    category: "Mobile Development",
    tags: ["React Native", "JavaScript", "iOS", "Android"],
    difficulty: "Intermediate",
    duration: 1020, // 17 hours
    modules: [
      {
        id: "m1",
        title: "Getting Started with React Native",
        description: "Setting up your development environment",
        lessons: [
          {
            id: "l1",
            title: "React Native Fundamentals",
            description: "Core concepts of React Native development",
            type: "video",
            duration: 30,
            content: "https://example.com/videos/react-native-intro",
            completed: true
          }
        ]
      }
    ],
    enrollmentCount: 1243,
    rating: 4.6,
    reviews: 138,
    price: 59.99,
    created: "2023-04-15",
    updated: "2023-11-10"
  },
  {
    id: "c5",
    title: "Artificial Intelligence for Beginners",
    description: "Understand the basics of artificial intelligence and how it's transforming industries. Learn about machine learning, neural networks, and AI applications.",
    instructor: {
      id: "i5",
      name: "Michael Johnson",
      avatar: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=150&auto=format&fit=crop"
    },
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    category: "Artificial Intelligence",
    tags: ["AI", "Machine Learning", "Neural Networks", "Data"],
    difficulty: "Beginner",
    duration: 900, // 15 hours
    modules: [
      {
        id: "m1",
        title: "Introduction to AI",
        description: "Understanding the fundamentals of artificial intelligence",
        lessons: [
          {
            id: "l1",
            title: "What is Artificial Intelligence?",
            description: "Overview of AI and its applications",
            type: "video",
            duration: 25,
            content: "https://example.com/videos/ai-intro"
          }
        ]
      }
    ],
    enrollmentCount: 2765,
    rating: 4.5,
    reviews: 192,
    price: 49.99,
    created: "2023-08-10",
    updated: "2023-12-15"
  },
  {
    id: "c6",
    title: "Blockchain Technology Fundamentals",
    description: "Explore the core concepts of blockchain technology and cryptocurrencies. Learn how distributed ledgers work and their potential applications.",
    instructor: {
      id: "i6",
      name: "Lisa Parker",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    thumbnail: "https://images.unsplash.com/photo-1639322537231-2f206e06af84?q=80&w=1000&auto=format&fit=crop",
    category: "Blockchain",
    tags: ["Blockchain", "Cryptocurrency", "Smart Contracts", "Web3"],
    difficulty: "Intermediate",
    duration: 780, // 13 hours
    modules: [
      {
        id: "m1",
        title: "Blockchain Basics",
        description: "Understanding the fundamentals of blockchain technology",
        lessons: [
          {
            id: "l1",
            title: "What is Blockchain?",
            description: "Core concepts and principles of blockchain technology",
            type: "video",
            duration: 30,
            content: "https://example.com/videos/blockchain-intro"
          }
        ]
      }
    ],
    enrollmentCount: 1356,
    rating: 4.4,
    reviews: 105,
    price: 54.99,
    created: "2023-06-05",
    updated: "2023-11-25"
  }
]

// Mock progress data for the current user
export const userProgress: Progress[] = [
  {
    courseId: "c1",
    completedLessons: ["l1"],
    lastAccessed: "2023-12-10T14:30:00",
    quizScores: {}
  },
  {
    courseId: "c3",
    completedLessons: ["l1"],
    lastAccessed: "2023-12-15T09:45:00",
    quizScores: {}
  },
  {
    courseId: "c4",
    completedLessons: ["l1"],
    lastAccessed: "2023-12-12T16:20:00",
    quizScores: {}
  }
]

// Get enrolled courses with progress
export const getEnrolledCourses = () => {
  return courses
    .filter(course => currentUser.enrolledCourses.includes(course.id))
    .map(course => {
      const progress = userProgress.find(p => p.courseId === course.id)
      const totalLessons = course.modules.reduce(
        (total, module) => total + module.lessons.length, 0
      )
      const completedLessons = progress?.completedLessons.length || 0
      const progressPercentage = calculateProgress(completedLessons, totalLessons)
      
      return {
        ...course,
        progress: progressPercentage,
        lastAccessed: progress?.lastAccessed || null
      }
    })
}

// Helper function to calculate progress
function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// Get categories for filtering
export const getCategories = (): string[] => {
  const categories = new Set(courses.map(course => course.category))
  return Array.from(categories)
}

// Get all unique tags
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>()
  courses.forEach(course => {
    course.tags.forEach(tag => tagsSet.add(tag))
  })
  return Array.from(tagsSet)
}