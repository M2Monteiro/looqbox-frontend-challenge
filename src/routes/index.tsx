import { createBrowserRouter } from 'react-router';
import { PokemonHome } from '@/routes/home';
import { MainLayout } from '@/components/layouts/MainLayout';
import { PokemonDetails } from '@/features/pokemon/pages/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PokemonHome />,
      },
    ],
  },
  {
    path: '/details/:name',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PokemonDetails />,
      },
    ],
  },
]);
