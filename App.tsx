import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStoreProvider } from './store';
import AppContent from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <AppContent />
      </AppStoreProvider>
    </SafeAreaProvider>
  );
}
