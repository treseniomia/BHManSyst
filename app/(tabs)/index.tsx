// // app/(tabs)/index.tsx
// import { View, Text, StyleSheet } from "react-native";

// export default function DashboardScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>🏠 Admin Dashboard</Text>
//       <Text style={styles.subText}>BH Management System</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8FAFC",
//   },
//   text: { fontSize: 24, fontWeight: "bold", color: "#1E293B" },
//   subText: { fontSize: 16, color: "#64748B", marginTop: 5 },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, ProgressBar, Avatar, IconButton } from "react-native-paper";
import {
  Wallet,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Bell,
} from "lucide-react-native";

export default function DashboardScreen() {
  // Mock Data - In the future, ito ay manggagaling sa database/global state
  const stats = {
    totalRevenue: "45,000",
    pendingCollectibles: "12,500",
    occupiedBeds: 32,
    totalBeds: 40,
    overdueTenants: 5,
  };

  const occupancyRate = stats.occupiedBeds / stats.totalBeds;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Boss!</Text>
          <Text style={styles.subGreeting}>Here's what's happening today.</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Bell size={24} color="#1E293B" />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      {/* MAIN FINANCIAL CARDS */}
      <View style={styles.statGrid}>
        <Card style={[styles.mainCard, { backgroundColor: "#4F46E5" }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircleWhite}>
                <Wallet size={20} color="#4F46E5" />
              </View>
              <TrendingUp size={20} color="rgba(255,255,255,0.5)" />
            </View>
            <Text style={styles.cardLabelWhite}>Total Collected</Text>
            <Text style={styles.cardValueWhite}>₱{stats.totalRevenue}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.mainCard}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconCircleWhite, { backgroundColor: "#FEE2E2" }]}
              >
                <AlertTriangle size={20} color="#EF4444" />
              </View>
            </View>
            <Text style={styles.cardLabel}>Unpaid Total</Text>
            <Text style={[styles.cardValue, { color: "#EF4444" }]}>
              ₱{stats.pendingCollectibles}
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* OCCUPANCY SECTION */}
      <Card style={styles.occupancyCard}>
        <Card.Content>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionTitle}>Occupancy Rate</Text>
              <Text style={styles.sectionSub}>
                {stats.occupiedBeds} out of {stats.totalBeds} beds filled
              </Text>
            </View>
            <Text style={styles.percentText}>
              {Math.round(occupancyRate * 100)}%
            </Text>
          </View>
          <ProgressBar
            progress={occupancyRate}
            color="#4F46E5"
            style={styles.progressBar}
          />

          <View style={styles.row}>
            <View style={styles.miniStat}>
              <Users size={16} color="#64748B" />
              <Text style={styles.miniStatText}>
                {stats.totalBeds - stats.occupiedBeds} Available
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* URGENT ATTENTION (OVERDUE LIST) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Urgent Attention</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.urgentList}>
        {[
          {
            name: "Pedro Penduko",
            room: "102",
            amount: "₱2,500",
            days: "4 days late",
          },
          {
            name: "Sisa Dela Cruz",
            room: "201",
            amount: "₱3,000",
            days: "2 days late",
          },
        ].map((item, index) => (
          <Card key={index} style={styles.urgentCard}>
            <Card.Content style={styles.urgentContent}>
              <Avatar.Text
                size={40}
                label={item.name.substring(0, 1)}
                style={styles.avatar}
              />
              <View style={styles.urgentTextContainer}>
                <Text style={styles.urgentName}>{item.name}</Text>
                <Text style={styles.urgentRoom}>
                  Room {item.room} • {item.days}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.urgentAmount}>{item.amount}</Text>
                <IconButton icon="chevron-right" size={20} />
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 24, fontWeight: "900", color: "#1E293B" },
  subGreeting: { fontSize: 14, color: "#64748B" },
  notifBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  notifBadge: {
    position: "absolute",
    top: 12,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  statGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  mainCard: {
    flex: 1,
    borderRadius: 24,
    elevation: 4,
    backgroundColor: "#FFF",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  iconCircleWhite: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabelWhite: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
  },
  cardValueWhite: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4,
  },
  cardLabel: { color: "#64748B", fontSize: 12, fontWeight: "600" },
  cardValue: {
    color: "#1E293B",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4,
  },

  occupancyCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#FFF",
    marginBottom: 25,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  percentText: { fontSize: 24, fontWeight: "900", color: "#4F46E5" },
  progressBar: { height: 10, borderRadius: 5, backgroundColor: "#F1F5F9" },
  row: { flexDirection: "row", marginTop: 15 },
  miniStat: { flexDirection: "row", alignItems: "center", gap: 6 },
  miniStatText: { fontSize: 12, color: "#64748B", fontWeight: "600" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#1E293B" },
  sectionSub: { fontSize: 13, color: "#64748B" },
  viewAll: { color: "#4F46E5", fontWeight: "700", fontSize: 14 },

  urgentList: { paddingHorizontal: 20, gap: 12 },
  urgentCard: { borderRadius: 20, backgroundColor: "#FFF", elevation: 1 },
  urgentContent: { flexDirection: "row", alignItems: "center" },
  avatar: { backgroundColor: "#E0E7FF", borderRadius: 12 },
  urgentTextContainer: { flex: 1, marginLeft: 15 },
  urgentName: { fontSize: 15, fontWeight: "800", color: "#1E293B" },
  urgentRoom: { fontSize: 12, color: "#EF4444", fontWeight: "600" },
  urgentAmount: { fontSize: 15, fontWeight: "900", color: "#1E293B" },
});
