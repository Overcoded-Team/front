declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { ComponentType } from 'react';
  interface Props {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
  const MaterialCommunityIcons: ComponentType<Props>;
  export default MaterialCommunityIcons;
} 