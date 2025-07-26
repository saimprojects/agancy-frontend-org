import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useUIStore } from '../lib/store';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location, setMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      // dropdown: [
      //   { name: 'Web Development', href: '/services/web-development' },
      //   { name: 'Mobile Apps', href: '/services/mobile-apps' },
      //   { name: 'Digital Marketing', href: '/services/digital-marketing' },
      //   { name: 'UI/UX Design', href: '/services/ui-ux-design' },
      // ]
    },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Careers', href: '/careers' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">
              Grow Peak
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-2"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-border">
                <Link
                  to="/contact"
                  className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-md text-center font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

