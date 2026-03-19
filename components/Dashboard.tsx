import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { TrendingUp, Sparkles, Users, Cloud, ArrowRight, Heart, Plus } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const isDesktop = width >= 768;

export const Dashboard: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={styles.scrollContent}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={[styles.badge, isDark && styles.badgeDark]}>
          <Text style={[styles.badgeText, isDark && styles.textDark]}>Curator Pro</Text>
        </View>
        <Text style={[styles.heroTitle, isDark && styles.textDark]}>Good morning, Alex.</Text>
        <Text style={[styles.heroSubtitle, isDark && styles.textMutedDark]}>
          Your collection grew by 12% this week. Here's your overview.
        </Text>
      </View>

      {/* Bento Grid Widgets */}
      <View style={styles.grid}>
        {/* Large Stats Widget */}
        <View style={[styles.card, styles.largeCard, isDark && styles.cardDark]}>
          <View>
            <Text style={[styles.cardLabel, isDark && styles.textMutedDark]}>Engagement Rate</Text>
            <Text style={[styles.largeValue, isDark && styles.textDark]}>84.2%</Text>
            <View style={styles.trendContainer}>
              <TrendingUp size={16} color="#10b981" />
              <Text style={styles.trendText}>+5.4% from last month</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Full Report</Text>
            <ArrowRight size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.smallCardsRow}>
          {/* Small Widget 1 */}
          <View style={[styles.card, styles.smallCard, styles.borderLeft, isDark && styles.cardDark, isDark && styles.borderLeftDark]}>
            <Sparkles size={24} color={isDark ? "#ffffff" : "#222353"} />
            <Text style={[styles.cardLabel, isDark && styles.textMutedDark]}>New Curation</Text>
            <Text style={[styles.smallValue, isDark && styles.textDark]}>248 items</Text>
          </View>

          {/* Small Widget 2 */}
          <View style={[styles.card, styles.smallCard, styles.centered, isDark && styles.cardDark]}>
            <View style={[styles.iconCircle, isDark && styles.iconCircleDark]}>
              <Users size={20} color={isDark ? "#ffffff" : "#222353"} />
            </View>
            <Text style={[styles.smallValue, isDark && styles.textDark]}>1.2k</Text>
            <Text style={[styles.cardLabel, isDark && styles.textMutedDark]}>Followers</Text>
          </View>
        </View>

        {/* Small Widget 3 */}
        <View style={[styles.card, styles.syncCard]}>
          <View>
            <Text style={styles.syncTitle}>Cloud Sync Active</Text>
            <Text style={styles.syncSubtitle}>Last backup 2 mins ago</Text>
          </View>
          <Cloud size={32} color="#ffffff" />
        </View>
      </View>

      {/* Featured Collections */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Featured Collections</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, isDark && styles.textDark]}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.featuredGrid}>
          {/* Featured Card 1 */}
          <TouchableOpacity style={[styles.featuredCard, isDark && styles.cardDark]}>
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop" }}
                style={styles.featuredImage}
              />
              <View style={styles.heartButton}>
                <Heart size={20} color="#ffffff" />
              </View>
            </View>
            <View style={styles.featuredContent}>
              <Text style={[styles.featuredTitle, isDark && styles.textDark]}>The Minimalist Ether</Text>
              <Text style={[styles.featuredDescription, isDark && styles.textMutedDark]}>
                Exploring the intersections of deep indigo textures and structural whitespace in modern digital design.
              </Text>
              <View style={styles.curatorsRow}>
                <View style={styles.avatarStack}>
                  {[1, 2, 3].map((i) => (
                    <Image 
                      key={i}
                      source={{ uri: `https://i.pravatar.cc/100?img=${i+10}` }}
                      style={[styles.stackAvatar, { marginLeft: i === 1 ? 0 : -10 }, isDark && styles.stackAvatarDark]}
                    />
                  ))}
                </View>
                <Text style={[styles.curatorsText, isDark && styles.textMutedDark]}>+14 curators joined</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={32} color="#ffffff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  heroSection: {
    marginBottom: 32,
    gap: 8,
  },
  badge: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#222353',
  },
  heroTitle: {
    fontFamily: 'Manrope',
    fontSize: 32,
    fontWeight: '800',
    color: '#222353',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#464652',
  },
  grid: {
    gap: 16,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  largeCard: {
    minHeight: 200,
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
    marginBottom: 8,
  },
  largeValue: {
    fontFamily: 'Manrope',
    fontSize: 48,
    fontWeight: '800',
    color: '#222353',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  trendText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#222353',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginTop: 24,
  },
  reportButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  smallCardsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  smallCard: {
    flex: 1,
    padding: 20,
  },
  borderLeft: {
    borderLeftWidth: 4,
    borderLeftColor: '#222353',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  smallValue: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    color: '#222353',
  },
  syncCard: {
    backgroundColor: '#222353',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  syncTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  syncSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    color: '#222353',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222353',
    textDecorationLine: 'underline',
  },
  featuredGrid: {
    gap: 24,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  imageWrapper: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 999,
  },
  featuredContent: {
    padding: 24,
  },
  featuredTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  featuredDescription: {
    fontSize: 14,
    color: '#464652',
    marginTop: 8,
    lineHeight: 20,
  },
  curatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 12,
  },
  avatarStack: {
    flexDirection: 'row',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  curatorsText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#222353',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  badgeDark: {
    backgroundColor: '#334155',
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
  borderLeftDark: {
    borderLeftColor: '#ffffff',
  },
  iconCircleDark: {
    backgroundColor: '#334155',
  },
  stackAvatarDark: {
    borderColor: '#1e293b',
  },
});
