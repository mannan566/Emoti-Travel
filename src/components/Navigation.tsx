import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, MapPin, Mountain, Waves, Building, LayoutDashboard, Compass } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/tamil-nadu", label: "Tamil Nadu", icon: Mountain },
  { path: "/kerala", label: "Kerala", icon: Waves },
  { path: "/bangalore", label: "Bangalore", icon: Building },
  { path: "/discover", label: "Discover", icon: Compass },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
];

// Named export - make sure you're importing it as { Navigation }
export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectorStyle, setSelectorStyle] = useState({ width: 0, left: 0 });
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: number]: HTMLElement }>({});

  const isActive = (path: string) => location.pathname === path;

  // Update selector position when route changes
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => isActive(item.path));
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeElement = itemRefs.current[activeIndex];
      
      // Add a small delay to ensure DOM is updated
      setTimeout(() => {
        setSelectorStyle({
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft
        });
      }, 50);
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
      <style jsx>{`
        .animated-nav {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .nav-item {
          position: relative;
          z-index: 2;
        }
        
        .nav-selector {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
          border-radius: 20px;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 1;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          animation: selectorPulse 0.6s ease-out;
        }

        @keyframes selectorPulse {
          0% {
            transform: translateY(-50%) scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50%) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) scale(1);
            opacity: 1;
          }
        }
        
        .nav-item-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          z-index: 2;
          white-space: nowrap;
        }
        
        .nav-item-link.active {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          animation: textGlow 0.6s ease-out;
        }

        @keyframes textGlow {
          0% {
            color: #6b7280;
            text-shadow: none;
          }
          50% {
            color: #e0e7ff;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          }
          100% {
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }
        }
        
        .nav-item-link:not(.active):hover {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
          transform: translateY(-1px);
        }

        .nav-item-link:not(.active) {
          transition: color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        
        .nav-icon {
          width: 16px;
          height: 16px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .nav-item-link.active .nav-icon {
          color: white;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
          animation: iconGlow 0.6s ease-out;
        }

        @keyframes iconGlow {
          0% {
            color: #6b7280;
            filter: none;
            transform: scale(1);
          }
          50% {
            color: #e0e7ff;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
            transform: scale(1.1);
          }
          100% {
            color: white;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
            transform: scale(1);
          }
        }

        .nav-item-link:not(.active):hover .nav-icon {
          transform: scale(1.1);
          color: #3b82f6;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .mobile-nav-item {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .mobile-nav-item.active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(29, 78, 216, 0.15));
          color: #3b82f6;
          border-left: 3px solid #3b82f6;
          transform: translateX(4px);
          animation: mobileActiveSlide 0.5s ease-out;
        }

        @keyframes mobileActiveSlide {
          0% {
            background: transparent;
            color: #6b7280;
            border-left: 3px solid transparent;
            transform: translateX(0);
          }
          100% {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(29, 78, 216, 0.15));
            color: #3b82f6;
            border-left: 3px solid #3b82f6;
            transform: translateX(4px);
          }
        }

        .mobile-nav-item:not(.active):hover {
          background: rgba(59, 130, 246, 0.05);
          color: #3b82f6;
          transform: translateX(2px);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Emotion Escapes 
            </span> 
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center animated-nav" ref={navRef}>
            <div 
              className="nav-selector"
              style={{
                width: `${selectorStyle.width}px`,
                left: `${selectorStyle.left}px`,
                opacity: selectorStyle.width > 0 ? 1 : 0
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  ref={(el: HTMLAnchorElement | null) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  className={`nav-item-link nav-item ${active ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`mobile-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      active ? "active" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// If you want to use default export instead, uncomment this line and comment out the named export above:
// export default Navigation;