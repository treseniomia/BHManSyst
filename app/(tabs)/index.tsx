// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Platform,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   Card,
//   Avatar,
//   IconButton,
//   Checkbox,
//   Surface,
// } from "react-native-paper";
// import {
//   Users,
//   DoorOpen,
//   TrendingUp,
//   AlertCircle,
//   Wallet,
//   ArrowUpRight,
//   Plus,
//   Bell,
//   Trash2,
//   CheckCircle2,
//   LayoutGrid,
//   Smartphone,
//   Banknote,
//   History,
// } from "lucide-react-native";
// import { useRouter } from "expo-router";

// export default function DashboardScreen() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();

//   const dateToday = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "short",
//     day: "numeric",
//   });

//   // Sample tasks
//   const [tasks, setTasks] = useState([
//     { id: 1, text: "Verify water bill for Room 201", completed: false },
//     { id: 2, text: "Sink repair in Unit B", completed: true },
//   ]);
//   const [newTask, setNewTask] = useState("");

//   const addTask = () => {
//     if (newTask.trim().length > 0) {
//       setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
//       setNewTask("");
//     }
//   };

//   const toggleTask = (id: number) => {
//     setTasks(
//       tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
//     );
//   };

//   const deleteTask = (id: number) => {
//     setTasks(tasks.filter((t) => t.id !== id));
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       {/* --- ELITE HEADER --- */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.adminName}>Dashboard</Text>
//           <Text style={styles.dateText}>{dateToday}</Text>
//         </View>
//         <View style={styles.headerIcons}>
//           <TouchableOpacity
//             style={styles.notifBtn}
//             onPress={() => router.push("/notifications")}
//           >
//             <Bell size={20} color="#1E293B" strokeWidth={2.5} />
//             <View style={styles.notifBadge} />
//           </TouchableOpacity>
//           <Surface style={styles.profileSurface} elevation={2}>
//             <Avatar.Image
//               size={44}
//               source={{ uri: "https://i.pravatar.cc/150?u=boss_admin" }}
//             />
//           </Surface>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* --- CASH POSITION (NEW AUDIT TRAIL FEATURE) --- */}
//         <Text style={styles.sectionTitleMain}>Current Cash Position</Text>
//         <View style={styles.cashGrid}>
//           <Surface style={styles.cashCard} elevation={1}>
//             <View style={styles.cashHeader}>
//               <Banknote size={18} color="#10B981" />
//               <Text style={styles.cashLabel}>On-Hand Cash</Text>
//             </View>
//             <Text style={styles.cashValue}>₱15,200</Text>
//           </Surface>

//           <Surface
//             style={[styles.cashCard, { borderColor: "#0EA5E9" }]}
//             elevation={1}
//           >
//             <View style={styles.cashHeader}>
//               <Smartphone size={18} color="#0EA5E9" />
//               <Text style={styles.cashLabel}>GCash Wallet</Text>
//             </View>
//             <Text style={[styles.cashValue, { color: "#0EA5E9" }]}>
//               ₱50,000
//             </Text>
//           </Surface>
//         </View>

//         {/* --- PERFORMANCE INSIGHTS --- */}
//         <View style={styles.statsGrid}>
//           <StatCard
//             icon={<Users size={20} color="#6366F1" />}
//             label="Tenants"
//             value="24"
//             trend="+2"
//           />
//           <StatCard
//             icon={<DoorOpen size={20} color="#10B981" />}
//             label="Available"
//             value="06"
//             trend="Full"
//           />
//           <StatCard
//             icon={<TrendingUp size={20} color="#F59E0B" />}
//             label="Revenue"
//             value="₱65.2k"
//             trend="92%"
//           />
//           <StatCard
//             icon={<Wallet size={20} color="#0EA5E9" />}
//             label="Adv. Pay"
//             value="₱12.0k"
//             trend="High"
//           />
//         </View>

//         {/* --- PROFESSIONAL TASK MANAGER --- */}
//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionTitleRow}>
//             <CheckCircle2 size={20} color="#1E293B" />
//             <Text style={styles.sectionTitle}>Priority Tasks</Text>
//           </View>
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{tasks.length}</Text>
//           </View>
//         </View>

