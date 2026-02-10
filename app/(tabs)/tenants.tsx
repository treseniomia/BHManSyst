// import React, { useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import {
//   Avatar,
//   Card,
//   IconButton,
//   Portal,
//   Modal,
//   Button,
// } from "react-native-paper";
// import {
//   Search,
//   Filter,
//   Phone,
//   MessageSquare,
//   XCircle,
//   ChevronLeft,
//   Calendar,
//   MapPin,
//   LogOut,
// } from "lucide-react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function TenantListScreen() {
//   const insets = useSafeAreaInsets();
//   const [searchQuery, setSearchQuery] = useState("");

//   // BOSS, apat na ang status natin dito: all, paid, overdue, at advance
//   const [filterStatus, setFilterStatus] = useState<
//     "all" | "paid" | "overdue" | "advance"
//   >("all");

//   const [selectedTenant, setSelectedTenant] = useState<any>(null);

//   const tenants = [
//     {
//       id: "1",
//       name: "Juan Dela Cruz",
//       room: "101",
//       bed: "1-Top",
//       status: "paid",
//       phone: "0912-345-6789",
//       moveIn: "Jan 15, 2024",
//     },
//     {
//       id: "2",
//       name: "Pedro Penduko",
//       room: "102",
//       bed: "1-Bottom",
//       status: "overdue",
//       phone: "0917-111-2222",
//       moveIn: "Feb 01, 2025",
//     },
//     {
//       id: "3",
//       name: "Sisa Dela Cruz",
//       room: "201",
//       bed: "2-Bottom",
//       status: "advance", // Eto yung bida, Boss!
//       phone: "0918-333-4444",
//       moveIn: "Mar 10, 2024",
//     },
//     {
//       id: "4",
//       name: "Maria Clara",
//       room: "105",
//       bed: "3-Top",
//       status: "overdue",
//       phone: "0919-555-6666",
//       moveIn: "Dec 25, 2023",
//     },
//   ];

//   const filteredTenants = useMemo(() => {
//     return tenants.filter((tenant) => {
//       const matchesSearch =
//         tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         tenant.room.includes(searchQuery);
//       const matchesFilter =
//         filterStatus === "all" ? true : tenant.status === filterStatus;
//       return matchesSearch && matchesFilter;
//     });
//   }, [searchQuery, filterStatus]);

//   // BOSS, inayos natin ang rotation para kasama na ang 'advance'
//   const toggleFilter = () => {
//     if (filterStatus === "all") setFilterStatus("paid");
//     else if (filterStatus === "paid") setFilterStatus("overdue");
//     else if (filterStatus === "overdue") setFilterStatus("advance");
//     else setFilterStatus("all");
//   };

//   // Helper function para sa kulay ng status
//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "paid":
//         return { bg: "#DCFCE7", text: "#10B981" };
//       case "overdue":
//         return { bg: "#FEE2E2", text: "#EF4444" };
//       case "advance":
//         return { bg: "#E0F2FE", text: "#0284C7" }; // Blue para sa Advance
//       default:
//         return { bg: "#F1F5F9", text: "#64748B" };
//     }
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Master List</Text>
//           <Text style={styles.subTitle}>
//             Showing {filteredTenants.length} of {tenants.length} tenants
//           </Text>
//         </View>
//         {filterStatus !== "all" && (
//           <View
//             style={[
//               styles.activeFilterChip,
//               { backgroundColor: getStatusStyle(filterStatus).text },
//             ]}
//           >
//             <Text style={styles.activeFilterText}>
//               {filterStatus.toUpperCase()}
//             </Text>
//           </View>
//         )}
//       </View>

