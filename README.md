# `react-native-sidenav`

A customizable `SideNav` component for React Native with TypeScript support. This component provides smooth animations, optional overlay, and configurable positioning on either side of the screen, making it ideal for creating sliding navigation menus.

## Installation

To install `react-native-sidenav`:

```bash
npm install react-native-sidenav
```

To install the required peer dependencies:

```bash
npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

## Usage

TBC

## Props

| Parameter           | Type                                                             | Default | Description                                                                                                                      |
| ------------------- | ---------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `state`             | `boolean`                                                        | -       | Controls whether the `SideNav` is open (`true`) or closed (`false`).                                                             |
| `toggle`            | `() => void`                                                     | -       | Function to toggle the SideNav's open/close state.                                                                               |
| `position`          | `'left' \| 'right'`                                              | -       | Position of the `SideNav` on the screen, either `"left"` or `"right"`.                                                           |
| `widthPercentage`   | `number`                                                         | `50`    | Width of the `SideNav` as a percentage of the screen width (between 0 and 100).                                                  |
| `overlay`           | `boolean`                                                        | `true`  | Specifies whether an overlay should be displayed behind the `SideNav`.                                                           |
| `overlayOpacity`    | `number`                                                         | `50`    | Opacity level of the overlay (0-100), applicable only if `overlay` is `true`.                                                    |
| `animationDuration` | `number`                                                         | `200`   | Duration of the open/close animation in milliseconds (between 100 and 10000).                                                    |
| `bgColor`           | `string`                                                         | `white` | Background color of the `SideNav`.                                                                                               |
| `padding`           | `number \| [number, number] \| [number, number, number, number]` | `16`    | Padding inside the `SideNav`. Accepts a single value, vertical/horizontal pair, or four values for top, right, bottom, and left. |
| `isTabs`            | `boolean`                                                        | `false` | Adjusts bottom padding if `SideNav` is used with a bottom tab navigator.                                                         |
| `children`          | `React.ReactNode`                                                | -       | Content rendered inside the `SideNav`, typically navigation elements or a menu.                                                  |

## Dependencies

This component relies on the following peer dependencies for gestures, animations, and safe area handling, which should be installed alongside `react-native-sidenav`:

- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-safe-area-context`
