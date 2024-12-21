import React, { useCallback } from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler'

// Define type for padding values
type Padding = number | [number, number] | [number, number, number, number]

/**
 * Props for the SideNav component:
 * - `state` (boolean): Controls whether the SideNav is open (true) or closed (false).
 * - `onOutsidePress` (function): Function to toggle the SideNav open/close state.
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
  state: boolean
  onOutsidePress: () => void
  position: 'left' | 'right'
  widthPercentage?: number
  overlay?: boolean
  overlayOpacity?: number
  animationDuration?: number
  bgColor?: string
  padding?: Padding
  isTabs?: boolean
  children?: React.ReactNode
}

const SideNav: React.FC<SideNavProps> = ({
  state,
  onOutsidePress,
  position,
  widthPercentage = 50,
  overlay = true,
  overlayOpacity = 50,
  animationDuration = 200,
  bgColor = 'white',
  padding = 16,
  isTabs = false,
  children
}) => {
  // Retrieve safe area insets for consistent spacing
  const insets = useSafeAreaInsets()
  const screenWidth = Dimensions.get('window').width

  // Validate and constrain input values
  const validatedWidth = Math.min(Math.max(0, widthPercentage), 100)
  const validatedOverlayOpacity = overlay ? Math.min(Math.max(0, overlayOpacity), 100) : 0
  const validatedDuration = Math.min(Math.max(100, animationDuration), 10000)

  /**
   * Helper function to process the padding prop and return style
   * - Takes padding input in multiple formats and returns a style object
   * - Adds extra bottom padding if `isTabs` is true, for compatibility with bottom tab navigators
   */
  const getPaddingStyle = (padding: Padding) => {
    const extraBottomPadding = isTabs ? insets.bottom * 1.5 : 0
    if (typeof padding === 'number') {
      return { padding, paddingBottom: padding + extraBottomPadding }
    } else if (padding.length === 2) {
      const [vertical, horizontal] = padding
      return { paddingVertical: vertical, paddingHorizontal: horizontal, paddingBottom: vertical + extraBottomPadding }
    } else if (padding.length === 4) {
      const [top, right, bottom, left] = padding
      return { paddingTop: top, paddingRight: right, paddingBottom: bottom + extraBottomPadding, paddingLeft: left }
    }
    return {}
  }

  const paddingStyle = getPaddingStyle(padding)

  /**
   * Defines the animated style for the SideNav container
   * - Manages both position-based translation and fade effects
   * - When closed, opacity animation is delayed to allow slide-out to complete
   */
  const animatedStyle = useAnimatedStyle(() => {
    const translateXValue = position === 'left'
      ? withTiming(state ? 0 : -screenWidth * (validatedWidth / 100), { duration: validatedDuration })
      : withTiming(state ? 0 : screenWidth * (validatedWidth / 100), { duration: validatedDuration })

    return {
      transform: [{ translateX: translateXValue }],
      opacity: withTiming(state ? 1 : 0, { duration: validatedDuration }),
      pointerEvents: state ? 'auto' : 'none',
    } as any
  })

  /**
   * Overlay animation style
   * - Controls fade in/out effect for the overlay based on SideNav state
   */
  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(state ? validatedOverlayOpacity / 100 : 0, { duration: validatedDuration }),
    pointerEvents: state ? 'auto' : 'none'
  } as any), [state, validatedOverlayOpacity, validatedDuration])

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={state ? 'auto' : 'none'}
      onTouchStart={(e) => {
        const touch = e.nativeEvent;
        const touchX = touch.pageX;
        const sideNavWidth = (Dimensions.get('window').width * validatedWidth) / 100;
        const touchIsOutsideSideNav = position === 'left'
          ? touchX > sideNavWidth
          : touchX < (Dimensions.get('window').width - sideNavWidth);

        if (touchIsOutsideSideNav) {
          onOutsidePress();
        }
      }}
    >
      {/* Overlay background */}
      {overlay && (
        <Animated.View
          style={[overlayAnimatedStyle, styles.overlay]}
        />
      )}

      {/* SideNav container */}
      <PanGestureHandler
        onHandlerStateChange={useCallback((event: PanGestureHandlerGestureEvent) => {
          if (event.nativeEvent.state === State.END && event.nativeEvent.translationX > 10) {
            onOutsidePress()
          }
        }, [onOutsidePress])}
      >
        <Animated.View
          style={[
            {
              width: `${validatedWidth}%`,
              left: position === 'left' ? 0 : undefined,
              right: position === 'right' ? 0 : undefined
            },
            animatedStyle as any,
            styles.sidebarContainer
          ]}
        >
          <View style={[styles.sidebar, { backgroundColor: bgColor }, paddingStyle]}>
            <SafeAreaView>
              {children}
            </SafeAreaView>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 40,
    backgroundColor: 'black',
  },
  touchableOverlay: {
    width: '100%',
    height: '100%',
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    flexDirection: 'row',
    zIndex: 50,
  },
  sidebar: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: '100%',
  },
})

export default SideNav
