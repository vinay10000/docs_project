export const COLORS = [
    "#2D3250", // Dark Blue
    "#424769", // Steel Blue
    "#676F54", // Olive Green
    "#935D5D", // Dark Rose
    "#4F6367", // Slate
    "#5E548E", // Deep Purple
    "#8B575C", // Burgundy
    "#506D84", // Navy Blue
    "#6B705C", // Dark Olive
    "#845460", // Wine Red
] as const;

export type UserInfo = {
    name: string;
    avatar: string;
    color: string;
} 