//       {/* SEARCH SECTION */}
//       <View style={styles.searchSection}>
//         <View style={styles.searchBar}>
//           <Search size={20} color="#64748B" />
//           <TextInput
//             placeholder="Search tenant or room..."
//             style={styles.searchInput}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           {searchQuery !== "" && (
//             <TouchableOpacity onPress={() => setSearchQuery("")}>
//               <XCircle size={18} color="#CBD5E1" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.filterBtn,
//             filterStatus !== "all" && {
//               backgroundColor: getStatusStyle(filterStatus).text,
//             },
//           ]}
//           onPress={toggleFilter}
//         >
//           <Filter
//             size={20}
//             color={filterStatus !== "all" ? "#FFF" : "#4F46E5"}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* TENANT LIST */}
//       <FlatList
//         data={filteredTenants}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
//         renderItem={({ item }) => (
//           <Card
//             style={styles.tenantCard}
//             onPress={() => setSelectedTenant(item)}
//           >
//             <Card.Content style={styles.cardContent}>
//               <Avatar.Text
//                 size={45}
//                 label={item.name.substring(0, 1)}
//                 style={styles.avatar}
//               />
//               <View style={styles.info}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.roomInfo}>
//                   Room {item.room} • Bed {item.bed}
//                 </Text>
//               </View>
//               <View style={styles.actions}>
//                 <View
//                   style={[
//                     styles.statusChip,
//                     { backgroundColor: getStatusStyle(item.status).bg },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.statusText,
//                       { color: getStatusStyle(item.status).text },
//                     ]}
//                   >
//                     {item.status.toUpperCase()}
//                   </Text>
//                 </View>
//                 <View style={styles.iconRow}>
//                   <IconButton icon="phone" size={18} iconColor="#4F46E5" />
//                   <IconButton icon="message" size={18} iconColor="#10B981" />
//                 </View>
//               </View>
//             </Card.Content>
//           </Card>
//         )}
//       />

//       {/* --- TENANT PROFILE MODAL --- */}
//       <Portal>
//         <Modal
//           visible={!!selectedTenant}
//           onDismiss={() => setSelectedTenant(null)}
//           contentContainerStyle={styles.modalContent}
//         >
//           {selectedTenant && (
//             <ScrollView showsVerticalScrollIndicator={false}>
//               <View style={styles.modalHeader}>
//                 <TouchableOpacity
//                   onPress={() => setSelectedTenant(null)}
//                   style={styles.backBtn}
//                 >
//                   <ChevronLeft size={24} color="#1E293B" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Profile Details</Text>
//                 <View style={{ width: 40 }} />
//               </View>

//               <View style={styles.profileHeader}>
//                 <Avatar.Text
//                   size={80}
//                   label={selectedTenant.name[0]}
//                   style={{ backgroundColor: "#E0E7FF" }}
//                 />
//                 <Text style={styles.profileName}>{selectedTenant.name}</Text>
//                 <View
//                   style={[
//                     styles.statusBadge,
//                     {
//                       backgroundColor: getStatusStyle(selectedTenant.status).bg,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.profileStatusText,
//                       { color: getStatusStyle(selectedTenant.status).text },
//                     ]}
//                   >
//                     {selectedTenant.status.toUpperCase()}
//                   </Text>
//                 </View>
//               </View>

//               <Card style={styles.infoCard}>
//                 <Card.Content>
//                   <View style={styles.row}>
//                     <MapPin size={18} color="#64748B" />
//                     <Text style={styles.rowText}>
//                       Room {selectedTenant.room} - Bed {selectedTenant.bed}
//                     </Text>
//                   </View>
//                   <View style={styles.row}>
//                     <Phone size={18} color="#64748B" />
//                     <Text style={styles.rowText}>{selectedTenant.phone}</Text>
//                   </View>
//                   <View style={styles.row}>
//                     <Calendar size={18} color="#64748B" />
//                     <Text style={styles.rowText}>
//                       Move-in: {selectedTenant.moveIn}
//                     </Text>
//                   </View>
//                 </Card.Content>
//               </Card>

