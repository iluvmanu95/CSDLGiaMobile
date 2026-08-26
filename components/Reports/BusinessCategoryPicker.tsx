import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Check } from 'lucide-react-native';
import { DanhMucKinhDoanhItem } from '../../services';
import styles from '../../screens/Reports/style';

interface BusinessCategoryPickerProps {
    businessList: DanhMucKinhDoanhItem[];
    loading: boolean;
    selectedBusiness: string;
    onSelectBusiness: (bizId: string) => void;
    searchText: string;
    onSearchChange: (text: string) => void;
    isDark: boolean;
}

export const BusinessCategoryPicker: React.FC<BusinessCategoryPickerProps> = ({
    businessList,
    loading,
    selectedBusiness,
    onSelectBusiness,
    searchText,
    onSearchChange,
    isDark
}) => {
    const filteredList = businessList.filter((item: any) => {
        if (!searchText.trim()) return true;
        const query = searchText.toLowerCase();
        const tenNghe = (item.tenNghe || item.TenNghe || '')?.toString().toLowerCase();
        const maNghe = (item.maNghe || item.MaNghe || '')?.toString().toLowerCase();
        const maNganh = (item.maNganh || item.MaNganh || '')?.toString().toLowerCase();
        return tenNghe.includes(query) || maNghe.includes(query) || maNganh.includes(query);
    });

    return (
        <View style={{ marginBottom: 8 }}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                Danh mục ngành nghề kinh doanh
            </Text>

            <TextInput
                style={[styles.searchBar, isDark && styles.textInputDark]}
                placeholder="Tìm kiếm mã hoặc tên ngành nghề..."
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                value={searchText}
                onChangeText={onSearchChange}
            />

            {loading ? (
                <View style={{ padding: 16, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color={isDark ? '#3b82f6' : '#222353'} />
                    <Text style={{ marginTop: 6, fontSize: 12, color: isDark ? '#94a3b8' : '#64748b' }}>
                        Đang tải danh mục...
                    </Text>
                </View>
            ) : (
                <ScrollView style={[styles.businessList, isDark && styles.businessListDark]} nestedScrollEnabled>
                    {/* Tất cả ngành nghề option */}
                    <TouchableOpacity
                        style={[
                            styles.businessItem,
                            isDark && styles.businessItemDark,
                            selectedBusiness === '' && (isDark ? styles.businessItemActiveDark : styles.businessItemActive)
                        ]}
                        onPress={() => onSelectBusiness('')}
                    >
                        <Text
                            style={[
                                styles.businessItemText,
                                styles.businessItemTextParent,
                                isDark && styles.businessItemTextDark,
                                selectedBusiness === '' && styles.businessItemTextActive
                            ]}
                        >
                            Tất cả ngành nghề
                        </Text>
                        {selectedBusiness === '' && <Check size={16} color={isDark ? '#38bdf8' : '#222353'} />}
                    </TouchableOpacity>

                    {filteredList.map((biz: any) => {
                        const bizId = biz.id || biz.Id || biz.maNghe || biz.MaNghe;
                        const tenNghe = biz.tenNghe || biz.TenNghe || biz.maNghe || biz.MaNghe;
                        const maNghe = biz.maNghe || biz.MaNghe;
                        const maNganh = (biz.maNganh || biz.MaNganh || '').toString().trim();

                        // Quan hệ: Cha là không có MaNganh, Con là có MaNganh
                        const isParent = !maNganh || maNganh === 'null' || maNganh === 'undefined';

                        // Nếu là Cha: Hiển thị dạng Header đề mục nhóm (không click chọn)
                        if (isParent) {
                            return (
                                <View
                                    key={bizId || tenNghe}
                                    style={[
                                        styles.businessItemLevel0,
                                        isDark && styles.businessItemLevel0Dark
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.businessItemTextLevel0,
                                            isDark && styles.textDark
                                        ]}
                                    >
                                        {tenNghe}
                                    </Text>
                                </View>
                            );
                        }

                        // Nếu là Con (có MaNganh): Cho phép click chọn và thụt lề rõ ràng ngay dưới Cha
                        const isSelected = selectedBusiness === bizId || selectedBusiness === maNghe;
                        const rawLevel = biz.level ?? biz.Level;
                        const level = Number(rawLevel ?? 1);
                        const indentPadding = Math.min(60, 18 + Math.max(0, level - 1) * 16);

                        return (
                            <TouchableOpacity
                                key={bizId}
                                style={[
                                    styles.businessItem,
                                    isDark && styles.businessItemDark,
                                    isSelected && (isDark ? styles.businessItemActiveDark : styles.businessItemActive),
                                    { paddingLeft: indentPadding }
                                ]}
                                onPress={() => onSelectBusiness(bizId || '')}
                            >
                                <Text
                                    style={[
                                        styles.businessItemText,
                                        styles.businessItemTextChild,
                                        isDark && styles.businessItemTextDark,
                                        isSelected && styles.businessItemTextActive
                                    ]}
                                >
                                    {'↳ '}{tenNghe}
                                </Text>
                                {isSelected && <Check size={16} color={isDark ? '#38bdf8' : '#222353'} />}
                            </TouchableOpacity>
                        );
                    })}

                    {filteredList.length === 0 && (
                        <View style={{ padding: 12, alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: isDark ? '#94a3b8' : '#64748b' }}>
                                Không tìm thấy danh mục phù hợp
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default BusinessCategoryPicker;
