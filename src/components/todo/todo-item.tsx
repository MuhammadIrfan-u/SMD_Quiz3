import React from 'react';
import { StyleSheet, View, Pressable, useColorScheme } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { TodoItem } from '@/types/todo';

interface TodoItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItemCard({ item, onToggle, onDelete }: TodoItemProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const getPriorityBadge = (p: TodoItem['priority']) => {
    switch (p) {
      case 'high':
        return { label: 'High', color: '#FF3B30', bg: 'rgba(255, 59, 48, 0.15)' };
      case 'medium':
        return { label: 'Med', color: '#FF9500', bg: 'rgba(255, 149, 0, 0.15)' };
      case 'low':
        return { label: 'Low', color: '#34C759', bg: 'rgba(52, 199, 89, 0.15)' };
    }
  };

  const priorityMeta = getPriorityBadge(item.priority);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundElement },
        item.completed && styles.completedContainer,
      ]}>
      {/* Checkbox Toggle Button */}
      <Pressable
        onPress={() => onToggle(item.id)}
        style={({ pressed }) => [styles.checkbox, pressed && styles.pressed]}>
        <View
          style={[
            styles.checkCircle,
            item.completed && styles.checkCircleCompleted,
          ]}>
          {item.completed && (
            <SymbolView
              name={{ ios: 'checkmark', android: 'check', web: 'check' }}
              tintColor="#FFFFFF"
              size={12}
            />
          )}
        </View>
      </Pressable>

      {/* Task Content */}
      <Pressable
        onPress={() => onToggle(item.id)}
        style={styles.contentContainer}>
        <ThemedText
          style={[
            styles.title,
            item.completed && [
              styles.completedTitle,
              { color: colors.textSecondary },
            ],
          ]}>
          {item.title}
        </ThemedText>

        <View style={styles.badgeRow}>
          {/* Category Tag */}
          <View style={[styles.badge, { backgroundColor: colors.backgroundSelected }]}>
            <ThemedText type="small" style={styles.badgeText}>
              {item.category}
            </ThemedText>
          </View>

          {/* Priority Tag */}
          <View style={[styles.badge, { backgroundColor: priorityMeta.bg }]}>
            <ThemedText
              type="small"
              style={[styles.badgeText, { color: priorityMeta.color }]}>
              {priorityMeta.label}
            </ThemedText>
          </View>
        </View>
      </Pressable>

      {/* Delete Button */}
      <Pressable
        onPress={() => onDelete(item.id)}
        style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}>
        <SymbolView
          name={{ ios: 'trash', android: 'delete', web: 'delete' }}
          tintColor="#FF3B30"
          size={16}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  completedContainer: {
    opacity: 0.7,
  },
  checkbox: {
    padding: Spacing.half,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleCompleted: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  deleteBtn: {
    padding: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
});
