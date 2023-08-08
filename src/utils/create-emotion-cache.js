import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl'

export const createEmotionCache = () => {
  return createCache({key: 'muirtl',stylisPlugins: [rtlPlugin]});
};
