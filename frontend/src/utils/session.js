export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem('token');

export const saveAuthSession = ({ token, user, role }) => {
  if (!token || !user || !role) return;

  const normalizedUser = {
    ...user,
    role,
    name: user.fullName || user.name || user.email || role,
  };

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(normalizedUser));
};

export const updateStoredUser = (updates = {}) => {
  const current = getStoredUser();
  if (!current) return;

  const next = {
    ...current,
    ...updates,
  };

  next.name = next.fullName || next.name || current.name;
  localStorage.setItem('user', JSON.stringify(next));
};

export const clearAuthSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
