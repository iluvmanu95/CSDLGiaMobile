import React from 'react';
import { useAuth } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { TabNavigator } from './TabNavigator';

export default function AppContent() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <AuthNavigator />;
    }

    return <MainNavigator />;
}

export {
    AuthNavigator,
    MainNavigator,
    DrawerNavigator,
    TabNavigator,
};