//               <Button
//                 mode="outlined"
//                 onPress={() => setSelectedTenant(null)}
//                 style={styles.moveOutBtn}
//                 textColor="#EF4444"
//                 icon={() => <LogOut size={18} color="#EF4444" />}
//               >
//                 Process Move-out
//               </Button>
//             </ScrollView>
//           )}
//         </Modal>
//       </Portal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   header: {
//     paddingHorizontal: 25,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: { fontSize: 28, fontWeight: "900", color: "#1E293B" },
//   subTitle: { fontSize: 13, color: "#64748B" },
//   activeFilterChip: {
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//   },
//   activeFilterText: { color: "#FFF", fontWeight: "800", fontSize: 10 },
//   searchSection: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     gap: 10,
//     marginBottom: 10,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     paddingHorizontal: 15,
//     borderRadius: 15,
//     height: 50,
//     elevation: 1,
//   },
//   searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
//   filterBtn: {
//     width: 50,
//     height: 50,
//     backgroundColor: "#FFF",
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 1,
//   },
//   tenantCard: {
//     marginBottom: 12,
//     borderRadius: 20,
//     backgroundColor: "#FFF",
//     elevation: 1,
//   },
//   cardContent: { flexDirection: "row", alignItems: "center" },
//   avatar: { backgroundColor: "#E0E7FF" },
//   info: { flex: 1, marginLeft: 15 },
//   name: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
//   roomInfo: { fontSize: 12, color: "#64748B", marginTop: 2 },
//   actions: { alignItems: "flex-end" },
//   statusChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
//   statusText: { fontWeight: "800", fontSize: 10 },
//   iconRow: { flexDirection: "row", marginTop: 5 },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     margin: 20,
//     borderRadius: 30,
//     maxHeight: "80%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   backBtn: { padding: 8, backgroundColor: "#F1F5F9", borderRadius: 12 },
//   headerTitle: { fontSize: 18, fontWeight: "900" },
//   profileHeader: { alignItems: "center", marginBottom: 25 },
//   profileName: { fontSize: 22, fontWeight: "900", marginTop: 15 },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   profileStatusText: { fontSize: 10, fontWeight: "900" },
//   infoCard: {
//     width: "100%",
//     borderRadius: 20,
//     backgroundColor: "#F8FAFC",
//     elevation: 0,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     gap: 10,
//   },
//   rowText: { fontSize: 14, color: "#1E293B", fontWeight: "600" },
//   moveOutBtn: {
//     marginTop: 25,
//     width: "100%",
//     borderRadius: 15,
//     borderColor: "#EF4444",
//     borderWidth: 1.5,
//   },
// });

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Portal,
  Modal,
  Button,
  Surface,
} from "react-native-paper";
import {
  Search,
  Filter,
  XCircle,
  Calendar,
  MapPin,
  LogOut,
  ChevronRight,
  PhoneCall,
  MessageSquareText,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TenantListScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "overdue" | "advance"
  >("all");
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  // MOCK DATA
  const [tenants, setTenants] = useState([
    {
      id: "1",
      name: "Juan Dela Cruz",
      room: "101",
      bed: "1-Top",
      status: "paid",
      phone: "0912-345-6789",
      moveIn: "Jan 15, 2024",
    },
    {
      id: "2",
      name: "Pedro Penduko",
      room: "102",
      bed: "1-Bottom",
      status: "overdue",
      phone: "0917-111-2222",
      moveIn: "Feb 01, 2025",
    },
    {
      id: "3",
      name: "Sisa Dela Cruz",
      room: "201",
      bed: "2-Bottom",
      status: "advance",
      phone: "0918-333-4444",
      moveIn: "Mar 10, 2024",
    },
    {
      id: "4",
      name: "Maria Clara",
      room: "105",
      bed: "3-Top",
      status: "overdue",
      phone: "0919-555-6666",
      moveIn: "Dec 25, 2023",
    },
  ]);

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch =
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.room.includes(searchQuery);
      const matchesFilter =
        filterStatus === "all" ? true : tenant.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus, tenants]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return { bg: "#DCFCE7", text: "#10B981", border: "#BBF7D0" };
      case "overdue":
        return { bg: "#FEE2E2", text: "#EF4444", border: "#FECACA" };
      case "advance":
        return { bg: "#E0F2FE", text: "#0284C7", border: "#BAE6FD" };
      default:
        return { bg: "#F1F5F9", text: "#64748B", border: "#E2E8F0" };
    }
  };

  const handleMoveOut = (tenantId: string) => {
    // DITO BOSS: Sa susunod, ise-save muna natin ito sa 'old_tenants' table sa Firebase
    // bago natin i-delete sa main list.
    const tenantToMove = tenants.find((t) => t.id === tenantId);
    console.log("Moving out:", tenantToMove?.name);

    setTenants((prev) => prev.filter((t) => t.id !== tenantId));
    setSelectedTenant(null);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Master List</Text>
          <Text style={styles.subTitle}>
            {filteredTenants.length} Active Residents
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterStatus !== "all" && { backgroundColor: "#4F46E5" },
          ]}
          onPress={() => {
            const flow: any = {
              all: "paid",
              paid: "overdue",
              overdue: "advance",
              advance: "all",
            };
            setFilterStatus(flow[filterStatus]);
          }}
        >
          <Filter
            size={20}
            color={filterStatus !== "all" ? "#FFF" : "#4F46E5"}
          />
          {filterStatus !== "all" && <View style={styles.filterDot} />}
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchWrapper}>
        <Surface style={styles.searchBar} elevation={1}>
          <Search size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search name or room..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <XCircle size={18} color="#CBD5E1" />
            </TouchableOpacity>
          )}
        </Surface>
      </View>

      {/* TENANT LIST */}
      <FlatList
        data={filteredTenants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        renderItem={({ item }) => {
          const style = getStatusStyle(item.status);
          return (
            <Card
              style={styles.tenantCard}
              onPress={() => setSelectedTenant(item)}
            >
              <Card.Content style={styles.cardContent}>
                <Avatar.Text
                  size={48}
                  label={item.name.substring(0, 1)}
                  style={styles.avatar}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <View style={styles.mainInfo}>
                  <Text style={styles.tenantName}>{item.name}</Text>
                  <View style={styles.locationTag}>
                    <MapPin size={12} color="#94A3B8" />
                    <Text style={styles.locationText}>
                      RM {item.room} • {item.bed}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardRight}>
                  <View
                    style={[
                      styles.statusTag,
                      { backgroundColor: style.bg, borderColor: style.border },
                    ]}
                  >
                    <Text style={[styles.statusTagText, { color: style.text }]}>
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                  <ChevronRight size={18} color="#CBD5E1" />
                </View>
              </Card.Content>
            </Card>
          );
        }}
      />

      {/* TENANT MODAL */}
      <Portal>
        <Modal
          visible={!!selectedTenant}
          onDismiss={() => setSelectedTenant(null)}
          contentContainerStyle={styles.modalUI}
        >
          {selectedTenant && (
            <View>
              <View style={styles.modalIndicator} />

              <View style={styles.modalProfileHeader}>
                <Avatar.Text
                  size={70}
                  label={selectedTenant.name[0]}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalName}>{selectedTenant.name}</Text>
                <View
                  style={[
                    styles.statusTag,
                    {
                      backgroundColor: getStatusStyle(selectedTenant.status).bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusTagText,
                      { color: getStatusStyle(selectedTenant.status).text },
                    ]}
                  >
                    {selectedTenant.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Surface style={styles.infoBox} elevation={0}>
                <View style={styles.infoRow}>
                  <PhoneCall size={18} color="#64748B" />
                  <Text style={styles.infoRowText}>{selectedTenant.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Calendar size={18} color="#64748B" />
                  <Text style={styles.infoRowText}>
                    Started: {selectedTenant.moveIn}
                  </Text>
                </View>
              </Surface>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <View
                    style={[styles.actionIcon, { backgroundColor: "#EEF2FF" }]}
                  >
                    <PhoneCall size={20} color="#4F46E5" />
                  </View>
                  <Text style={styles.actionBtnText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <View
                    style={[styles.actionIcon, { backgroundColor: "#F0FDF4" }]}
                  >
                    <MessageSquareText size={20} color="#10B981" />
                  </View>
                  <Text style={styles.actionBtnText}>SMS</Text>
                </TouchableOpacity>
              </View>

              <Button
                mode="outlined"
                onPress={() => handleMoveOut(selectedTenant.id)}
                style={styles.moveOutButton}
                textColor="#EF4444"
                icon="logout"
              >
                Process Move-out
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFF" },
  header: {
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1E293B",
    letterSpacing: -1,
  },
  subTitle: { fontSize: 14, color: "#94A3B8", fontWeight: "600" },

  /* Search & Filter */
  searchWrapper: { paddingHorizontal: 20, marginBottom: 10 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    borderRadius: 20,
    height: 55,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: "500" },
  filterBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  filterDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  /* Card Styles */
  tenantCard: {
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F8FAFC",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  avatar: { backgroundColor: "#F1F5F9" },
  mainInfo: { flex: 1, marginLeft: 15 },
  tenantName: { fontSize: 17, fontWeight: "800", color: "#1E293B" },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  locationText: { fontSize: 13, color: "#94A3B8", fontWeight: "600" },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusTagText: { fontWeight: "900", fontSize: 10 },

  /* Modal UI */
  modalUI: {
    backgroundColor: "white",
    padding: 25,
    margin: 20,
    borderRadius: 35,
    paddingBottom: 35,
  },
  modalIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalProfileHeader: { alignItems: "center", marginBottom: 25 },
  modalAvatar: { backgroundColor: "#F1F5F9" },
  modalName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E293B",
    marginTop: 12,
    marginBottom: 6,
  },
  infoBox: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 25,
    gap: 12,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoRowText: { fontSize: 15, fontWeight: "600", color: "#475569" },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
  },
  actionBtn: { alignItems: "center", gap: 8 },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: { fontSize: 12, fontWeight: "800", color: "#64748B" },
  moveOutButton: {
    borderRadius: 18,
    borderWidth: 1.5,
    height: 50,
    justifyContent: "center",
  },
});