//         <Card style={styles.taskCard}>
//           <Card.Content>
//             <View style={styles.inputWrapper}>
//               <TextInput
//                 style={styles.taskInput}
//                 placeholder="Assign a new task..."
//                 placeholderTextColor="#94A3B8"
//                 value={newTask}
//                 onChangeText={setNewTask}
//               />
//               <TouchableOpacity style={styles.addBtn} onPress={addTask}>
//                 <Plus size={20} color="#FFF" strokeWidth={3} />
//               </TouchableOpacity>
//             </View>
//             {tasks.map((task) => (
//               <View key={task.id} style={styles.taskItem}>
//                 <Checkbox.Android
//                   status={task.completed ? "checked" : "unchecked"}
//                   onPress={() => toggleTask(task.id)}
//                   color="#6366F1"
//                 />
//                 <Text
//                   style={[styles.taskText, task.completed && styles.taskDone]}
//                 >
//                   {task.text}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.deleteTaskBtn}
//                   onPress={() => deleteTask(task.id)}
//                 >
//                   <Trash2 size={16} color="#CBD5E1" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </Card.Content>
//         </Card>

//         {/* --- URGENT ATTENTION --- */}
//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionTitleRow}>
//             <AlertCircle size={20} color="#EF4444" />
//             <Text style={styles.sectionTitle}>Critical Alerts</Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.urgentBanner}
//           onPress={() => router.push("/tenants")}
//         >
//           <View style={styles.urgentIconBox}>
//             <AlertCircle size={24} color="#FFF" />
//           </View>
//           <View style={{ flex: 1, marginLeft: 15 }}>
//             <Text style={styles.urgentLabel}>4 Overdue Accounts</Text>
//             <Text style={styles.urgentSub}>
//               Action required for Room 102, 205...
//             </Text>
//           </View>
//           <ArrowUpRight size={20} color="#EF4444" />
//         </TouchableOpacity>

//         {/* --- RECENT ACTIVITY LOG (WITH GCash/Cash TAGS) --- */}
//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionTitleRow}>
//             <History size={20} color="#1E293B" />
//             <Text style={styles.sectionTitle}>Payment Audit Trail</Text>
//           </View>
//         </View>

//         <ActivityItem
//           title="Rental Payment"
//           sub="Maria Clara • Room 204"
//           method="GCash"
//           amount="₱3,500"
//           time="2h ago"
//         />
//         <ActivityItem
//           title="Security Deposit"
//           sub="Juan Dela Cruz • Room 101"
//           method="Cash"
//           amount="₱5,000"
//           time="5h ago"
//         />
//         <ActivityItem
//           title="Utility Payment"
//           sub="Leonor Rivera • Room 105"
//           method="GCash"
//           amount="₱850"
//           time="1d ago"
//         />

//         <View style={{ height: 100 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // REUSABLE COMPONENTS
// const StatCard = ({ icon, label, value, trend }: any) => (
//   <Surface style={styles.statItem} elevation={1}>
//     <View style={styles.statHeader}>
//       <View style={styles.statIconBox}>{icon}</View>
//       <Text style={styles.trendText}>{trend}</Text>
//     </View>
//     <Text style={styles.statValue}>{value}</Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </Surface>
// );

// const ActivityItem = ({ title, sub, amount, method, time }: any) => (
//   <View style={styles.activityRow}>
//     <View style={{ flex: 1 }}>
//       <View style={styles.activityHeader}>
//         <Text style={styles.activityTitle}>{title}</Text>
//         <View
//           style={[
//             styles.methodBadge,
//             { backgroundColor: method === "GCash" ? "#E0F2FE" : "#DCFCE7" },
//           ]}
//         >
//           <Text
//             style={[
//               styles.methodText,
//               { color: method === "GCash" ? "#0EA5E9" : "#10B981" },
//             ]}
//           >
//             {method}
//           </Text>
//         </View>
//       </View>
//       <Text style={styles.activitySub}>{sub}</Text>
//     </View>
//     <View style={{ alignItems: "flex-end" }}>
//       <Text style={styles.activityAmount}>{amount}</Text>
//       <Text style={styles.activityTime}>{time}</Text>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FDFDFF" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 25,
//     paddingVertical: 20,
//     backgroundColor: "#FFF",
//   },
//   dateText: {
//     fontSize: 12,
//     color: "#94A3B8",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   adminName: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
//   headerIcons: { flexDirection: "row", alignItems: "center", gap: 15 },
//   notifBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     backgroundColor: "#F8FAFC",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   notifBadge: {
//     position: "absolute",
//     top: 11,
//     right: 11,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#EF4444",
//     borderWidth: 2,
//     borderColor: "#FFF",
//   },
//   profileSurface: { borderRadius: 22 },

