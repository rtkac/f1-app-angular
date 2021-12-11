import { User } from '../models/user.model';

export const breadcrumbsLabelFactory = (path: string, user?: User | null) => {
  switch (path) {
    case 'dashboard':
      return 'Dashboard';
    case 'welcome':
      return `Welcome, ${user?.firstName}!`;
    case 'teams':
      return 'Teams';
    case 'drivers':
      return 'Drivers';
    case 'rankings':
      return 'Rankings';
    case 'profile':
      return 'Profile';
  }
  return path;
};
