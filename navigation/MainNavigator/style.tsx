import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    layout: {
        flex: 1,
        flexDirection: 'row',
    },
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    pushOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'transparent',
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
});

export default styles;
