import { mockStandards } from '../data/standards.js';
import { mockAnalyses } from '../data/analyses.js';
import { mockReports } from '../data/reports.js';
import { demoUser } from '../data/users.js';

const KEYS = {
  AUTH_USER: 'praman_user',
  REGISTERED_USERS: 'praman_registered_users',
  SAVED_STANDARDS: 'praman_saved',
  ANALYSES_HISTORY: 'praman_analyses',
  REPORTS: 'praman_reports',
  SETTINGS: 'praman_settings',
  SIDEBAR_COLLAPSED: 'praman_sidebar_collapsed'
};

export const Storage = {
  getUser() {
    const data = localStorage.getItem(KEYS.AUTH_USER);
    return data ? JSON.parse(data) : null;
  },
  setUser(user) {
    localStorage.setItem(KEYS.AUTH_USER, JSON.stringify(user));
  },
  isLoggedIn() {
    return !!localStorage.getItem(KEYS.AUTH_USER);
  },
  isAdmin() {
    const user = this.getUser();
    if (!user) return false;
    const r = (user.role || '').toLowerCase();
    return r === 'admin' || r === 'administrator' || user.email === 'admin@praman.gov.in';
  },
  getRegisteredUsers() {
    const data = localStorage.getItem(KEYS.REGISTERED_USERS);
    const initialUsers = [
      demoUser,
      {
        id: 'usr-admin-01',
        name: 'Central Admin',
        email: 'admin@praman.gov.in',
        organization: 'Central Procurement Directorate',
        role: 'Administrator',
        status: 'active',
        registeredAt: new Date(Date.now() - 864000000).toISOString()
      },
      {
        id: 'usr-officer-01',
        name: 'Rajesh Sharma',
        email: 'officer@praman.gov.in',
        organization: 'Central Public Works Dept (CPWD)',
        role: 'Procurement Officer',
        status: 'active',
        registeredAt: new Date(Date.now() - 432000000).toISOString()
      }
    ];
    return data ? JSON.parse(data) : initialUsers;
  },
  registerUser({ name, email, organization, role, password }) {
    const users = this.getRegisteredUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }
    const newUser = {
      id: 'usr-' + Date.now().toString(36),
      name: name.trim(),
      email: normalizedEmail,
      organization: organization ? organization.trim() : 'Central Ministry',
      role: role === 'admin' ? 'Administrator' : 'Procurement Officer',
      status: 'active',
      registeredAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(KEYS.REGISTERED_USERS, JSON.stringify(users));
    this.setUser(newUser);
    return { success: true, user: newUser };
  },
  updateUserRole(userId, newRole) {
    const users = this.getRegisteredUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      localStorage.setItem(KEYS.REGISTERED_USERS, JSON.stringify(users));
      const current = this.getUser();
      if (current && current.id === userId) {
        current.role = newRole;
        this.setUser(current);
      }
    }
  },
  toggleUserStatus(userId) {
    const users = this.getRegisteredUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'deactivated' ? 'active' : 'deactivated';
      localStorage.setItem(KEYS.REGISTERED_USERS, JSON.stringify(users));
    }
  },
  loginUser(email, password) {
    const users = this.getRegisteredUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (found) {
      if (found.status === 'deactivated') {
        return { success: false, error: 'Your account has been deactivated by an Administrator.' };
      }
      this.setUser(found);
      return { success: true, user: found };
    }
    // Fallback for default email patterns
    if (normalizedEmail.includes('admin')) {
      const adminAcc = {
        id: 'usr-admin-default',
        name: 'Central Admin',
        email: normalizedEmail,
        organization: 'Central Procurement Directorate',
        role: 'Administrator',
        status: 'active'
      };
      this.setUser(adminAcc);
      return { success: true, user: adminAcc };
    }
    if (normalizedEmail.includes('@praman.in') || normalizedEmail.includes('@gov.in') || normalizedEmail.includes('@cpwd.gov.in') || normalizedEmail.includes('@ntpc.co.in')) {
      const demoAccount = {
        id: 'usr-demo-' + Date.now().toString(36),
        name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        email: normalizedEmail,
        organization: normalizedEmail.includes('cpwd') ? 'Central Public Works Dept' : 'Central Procurement Directorate',
        role: 'Procurement Officer',
        status: 'active'
      };
      this.setUser(demoAccount);
      return { success: true, user: demoAccount };
    }
    return { success: false, error: 'Unable to sign in with these credentials. Please check your email and password.' };
  },
  loginDemo() {
    this.setUser(demoUser);
  },
  logout() {
    localStorage.removeItem(KEYS.AUTH_USER);
  },
  getSavedStandards() {
    const data = localStorage.getItem(KEYS.SAVED_STANDARDS);
    return data ? JSON.parse(data) : mockStandards.map(s => s.id);
  },
  toggleSaveStandard(id) {
    const saved = this.getSavedStandards();
    const index = saved.indexOf(id);
    if (index > -1) {
      saved.splice(index, 1);
    } else {
      saved.push(id);
    }
    localStorage.setItem(KEYS.SAVED_STANDARDS, JSON.stringify(saved));
    return saved.includes(id);
  },
  isStandardSaved(id) {
    return this.getSavedStandards().includes(id);
  },
  getAnalyses() {
    const data = localStorage.getItem(KEYS.ANALYSES_HISTORY);
    return data ? JSON.parse(data) : mockAnalyses;
  },
  addAnalysis(analysis) {
    const list = this.getAnalyses();
    list.unshift(analysis);
    localStorage.setItem(KEYS.ANALYSES_HISTORY, JSON.stringify(list));
  },
  getReports() {
    const data = localStorage.getItem(KEYS.REPORTS);
    return data ? JSON.parse(data) : mockReports;
  },
  isSidebarCollapsed() {
    return localStorage.getItem(KEYS.SIDEBAR_COLLAPSED) === 'true';
  },
  setSidebarCollapsed(collapsed) {
    localStorage.setItem(KEYS.SIDEBAR_COLLAPSED, collapsed ? 'true' : 'false');
  }
};
