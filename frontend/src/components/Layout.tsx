import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Crown, Users, TrendingUp, History, Gamepad2 } from "lucide-react";
import { clsx } from "clsx";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: "Players", href: "/players", icon: Users },
    { name: "Add Game", href: "/add-game", icon: Gamepad2 },
    { name: "Player Stats", href: "/player-stats", icon: TrendingUp },
    { name: "Wonder Stats", href: "/wonder-stats", icon: Crown },
    { name: "Game History", href: "/history", icon: History },
  ];

  return (
    <div className="min-h-screen bg-gray-900 bg-ancient-texture">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-ancient-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Crown className="h-8 w-8 text-ancient-gold" />
              <h1 className="text-2xl font-bold text-ancient-cream font-serif">
                Seven Wonders Tracker
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg border border-ancient-gold/20 p-4">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsx(
                        "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105",
                        isActive
                          ? "bg-ancient-gold text-gray-900 shadow-lg"
                          : "text-ancient-cream hover:bg-gray-700 hover:text-ancient-gold"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-gray-800 rounded-lg border border-ancient-gold/20 p-6 min-h-[600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
