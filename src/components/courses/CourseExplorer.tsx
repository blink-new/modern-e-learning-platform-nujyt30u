import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Clock, Star, Users, X } from 'lucide-react'
import { cn, getDifficultyColor, formatDuration } from '../../lib/utils'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Skeleton } from '../ui/skeleton'
import { courses, getCategories, getAllTags } from '../../lib/data'

export default function CourseExplorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<string[]>(['Beginner', 'Intermediate', 'Advanced'])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(getCategories())
      setTags(getAllTags())
      setIsLoading(false)
    }, 800)
  }, [])
  
  useEffect(() => {
    let results = courses
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(course => 
        course.title.toLowerCase().includes(term) || 
        course.description.toLowerCase().includes(term) ||
        course.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(course => 
        selectedCategories.includes(course.category)
      )
    }
    
    // Apply difficulty filter
    if (selectedDifficulties.length > 0) {
      results = results.filter(course => 
        selectedDifficulties.includes(course.difficulty)
      )
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      results = results.filter(course => 
        course.tags.some(tag => selectedTags.includes(tag))
      )
    }
    
    setFilteredCourses(results)
  }, [searchTerm, selectedCategories, selectedDifficulties, selectedTags])
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  
  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    )
  }
  
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedDifficulties([])
    setSelectedTags([])
  }
  
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses to enhance your skills and knowledge
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters for desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedTags.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-xs">
                  Clear all
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="space-y-1">
                      {[1, 2, 3].map(j => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label 
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm cursor-pointer flex-1"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty */}
                <div>
                  <h4 className="font-medium mb-2">Difficulty</h4>
                  <div className="space-y-2">
                    {difficulties.map(difficulty => (
                      <div key={difficulty} className="flex items-center">
                        <Checkbox 
                          id={`difficulty-${difficulty}`} 
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() => handleDifficultyChange(difficulty)}
                        />
                        <Label 
                          htmlFor={`difficulty-${difficulty}`}
                          className="ml-2 text-sm cursor-pointer flex-1"
                        >
                          {difficulty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div>
                  <h4 className="font-medium mb-2">Topics</h4>
                  <div className="space-y-2">
                    {tags.slice(0, 12).map(tag => (
                      <div key={tag} className="flex items-center">
                        <Checkbox 
                          id={`tag-${tag}`} 
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagChange(tag)}
                        />
                        <Label 
                          htmlFor={`tag-${tag}`}
                          className="ml-2 text-sm cursor-pointer flex-1"
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={toggleMobileFilters} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedTags.length > 0) && (
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                  {selectedCategories.length + selectedDifficulties.length + selectedTags.length}
                </span>
              )}
            </Button>
          </div>
          
          {/* Active filters */}
          {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedTags.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCategoryChange(category)}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {category} filter</span>
                  </Button>
                </Badge>
              ))}
              
              {selectedDifficulties.map(difficulty => (
                <Badge key={difficulty} variant="secondary" className="flex items-center gap-1">
                  {difficulty}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDifficultyChange(difficulty)}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {difficulty} filter</span>
                  </Button>
                </Badge>
              ))}
              
              {selectedTags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTagChange(tag)}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} filter</span>
                  </Button>
                </Badge>
              ))}
              
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
                Clear all
              </Button>
            </div>
          )}
          
          {/* Course grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
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
                    {course.price === null ? (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-success text-white hover:bg-success">Free</Badge>
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="font-medium">
                          ${course.price}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="flex-1 p-4">
                    <h3 className="text-xl font-semibold mb-1 line-clamp-1">{course.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className={cn("text-xs", getDifficultyColor(course.difficulty))}
                      >
                        {course.difficulty}
                      </Badge>
                      
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(course.duration)}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground ml-1">({course.reviews})</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{course.enrollmentCount.toLocaleString()} students</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-4 pb-4 pt-0">
                    <Button className="w-full" asChild>
                      <Link to={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filters drawer */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
        isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-full max-w-xs border-r bg-background p-6 shadow-lg transition-transform duration-300",
          isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Filters</h3>
            <Button variant="ghost" size="icon" onClick={toggleMobileFilters}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`mobile-category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label 
                      htmlFor={`mobile-category-${category}`}
                      className="ml-2 text-sm cursor-pointer flex-1"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Difficulty */}
            <div>
              <h4 className="font-medium mb-2">Difficulty</h4>
              <div className="space-y-2">
                {difficulties.map(difficulty => (
                  <div key={difficulty} className="flex items-center">
                    <Checkbox 
                      id={`mobile-difficulty-${difficulty}`} 
                      checked={selectedDifficulties.includes(difficulty)}
                      onCheckedChange={() => handleDifficultyChange(difficulty)}
                    />
                    <Label 
                      htmlFor={`mobile-difficulty-${difficulty}`}
                      className="ml-2 text-sm cursor-pointer flex-1"
                    >
                      {difficulty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h4 className="font-medium mb-2">Topics</h4>
              <div className="space-y-2">
                {tags.slice(0, 12).map(tag => (
                  <div key={tag} className="flex items-center">
                    <Checkbox 
                      id={`mobile-tag-${tag}`} 
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagChange(tag)}
                    />
                    <Label 
                      htmlFor={`mobile-tag-${tag}`}
                      className="ml-2 text-sm cursor-pointer flex-1"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-background">
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                Clear all
              </Button>
              <Button onClick={toggleMobileFilters} className="flex-1">
                Apply filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}