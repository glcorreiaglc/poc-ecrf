"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function StudySidebar({ studyId }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      href: `/study/${studyId}`,
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      href: `/study/${studyId}/ecrf`,
      label: "eCRF",
      icon: FileText,
    },
    {
      href: `/study/${studyId}/inclusions`,
      label: "Inclusions List",
      icon: Users,
    },
  ];

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 border-b">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900"
        >
          {!isCollapsed && <span className="font-semibold">Study Menu</span>}
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isCollapsed ? "mx-auto" : "mr-3"}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
