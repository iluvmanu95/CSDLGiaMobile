import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { ShieldCheck, EyeOff, ShieldAlert, Globe, ChevronRight, ChevronDown, Trash2, Moon } from 'lucide-react-native';
import { useTheme, ThemeMode } from '../context/ThemeContext';

export const Settings: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  const themeOptions: { label: string; value: ThemeMode }[] = [
    { label: 'LIGHT', value: 'light' },
    { label: 'DARK', value: 'dark' },
    { label: 'SYSTEM', value: 'system' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={[styles.title, isDark && styles.textDark]}>Personalize Your Experience</Text>
        <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>Manage your account preferences, security, and interface appearance.</Text>
      </View>

      <View style={styles.grid}>
        {/* Account Section */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.cardHeader}>
            <View>
              <View style={[styles.badge, isDark && styles.badgeDark]}>
                <Text style={[styles.badgeText, isDark && styles.textDark]}>IDENTITY</Text>
              </View>
              <Text style={[styles.cardTitle, isDark && styles.textDark]}>Account Details</Text>
            </View>
            <TouchableOpacity style={[styles.editButton, isDark && styles.editButtonDark]}>
              <Text style={[styles.editButtonText, isDark && styles.textDark]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>EMAIL ADDRESS</Text>
              <Text style={[styles.detailValue, isDark && styles.textDark]}>alex.rivera@curator.io</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>JOINED</Text>
              <Text style={[styles.detailValue, isDark && styles.textDark]}>October 2023</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>SUBSCRIPTION</Text>
              <Text style={[styles.detailValue, isDark ? styles.textDark : { color: '#222353' }, { fontWeight: '800' }]}>Premium Annual</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>TIMEZONE</Text>
              <Text style={[styles.detailValue, isDark && styles.textDark]}>PST (UTC -8)</Text>
            </View>
          </View>
        </View>

        {/* Theme Toggle Card */}
        <View style={[styles.card, styles.themeCard]}>
          <View>
            <Moon size={32} color="#ffffff" style={styles.cardIcon} />
            <Text style={styles.themeCardTitle}>Interface</Text>
            <Text style={styles.themeCardSubtitle}>Choose between light, dark, or system default appearance.</Text>
          </View>
          <View style={styles.themeToggleContainer}>
            {themeOptions.map((option) => (
              <TouchableOpacity 
                key={option.value}
                onPress={() => setTheme(option.value)}
                style={[styles.themeOption, theme === option.value && styles.activeThemeOption]}
              >
                <Text style={[styles.themeOptionText, theme === option.value && styles.activeThemeOptionText]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, isDark && styles.textMutedDark]}>PRIVACY & SECURITY</Text>
          <View style={[styles.listContainer, isDark && styles.cardDark, isDark && styles.borderDark]}>
            {/* Privacy Item */}
            <TouchableOpacity style={[styles.listItem, isDark && styles.borderDark]}>
              <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                  <EyeOff size={20} color={isDark ? "#ffffff" : "#222353"} />
                </View>
                <View>
                  <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Privacy Profile</Text>
                  <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>Manage who can see your curated collections</Text>
                </View>
              </View>
              <ChevronRight size={20} color={isDark ? "#94a3b8" : "#464652"} />
            </TouchableOpacity>
            
            {/* Security Item */}
            <TouchableOpacity style={[styles.listItem, isDark && styles.borderDark]}>
              <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                  <ShieldAlert size={20} color={isDark ? "#ffffff" : "#222353"} />
                </View>
                <View>
                  <Text style={[styles.listItemTitle, isDark && styles.textDark]}>Two-Factor Authentication</Text>
                  <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>Secure your account with 2FA protection</Text>
                </View>
              </View>
              <View style={styles.listItemRight}>
                <View style={[styles.statusBadge, isDark && styles.iconContainerDark]}>
                  <Text style={[styles.statusBadgeText, isDark && styles.textMutedDark]}>INACTIVE</Text>
                </View>
                <ChevronRight size={20} color={isDark ? "#94a3b8" : "#464652"} />
              </View>
            </TouchableOpacity>

            {/* Language Item */}
            <TouchableOpacity style={[styles.listItem, { borderBottomWidth: 0 }]}>
              <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                  <Globe size={20} color={isDark ? "#ffffff" : "#222353"} />
                </View>
                <View>
                  <Text style={[styles.listItemTitle, isDark && styles.textDark]}>App Language</Text>
                  <Text style={[styles.listItemSubtitle, isDark && styles.textMutedDark]}>Current: English (United States)</Text>
                </View>
              </View>
              <ChevronDown size={20} color={isDark ? "#94a3b8" : "#464652"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dangerous Zone Section */}
        <View style={[styles.dangerZone, isDark && styles.dangerZoneDark]}>
          <View style={styles.dangerZoneText}>
            <Text style={styles.dangerTitle}>Danger Zone</Text>
            <Text style={[styles.dangerSubtitle, isDark && styles.textMutedDark]}>Permanently delete your account and all associated data.</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Trash2 size={16} color="#ba1a1a" />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222353',
    marginBottom: 8,
    fontFamily: 'Manrope',
  },
  subtitle: {
    fontSize: 14,
    color: '#464652',
    fontFamily: 'Manrope',
  },
  grid: {
    gap: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: 'rgba(34, 35, 83, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#222353',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  editButton: {
    backgroundColor: '#222353',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  detailItem: {
    width: '45%',
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#464652',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#222353',
    fontWeight: '500',
  },
  themeCard: {
    backgroundColor: '#222353',
    aspectRatio: 1,
    justifyContent: 'space-between',
  },
  cardIcon: {
    marginBottom: 16,
  },
  themeCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  themeCardSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    borderRadius: 100,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 100,
  },
  activeThemeOption: {
    backgroundColor: '#ffffff',
  },
  themeOptionText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeThemeOptionText: {
    color: '#222353',
  },
  section: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#464652',
    letterSpacing: 2,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222353',
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#464652',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#464652',
  },
  dangerZone: {
    marginTop: 16,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(186, 26, 26, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(186, 26, 26, 0.1)',
    borderStyle: 'dashed',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  dangerZoneText: {
    flex: 1,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ba1a1a',
    marginBottom: 4,
  },
  dangerSubtitle: {
    fontSize: 13,
    color: '#464652',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ba1a1a',
  },
  deleteButtonText: {
    color: '#ba1a1a',
    fontSize: 13,
    fontWeight: '700',
  },
  textDark: {
    color: '#ffffff',
  },
  textMutedDark: {
    color: '#94a3b8',
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  editButtonDark: {
    backgroundColor: '#334155',
  },
  borderDark: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainerDark: {
    backgroundColor: '#334155',
  },
  dangerZoneDark: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    borderColor: 'rgba(186, 26, 26, 0.2)',
  },
});
