import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menu',
  },
  {
    displayName: 'Ingreso de Actas',
    iconName: 'clipboard-text',
    route: '/dashboard',
  },
];

export const navItemsOperador: NavItem[] = [
  {
    navCap: 'Menu',
  },
  {
    displayName: 'Delegados',
    iconName: 'clipboard-text',
    route: '/inscripcion',
  },
];
