export const API_URL = `${import.meta.env.VITE_APP_BASE_URL}/api`;
export const getUsersUrl = (string: string) => `/user/login`;
// Menu
export const getMenuUrl = (string: string) => `/menus/header${string}`;
//Slide
export const getSlideUrl = (string: string) => `/main/slider${string}`;
// News
export const getNewsUrl = (string: string) => `/main/news${string}`;
//Portfolio
export const getPortUrl = (string: string) => `/main/portfolio${string}`;
//About
export const getAboutUrl = (string: string) => `/main/about${string}`;
//Uslugi
export const getUslugiUrl = (string: string) => `/main/trust${string}`;
//Servises
export const getServisgiUrl = (string: string) => `/main/service${string}`;
