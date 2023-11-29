import { signal } from '@preact/signals';

export const navOpen = signal(false);
export const closeNav = () => (navOpen.value = false);
