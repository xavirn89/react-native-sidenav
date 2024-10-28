import React from 'react';
type Padding = number | [number, number] | [number, number, number, number];
/**
 * Props for the SideNav component:
 * - `state` (boolean): Controls whether the SideNav is open (true) or closed (false).
 * - `toggle` (function): Function to toggle the SideNav open/close state.
 * - `position` ('left' | 'right'): Position of the SideNav on the screen.
 * - `widthPercentage` (number): Width of the SideNav as a percentage of the screen width.
 *   Default is 50.
 * - `overlay` (boolean): Specifies whether an overlay should be displayed behind the SideNav.
 *   Default is true.
 * - `overlayOpacity` (number): Opacity level of the overlay (0-100). Default is 50.
 * - `animationDuration` (number): Duration of the open/close animation in milliseconds.
 *   Default is 200.
 * - `bgColor` (string): Background color of the SideNav. Default is 'white'.
 * - `padding` (Padding): Padding applied to the content inside the SideNav. Accepts either a
 *   single number, a pair for vertical/horizontal, or four values for top, right, bottom, and
 *   left. Default is 16.
 * - `isTabs` (boolean): Specifies whether the SideNav is used in combination with a bottom
 *   tab navigator, adjusting bottom padding accordingly. Default is false.
 * - `children` (React.ReactNode): Content rendered inside the SideNav.
 */
interface SideNavProps {
    state: boolean;
    toggle: () => void;
    position: 'left' | 'right';
    widthPercentage?: number;
    overlay?: boolean;
    overlayOpacity?: number;
    animationDuration?: number;
    bgColor?: string;
    padding?: Padding;
    isTabs?: boolean;
    children?: React.ReactNode;
}
declare const SideNav: React.FC<SideNavProps>;
export default SideNav;
