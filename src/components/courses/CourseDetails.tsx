import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Clock,
  Calendar,
  BarChart3,
  Play,
  Users,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lock
} from 'lucide-react'
import { Course, courses, currentUser } from '../../lib/data'
import { formatDate, getDifficultyColor } from '../../lib/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Separator } from '../ui/separator'

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCourse = courses.find(c => c.id === courseId)
      if (foundCourse) {
        setCourse(foundCourse)
        setIsEnrolled(currentUser.enrolledCourses.includes(foundCourse.id))
      }
      setIsLoading(false)
    }, 800)
  }, [courseId])
  
  const handleEnroll = () => {
    // In a real app, this would call an API to enroll
    setIsEnrolled(true)
  }
  
  if (isLoading) {
    return (
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-5">
          <div className="h-6 w-24 bg-muted rounded"></div>
          <div className="h-9 w-4/5 bg-muted rounded"></div>
          <div className="h-6 w-3/5 bg-muted rounded"></div>
          <div className="flex gap-3 mt-4">
            <div className="h-8 w-20 bg-muted rounded"></div>
            <div className="h-8 w-20 bg-muted rounded"></div>
          </div>
          <div className="h-64 w-full bg-muted rounded mt-6"></div>
        </div>
      </div>
    )
  }
  
  if (!course) {
    return (
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  // Calculate total duration
  const totalDuration = course.modules.reduce((total, module) => {
    return total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.duration, 0)
  }, 0)
  
  // Calculate total lessons
  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0)

  return (
    <div className="bg-background min-h-screen">
      {/* Course header */}
      <div className="bg-secondary/50 border-b">
        <div className="container px-4 py-8 max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge
                className={getDifficultyColor(course.difficulty)}
              >
                {course.difficulty}
              </Badge>
              
              <h1 className="text-3xl font-bold mt-2 mb-3">{course.title}</h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center">
                  <Avatar className="h-7 w-7 mr-2">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{course.instructor.name}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last updated {formatDate(course.updated)}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-medium">{course.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground ml-1">({course.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course.enrollmentCount.toLocaleString()} students
                  </span>
                </div>
              </div>
            </div>
            
            <div className="lg:row-start-1 lg:col-start-3">
              <div className="border rounded-lg overflow-hidden bg-card">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button size="icon" className="h-14 w-14 rounded-full">
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="text-center mb-4">
                    {course.price === null ? (
                      <div className="text-2xl font-bold">Free</div>
                    ) : (
                      <div className="text-2xl font-bold">${course.price}</div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Course Duration</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.ceil(totalDuration / 60)} hours in total
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Skill Level</div>
                        <div className="text-sm text-muted-foreground">
                          {course.difficulty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Lessons</div>
                        <div className="text-sm text-muted-foreground">
                          {totalLessons} lessons
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    {isEnrolled ? (
                      <Button className="w-full" asChild>
                        <Link to={`/learn/${course.id}`}>Continue Learning</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={handleEnroll}>
                        Enroll Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <Tabs defaultValue="curriculum">
          <TabsList className="mb-6">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curriculum" className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Course Curriculum</h2>
              <p className="text-muted-foreground">
                {course.modules.length} modules • {totalLessons} lessons • {Math.ceil(totalDuration / 60)} hours total
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module, moduleIndex) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">
                          Module {moduleIndex + 1}:
                        </span> 
                        <span>{module.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {module.lessons.length} lessons •{' '}
                        {Math.ceil(
                          module.lessons.reduce((total, lesson) => total + lesson.duration, 0) / 60
                        )} hours
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div 
                          key={lesson.id}
                          className="border rounded-md p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                              {lessonIndex + 1}
                            </div>
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {lesson.duration} min
                            </span>
                            {!isEnrolled && (
                              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="overview">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <div className="prose max-w-none text-foreground">
                  <p>
                    {course.description}
                  </p>
                  <p className="mt-4">
                    This course is designed for {course.difficulty === 'Beginner' ? 'beginners with no prior experience' : course.difficulty === 'Intermediate' ? 'those with basic knowledge of the subject' : 'advanced learners with substantial experience'} in the field. Throughout the course, you'll gain practical skills and knowledge that can be applied immediately to real-world scenarios.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Fundamental concepts and principles in the subject",
                    "Practical skills through hands-on exercises",
                    "Industry best practices and common pitfalls to avoid",
                    "How to apply knowledge to real-world projects",
                    "Problem-solving techniques specific to the field",
                    "Collaboration and communication skills for teams"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {course.difficulty === 'Beginner' ? (
                    <>
                      <li>No prior knowledge required - this course is perfect for beginners</li>
                      <li>Basic computer skills and internet access</li>
                      <li>Enthusiasm to learn and practice new concepts</li>
                    </>
                  ) : course.difficulty === 'Intermediate' ? (
                    <>
                      <li>Basic understanding of {course.category.toLowerCase()} concepts</li>
                      <li>Familiarity with fundamental terminology and principles</li>
                      <li>Previous experience with introductory courses or projects</li>
                    </>
                  ) : (
                    <>
                      <li>Strong foundation in {course.category.toLowerCase()}</li>
                      <li>Professional experience or extensive practice in the field</li>
                      <li>Completion of intermediate-level courses or equivalent knowledge</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructor">
            <div className="max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{course.instructor.name}</h2>
                    <p className="text-muted-foreground">
                      Expert in {course.category}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                      <span className="font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground ml-1">Instructor Rating</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        12,000+ Students
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        15 Courses
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="prose max-w-none text-foreground">
                    <p>
                      {course.instructor.name} is a passionate educator with over 10 years of experience in {course.category}. Their teaching approach combines theoretical knowledge with practical applications, making complex concepts accessible to learners of all levels.
                    </p>
                    <p className="mt-4">
                      With a background in both academic research and industry practice, they bring a unique perspective to their courses, ensuring students gain both foundational understanding and relevant skills for today's market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}