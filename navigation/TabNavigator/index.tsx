import React from 'react';
import { ScrollView } from 'react-native';
import {
    Dashboard,
    Profile,
    Settings,
    Reports,
    Analytics,
    Notifications
} from '../../screens';
import styles from './style';

interface TabNavigatorProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({
    activeTab,
    setActiveTab,
    onLogout
}) => {
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'reports':
                return <Reports />;
            case 'profile':
                return <Profile onLogout={onLogout} />;
            case 'settings':
                return <Settings />;
            case 'analytics':
                return <Analytics />;
            case 'notifications':
                return <Notifications onBack={() => setActiveTab('dashboard')} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {renderContent()}
        </ScrollView>
    );
};

export default TabNavigator;
