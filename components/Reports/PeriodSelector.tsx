import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { PeriodType } from '../../screens/Reports/types';
import styles from '../../screens/Reports/style';

interface PeriodSelectorProps {
    periodType: PeriodType;
    setPeriodType: (tab: PeriodType) => void;
    fromDate: string;
    setFromDate: (val: string) => void;
    toDate: string;
    setToDate: (val: string) => void;
    selectedMonth: number;
    setSelectedMonth: (val: number) => void;
    selectedQuarter: number;
    setSelectedQuarter: (val: number) => void;
    selectedYear: number;
    setSelectedYear: (val: number) => void;
    isDark: boolean;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
    periodType,
    setPeriodType,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    selectedMonth,
    setSelectedMonth,
    selectedQuarter,
    setSelectedQuarter,
    selectedYear,
    setSelectedYear,
    isDark
}) => {
    const currentYear = new Date().getFullYear();
    const yearsList = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];
    const quartersList = [1, 2, 3, 4];
    const monthsList = Array.from({ length: 12 }, (_, i) => i + 1);

    const labels: Record<PeriodType, string> = {
        day: 'Ngày',
        month: 'Tháng',
        quarter: 'Quý',
        year: 'Năm'
    };

    return (
        <View>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                Thời Gian Báo Cáo
            </Text>

            {/* Tabs: Ngày, Tháng, Quý, Năm */}
            <View style={[styles.tabSelector, isDark && styles.tabSelectorDark]}>
                {(['day', 'month', 'quarter', 'year'] as PeriodType[]).map((tab) => {
                    const isActive = periodType === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tabItem,
                                isActive && (isDark ? styles.tabItemActiveDark : styles.tabItemActive)
                            ]}
                            onPress={() => setPeriodType(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabItemText,
                                    isDark && styles.tabItemTextDark,
                                    isActive && styles.tabItemTextActive
                                ]}
                            >
                                {labels[tab]}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Dynamic Inputs based on Period Type */}
            <View style={{ marginTop: 12 }}>
                {periodType === 'day' && (
                    <View style={styles.formRow}>
                        <View style={styles.formGroup}>
                            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Từ ngày</Text>
                            <TextInput
                                style={[styles.textInput, isDark && styles.textInputDark]}
                                value={fromDate}
                                onChangeText={setFromDate}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Đến ngày</Text>
                            <TextInput
                                style={[styles.textInput, isDark && styles.textInputDark]}
                                value={toDate}
                                onChangeText={setToDate}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            />
                        </View>
                    </View>
                )}

                {periodType === 'month' && (
                    <View style={{ gap: 12 }}>
                        <View>
                            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn tháng</Text>
                            <View style={styles.pillGrid}>
                                {monthsList.map((m) => (
                                    <TouchableOpacity
                                        key={m}
                                        style={[
                                            styles.pillItem,
                                            isDark && styles.pillItemDark,
                                            selectedMonth === m && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                        ]}
                                        onPress={() => setSelectedMonth(m)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                isDark && styles.pillTextDark,
                                                selectedMonth === m && styles.pillTextActive
                                            ]}
                                        >
                                            Tháng {m}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View>
                            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn năm</Text>
                            <View style={styles.pillGrid}>
                                {yearsList.map((y) => (
                                    <TouchableOpacity
                                        key={y}
                                        style={[
                                            styles.pillItem,
                                            isDark && styles.pillItemDark,
                                            selectedYear === y && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                        ]}
                                        onPress={() => setSelectedYear(y)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                isDark && styles.pillTextDark,
                                                selectedYear === y && styles.pillTextActive
                                            ]}
                                        >
                                            {y}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

                {periodType === 'quarter' && (
                    <View style={{ gap: 12 }}>
                        <View>
                            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn quý</Text>
                            <View style={styles.pillGrid}>
                                {quartersList.map((q) => (
                                    <TouchableOpacity
                                        key={q}
                                        style={[
                                            styles.pillItem,
                                            isDark && styles.pillItemDark,
                                            selectedQuarter === q && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                        ]}
                                        onPress={() => setSelectedQuarter(q)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                isDark && styles.pillTextDark,
                                                selectedQuarter === q && styles.pillTextActive
                                            ]}
                                        >
                                            Quý {q}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View>
                            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn năm</Text>
                            <View style={styles.pillGrid}>
                                {yearsList.map((y) => (
                                    <TouchableOpacity
                                        key={y}
                                        style={[
                                            styles.pillItem,
                                            isDark && styles.pillItemDark,
                                            selectedYear === y && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                        ]}
                                        onPress={() => setSelectedYear(y)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                isDark && styles.pillTextDark,
                                                selectedYear === y && styles.pillTextActive
                                            ]}
                                        >
                                            {y}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

                {periodType === 'year' && (
                    <View>
                        <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>Chọn năm</Text>
                        <View style={styles.pillGrid}>
                            {yearsList.map((y) => (
                                <TouchableOpacity
                                    key={y}
                                    style={[
                                        styles.pillItem,
                                        isDark && styles.pillItemDark,
                                        selectedYear === y && (isDark ? styles.pillItemActiveDark : styles.pillItemActive)
                                    ]}
                                    onPress={() => setSelectedYear(y)}
                                >
                                    <Text
                                        style={[
                                            styles.pillText,
                                            isDark && styles.pillTextDark,
                                            selectedYear === y && styles.pillTextActive
                                        ]}
                                    >
                                        {y}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

export default PeriodSelector;
