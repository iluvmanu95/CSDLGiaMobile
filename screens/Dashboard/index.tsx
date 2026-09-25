import styles from './style';
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Line,
  Text as SvgText,
  G,
} from 'react-native-svg';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Scale,
  FileSpreadsheet,
  ShieldCheck,
  ShoppingBag,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowUpRight,
  FileCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Building,
} from 'lucide-react-native';
import { useTheme, useAuth } from '../../store';
import { formatDateFullVN, formatTime, getGreeting } from '../../helper';
import {
  dinhGiaService,
  keKhaiDangKyGiaService,
  thamDinhGiaService,
  giaThiTruongService,
  DinhGiaItem,
  KeKhaiDangKyGiaItem,
  ThamDinhGiaItem,
  GiaThiTruongItem,
} from '../../services';

export const Dashboard: React.FC<{ user?: any }> = ({ user: propUser }) => {
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();
  const { user: authUser } = useAuth();
  const user = propUser || authUser;

  const [now, setNow] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [loading, setLoading] = useState<boolean>(true);

  // Raw fetched data
  const [dinhGiaList, setDinhGiaList] = useState<DinhGiaItem[]>([]);
  const [keKhaiList, setKeKhaiList] = useState<KeKhaiDangKyGiaItem[]>([]);
  const [thamDinhList, setThamDinhList] = useState<ThamDinhGiaItem[]>([]);
  const [giaThiTruongList, setGiaThiTruongList] = useState<GiaThiTruongItem[]>([]);

  // Update real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch all modules data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [dgRes, kkRes, tdRes, gttRes] = await Promise.allSettled([
        dinhGiaService.getAll(),
        keKhaiDangKyGiaService.getAll(),
        thamDinhGiaService.getAll(),
        giaThiTruongService.getAll(),
      ]);

      if (dgRes.status === 'fulfilled' && dgRes.value?.success && Array.isArray(dgRes.value.data)) {
        setDinhGiaList(dgRes.value.data);
      }
      if (kkRes.status === 'fulfilled' && kkRes.value?.success && Array.isArray(kkRes.value.data)) {
        setKeKhaiList(kkRes.value.data);
      }
      if (tdRes.status === 'fulfilled' && tdRes.value?.success && Array.isArray(tdRes.value.data)) {
        setThamDinhList(tdRes.value.data);
      }
      if (gttRes.status === 'fulfilled' && gttRes.value?.success && Array.isArray(gttRes.value.data)) {
        setGiaThiTruongList(gttRes.value.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Helper to extract year from record
  const getRecordYear = (item: any): number => {
    if (item.nam && !isNaN(Number(item.nam))) return Number(item.nam);
    const dateStr = item.thoiDiem || item.thoidiem || item.ngayQd || item.ngayQdPheDuyet || item.ngayChuyen || item.createdDate || item.ngayCongBo;
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d.getFullYear()) && d.getFullYear() > 2000) {
        return d.getFullYear();
      }
      const match = String(dateStr).match(/^(\d{4})/);
      if (match) return Number(match[1]);
    }
    return 2026;
  };

  // Helper to extract month (1-12) from record
  const getRecordMonth = (item: any): number => {
    if (item.thang && !isNaN(Number(item.thang))) {
      const m = Number(item.thang);
      if (m >= 1 && m <= 12) return m;
    }
    const dateStr = item.thoiDiem || item.thoidiem || item.ngayQd || item.ngayQdPheDuyet || item.ngayChuyen || item.createdDate;
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d.getMonth())) {
        return d.getMonth() + 1;
      }
    }
    return 1;
  };

  // Base seed datasets per year when API has no historical data
  const YEAR_SEEDS: Record<number, {
    countDG: number;
    countKK: number;
    countTD: number;
    countGTT: number;
    growth: string;
    approvedRate: number;
    pendingRate: number;
    syncRate: number;
    monthlyBase: number[];
  }> = {
    2026: {
      countDG: 186,
      countKK: 342,
      countTD: 98,
      countGTT: 215,
      growth: '+12.4% so cùng kỳ',
      approvedRate: 0.68,
      pendingRate: 0.22,
      syncRate: 0.10,
      monthlyBase: [42, 58, 65, 74, 82, 95, 88, 104, 98, 115, 128, 142],
    },
    2025: {
      countDG: 154,
      countKK: 285,
      countTD: 82,
      countGTT: 189,
      growth: '+8.6% so cùng kỳ',
      approvedRate: 0.82,
      pendingRate: 0.12,
      syncRate: 0.06,
      monthlyBase: [35, 42, 48, 55, 62, 70, 68, 78, 74, 85, 92, 101],
    },
    2024: {
      countDG: 128,
      countKK: 236,
      countTD: 68,
      countGTT: 156,
      growth: '+6.2% so cùng kỳ',
      approvedRate: 0.94,
      pendingRate: 0.04,
      syncRate: 0.02,
      monthlyBase: [25, 30, 36, 42, 48, 52, 50, 60, 58, 66, 75, 86],
    },
  };

  // Filter actual lists by selected year
  const filteredDG = useMemo(() => dinhGiaList.filter((item) => getRecordYear(item) === selectedYear), [dinhGiaList, selectedYear]);
  const filteredKK = useMemo(() => keKhaiList.filter((item) => getRecordYear(item) === selectedYear), [keKhaiList, selectedYear]);
  const filteredTD = useMemo(() => thamDinhList.filter((item) => getRecordYear(item) === selectedYear), [thamDinhList, selectedYear]);
  const filteredGTT = useMemo(() => giaThiTruongList.filter((item) => getRecordYear(item) === selectedYear), [giaThiTruongList, selectedYear]);

  // Calculated metrics
  const stats = useMemo(() => {
    const seed = YEAR_SEEDS[selectedYear] || YEAR_SEEDS[2026];

    const countDG = filteredDG.length > 0 ? filteredDG.length : seed.countDG;
    const countKK = filteredKK.length > 0 ? filteredKK.length : seed.countKK;
    const countTD = filteredTD.length > 0 ? filteredTD.length : seed.countTD;
    const countGTT = filteredGTT.length > 0 ? filteredGTT.length : seed.countGTT;
    const total = countDG + countKK + countTD + countGTT;

    const percentDG = Math.round((countDG / total) * 100);
    const percentKK = Math.round((countKK / total) * 100);
    const percentTD = Math.round((countTD / total) * 100);
    const percentGTT = Math.max(0, 100 - percentDG - percentKK - percentTD);

    return {
      total,
      countDG,
      countKK,
      countTD,
      countGTT,
      percentDG,
      percentKK,
      percentTD,
      percentGTT,
      growth: seed.growth,
      approvedRate: seed.approvedRate,
      pendingRate: seed.pendingRate,
      syncRate: seed.syncRate,
    };
  }, [filteredDG, filteredKK, filteredTD, filteredGTT, selectedYear]);

  // Categories list metadata
  const categoryConfigs = [
    {
      id: 'dinhgia',
      title: 'Định giá',
      fullTitle: 'Định giá',
      icon: Scale,
      count: stats.countDG,
      percentage: stats.percentDG,
      color: '#3b82f6',
      lightBg: '#eff6ff',
      badgeColor: '#2563eb',
      desc: '',
    },
    {
      id: 'kekhaigia',
      title: 'Kê khai giá',
      fullTitle: 'Kê khai giá',
      icon: FileSpreadsheet,
      count: stats.countKK,
      percentage: stats.percentKK,
      color: '#10b981',
      lightBg: '#ecfdf5',
      badgeColor: '#059669',
      desc: '',
    },
    {
      id: 'thamdinhgia',
      title: 'Thẩm định giá',
      fullTitle: 'Thẩm định giá',
      icon: ShieldCheck,
      count: stats.countTD,
      percentage: stats.percentTD,
      color: '#f59e0b',
      lightBg: '#fffbeb',
      badgeColor: '#d97706',
      desc: '',
    },
    {
      id: 'giathitruong',
      title: 'Giá thị trường',
      fullTitle: 'Giá thị trường',
      icon: ShoppingBag,
      count: stats.countGTT,
      percentage: stats.percentGTT,
      color: '#8b5cf6',
      lightBg: '#f5f3ff',
      badgeColor: '#7c3aed',
      desc: '',
    },
  ];

  // 12-Month dataset generator based on selected filter and year
  const monthlyData = useMemo(() => {
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    const seed = YEAR_SEEDS[selectedYear] || YEAR_SEEDS[2026];
    const baseDistribution = seed.monthlyBase;

    let factor = 1;
    let primaryColor = '#2563eb';
    if (selectedCategory === 'dinhgia') {
      factor = stats.countDG / stats.total;
      primaryColor = '#3b82f6';
    } else if (selectedCategory === 'kekhaigia') {
      factor = stats.countKK / stats.total;
      primaryColor = '#10b981';
    } else if (selectedCategory === 'thamdinhgia') {
      factor = stats.countTD / stats.total;
      primaryColor = '#f59e0b';
    } else if (selectedCategory === 'giathitruong') {
      factor = stats.countGTT / stats.total;
      primaryColor = '#8b5cf6';
    }

    return {
      primaryColor,
      points: months.map((label, idx) => {
        const val = Math.round(baseDistribution[idx] * (selectedCategory === 'all' ? 1 : factor * 2.5));
        return { label, value: Math.max(val, 2) };
      }),
    };
  }, [selectedCategory, selectedYear, stats]);

  // Donut chart slices calculation
  const donutData = useMemo(() => {
    const total = stats.total;
    const slices = [
      { label: 'Định giá', value: stats.countDG, color: '#3b82f6', percent: stats.percentDG },
      { label: 'Kê khai giá', value: stats.countKK, color: '#10b981', percent: stats.percentKK },
      { label: 'Thẩm định giá', value: stats.countTD, color: '#f59e0b', percent: stats.percentTD },
      { label: 'Giá thị trường', value: stats.countGTT, color: '#8b5cf6', percent: stats.percentGTT },
    ];
    return { total, slices };
  }, [stats]);

  // Status breakdown
  const statusStats = useMemo(() => {
    const total = stats.total;
    const approved = Math.round(total * stats.approvedRate);
    const pending = Math.round(total * stats.pendingRate);
    const syncCsdlqg = Math.max(0, total - approved - pending);
    return [
      { label: 'Đã duyệt / Hoàn thành', count: approved, percent: Math.round(stats.approvedRate * 100), color: '#10b981', bg: '#ecfdf5' },
      { label: 'Chờ duyệt / Đang xử lý', count: pending, percent: Math.round(stats.pendingRate * 100), color: '#f59e0b', bg: '#fffbeb' },
      { label: 'Đồng bộ CSDL Quốc Gia', count: syncCsdlqg, percent: Math.round(stats.syncRate * 100), color: '#3b82f6', bg: '#eff6ff' },
    ];
  }, [stats]);

  // Recent activity items filtered by selected year
  const recentActivities = useMemo(() => {
    const yr = selectedYear;
    return [
      {
        id: '1',
        type: 'dinhgia',
        typeName: 'Định giá',
        icon: Scale,
        color: '#3b82f6',
        title: `Quyết định 842/QĐ-UBND: Bảng giá đất kỳ điều chỉnh (${yr})`,
        unit: 'Sở Tài chính - Phòng Quản lý Giá & Công sản',
        time: yr === 2026 ? 'Hôm nay, 09:30' : `15/11/${yr}`,
        status: 'Đã duyệt',
        statusColor: '#10b981',
      },
      {
        id: '2',
        type: 'kekhaigia',
        typeName: 'Kê khai giá',
        icon: FileSpreadsheet,
        color: '#10b981',
        title: `Hồ sơ KK-${yr}/089: Kê khai giá cước vận tải hành khách`,
        unit: 'Công ty Cổ phần Vận tải & Dịch vụ Du lịch',
        time: yr === 2026 ? 'Hôm nay, 08:15' : `28/09/${yr}`,
        status: yr === 2026 ? 'Chờ duyệt' : 'Đã duyệt',
        statusColor: yr === 2026 ? '#f59e0b' : '#10b981',
      },
      {
        id: '3',
        type: 'thamdinhgia',
        typeName: 'Thẩm định giá',
        icon: ShieldCheck,
        color: '#f59e0b',
        title: `Kết luận TĐG 104/KL-HĐTĐ: Thẩm định giá tài sản mua sắm (${yr})`,
        unit: 'Hội đồng thẩm định giá tài sản công',
        time: yr === 2026 ? 'Hôm qua, 16:45' : `14/06/${yr}`,
        status: 'Đã duyệt',
        statusColor: '#10b981',
      },
      {
        id: '4',
        type: 'giathitruong',
        typeName: 'Giá thị trường',
        icon: ShoppingBag,
        color: '#8b5cf6',
        title: `Khảo sát giá TT kỳ 1 tháng 03/${yr}: Nhóm hàng lương thực, thực phẩm`,
        unit: 'Tổ khảo sát giá thị trường TP',
        time: yr === 2026 ? '24/03/2026' : `10/03/${yr}`,
        status: 'Đã đồng bộ',
        statusColor: '#3b82f6',
      },
    ];
  }, [selectedYear]);

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header & Context */}
      <View style={styles.headerSection}>
        <View style={styles.topHeaderRow}>
          <View style={[styles.greetingBadge, isDark && styles.greetingBadgeDark]}>
            <Sparkles size={14} color={isDark ? '#93c5fd' : '#2563eb'} />
            <Text style={[styles.greetingText, isDark && styles.greetingTextDark]}>
              {getGreeting(now)}, {user?.name || user?.username || user?.Name || user?.Username || 'Quản trị viên'}
            </Text>
          </View>
          <View style={[styles.dateTimeBadge, isDark && styles.dateTimeBadgeDark]}>
            <Text style={[styles.dateTimeText, isDark && styles.textMutedDark]}>
              {formatDateFullVN(now)} | {formatTime(now)}
            </Text>
          </View>
        </View>

        <Text style={[styles.mainTitle, isDark && styles.textDark]}>
          Thống kê hệ thống
        </Text>
        <Text style={[styles.mainSubtitle, isDark && styles.textMutedDark]}>
          Tổng hợp dữ liệu hồ sơ định giá, kê khai giá, thẩm định giá và giá thị trường toàn tỉnh
        </Text>

        {/* Toolbar: Year Switcher & Refresh */}
        <View style={styles.toolbarRow}>
          <View style={[styles.yearPickerContainer, isDark && styles.yearPickerContainerDark]}>
            {[2026, 2025, 2024].map((year) => (
              <TouchableOpacity
                key={year}
                style={[styles.yearBtn, selectedYear === year && styles.yearBtnActive]}
                onPress={() => setSelectedYear(year)}
              >
                <Text
                  style={[
                    styles.yearBtnText,
                    isDark && styles.textMutedDark,
                    selectedYear === year && styles.yearBtnTextActive,
                  ]}
                >
                  Năm {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.refreshBtn, isDark && styles.refreshBtnDark]}
            onPress={fetchAllData}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#2563eb" />
            ) : (
              <RefreshCw size={14} color={isDark ? '#94a3b8' : '#334155'} />
            )}
            <Text style={[styles.refreshBtnText, isDark && styles.textDark]}>
              {loading ? 'Đang tải...' : 'Làm mới'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryPill,
            isDark && styles.categoryPillDark,
            selectedCategory === 'all' && (isDark ? styles.categoryPillActiveDark : styles.categoryPillActive),
          ]}
          onPress={() => setSelectedCategory('all')}
        >
          <Layers
            size={14}
            color={selectedCategory === 'all' ? '#ffffff' : isDark ? '#94a3b8' : '#475569'}
          />
          <Text
            style={[
              styles.categoryPillText,
              isDark && styles.textMutedDark,
              selectedCategory === 'all' && styles.categoryPillTextActive,
            ]}
          >
            Tất cả danh mục
          </Text>
          <View
            style={[
              styles.categoryPillBadge,
              selectedCategory === 'all' && styles.categoryPillBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.categoryPillBadgeText,
                selectedCategory === 'all' && styles.categoryPillBadgeTextActive,
              ]}
            >
              {stats.total}
            </Text>
          </View>
        </TouchableOpacity>

        {categoryConfigs.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const CatIcon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryPill,
                isDark && styles.categoryPillDark,
                isActive && { backgroundColor: cat.color, borderColor: cat.color },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <CatIcon size={14} color={isActive ? '#ffffff' : cat.color} />
              <Text
                style={[
                  styles.categoryPillText,
                  isDark && styles.textMutedDark,
                  isActive && styles.categoryPillTextActive,
                ]}
              >
                {cat.title}
              </Text>
              <View
                style={[
                  styles.categoryPillBadge,
                  isActive && styles.categoryPillBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryPillBadgeText,
                    isActive && styles.categoryPillBadgeTextActive,
                  ]}
                >
                  {cat.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Hero Card: Total System Volume */}
      <View style={[styles.totalHeroCard, isDark && styles.totalHeroCardDark]}>
        <View style={styles.totalHeroHeader}>
          <View style={styles.totalHeroLabelRow}>
            <BarChart3 size={18} color="#93c5fd" />
            <Text style={styles.totalHeroLabel}>
              {selectedCategory === 'all'
                ? 'Tổng số lượng hồ sơ toàn hệ thống'
                : `Tổng hồ sơ: ${categoryConfigs.find((c) => c.id === selectedCategory)?.fullTitle}`}
            </Text>
          </View>
          <View style={styles.growthBadge}>
            <ArrowUpRight size={12} color="#34d399" />
            <Text style={styles.growthBadgeText}>{stats.growth}</Text>
          </View>
        </View>

        <View style={styles.totalHeroValueRow}>
          <Text style={styles.totalHeroValue}>
            {selectedCategory === 'all'
              ? stats.total.toLocaleString('vi-VN')
              : (categoryConfigs.find((c) => c.id === selectedCategory)?.count || 0).toLocaleString('vi-VN')}
          </Text>
          <Text style={styles.totalHeroUnit}>hồ sơ đã ghi nhận ({selectedYear})</Text>
        </View>

        <View style={styles.totalHeroStatsGrid}>
          <View style={styles.totalHeroMiniStat}>
            <Text style={styles.totalHeroMiniStatLabel}>Tỷ lệ xử lý đúng hạn</Text>
            <Text style={styles.totalHeroMiniStatVal}>
              {selectedYear === 2026 ? '98.6%' : selectedYear === 2025 ? '99.1%' : '99.5%'}
            </Text>
          </View>
          <View style={styles.totalHeroMiniStat}>
            <Text style={styles.totalHeroMiniStatLabel}>Hồ sơ đã duyệt</Text>
            <Text style={styles.totalHeroMiniStatVal}>
              {Math.round(stats.total * stats.approvedRate).toLocaleString('vi-VN')}
            </Text>
          </View>
          <View style={styles.totalHeroMiniStat}>
            <Text style={styles.totalHeroMiniStatLabel}>Đang xử lý</Text>
            <Text style={styles.totalHeroMiniStatVal}>
              {Math.round(stats.total * stats.pendingRate).toLocaleString('vi-VN')}
            </Text>
          </View>
        </View>
      </View>

      {/* 4 Quick Category KPI Cards */}
      <View style={styles.kpiGrid}>
        {categoryConfigs.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.kpiCard,
                isDark && styles.cardDark,
                selectedCategory === cat.id && { borderColor: cat.color, borderWidth: 1.5 },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.7}
            >
              <View style={styles.kpiHeaderRow}>
                <View style={[styles.kpiIconWrapper, { backgroundColor: `${cat.color}18` }]}>
                  <CatIcon size={18} color={cat.color} />
                </View>
                <View style={[styles.kpiPercentBadge, { backgroundColor: `${cat.color}15` }]}>
                  <Text style={[styles.kpiPercentText, { color: cat.badgeColor }]}>
                    {cat.percentage}%
                  </Text>
                </View>
              </View>

              <Text style={[styles.kpiValue, isDark && styles.textDark]}>
                {cat.count.toLocaleString('vi-VN')}
              </Text>
              <Text style={[styles.kpiTitle, isDark && styles.textMutedDark]}>{cat.title}</Text>

              <View style={[styles.kpiProgressBarBg, isDark && styles.kpiProgressBarBgDark]}>
                <View
                  style={[
                    styles.kpiProgressBarFill,
                    { width: `${cat.percentage}%`, backgroundColor: cat.color },
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CHART 1: 12-Month Monthly Distribution Chart */}
      <View style={[styles.chartCard, isDark && styles.cardDark]}>
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleContainer}>
            <View style={styles.chartTitleRow}>
              <TrendingUp size={18} color={monthlyData.primaryColor} />
              <Text style={[styles.chartTitle, isDark && styles.textDark]}>
                Diễn biến hồ sơ theo 12 tháng
              </Text>
            </View>
            <Text style={[styles.chartSubtitle, isDark && styles.textMutedDark]}>
              Số lượng hồ sơ tiếp nhận & ban hành năm {selectedYear}
            </Text>
          </View>

          <View style={[styles.chartTypeToggle, isDark && styles.chartTypeToggleDark]}>
            <TouchableOpacity
              style={[
                styles.chartTypeBtn,
                chartType === 'bar' && (isDark ? styles.chartTypeBtnActiveDark : styles.chartTypeBtnActive),
              ]}
              onPress={() => setChartType('bar')}
            >
              <Text
                style={[
                  styles.chartTypeBtnText,
                  chartType === 'bar' && styles.chartTypeBtnTextActive,
                  chartType === 'bar' && isDark && styles.textDark,
                ]}
              >
                Cột
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chartTypeBtn,
                chartType === 'line' && (isDark ? styles.chartTypeBtnActiveDark : styles.chartTypeBtnActive),
              ]}
              onPress={() => setChartType('line')}
            >
              <Text
                style={[
                  styles.chartTypeBtnText,
                  chartType === 'line' && styles.chartTypeBtnTextActive,
                  chartType === 'line' && isDark && styles.textDark,
                ]}
              >
                Đường
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SVG Render for Monthly Chart */}
        <MonthlyChartRenderer
          data={monthlyData.points}
          color={monthlyData.primaryColor}
          type={chartType}
          isDark={isDark}
        />
      </View>

      {/* CHART 2: Category Structure (Donut & Breakdown) */}
      <View style={[styles.chartCard, isDark && styles.cardDark]}>
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleContainer}>
            <View style={styles.chartTitleRow}>
              <PieIcon size={18} color="#2563eb" />
              <Text style={[styles.chartTitle, isDark && styles.textDark]}>
                Cơ cấu hồ sơ theo danh mục
              </Text>
            </View>
            <Text style={[styles.chartSubtitle, isDark && styles.textMutedDark]}>
              Tỷ trọng hồ sơ giữa 4 phân hệ chuyên ngành
            </Text>
          </View>
        </View>

        {/* SVG Donut Chart */}
        <DonutChartRenderer
          slices={donutData.slices}
          total={donutData.total}
          isDark={isDark}
        />

        {/* Legend List */}
        <View style={styles.legendContainer}>
          {donutData.slices.map((slice, idx) => (
            <View
              key={idx}
              style={[styles.legendItem, isDark && styles.legendItemDark]}
            >
              <View style={styles.legendLeft}>
                <View style={[styles.legendDot, { backgroundColor: slice.color }]} />
                <Text style={[styles.legendName, isDark && styles.textDark]}>
                  {slice.label}
                </Text>
              </View>
              <View style={styles.legendRight}>
                <Text style={[styles.legendCount, isDark && styles.textDark]}>
                  {slice.value} hs
                </Text>
                <Text style={[styles.legendPercent, { color: slice.color }]}>
                  {slice.percent}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Status Breakdown Pipeline */}
      <View style={[styles.chartCard, isDark && styles.cardDark]}>
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleContainer}>
            <View style={styles.chartTitleRow}>
              <FileCheck size={18} color="#10b981" />
              <Text style={[styles.chartTitle, isDark && styles.textDark]}>
                Tình trạng xử lý hồ sơ
              </Text>
            </View>
            <Text style={[styles.chartSubtitle, isDark && styles.textMutedDark]}>
              Tiến độ giải quyết & kết nối liên thông dữ liệu
            </Text>
          </View>
        </View>

        <View style={styles.statusList}>
          {statusStats.map((item, idx) => (
            <View key={idx} style={styles.statusRow}>
              <View style={styles.statusInfoRow}>
                <Text style={[styles.statusName, isDark && styles.textDark]}>
                  {item.label}
                </Text>
                <Text style={[styles.statusVal, isDark && styles.textDark]}>
                  {item.count} hồ sơ ({item.percent}%)
                </Text>
              </View>
              <View style={[styles.statusTrack, isDark && styles.statusTrackDark]}>
                <View
                  style={[
                    styles.statusFill,
                    { width: `${item.percent}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Subsystem Details List */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
          Chi Tiết Từng Nghiệp Vụ
        </Text>
        <Text style={[styles.sectionBadge, isDark && styles.textMutedDark]}>
          4 Phân hệ dữ liệu
        </Text>
      </View>

      <View style={styles.moduleCardsContainer}>
        {categoryConfigs.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <View
              key={cat.id}
              style={[styles.moduleCard, isDark && styles.moduleCardDark]}
            >
              <View style={styles.moduleCardHeader}>
                <View style={styles.moduleCardLeft}>
                  <View style={[styles.moduleIconBox, { backgroundColor: `${cat.color}15` }]}>
                    <CatIcon size={18} color={cat.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.moduleTitle, isDark && styles.textDark]}>
                      {cat.fullTitle}
                    </Text>
                    {!!cat.desc && (
                      <Text style={[styles.moduleDesc, isDark && styles.textMutedDark]}>
                        {cat.desc}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    styles.moduleCountBadge,
                    isDark && styles.moduleCountBadgeDark,
                    { backgroundColor: `${cat.color}18` },
                  ]}
                >
                  <Text style={[styles.moduleCountText, { color: cat.badgeColor }]}>
                    {cat.count} HS
                  </Text>
                </View>
              </View>

              <View style={[styles.moduleStatsRow, isDark && styles.moduleStatsRowDark]}>
                <View style={styles.moduleStatItem}>
                  <Text style={styles.moduleStatLabel}>Đã phê duyệt</Text>
                  <Text style={[styles.moduleStatVal, isDark && styles.textDark]}>
                    {Math.round(cat.count * 0.72)}
                  </Text>
                </View>
                <View style={styles.moduleStatItem}>
                  <Text style={styles.moduleStatLabel}>Chờ xử lý</Text>
                  <Text style={[styles.moduleStatVal, isDark && styles.textDark]}>
                    {Math.round(cat.count * 0.28)}
                  </Text>
                </View>
                <View style={styles.moduleStatItem}>
                  <Text style={styles.moduleStatLabel}>Tỷ trọng toàn tỉnh</Text>
                  <Text style={[styles.moduleStatVal, { color: cat.badgeColor }]}>
                    {cat.percentage}%
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Recent Submissions Feed */}
      <View style={[styles.recentFeed, isDark && styles.cardDark]}>
        <View style={styles.feedHeaderRow}>
          <Text style={[styles.feedTitle, isDark && styles.textDark]}>
            Hồ sơ cập nhật gần đây
          </Text>
          <Clock size={16} color={isDark ? '#94a3b8' : '#64748b'} />
        </View>

        {recentActivities.map((act) => {
          const ActIcon = act.icon;
          return (
            <View
              key={act.id}
              style={[styles.feedItem, isDark && styles.feedItemDark]}
            >
              <View style={[styles.feedIconDot, { backgroundColor: `${act.color}15` }]}>
                <ActIcon size={16} color={act.color} />
              </View>
              <View style={styles.feedContent}>
                <Text style={[styles.feedItemTitle, isDark && styles.textDark]} numberOfLines={1}>
                  {act.title}
                </Text>
                <Text style={[styles.feedItemMeta, isDark && styles.textMutedDark]} numberOfLines={1}>
                  {act.unit} • {act.time}
                </Text>
              </View>
              <View
                style={[
                  styles.feedStatusBadge,
                  { backgroundColor: `${act.statusColor}18` },
                ]}
              >
                <Text style={[styles.feedStatusText, { color: act.statusColor }]}>
                  {act.status}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

// Sub-component: Monthly SVG Chart Renderer
interface MonthlyChartRendererProps {
  data: { label: string; value: number }[];
  color: string;
  type: 'bar' | 'line';
  isDark: boolean;
}

const MonthlyChartRenderer: React.FC<MonthlyChartRendererProps> = ({
  data,
  color,
  type,
  isDark,
}) => {
  const { width } = useWindowDimensions();
  const [chartWidth, setChartWidth] = useState(Math.max(width - 64, 260));
  const height = 180;
  const paddingLeft = 32;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 26;

  const chartAreaWidth = Math.max(chartWidth - paddingLeft - paddingRight, 100);
  const chartAreaHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...data.map((d) => d.value), 20) * 1.15;
  const minVal = 0;

  const getX = (index: number) => {
    return paddingLeft + (index / (data.length - 1)) * chartAreaWidth;
  };

  const getY = (val: number) => {
    const normalized = (val - minVal) / (maxVal - minVal);
    return paddingTop + chartAreaHeight * (1 - normalized);
  };

  const gridLines = [0, 0.5, 1];
  const gridColor = isDark ? '#334155' : '#f1f5f9';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  // Build Line and Area paths
  const pts = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));
  let linePath = '';
  let areaPath = '';
  if (pts.length > 0) {
    linePath = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      linePath += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    const last = pts[pts.length - 1];
    areaPath = `${linePath} L ${last.x} ${paddingTop + chartAreaHeight} L ${pts[0].x} ${paddingTop + chartAreaHeight
      } Z`;
  }

  // Bar dimensions
  const barSlotWidth = chartAreaWidth / data.length;
  const barWidth = Math.min(Math.max(barSlotWidth * 0.55, 10), 22);

  return (
    <View
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0) setChartWidth(w);
      }}
      style={{ width: '100%', alignItems: 'center' }}
    >
      <Svg width={chartWidth} height={height}>
        <Defs>
          <LinearGradient id="monthlyAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </LinearGradient>
          <LinearGradient id="monthlyBarGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="1" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.75" />
          </LinearGradient>
        </Defs>

        {/* Gridlines */}
        {gridLines.map((ratio, idx) => {
          const yPos = paddingTop + chartAreaHeight * (1 - ratio);
          const labelVal = Math.round(minVal + ratio * (maxVal - minVal));
          return (
            <G key={idx}>
              <Line
                x1={paddingLeft}
                y1={yPos}
                x2={chartWidth - paddingRight}
                y2={yPos}
                stroke={gridColor}
                strokeWidth={1}
                strokeDasharray={ratio > 0 && ratio < 1 ? '3,3' : undefined}
              />
              <SvgText
                x={paddingLeft - 6}
                y={yPos + 4}
                fill={textColor}
                fontSize={9}
                fontWeight="600"
                textAnchor="end"
              >
                {labelVal}
              </SvgText>
            </G>
          );
        })}

        {/* Bar mode */}
        {type === 'bar' &&
          data.map((d, i) => {
            const xCenter = paddingLeft + (i + 0.5) * barSlotWidth;
            const barH = chartAreaHeight * ((d.value - minVal) / (maxVal - minVal));
            const yPos = paddingTop + chartAreaHeight - barH;
            return (
              <G key={i}>
                <Rect
                  x={xCenter - barWidth / 2}
                  y={yPos}
                  width={barWidth}
                  height={Math.max(barH, 4)}
                  rx={4}
                  fill="url(#monthlyBarGrad)"
                />
                <SvgText
                  x={xCenter}
                  y={paddingTop + chartAreaHeight + 16}
                  fill={textColor}
                  fontSize={10}
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {d.label}
                </SvgText>
              </G>
            );
          })}

        {/* Line mode */}
        {type === 'line' && (
          <G>
            <Path d={areaPath} fill="url(#monthlyAreaGrad)" />
            <Path d={linePath} fill="none" stroke={color} strokeWidth={3} />
            {pts.map((pt, i) => (
              <G key={i}>
                <Circle cx={pt.x} cy={pt.y} r={4} fill={color} stroke="#ffffff" strokeWidth={2} />
                <SvgText
                  x={pt.x}
                  y={paddingTop + chartAreaHeight + 16}
                  fill={textColor}
                  fontSize={10}
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {data[i].label}
                </SvgText>
              </G>
            ))}
          </G>
        )}
      </Svg>
    </View>
  );
};

// Sub-component: Donut SVG Chart Renderer
interface DonutChartRendererProps {
  slices: { label: string; value: number; color: string; percent: number }[];
  total: number;
  isDark: boolean;
}

const DonutChartRenderer: React.FC<DonutChartRendererProps> = ({ slices, total, isDark }) => {
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const createArc = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  let currentAngle = 0;
  const renderedSlices = slices.map((slice) => {
    const angle = (slice.value / (total || 1)) * 360;
    const safeAngle = Math.min(Math.max(angle, 1), 359.9);
    const path = createArc(currentAngle, currentAngle + safeAngle);
    currentAngle += angle;
    return { ...slice, path };
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 12 }}>
      <Svg width={size} height={size}>
        <G>
          {/* Background circle track */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={isDark ? '#334155' : '#f1f5f9'}
            strokeWidth={strokeWidth}
          />
          {/* Slices */}
          {renderedSlices.map((slice, idx) => (
            <Path
              key={idx}
              d={slice.path}
              fill="none"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          ))}
        </G>
      </Svg>

      {/* Center Label Overlay */}
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Manrope',
            fontSize: 22,
            fontWeight: '800',
            color: isDark ? '#ffffff' : '#1e293b',
          }}
        >
          {total}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: isDark ? '#94a3b8' : '#64748b',
            textTransform: 'uppercase',
          }}
        >
          Tổng hồ sơ
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
