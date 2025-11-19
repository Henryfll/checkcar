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
  {
    displayName: 'Transmisión',
    iconName: 'clipboard-text',
    route: '/transmision',
  },
  /*{
    displayName: 'Visor',
    iconName: 'clipboard-text',
    route: '/visor',
  },*/
];
