import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import * as Device from 'expo-device';
import { Link } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to Expo
          </ThemedText>

          {/* Student Information */}
          <ThemedView style={styles.studentInfo}>
            <ThemedText type="subtitle">Muhammad Irfan</ThemedText>
            <ThemedText type="default">Roll No: 23I_3065</ThemedText>
            <ThemedText type="default">Section B</ThemedText>
          </ThemedView>

          {/* Task Manager Feature Card */}
          <Link href="/todos" asChild>
            <Pressable style={({ pressed }) => [styles.featureCard, pressed && styles.pressed]}>
              <View style={styles.featureCardContent}>
                <ThemedText style={styles.featureIcon}>✅</ThemedText>
                <View style={styles.featureTextGroup}>
                  <ThemedText type="smallBold" style={styles.featureTitle}>
                    Task Manager Feature
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Add, track, filter & complete your tasks with AsyncStorage
                  </ThemedText>
                </View>
                <ThemedText type="linkPrimary" style={styles.featureArrow}>
                  Open →
                </ThemedText>
              </View>
            </Pressable>
          </Link>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow title="Try editing" hint={<ThemedText type="code">src/app/index.tsx</ThemedText>} />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow title="Tasks screen" hint={<ThemedText type="code">src/app/todos.tsx</ThemedText>} />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justify: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  studentInfo: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  featureCard: {
    width: '100%',
    backgroundColor: '#007AFF12',
    borderColor: '#007AFF40',
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginTop: Spacing.two,
  },
  featureCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTextGroup: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    fontSize: 15,
    color: '#007AFF',
  },
  featureArrow: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});