import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft,
  Menu,
  X,
  ChevronRight,
  PlayCircle,
  FileText,
  ListChecks,
  CheckCircle2,
  Circle,
  BookOpen,
  Home
} from 'lucide-react'
import { courses, Course, CourseModule, Lesson, userProgress } from '../../lib/data'
import { cn, calculateProgress } from '../../lib/utils'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../ui/sheet'

export default function CourseLearning() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  
  useEffect(() => {
    if (!courseId) return
    
    // Simulate API call
    const fetchCourse = async () => {
      setIsLoading(true)
      
      setTimeout(() => {
        const foundCourse = courses.find(c => c.id === courseId)
        
        if (foundCourse) {
          setCourse(foundCourse)
          
          // Get completed lessons from user progress
          const progress = userProgress.find(p => p.courseId === courseId)
          if (progress) {
            setCompletedLessons(progress.completedLessons)
          }
        }
        
        setIsLoading(false)
      }, 800)
    }
    
    fetchCourse()
  }, [courseId])
  
  const activeModule = course?.modules[activeModuleIndex]
  const activeLesson = activeModule?.lessons[activeLessonIndex]
  
  const markLessonComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return
    
    setCompletedLessons(prev => [...prev, lessonId])
    
    // In a real app, this would call an API to update user progress
  }
  
  const navigateToLesson = (moduleIndex: number, lessonIndex: number) => {
    setActiveModuleIndex(moduleIndex)
    setActiveLessonIndex(lessonIndex)
    setIsSidebarOpen(false) // Close mobile sidebar when navigating
  }
  
  const navigateToNextLesson = () => {
    if (!course) return
    
    // Mark current lesson as complete
    if (activeLesson) {
      markLessonComplete(activeLesson.id)
    }
    
    // Navigate to next lesson
    if (activeLessonIndex < activeModule?.lessons.length! - 1) {
      // Next lesson in same module
      setActiveLessonIndex(activeLessonIndex + 1)
    } else if (activeModuleIndex < course.modules.length - 1) {
      // First lesson in next module
      setActiveModuleIndex(activeModuleIndex + 1)
      setActiveLessonIndex(0)
    }
  }
  
  const navigateToPreviousLesson = () => {
    if (!course) return
    
    if (activeLessonIndex > 0) {
      // Previous lesson in same module
      setActiveLessonIndex(activeLessonIndex - 1)
    } else if (activeModuleIndex > 0) {
      // Last lesson in previous module
      setActiveModuleIndex(activeModuleIndex - 1)
      setActiveLessonIndex(course.modules[activeModuleIndex - 1].lessons.length - 1)
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-12 w-12 bg-primary/20 rounded-full mx-auto"></div>
          <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
          <div className="text-muted-foreground">Loading course content...</div>
        </div>
      </div>
    )
  }
  
  if (!course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          The course you're looking for doesn't exist or you don't have access to it.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link to="/courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Courses
            </Link>
          </Button>
        </div>
      </div>
    )
  }
  
  // Calculate course progress
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length, 0
  )
  const progress = calculateProgress(completedLessons.length, totalLessons)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top navigation */}
      <header className="border-b bg-card">
        <div className="container flex items-center h-14 px-4 max-w-full mx-auto">
          <div className="flex items-center flex-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/dashboard')}
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to dashboard</span>
            </Button>
            
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4 mr-2" />
                  Course Content
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <CourseSidebar 
                  course={course} 
                  activeModuleIndex={activeModuleIndex}
                  activeLessonIndex={activeLessonIndex}
                  completedLessons={completedLessons}
                  onSelectLesson={navigateToLesson}
                  progress={progress}
                />
              </SheetContent>
            </Sheet>
            
            <div className="hidden md:block">
              <h1 className="text-base font-medium truncate max-w-[300px]">
                {course.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                Progress: {progress}%
              </span>
              <Progress value={progress} className="w-40 h-2" />
            </div>
            
            <Button variant="outline" size="sm" asChild>
              <Link to={`/courses/${course.id}`}>Course Details</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-80 border-r flex-shrink-0 overflow-y-auto">
          <CourseSidebar 
            course={course} 
            activeModuleIndex={activeModuleIndex}
            activeLessonIndex={activeLessonIndex}
            completedLessons={completedLessons}
            onSelectLesson={navigateToLesson}
            progress={progress}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container px-4 py-6 max-w-4xl mx-auto">
            {activeLesson && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>Module {activeModuleIndex + 1}</span>
                    <span>•</span>
                    <span>Lesson {activeLessonIndex + 1}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      {activeLesson.type}
                    </Badge>
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-2">{activeLesson.title}</h1>
                  <p className="text-muted-foreground">{activeLesson.description}</p>
                </div>
                
                <div className="bg-card border rounded-lg overflow-hidden">
                  {activeLesson.type === 'video' ? (
                    <div className="aspect-video bg-black flex items-center justify-center text-white">
                      <div className="text-center">
                        <PlayCircle className="h-16 w-16 mx-auto mb-2 opacity-70" />
                        <p className="text-sm opacity-70">Video player would appear here</p>
                      </div>
                    </div>
                  ) : activeLesson.type === 'reading' ? (
                    <div className="p-6 prose max-w-none">
                      <p>{activeLesson.content}</p>
                      <p>
                        This section would contain the full reading content for this lesson. In a complete implementation, this would include rich text formatting, images, code examples, and other educational content.
                      </p>
                      <h3>Key concepts covered in this lesson:</h3>
                      <ul>
                        <li>Fundamental principles and best practices</li>
                        <li>Important terminology and definitions</li>
                        <li>Real-world application examples</li>
                        <li>Common challenges and solutions</li>
                      </ul>
                      <p>
                        The content would be structured to build upon previous lessons and prepare the learner for upcoming material, creating a cohesive learning experience throughout the course.
                      </p>
                    </div>
                  ) : activeLesson.type === 'quiz' ? (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Quiz: {activeLesson.title}</h2>
                      <p className="mb-6 text-muted-foreground">{activeLesson.description}</p>
                      
                      <div className="space-y-6">
                        {[1, 2, 3].map(questionNum => (
                          <div key={questionNum} className="border rounded-lg p-4">
                            <h3 className="font-medium mb-3">Question {questionNum}: Sample question text would appear here?</h3>
                            <div className="space-y-2">
                              {['A', 'B', 'C', 'D'].map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id={`q${questionNum}option${option}`}
                                    name={`question${questionNum}`}
                                    className="h-4 w-4 text-primary focus:ring-primary"
                                  />
                                  <label htmlFor={`q${questionNum}option${option}`} className="text-sm">
                                    Option {option}: Sample answer text
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button onClick={() => markLessonComplete(activeLesson.id)}>
                          Submit Quiz
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Assignment: {activeLesson.title}</h2>
                      <p className="mb-6 text-muted-foreground">{activeLesson.description}</p>
                      
                      <div className="prose max-w-none">
                        <p>
                          This assignment is designed to test your understanding of the concepts covered in this module. Please complete the following tasks:
                        </p>
                        <ol>
                          <li>Task one description would appear here</li>
                          <li>Task two description would appear here</li>
                          <li>Task three description would appear here</li>
                        </ol>
                        <h3>Submission Guidelines:</h3>
                        <p>
                          Your submission should include the following components:
                        </p>
                        <ul>
                          <li>Requirement one details</li>
                          <li>Requirement two details</li>
                          <li>Requirement three details</li>
                        </ul>
                      </div>
                      
                      <div className="mt-6 border-t pt-6">
                        <Button onClick={() => markLessonComplete(activeLesson.id)}>
                          Mark as Complete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button
                    variant="outline"
                    onClick={navigateToPreviousLesson}
                    disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                  
                  {!completedLessons.includes(activeLesson.id) && activeLesson.type !== 'quiz' && activeLesson.type !== 'assignment' && (
                    <Button onClick={() => markLessonComplete(activeLesson.id)} variant="outline">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </Button>
                  )}
                  
                  <Button
                    onClick={navigateToNextLesson}
                    disabled={
                      activeModuleIndex === course.modules.length - 1 && 
                      activeLessonIndex === activeModule?.lessons.length! - 1
                    }
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CourseSidebarProps {
  course: Course
  activeModuleIndex: number
  activeLessonIndex: number
  completedLessons: string[]
  onSelectLesson: (moduleIndex: number, lessonIndex: number) => void
  progress: number
}

function CourseSidebar({
  course,
  activeModuleIndex,
  activeLessonIndex,
  completedLessons,
  onSelectLesson,
  progress
}: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({})
  
  useEffect(() => {
    // Initialize with active module expanded
    const initialExpanded: Record<string, boolean> = {}
    course.modules.forEach((module, index) => {
      initialExpanded[module.id] = index === activeModuleIndex
    })
    setExpandedModules(initialExpanded)
  }, [course.modules, activeModuleIndex])
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }
  
  const getLessonIcon = (lesson: Lesson) => {
    if (completedLessons.includes(lesson.id)) {
      return <CheckCircle2 className="h-4 w-4 text-success" />
    }
    
    if (lesson.type === 'video') {
      return <PlayCircle className="h-4 w-4 text-muted-foreground" />
    } else if (lesson.type === 'reading') {
      return <FileText className="h-4 w-4 text-muted-foreground" />
    } else if (lesson.type === 'quiz') {
      return <ListChecks className="h-4 w-4 text-muted-foreground" />
    } else {
      return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div>
      <div className="p-4 border-b">
        <h2 className="font-semibold truncate">{course.title}</h2>
        <div className="flex items-center mt-2">
          <span className="text-sm text-muted-foreground mr-2">
            {progress}% complete
          </span>
          <Progress value={progress} className="h-2 flex-1" />
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8.5rem)]">
        <div className="p-4">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="mb-4">
              <button
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "flex items-center justify-between w-full text-left p-2 rounded-md",
                  "hover:bg-muted/50 transition-colors",
                  moduleIndex === activeModuleIndex && "bg-muted/50"
                )}
              >
                <div className="flex items-start gap-2">
                  <div className="font-medium">
                    Module {moduleIndex + 1}
                  </div>
                </div>
                <div>
                  {expandedModules[module.id] ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {expandedModules[module.id] && (
                <div className="mt-1 ml-2 pl-4 border-l">
                  <h3 className="text-sm font-medium px-2 py-1">{module.title}</h3>
                  
                  <div className="space-y-1 mt-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(moduleIndex, lessonIndex)}
                        className={cn(
                          "flex items-center gap-2 w-full text-left p-2 text-sm rounded-md",
                          "hover:bg-muted/50 transition-colors",
                          moduleIndex === activeModuleIndex && lessonIndex === activeLessonIndex && "bg-primary/10 text-primary"
                        )}
                      >
                        {getLessonIcon(lesson)}
                        <span className="truncate">{lesson.title}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {lesson.duration}m
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}