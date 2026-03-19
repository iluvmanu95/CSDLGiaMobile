import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, Share2, MapPin, Link as LinkIcon, Calendar, Heart, PlusCircle, Grid, Bookmark } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export const Profile: React.FC = () => {
  const { isDark } = useTheme();
  const stats = [
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '840' },
    { label: 'Collections', value: '42' },
  ];

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={styles.scrollContent}>
      {/* Hero Profile Section */}
      <View style={styles.heroSection}>
        {/* Cover Image */}
        <View style={[styles.coverContainer, isDark && styles.coverContainerDark]}>
          <Image 
            style={styles.coverImage} 
            source={{ uri: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop" }}
          />
        </View>
        
        {/* Profile Info Overlay */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarRow}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarWrapper, isDark && styles.avatarWrapperDark]}>
                <Image 
                  style={styles.avatar} 
                  source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop" }}
                />
              </View>
              <TouchableOpacity style={[styles.cameraButton, isDark && styles.cameraButtonDark]}>
                <Camera size={18} color={isDark ? "#ffffff" : "#222353"} />
              </TouchableOpacity>
            </View>
            
            {/* Actions */}
            <View style={styles.headerActions}>
              <TouchableOpacity style={[styles.editButton, isDark && styles.editButtonDark]}>
                <Text style={[styles.editButtonText, isDark && styles.textDark]}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.shareButton, isDark && styles.shareButtonDark]}>
                <Share2 size={20} color={isDark ? "#ffffff" : "#222353"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Identity */}
          <View style={styles.identityContainer}>
            <Text style={[styles.name, isDark && styles.textDark]}>Alex Rivera</Text>
            <View style={styles.roleRow}>
              <Text style={[styles.roleText, isDark && styles.textMutedDark]}>Premium Curator</Text>
              <View style={styles.dot} />
              <Text style={[styles.roleText, isDark && styles.textMutedDark]}>Creative Director</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        {/* About Card */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDark]}>About</Text>
          <Text style={[styles.bioText, isDark && styles.textMutedDark]}>
            Digital curator and visual storyteller based in San Francisco. Passionate about minimalist architecture, editorial design, and the intersection of technology and art.
          </Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MapPin size={18} color={isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(34, 35, 83, 0.6)"} />
              <Text style={[styles.metaText, isDark && styles.textDark]}>San Francisco, CA</Text>
            </View>
            <View style={styles.metaItem}>
              <LinkIcon size={18} color={isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(34, 35, 83, 0.6)"} />
              <Text style={[styles.metaText, styles.linkText, isDark && styles.textDark]}>alexrivera.curator.com</Text>
            </View>
            <View style={styles.metaItem}>
              <Calendar size={18} color={isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(34, 35, 83, 0.6)"} />
              <Text style={[styles.metaText, isDark && styles.textDark]}>Joined March 2021</Text>
            </View>
          </View>

          <View style={[styles.statsRow, isDark && styles.borderDark]}>
            {stats.map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, isDark && styles.textDark]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>{stat.label}</Text>
                </View>
                {idx < stats.length - 1 && <View style={[styles.statDivider, isDark && styles.dividerDark]} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabs, isDark && styles.borderDark]}>
          {['Collections', 'Activity', 'Saved'].map((tab, i) => (
            <TouchableOpacity key={tab} style={[styles.tab, i === 0 && (isDark ? styles.activeTabDark : styles.activeTab)]}>
              <Text style={[styles.tabText, i === 0 && (isDark ? styles.activeTabTextDark : styles.activeTabText)]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Collections Grid */}
        <View style={styles.collectionsGrid}>
          <TouchableOpacity style={[styles.collectionCard, isDark && styles.cardDark]}>
            <View style={styles.collectionImageWrapper}>
              <Image 
                style={styles.collectionImage} 
                source={{ uri: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop" }}
              />
              <View style={styles.editorBadge}>
                <Text style={styles.editorBadgeText}>Editor's Choice</Text>
              </View>
            </View>
            <View style={styles.collectionInfo}>
              <Text style={[styles.collectionTitle, isDark && styles.textDark]}>Bauhaus Resonance</Text>
              <Text style={[styles.collectionDesc, isDark && styles.textMutedDark]} numberOfLines={2}>
                A curation of objects and spaces that embody the timeless principles of the Bauhaus movement.
              </Text>
              <View style={styles.collectionFooter}>
                <View style={styles.avatarStack}>
                  {[1, 2, 3].map(i => (
                    <Image 
                      key={i}
                      source={{ uri: `https://i.pravatar.cc/100?img=${i+20}` }}
                      style={[styles.stackAvatar, { marginLeft: i === 1 ? 0 : -10 }, isDark && styles.stackAvatarDark]}
                    />
                  ))}
                  <View style={[styles.moreAvatars, isDark && styles.moreAvatarsDark]}>
                    <Text style={[styles.moreAvatarsText, isDark && styles.textDark]}>+12</Text>
                  </View>
                </View>
                <Text style={[styles.collectionMeta, isDark && styles.textMutedDark]}>24 Items • 2d ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    position: 'relative',
  },
  coverContainer: {
    height: 200,
    width: '100%',
    backgroundColor: '#e2e8f0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  profileHeader: {
    paddingHorizontal: 24,
    marginTop: -60,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarWrapper: {
    height: 120,
    width: 120,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#222353',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 999,
  },
  identityContainer: {
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: '800',
    color: '#222353',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f59e0b',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  card: {
    backgroundColor: '#f8fafc',
    padding: 24,
    borderRadius: 32,
    gap: 16,
  },
  cardTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#222353',
  },
  bioText: {
    fontSize: 14,
    color: '#464652',
    lineHeight: 22,
  },
  metaContainer: {
    gap: 12,
    paddingVertical: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaText: {
    fontSize: 14,
    color: '#222353',
  },
  linkText: {
    fontWeight: '600',
    color: '#222353',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222353',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: 4,
  },
  tab: {
    paddingBottom: 12,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#222353',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#222353',
  },
  collectionsGrid: {
    gap: 24,
  },
  collectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  collectionImageWrapper: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  editorBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  editorBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  collectionInfo: {
    padding: 24,
  },
  collectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#222353',
  },
  collectionDesc: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 20,
  },
  collectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  moreAvatars: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  moreAvatarsText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#222353',
  },
  collectionMeta: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  coverContainerDark: {
    backgroundColor: '#1e293b',
  },
  avatarWrapperDark: {
    borderColor: '#1e293b',
    backgroundColor: '#1e293b',
  },
  cameraButtonDark: {
    backgroundColor: '#334155',
  },
  editButtonDark: {
    backgroundColor: '#ffffff',
  },
  shareButtonDark: {
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
  borderDark: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTabDark: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
  },
  activeTabTextDark: {
    color: '#ffffff',
  },
  stackAvatarDark: {
    borderColor: '#1e293b',
  },
  moreAvatarsDark: {
    backgroundColor: '#334155',
    borderColor: '#1e293b',
  },
});
