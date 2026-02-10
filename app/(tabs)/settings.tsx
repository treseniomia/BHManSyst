import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Divider, Card, Button } from "react-native-paper";
import {
  User,
  Bell,
  Database,
  Info,
  ChevronRight,
  LogOut,
  Moon,
  Home,
  CreditCard,
  ShieldCheck,
  Pencil,
} from "lucide-react-native";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  // BOSS, ito ang fix sa Switch colors para sa iOS at Android
  const switchTheme = {
    trackColor: { false: "#CBD5E1", true: "#A5B4FC" },
    thumbColor: (value: boolean) => (value ? "#4F46E5" : "#F4F3F4"),
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subTitle}>Manage your BH management system</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Image
              size={60}
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Boss",
              }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.adminName}>Boss Admin</Text>
              <Text style={styles.adminRole}>Property Owner</Text>
            </View>
            <TouchableOpacity style={styles.editIconBtn} onPress={() => {}}>
              <Pencil size={18} color="#64748B" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Property Management</Text>
        <View style={styles.group}>
          <SettingItem
            icon={<Home size={22} color="#4F46E5" />}
            label="BH Name & Address"
            onPress={() => {}}
          />
          <Divider />
          <SettingItem
            icon={<CreditCard size={22} color="#10B981" />}
            label="Rental Rates & Utilities"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.group}>
          <View style={styles.settingRow}>
            <View style={styles.leftSide}>
              <Bell size={22} color="#F59E0B" />
              <Text style={styles.settingLabel}>Due Date Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={switchTheme.trackColor}
              thumbColor={switchTheme.thumbColor(notifications)}
            />
          </View>
          <Divider />
          <View style={styles.settingRow}>
            <View style={styles.leftSide}>
              <Moon size={22} color="#6366F1" />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={switchTheme.trackColor}
              thumbColor={switchTheme.thumbColor(isDarkMode)}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Security & Data</Text>
        <View style={styles.group}>
          <View style={styles.settingRow}>
            <View style={styles.leftSide}>
              <ShieldCheck size={22} color="#10B981" />
              <Text style={styles.settingLabel}>Use Biometrics (FaceID)</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={switchTheme.trackColor}
              thumbColor={switchTheme.thumbColor(biometrics)}
            />
          </View>
          <Divider />
          <SettingItem
            icon={<Database size={22} color="#64748B" />}
            label="Cloud Backup & Restore"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.group}>
          <SettingItem
            icon={<Info size={22} color="#94A3B8" />}
            label="App Version 1.0.0"
            onPress={() => {}}
          />
        </View>

        <Button
          mode="contained-tonal"
          icon={() => <LogOut size={18} color="#EF4444" />}
          onPress={() => {}}
          style={styles.logoutBtn}
          textColor="#EF4444"
        >
          Log Out
        </Button>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const SettingItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress}>
    <View style={styles.leftSide}>
      {icon}
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <ChevronRight size={20} color="#CBD5E1" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { padding: 25 },
  title: { fontSize: 28, fontWeight: "900", color: "#1E293B" },
  subTitle: { fontSize: 14, color: "#64748B" },
  scrollContent: { paddingHorizontal: 20 },
  profileCard: {
    borderRadius: 24,
    backgroundColor: "#FFF",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 25,
  },
  profileContent: { flexDirection: "row", alignItems: "center" },
  avatar: { backgroundColor: "#E0E7FF" },
  profileInfo: { flex: 1, marginLeft: 15 },
  adminName: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  adminRole: { fontSize: 12, color: "#94A3B8", fontWeight: "600" },
  editIconBtn: { padding: 8, backgroundColor: "#F1F5F9", borderRadius: 12 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    marginBottom: 10,
    marginLeft: 5,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  group: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  leftSide: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingLabel: { fontSize: 15, fontWeight: "600", color: "#1E293B" },
  logoutBtn: {
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: "#FEE2E2",
    marginBottom: 20,
  },
});
