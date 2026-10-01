import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  useColorScheme,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { Category, Priority } from '@/types/todo';

interface TodoInputProps {
  onAdd: (title: string, category: Category, priority: Priority) => void;
}

const CATEGORIES: Category[] = ['Study', 'Work', 'Personal', 'Urgent'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Study');
  const [priority, setPriority] = useState<Priority>('medium');
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text, category, priority);
    setText('');
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
    }
  };

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="smallBold">Add New Task</ThemedText>

      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.textInput,
            { color: colors.text, backgroundColor: colors.background },
          ]}
          placeholder="What needs to be done?"
          placeholderTextColor={colors.textSecondary}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
            !text.trim() && styles.disabledButton,
          ]}
          disabled={!text.trim()}>
          <ThemedText style={styles.addButtonText}>Add</ThemedText>
        </Pressable>
      </View>

      {/* Category selector pills */}
      <View style={styles.selectorsRow}>
        <View style={styles.pillGroup}>
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                style={[
                  styles.pill,
                  isSelected && styles.pillSelected,
                  { backgroundColor: isSelected ? '#007AFF' : colors.background },
                ]}>
                <ThemedText
                  type="small"
                  style={{
                    color: isSelected ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: isSelected ? '600' : '400',
                  }}>
                  {cat}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Priority Selector */}
      <View style={styles.priorityRow}>
        <ThemedText type="small" themeColor="textSecondary">
          Priority:
        </ThemedText>
        {PRIORITIES.map((p) => {
          const isSelected = priority === p;
          const pColor = getPriorityColor(p);
          return (
            <Pressable
              key={p}
              onPress={() => setPriority(p)}
              style={[
                styles.priorityPill,
                isSelected && { borderColor: pColor, borderWidth: 1.5 },
                { backgroundColor: colors.background },
              ]}>
              <View style={[styles.dot, { backgroundColor: pColor }]} />
              <ThemedText
                type="small"
                style={{
                  color: isSelected ? colors.text : colors.textSecondary,
                  textTransform: 'capitalize',
                  fontWeight: isSelected ? '600' : '400',
                }}>
                {p}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    borderRadius: Spacing.four,
    gap: Spacing.two,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 44,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 15,
  },
  addButton: {
    height: 44,
    paddingHorizontal: Spacing.four,
    backgroundColor: '#007AFF',
    borderRadius: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  pressed: {
    opacity: 0.7,
  },
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  pill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillSelected: {},
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  priorityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
