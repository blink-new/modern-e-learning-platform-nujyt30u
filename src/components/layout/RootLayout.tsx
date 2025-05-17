import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  BookOpen, 
  Home, 
  BarChart, 
  Users, 
  Menu, 
  X, 
  Search,
  Bell,
  LogOut
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { currentUser } from '../../lib/data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../ui/sheet'
import { Input } from '../ui/input'

interface RootLayoutProps {
  onLogout: () => void
  isAuthenticated: boolean
}

export default function RootLayout({ onLogout, isAuthenticated }: RootLayoutProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Courses', href: '/courses', icon: BookOpen },
    { title: 'Community', href: '/community', icon: Users, disabled: true },
    { title: 'Progress', href: '/progress', icon: BarChart, disabled: true },
  ]
  
  // Determine if we're on the auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  
  if (isAuthPage) {
    return <Outlet />
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header */}
      <header className="fixed top-0 z-40 w-full border-b bg-background">
        <div className="container max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold font-poppins inline-block text-xl">EduCanvas</span>
            </Link>
          </div>
          
          <div className="flex-1 lg:flex items-center space-x-4 hidden">
            <nav className="flex items-center space-x-4">
              {navItems.map(item => (
                <NavLink
                  key={item.href}
                  to={item.disabled ? '#' : item.href}
                  className={({ isActive }) => cn(
                    "font-medium text-sm transition-colors",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground",
                    item.disabled && "opacity-50 pointer-events-none"
                  )}
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="w-full flex-1 md:w-auto md:flex-none flex items-center">
            <form className="hidden lg:block w-full max-w-sm pl-8">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 bg-background w-full"
                />
              </div>
            </form>
          </div>
          
          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full hidden md:flex">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2 hidden md:flex">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="px-7">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2" 
                    onClick={closeMobileMenu}
                  >
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="font-bold font-poppins inline-block text-xl">EduCanvas</span>
                  </Link>
                  <div className="mt-6 mb-4">
                    <form>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search courses..."
                          className="pl-8 bg-background w-full"
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <nav className="flex flex-col space-y-3 mt-6">
                  {navItems.map(item => {
                    const Icon = item.icon
                    return (
                      <NavLink
                        key={item.href}
                        to={item.disabled ? '#' : item.href}
                        className={({ isActive }) => cn(
                          "flex items-center gap-x-2 py-2 px-7 text-base font-medium rounded-md transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary hover:bg-primary/10" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          item.disabled && "opacity-50 pointer-events-none"
                        )}
                        onClick={closeMobileMenu}
                      >
                        <Icon className="h-5 w-5" />
                        {item.title}
                      </NavLink>
                    )
                  })}
                </nav>
                
                {isAuthenticated ? (
                  <div className="absolute bottom-6 left-0 right-0 px-7">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        onLogout()
                        closeMobileMenu()
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="absolute bottom-6 left-0 right-0 space-y-2 px-7">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login" onClick={closeMobileMenu}>Sign in</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/signup" onClick={closeMobileMenu}>Sign up</Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 pt-16">
        <div className="container max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-bold font-poppins">EduCanvas</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Empower your learning journey with our comprehensive e-learning platform.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-muted-foreground hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Progress Tracking
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} EduCanvas. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}