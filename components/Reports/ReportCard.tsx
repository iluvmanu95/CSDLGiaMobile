import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { ReportOption } from '../../screens/Reports/types';
import styles from '../../screens/Reports/style';

interface ReportCardProps {
    report: ReportOption;
    isDark: boolean;
    onPress: (report: ReportOption) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
    report,
    isDark,
    onPress
}) => {
    const IconComponent = report.icon;

    return (
        <TouchableOpacity
            style={[styles.reportCard, isDark && styles.reportCardDark]}
            activeOpacity={0.7}
            onPress={() => onPress(report)}
        >
            <View
                style={[
                    styles.iconWrapper,
                    { backgroundColor: isDark ? '#334155' : report.bgColor }
                ]}
            >
                <IconComponent size={22} color={isDark ? '#93c5fd' : report.color} />
            </View>

            <View style={styles.reportContent}>
                <Text style={[styles.reportTitle, isDark && styles.textDark]}>
                    {report.title}
                </Text>
                <Text
                    style={[styles.reportDescription, isDark && styles.textMutedDark]}
                    numberOfLines={2}
                >
                    {report.description}
                </Text>
            </View>

            <View style={styles.arrowWrapper}>
                <ChevronRight size={20} color={isDark ? '#64748b' : '#94a3b8'} />
            </View>
        </TouchableOpacity>
    );
};

export default ReportCard;
