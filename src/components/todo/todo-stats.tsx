import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    percentage: number;
  };
  onClearCompleted: () => void;
}

export function TodoStats({ stats, onClearCompleted }: TodoStatsProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <ThemedText type="smallBold" style={styles.title}>
            Task Progress
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {stats.completed} of {stats.total} completed ({stats.percentage}%)
          </ThemedText>
        </View>

        {stats.completed > 0 && (
          <ThemedText
            type="linkPrimary"
            style={styles.clearBtn}
            onPress={onClearCompleted}>
            Clear Done
          </ThemedText>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${stats.percentage}%` }]} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <ThemedText type="title">{stats.total}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Total
          </ThemedText>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <ThemedText type="title" style={{ color: '#007AFF' }}>
            {stats.active}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Active
          </ThemedText>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <ThemedText type="title" style={{ color: '#34C759' }}>
            {stats.completed}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Done
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  clearBtn: {
    fontSize: 13,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(120, 120, 128, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Spacing.one,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(120, 120, 128, 0.2)',
  },
});
