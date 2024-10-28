"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var SideNav = function (_a) {
    var state = _a.state, toggle = _a.toggle, position = _a.position, _b = _a.widthPercentage, widthPercentage = _b === void 0 ? 50 : _b, _c = _a.overlay, overlay = _c === void 0 ? true : _c, _d = _a.overlayOpacity, overlayOpacity = _d === void 0 ? 50 : _d, _e = _a.animationDuration, animationDuration = _e === void 0 ? 200 : _e, _f = _a.bgColor, bgColor = _f === void 0 ? 'white' : _f, _g = _a.padding, padding = _g === void 0 ? 16 : _g, _h = _a.isTabs, isTabs = _h === void 0 ? false : _h, children = _a.children;
    // Retrieve safe area insets for consistent spacing
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var screenWidth = react_native_1.Dimensions.get('window').width;
    // Validate and constrain input values
    var validatedWidth = Math.min(Math.max(0, widthPercentage), 100);
    var validatedOverlayOpacity = overlay ? Math.min(Math.max(0, overlayOpacity), 100) : 0;
    var validatedDuration = Math.min(Math.max(100, animationDuration), 10000);
    /**
     * Helper function to process the padding prop and return style
     * - Takes padding input in multiple formats and returns a style object
     * - Adds extra bottom padding if `isTabs` is true, for compatibility with bottom tab navigators
     */
    var getPaddingStyle = function (padding) {
        var extraBottomPadding = isTabs ? insets.bottom * 1.5 : 0;
        if (typeof padding === 'number') {
            return { padding: padding, paddingBottom: padding + extraBottomPadding };
        }
        else if (padding.length === 2) {
            var vertical = padding[0], horizontal = padding[1];
            return { paddingVertical: vertical, paddingHorizontal: horizontal, paddingBottom: vertical + extraBottomPadding };
        }
        else if (padding.length === 4) {
            var top_1 = padding[0], right = padding[1], bottom = padding[2], left = padding[3];
            return { paddingTop: top_1, paddingRight: right, paddingBottom: bottom + extraBottomPadding, paddingLeft: left };
        }
        return {};
    };
    var paddingStyle = getPaddingStyle(padding);
    /**
     * Defines the animated style for the SideNav container
     * - Manages both position-based translation and fade effects
     * - When closed, opacity animation is delayed to allow slide-out to complete
     */
    // @ts-ignore
    var animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        var translateXValue = position === 'left'
            ? (0, react_native_reanimated_1.withTiming)(state ? 0 : -screenWidth * (validatedWidth / 100), { duration: validatedDuration })
            : (0, react_native_reanimated_1.withTiming)(state ? 0 : screenWidth * (validatedWidth / 100), { duration: validatedDuration });
        return {
            transform: [{ translateX: translateXValue }],
            opacity: state
                ? (0, react_native_reanimated_1.withTiming)(1, { duration: 0 })
                : (0, react_native_reanimated_1.withDelay)(validatedDuration, (0, react_native_reanimated_1.withTiming)(0, { duration: validatedDuration })),
            pointerEvents: state ? 'auto' : 'none',
        };
    }, [state, validatedDuration, validatedWidth, position]);
    /**
     * Overlay animation style
     * - Controls fade in/out effect for the overlay based on SideNav state
     */
    var overlayAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        opacity: (0, react_native_reanimated_1.withTiming)(state ? validatedOverlayOpacity / 100 : 0, { duration: validatedDuration }),
        pointerEvents: state ? 'auto' : 'none'
    }); }, [state, validatedOverlayOpacity, validatedDuration]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        overlay && (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [overlayAnimatedStyle, styles.overlay] },
            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: toggle, style: styles.touchableOverlay }))),
        react_1.default.createElement(react_native_gesture_handler_1.PanGestureHandler, { onHandlerStateChange: (0, react_1.useCallback)(function (event) {
                if (event.nativeEvent.state === react_native_gesture_handler_1.State.END && event.nativeEvent.translationX > 10) {
                    toggle();
                }
            }, [toggle]) },
            react_1.default.createElement(react_native_reanimated_1.default.View, { style: [
                    {
                        width: "".concat(validatedWidth, "%"),
                        left: position === 'left' ? 0 : undefined,
                        right: position === 'right' ? 0 : undefined
                    },
                    animatedStyle,
                    styles.sidebarContainer
                ] },
                react_1.default.createElement(react_native_1.View, { style: [styles.sidebar, { backgroundColor: bgColor }, paddingStyle] },
                    react_1.default.createElement(react_native_safe_area_context_1.SafeAreaView, null, children))))));
};
var styles = react_native_1.StyleSheet.create({
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
});
exports.default = SideNav;
//# sourceMappingURL=SideNav.js.map