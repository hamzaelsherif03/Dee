declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }
  export type Icon = FC<IconProps>;

  export const Zap: Icon;
  export const Shield: Icon;
  export const Rocket: Icon;
  export const AlertCircle: Icon;
  export const Check: Icon;
}