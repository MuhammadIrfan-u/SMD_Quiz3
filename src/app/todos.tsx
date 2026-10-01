import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TodoFilter } from '@/components/todo/todo-filter';
import { TodoInput } from '@/components/todo/todo-input';
import { TodoItemCard } from '@/components/todo/todo-item';
import { TodoStats } from '@/components/todo/todo-stats';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTodos } from '@/hooks/use-todos';

export default function TodosScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  } = useTodos();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
    default: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <ThemedText type="title">Task Manager</ThemedText>
          <ThemedText style={styles.subtitle} themeColor="textSecondary">
            Organize, track, and complete your tasks efficiently
          </ThemedText>

          {/* Student Info Badge */}
          <ThemedView type="backgroundElement" style={styles.studentBadge}>
            <ThemedText type="smallBold">Muhammad Irfan</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Roll No: 23I_3065 • Section B
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Stats Card */}
        <TodoStats stats={stats} onClearCompleted={clearCompleted} />

        {/* Input Form */}
        <TodoInput onAdd={addTodo} />

        {/* Filter and Search */}
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Task List Section */}
        {isLoading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ThemedText type="small" themeColor="textSecondary">
              Loading tasks...
            </ThemedText>
          </View>
        ) : todos.length === 0 ? (
          <ThemedView type="backgroundElement" style={styles.emptyBox}>
            <ThemedText style={styles.emptyIcon}>📝</ThemedText>
            <ThemedText type="subtitle" style={styles.emptyText}>
              No tasks found
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {searchQuery
                ? 'Try matching a different search term or category filter'
                : 'Add a new task above to get started!'}
            </ThemedText>
          </ThemedView>
        ) : (
          <View style={styles.listContainer}>
            {todos.map((item) => (
              <TodoItemCard
                key={item.id}
                item={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </View>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
  },
  studentBadge: {
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  listContainer: {
    gap: Spacing.two,
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.two,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.five,
    borderRadius: Spacing.four,
    gap: Spacing.two,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    textAlign: 'center',
  },
});
