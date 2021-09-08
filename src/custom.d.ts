declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const url: string;
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default url;
}

declare module '*.wav' {
  const url: string;
  export default url;
}
