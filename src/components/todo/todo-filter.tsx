import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  useColorScheme,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { FilterStatus, Category } from '@/types/todo';

interface TodoFilterProps {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
}

const CATEGORIES: (Category | 'All')[] = ['All', 'Study', 'Work', 'Personal', 'Urgent'];

export function TodoFilter({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: TodoFilterProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={[
          styles.searchInput,
          { color: colors.text, backgroundColor: colors.backgroundElement },
        ]}
        placeholder="🔍 Search tasks..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={onSearchChange}
      />

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { backgroundColor: colors.backgroundElement }]}>
        {(['all', 'active', 'completed'] as FilterStatus[]).map((f) => {
          const isSelected = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => onFilterChange(f)}
              style={[
                styles.tab,
                isSelected && { backgroundColor: colors.backgroundSelected },
              ]}>
              <ThemedText
                type="small"
                style={[
                  styles.tabText,
                  { color: isSelected ? colors.text : colors.textSecondary },
                ]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {/* Category Pills */}
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => onCategoryChange(cat)}
              style={[
                styles.catPill,
                isSelected && styles.catPillActive,
                {
                  backgroundColor: isSelected
                    ? '#007AFF'
                    : colors.backgroundElement,
                },
              ]}>
              <ThemedText
                type="small"
                style={{
                  color: isSelected ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: isSelected ? '600' : '400',
                  fontSize: 12,
                }}>
                {cat}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  searchInput: {
    height: 40,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 14,
  },
  filterBar: {
    flexDirection: 'row',
    borderRadius: Spacing.two,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: Spacing.two - 2,
  },
  tabText: {
    fontWeight: '600',
    fontSize: 13,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
  catPill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: 10,
  },
  catPillActive: {},
});
