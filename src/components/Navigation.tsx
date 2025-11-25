import { PawPrint, Home, Heart, Calendar, Users, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import logoImage from 'figma:asset/d39f76daef09c9c2274206c142ae2138b54dee3e.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userName: string;
}

export function Navigation({ currentPage, onNavigate, onLogout, userName }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'pets', label: 'Meus Pets', icon: PawPrint },
    { id: 'plans', label: 'Planos', icon: Heart },
    { id: 'appointments', label: 'Consultas', icon: Calendar },
    { id: 'community', label: 'Comunidade', icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-brown-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={logoImage} alt="Papet Logo" className="h-10" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    currentPage === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-brown-700 hover:bg-beige-100'
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-brown-700">{userName}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-brown-700 hover:text-red-600"
            >
              <LogOut className="size-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brown-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brown-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    currentPage === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-brown-700 hover:bg-beige-100'
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-brown-200 mt-4">
              <p className="px-4 text-sm text-brown-700 mb-2">{userName}</p>
              <Button
                variant="ghost"
                className="w-full justify-start text-brown-700 hover:text-red-600"
                onClick={onLogout}
              >
                <LogOut className="size-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}