//   scrollContent: { paddingHorizontal: 20, paddingTop: 10 },

//   sectionTitleMain: {
//     fontSize: 14,
//     fontWeight: "800",
//     color: "#64748B",
//     marginBottom: 12,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   cashGrid: { flexDirection: "row", gap: 12, marginBottom: 25 },
//   cashCard: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 20,
//     backgroundColor: "#FFF",
//     borderWidth: 1.5,
//     borderColor: "#F1F5F9",
//   },
//   cashHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 8,
//   },
//   cashLabel: { fontSize: 11, fontWeight: "700", color: "#64748B" },
//   cashValue: { fontSize: 20, fontWeight: "900", color: "#10B981" },

//   statsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 12,
//     marginBottom: 30,
//   },
//   statItem: {
//     width: "48%",
//     padding: 16,
//     borderRadius: 24,
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   statHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   statIconBox: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: "#F8FAFC",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   trendText: {
//     fontSize: 10,
//     fontWeight: "800",
//     color: "#10B981",
//     backgroundColor: "#F0FDF4",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   statValue: { fontSize: 24, fontWeight: "900", color: "#1E293B" },
//   statLabel: { fontSize: 12, fontWeight: "600", color: "#64748B" },

//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
//   sectionTitle: { fontSize: 16, fontWeight: "900", color: "#1E293B" },
//   badge: {
//     backgroundColor: "#F1F5F9",
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   badgeText: { fontSize: 11, fontWeight: "800", color: "#6366F1" },
//   viewAllText: { color: "#6366F1", fontWeight: "800", fontSize: 12 },

//   taskCard: {
//     borderRadius: 24,
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 30,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 20,
//     backgroundColor: "#F8FAFC",
//     padding: 6,
//     borderRadius: 16,
//   },
//   taskInput: {
//     flex: 1,
//     paddingHorizontal: 12,
//     fontSize: 14,
//     color: "#1E293B",
//     fontWeight: "600",
//   },
//   addBtn: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#6366F1",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   taskItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//   taskText: {
//     flex: 1,
//     fontSize: 14,
//     color: "#475569",
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   taskDone: { textDecorationLine: "line-through", color: "#CBD5E1" },
//   deleteTaskBtn: { padding: 8 },

//   urgentBanner: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     padding: 16,
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: "#FEE2E2",
//     marginBottom: 30,
//   },
//   urgentIconBox: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     backgroundColor: "#EF4444",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   urgentLabel: { fontSize: 15, fontWeight: "800", color: "#1E293B" },
//   urgentSub: { fontSize: 12, color: "#94A3B8", fontWeight: "500" },

//   activityRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     padding: 16,
//     borderRadius: 24,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   activityHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
//   activityTitle: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
//   methodBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
//   methodText: { fontSize: 10, fontWeight: "800" },
//   activitySub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
//   activityAmount: { fontSize: 15, fontWeight: "900", color: "#1E293B" },
//   activityTime: {
//     fontSize: 10,
//     color: "#CBD5E1",
//     fontWeight: "700",
//     marginTop: 2,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  Avatar,
  IconButton,
  Checkbox,
  Surface,
} from "react-native-paper";
import {
  Users,
  DoorOpen,
  TrendingUp,
  AlertCircle,
  Wallet,
  ArrowUpRight,
  Plus,
  Bell,
  Trash2,
  CheckCircle2,
  LayoutGrid,
  Smartphone,
  Banknote,
  History,
  BarChart3,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const dateToday = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // Sample data para sa Bar Graph (Revenue per month)
  const monthlyData = [
    { month: "Sep", value: 45000 },
    { month: "Oct", value: 52000 },
    { month: "Nov", value: 48000 },
    { month: "Dec", value: 70000 },
    { month: "Jan", value: 65200 }, // Current
  ];

  const maxValue = Math.max(...monthlyData.map((d) => d.value));

  // Sample tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: "Verify water bill for Room 201", completed: false },
    { id: 2, text: "Sink repair in Unit B", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim().length > 0) {
      setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* --- ELITE HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.adminName}>Dashboard</Text>
          <Text style={styles.dateText}>{dateToday}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => router.push("/notifications")}
          >
            <Bell size={20} color="#1E293B" strokeWidth={2.5} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
          <Surface style={styles.profileSurface} elevation={2}>
            <Avatar.Image
              size={44}
              source={{ uri: "https://i.pravatar.cc/150?u=boss_admin" }}
            />
          </Surface>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- CASH POSITION --- */}
        <Text style={styles.sectionTitleMain}>Current Cash Position</Text>
        <View style={styles.cashGrid}>
          <Surface style={styles.cashCard} elevation={1}>
            <View style={styles.cashHeader}>
              <Banknote size={18} color="#10B981" />
              <Text style={styles.cashLabel}>On-Hand Cash</Text>
            </View>
            <Text style={styles.cashValue}>₱15,200</Text>
          </Surface>

          <Surface
            style={[styles.cashCard, { borderColor: "#0EA5E9" }]}
            elevation={1}
          >
            <View style={styles.cashHeader}>
              <Smartphone size={18} color="#0EA5E9" />
              <Text style={styles.cashLabel}>GCash Wallet</Text>
            </View>
            <Text style={[styles.cashValue, { color: "#0EA5E9" }]}>
              ₱50,000
            </Text>
          </Surface>
        </View>

        {/* --- PERFORMANCE INSIGHTS --- */}
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Users size={20} color="#6366F1" />}
            label="Tenants"
            value="24"
            trend="+2"
          />
          <StatCard
            icon={<DoorOpen size={20} color="#10B981" />}
            label="Available"
            value="06"
            trend="Full"
          />
          <StatCard
            icon={<TrendingUp size={20} color="#F59E0B" />}
            label="Revenue"
            value="₱65.2k"
            trend="92%"
          />
          <StatCard
            icon={<Wallet size={20} color="#0EA5E9" />}
            label="Adv. Pay"
            value="₱12.0k"
            trend="High"
          />
        </View>

        {/* --- REVENUE ANALYTICS BAR GRAPH (NEW ADDITION) --- */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <BarChart3 size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>Revenue Growth</Text>
          </View>
          <Text style={styles.viewAllText}>Last 5 Months</Text>
        </View>

        <Surface style={styles.chartCard} elevation={1}>
          <View style={styles.chartContainer}>
            {monthlyData.map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (item.value / maxValue) * 120, // Dynamic height
                      backgroundColor:
                        index === monthlyData.length - 1
                          ? "#6366F1"
                          : "#E2E8F0",
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{item.month}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartInfo}>
            <Text style={styles.chartSubText}>
              Highest:{" "}
              <Text style={{ fontWeight: "900", color: "#1E293B" }}>₱70k</Text>
            </Text>
            <View style={styles.trendBadge}>
              <TrendingUp size={12} color="#10B981" />
              <Text style={styles.trendBadgeText}>+12.5%</Text>
            </View>
          </View>
        </Surface>

        {/* --- PROFESSIONAL TASK MANAGER --- */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <CheckCircle2 size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>Priority Tasks</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tasks.length}</Text>
          </View>
        </View>

        <Card style={styles.taskCard}>
          <Card.Content>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.taskInput}
                placeholder="Assign a new task..."
                placeholderTextColor="#94A3B8"
                value={newTask}
                onChangeText={setNewTask}
              />
              <TouchableOpacity style={styles.addBtn} onPress={addTask}>
                <Plus size={20} color="#FFF" strokeWidth={3} />
              </TouchableOpacity>
            </View>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <Checkbox.Android
                  status={task.completed ? "checked" : "unchecked"}
                  onPress={() => toggleTask(task.id)}
                  color="#6366F1"
                />
                <Text
                  style={[styles.taskText, task.completed && styles.taskDone]}
                >
                  {task.text}
                </Text>
                <TouchableOpacity
                  style={styles.deleteTaskBtn}
                  onPress={() => deleteTask(task.id)}
                >
                  <Trash2 size={16} color="#CBD5E1" />
                </TouchableOpacity>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* --- URGENT ATTENTION --- */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <AlertCircle size={20} color="#EF4444" />
            <Text style={styles.sectionTitle}>Critical Alerts</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.urgentBanner}
          onPress={() => router.push("/tenants")}
        >
          <View style={styles.urgentIconBox}>
            <AlertCircle size={24} color="#FFF" />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.urgentLabel}>4 Overdue Accounts</Text>
            <Text style={styles.urgentSub}>
              Action required for Room 102, 205...
            </Text>
          </View>
          <ArrowUpRight size={20} color="#EF4444" />
        </TouchableOpacity>

        {/* --- RECENT ACTIVITY LOG --- */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <History size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>Payment Audit Trail</Text>
          </View>
        </View>

        <ActivityItem
          title="Rental Payment"
          sub="Maria Clara • Room 204"
          method="GCash"
          amount="₱3,500"
          time="2h ago"
        />
        <ActivityItem
          title="Security Deposit"
          sub="Juan Dela Cruz • Room 101"
          method="Cash"
          amount="₱5,000"
          time="5h ago"
        />
        <ActivityItem
          title="Utility Payment"
          sub="Leonor Rivera • Room 105"
          method="GCash"
          amount="₱850"
          time="1d ago"
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

// REUSABLE COMPONENTS
const StatCard = ({ icon, label, value, trend }: any) => (
  <Surface style={styles.statItem} elevation={1}>
    <View style={styles.statHeader}>
      <View style={styles.statIconBox}>{icon}</View>
      <Text style={styles.trendText}>{trend}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Surface>
);

const ActivityItem = ({ title, sub, amount, method, time }: any) => (
  <View style={styles.activityRow}>
    <View style={{ flex: 1 }}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>{title}</Text>
        <View
          style={[
            styles.methodBadge,
            { backgroundColor: method === "GCash" ? "#E0F2FE" : "#DCFCE7" },
          ]}
        >
          <Text
            style={[
              styles.methodText,
              { color: method === "GCash" ? "#0EA5E9" : "#10B981" },
            ]}
          >
            {method}
          </Text>
        </View>
      </View>
      <Text style={styles.activitySub}>{sub}</Text>
    </View>
    <View style={{ alignItems: "flex-end" }}>
      <Text style={styles.activityAmount}>{amount}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: "#FFF",
  },
  dateText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  adminName: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 15 },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  notifBadge: {
    position: "absolute",
    top: 11,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  profileSurface: { borderRadius: 22 },

  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },

  sectionTitleMain: {
    fontSize: 14,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cashGrid: { flexDirection: "row", gap: 12, marginBottom: 25 },
  cashCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#F1F5F9",
  },
  cashHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  cashLabel: { fontSize: 11, fontWeight: "700", color: "#64748B" },
  cashValue: { fontSize: 20, fontWeight: "900", color: "#10B981" },

  // --- CHART STYLES ---
  chartCard: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 30,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    paddingBottom: 10,
  },
  barWrapper: { alignItems: "center", width: "15%" },
  bar: { width: 14, borderRadius: 6 },
  barLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    marginTop: 10,
  },
  chartInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  chartSubText: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendBadgeText: { fontSize: 11, fontWeight: "800", color: "#10B981" },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 30,
  },
  statItem: {
    width: "48%",
    padding: 16,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  trendText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#10B981",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statValue: { fontSize: 24, fontWeight: "900", color: "#1E293B" },
  statLabel: { fontSize: 12, fontWeight: "600", color: "#64748B" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: "#1E293B" },
  badge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { fontSize: 11, fontWeight: "800", color: "#6366F1" },
  viewAllText: { color: "#6366F1", fontWeight: "800", fontSize: 12 },

  taskCard: {
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
    padding: 6,
    borderRadius: 16,
  },
  taskInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "600",
  },
  addBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#6366F1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  taskItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
    marginLeft: 8,
  },
  taskDone: { textDecorationLine: "line-through", color: "#CBD5E1" },
  deleteTaskBtn: { padding: 8 },

  urgentBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    marginBottom: 30,
  },
  urgentIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  urgentLabel: { fontSize: 15, fontWeight: "800", color: "#1E293B" },
  urgentSub: { fontSize: 12, color: "#94A3B8", fontWeight: "500" },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  activityHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  activityTitle: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
  methodBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  methodText: { fontSize: 10, fontWeight: "800" },
  activitySub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  activityAmount: { fontSize: 15, fontWeight: "900", color: "#1E293B" },
  activityTime: {
    fontSize: 10,
    color: "#CBD5E1",
    fontWeight: "700",
    marginTop: 2,
  },
});
