export interface IMenuPropsColumns {
  name: string;
  url: string;
  icon: string;
  category_id?: string;
}
export interface ISlidePropsColumns {
  name: string;
  url: File;
  slogan: string;
  id?: string;
  show?: boolean | string;
}
export interface INewsPropsColumns {
  name: string;
  text: File;
  file: string;
  id?: string | number;
}
export interface IAboutPropsColumns {
  url: File;
  text: string;
  id?: string | number;
}
