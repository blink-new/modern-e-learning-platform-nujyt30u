import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Trophy,
  Calendar,
  Clock, 
  BarChart
} from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { getEnrolledCourses, currentUser } from '../../lib/data'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch enrolled courses
    const fetchCourses = async () => {
      setIsLoading(true)
      // Simulate network delay
      setTimeout(() => {
        const courses = getEnrolledCourses()
        setEnrolledCourses(courses)
        setIsLoading(false)
      }, 800)
    }

    fetchCourses()
  }, [])

  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}</h1>
        <p className="text-muted-foreground">
          Track your progress, continue learning, and discover new courses.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Courses In Progress</CardTitle>
            <CardDescription>Your enrolled courses</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold">{currentUser.enrolledCourses.length}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/courses">
                View all courses <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Completed Courses</CardTitle>
            <CardDescription>Courses you've finished</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold">{currentUser.completedCourses.length}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/progress">
                View progress <BarChart className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Achievement</CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-amber-500 mr-3" />
              <div>
                <div className="text-xl font-bold">Learning Explorer</div>
                <div className="text-xs text-muted-foreground">Complete 5 more courses to level up!</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/achievements">
                View achievements <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link to="/courses">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <CardHeader>
                  <div className="h-6 w-2/3 bg-muted rounded mb-2" />
                  <div className="h-4 w-full bg-muted rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-muted rounded mb-4" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="font-medium text-xs">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge className={
                      course.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                        : course.difficulty === 'Intermediate'
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400'
                    }>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    <Clock className="h-3.5 w-3.5" />
                    {Math.ceil(course.duration / 60)} hours total
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Last accessed: {course.lastAccessed ? formatDate(course.lastAccessed) : 'Never'}</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to={`/learn/${course.id}`}>Continue Learning</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-xl font-medium mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
            <Button asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </Card>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link to="/courses">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Mobile App Development with React Native",
              instructor: "James Wilson",
              instructorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop",
              thumbnail: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1000&auto=format&fit=crop",
              category: "Mobile Development",
              difficulty: "Intermediate",
              duration: 17,
              enrolled: 1243,
              id: "c4"
            },
            {
              title: "UX/UI Design Principles",
              instructor: "Emma Rodriguez",
              instructorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&auto=format&fit=crop",
              thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
              category: "Design",
              difficulty: "Beginner",
              duration: 14,
              enrolled: 1865,
              id: "c3"
            },
            {
              title: "Artificial Intelligence for Beginners",
              instructor: "Michael Johnson",
              instructorAvatar: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=150&auto=format&fit=crop",
              thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
              category: "Artificial Intelligence",
              difficulty: "Beginner",
              duration: 15,
              enrolled: 2765,
              id: "c5"
            }
          ].map((course, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="font-medium text-xs">
                    {course.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{course.instructor}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {course.duration} hours
                  </Badge>
                  <Badge className={
                    course.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                      : course.difficulty === 'Intermediate'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400'
                  }>
                    {course.difficulty}
                  </Badge>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}