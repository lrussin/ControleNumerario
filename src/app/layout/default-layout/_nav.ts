import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Geral',
    permission: ['Membro', 'Gerente', 'Admin']
  },
  {
    name: 'Ponto de Atendimento',
    url: '/pointService',
    iconComponent: { name: 'cil-location-pin' },
    permission: ['Membro', 'Gerente', 'Admin']
  },
  {
    name: 'Interbancário',
    url: '/interbancario',
    iconComponent: { name: 'cil-money' },
    permission: ['Membro', 'Gerente', 'Admin']
  },
  {
    title: true,
    name: 'Administração',
    permission: ['Admin']
  },
  {
    name: 'Usuários',
    url: '/users',
    iconComponent: { name: 'cil-user' },
    permission: ['Admin']
  },
  {
    name: 'Parametrização',
    url: '/parameter',
    iconComponent: { name: 'cil-list' },
    permission: ['Admin']
  }
];
