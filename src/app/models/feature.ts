export interface Feature {
  id: number;
  name: string;
  description: string;
  category: string;
  iconName: string; // Used to map to icon component
  size?: 'normal' | 'large' | 'tall'; // For Bento grid
}
