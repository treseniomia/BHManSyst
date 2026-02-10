import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
// Import ito para sa modernong SafeArea handling
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, IconButton, Divider } from "react-native-paper";
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react-native";

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "payment" | "overdue" | "system";
  isRead: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Kukunin natin ang sukat ng notch/status bar

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Payment",
      desc: "Juan Dela Cruz paid ₱2,500 for Room 101.",
      time: "2m ago",
      type: "payment",
      isRead: false,
    },
    {
      id: "2",
      title: "Overdue Alert",
      desc: "Pedro Penduko is 4 days late in Room 102.",
      time: "1h ago",
      type: "overdue",
      isRead: false,
    },
    {
      id: "3",
      title: "System Update",
      desc: "Bed 3-Top successfully added to Room 301.",
      time: "Yesterday",
      type: "system",
      isRead: true,
    },
  ]);

  const renderIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CheckCircle2 size={22} color="#10B981" />;
      case "overdue":
        return <AlertCircle size={22} color="#EF4444" />;
      default:
        return <Bell size={22} color="#4F46E5" />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER SECTION */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={28} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 45 }} />
      </View>

      <Divider style={styles.headerDivider} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: insets.bottom + 20 },
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={[styles.card, !item.isRead && styles.unreadCard]}>
            <Card.Content style={styles.content}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      item.type === "overdue"
                        ? "#FEE2E2"
                        : item.type === "payment"
                        ? "#DCFCE7"
                        : "#EEF2FF",
                  },
                ]}
              >
                {renderIcon(item.type)}
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.notifTitle,
                    !item.isRead && { fontWeight: "800" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.notifDesc} numberOfLines={2}>
                  {item.desc}
                </Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
              <IconButton icon="dots-vertical" size={20} onPress={() => {}} />
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1E293B",
  },
  headerDivider: {
    backgroundColor: "#E2E8F0",
    height: 1,
  },
  listContainer: {
    padding: 20,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: "#FFF",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  unreadCard: {
    backgroundColor: "#F1F5F9",
    borderColor: "#E2E8F0",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notifTitle: {
    fontSize: 15,
    color: "#1E293B",
  },
  notifDesc: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  notifTime: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 6,
    fontWeight: "600",
  },
});
