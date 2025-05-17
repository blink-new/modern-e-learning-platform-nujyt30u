import { Link } from 'react-router-dom'
import { Clock, Star, Users } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { cn, getDifficultyColor, formatDuration } from '../../lib/utils'

interface CourseCardProps {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  thumbnail: string
  category: string
  difficulty: string
  duration: number
  enrollmentCount: number
  rating: number
  reviews: number
  price: number | null
  progress?: number
  variant?: 'default' | 'compact'
}

export default function CourseCard({
  id,
  title,
  description,
  instructor,
  thumbnail,
  category,
  difficulty,
  duration,
  enrollmentCount,
  rating,
  reviews,
  price,
  progress,
  variant = 'default'
}: CourseCardProps) {
  const isCompact = variant === 'compact'
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className={cn("relative overflow-hidden", isCompact ? "h-40" : "h-48")}>
        <img 
          src={thumbnail} 
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="font-medium text-xs">
            {category}
          </Badge>
        </div>
        {price === null ? (
          <div className="absolute top-3 right-3">
            <Badge className="bg-success text-white hover:bg-success">Free</Badge>
          </div>
        ) : (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="font-medium">
              ${price}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className={cn("flex-1", isCompact ? "p-3" : "p-4")}>
        <div className="flex justify-between items-start">
          <CardTitle className={isCompact ? "text-base line-clamp-1" : "text-xl line-clamp-2"}>
            {title}
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <Avatar className={isCompact ? "h-5 w-5" : "h-6 w-6"}>
            <AvatarImage src={instructor.avatar} alt={instructor.name} />
            <AvatarFallback>{instructor.name[0]}</AvatarFallback>
          </Avatar>
          <span className={cn("text-muted-foreground", isCompact ? "text-xs" : "text-sm")}>
            {instructor.name}
          </span>
        </div>
        
        {!isCompact && (
          <p className="text-muted-foreground line-clamp-2 mt-2">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className={cn("space-y-3", isCompact ? "px-3 pb-2 pt-0" : "px-4 pb-3 pt-0")}>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={cn("text-xs", getDifficultyColor(difficulty))}
          >
            {difficulty}
          </Badge>
          
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {formatDuration(duration)}
          </Badge>
        </div>
        
        {progress !== undefined && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
            <span className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}>
              {rating.toFixed(1)}
            </span>
            <span className={cn("text-muted-foreground ml-1", isCompact ? "text-xs" : "text-sm")}>
              ({reviews})
            </span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className={cn("text-muted-foreground", isCompact ? "text-xs" : "text-sm")}>
              {enrollmentCount.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={isCompact ? "px-3 pb-3 pt-0" : "px-4 pb-4 pt-0"}>
        <Button className="w-full" asChild>
          <Link to={`/courses/${id}`}>
            {progress !== undefined ? "Continue Learning" : "View Course"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}