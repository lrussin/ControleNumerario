import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Geral'
  },
  {
    name: 'Ponto de Atendimento',
    url: '/pointService',
    iconComponent: { name: 'cil-location-pin' },
  },
  {
    name: 'Interbancário',
    url: '/interbancario',
    iconComponent: { name: 'cil-money' },
  },
  {
    title: true,
    name: 'Administração'
  },
  {
    name: 'Usuários',
    url: '/users',
    iconComponent: { name: 'cil-user' },
  },
  {
    name: 'Parametrização',
    url: '/parameter',
    iconComponent: { name: 'cil-list' },
  }
];
