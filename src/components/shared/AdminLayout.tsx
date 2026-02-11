import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, ArrowLeft, Menu, X, Search, Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarGroup {
  label: string;
  icon: LucideIcon;
  items: SidebarItem[];
}

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  sidebarGroups: SidebarGroup[];
  activePage: string;
  onPageChange: (page: string) => void;
  onBack: () => void;
  breadcrumb: string[];
  children: React.ReactNode;
}

export function AdminLayout({
  title,
  subtitle,
  sidebarGroups,
  activePage,
  onPageChange,
  onBack,
  breadcrumb,
  children,
}: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');

  const activeGroup = sidebarGroups.find((g) => g.items.some((i) => i.id === activePage));
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => {
    const collapsed = new Set<string>();
    sidebarGroups.forEach((g) => {
      if (g.label !== activeGroup?.label) collapsed.add(g.label);
    });
    return collapsed;
  });

  const toggleGroup = (label: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const activeItem = sidebarGroups.flatMap((g) => g.items).find((i) => i.id === activePage);

  const filteredGroups = useMemo(() => {
    if (!sidebarSearch.trim()) return sidebarGroups;
    const q = sidebarSearch.toLowerCase();
    return sidebarGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => item.label.toLowerCase().includes(q) || group.label.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [sidebarGroups, sidebarSearch]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <div className="px-4 pt-5 pb-4">
        <h2 className="text-slate-800 font-bold text-[15px] leading-snug">{title}</h2>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>

      {/* Back button */}
      <div className="px-3 mb-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Voltar ao Dashboard</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 mb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-slate-200 mb-2" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
        {filteredGroups.map((group) => {
          const isSearching = sidebarSearch.trim().length > 0;
          const isCollapsed = !isSearching && collapsedGroups.has(group.label);
          const hasActiveItem = group.items.some((i) => i.id === activePage);
          return (
            <div key={group.label}>
              {/* Group header */}
              <button
                onClick={() => toggleGroup(group.label)}
                className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-lg transition-colors ${
                  hasActiveItem ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <group.icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">{group.label}</span>
                <span className="ml-auto text-[10px] text-slate-400 font-normal">{group.items.length}</span>
              </button>

              {/* Items */}
              {!isCollapsed && (
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const isActive = activePage === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onPageChange(item.id);
                          setMobileOpen(false);
                          setSidebarSearch('');
                        }}
                        className={`flex items-center gap-3 w-full text-left pl-9 pr-3 py-2 rounded-lg text-[13px] transition-all duration-150 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {filteredGroups.length === 0 && sidebarSearch && (
          <div className="text-center py-8 text-slate-400 text-xs">
            Nenhum resultado para "{sidebarSearch}"
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-5rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-[260px] flex-col bg-slate-50 flex-shrink-0 border-r border-slate-200">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[280px] bg-slate-50 h-full flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-200 rounded-lg z-10 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 min-w-0">
        {/* Breadcrumb Bar */}
        <div className="sticky top-16 z-10 bg-white border-b border-slate-200 px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <nav className="flex items-center gap-1 text-sm">
                <button
                  onClick={onBack}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Home</span>
                </button>
                {breadcrumb.map((item, idx) => {
                  const isLast = idx === breadcrumb.length - 1;
                  const isGroup = idx === 1;
                  const groupMatch = isGroup
                    ? sidebarGroups.find((g) => g.label === item)
                    : null;
                  return (
                    <span key={idx} className="flex items-center gap-1">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      {groupMatch ? (
                        <button
                          onClick={() => onPageChange(groupMatch.items[0].id)}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors hidden sm:inline"
                        >
                          {item}
                        </button>
                      ) : (
                        <span
                          className={
                            isLast
                              ? 'text-slate-800 font-semibold'
                              : 'text-slate-400 hidden sm:inline'
                          }
                        >
                          {item}
                        </span>
                      )}
                    </span>
                  );
                })}
              </nav>
            </div>
            {activeItem && (
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
                <activeItem.icon className="w-3.5 h-3.5" />
                <span>{activeItem.label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
