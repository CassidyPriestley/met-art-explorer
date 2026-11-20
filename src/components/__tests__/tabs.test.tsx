import { renderRouter, screen } from 'expo-router/testing-library';
import TabsLayout from '@/app/(tabs)/_layout';
import Explore from '@/app/(tabs)/index';
import Browse from '@/app/(tabs)/browse';
import Favorites from '@/app/(tabs)/favorites';

const routes = {
  '(tabs)/_layout': TabsLayout,
  '(tabs)/index': Explore,
  '(tabs)/browse': Browse,
  '(tabs)/favorites': Favorites,
};

describe('tabs', () => {
  it('renders the Explore screen at /', async () => {
    await renderRouter(routes, { initialUrl: '/' });
    expect(screen).toHavePathname('/');
    expect(screen.getByTestId('explore-screen')).toBeOnTheScreen();
  });
  it('renders the Browse screen at /browse', async () => {
    await renderRouter(routes, { initialUrl: '/browse' });
    expect(screen).toHavePathname('/browse');
    expect(screen.getByTestId('browse-screen')).toBeOnTheScreen();
  });
  it('renders the favorites screen at /favorites', async () => {
    await renderRouter(routes, { initialUrl: '/favorites' });
    expect(screen).toHavePathname('/favorites');
    expect(screen.getByTestId('favorites-screen')).toBeOnTheScreen();
  });
});
