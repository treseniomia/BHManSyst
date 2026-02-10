// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import {
//   Card,
//   FAB,
//   Badge,
//   Searchbar,
//   Chip,
//   Portal,
//   Modal,
//   TextInput,
//   Button,
//   Divider,
// } from "react-native-paper";
// import { DoorOpen, Users, PlusCircle, Layers } from "lucide-react-native";
// import { useRouter } from "expo-router";

// interface Room {
//   id: string;
//   roomNumber: string;
//   floor: string;
//   occupiedBeds: number;
//   totalBeds: number;
//   status: "Available" | "Full";
// }

// export default function RoomsScreen() {
//   const router = useRouter();

//   // States
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState<"All" | "Available" | "Full">("All");
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Form States para sa bagong Room
//   const [newRoomNum, setNewRoomNum] = useState("");
//   const [newFloor, setNewFloor] = useState("");
//   const [newTotalBeds, setNewTotalBeds] = useState("");

//   // Room List Data
//   const [rooms, setRooms] = useState<Room[]>([
//     {
//       id: "101",
//       roomNumber: "101",
//       floor: "1st Floor",
//       occupiedBeds: 4,
//       totalBeds: 6,
//       status: "Available",
//     },
//     {
//       id: "102",
//       roomNumber: "102",
//       floor: "1st Floor",
//       occupiedBeds: 6,
//       totalBeds: 6,
//       status: "Full",
//     },
//     {
//       id: "201",
//       roomNumber: "201",
//       floor: "2nd Floor",
//       occupiedBeds: 0,
//       totalBeds: 6,
//       status: "Available",
//     },
//   ]);

//   // Handle adding new room
//   const handleAddRoom = () => {
//     if (!newRoomNum || !newTotalBeds) return;

//     const newRoom: Room = {
//       id: newRoomNum,
//       roomNumber: newRoomNum,
//       floor: newFloor || "1st Floor",
//       occupiedBeds: 0,
//       totalBeds: parseInt(newTotalBeds),
//       status: "Available",
//     };

//     setRooms([...rooms, newRoom]);
//     setIsModalVisible(false);
//     // Reset inputs
//     setNewRoomNum("");
//     setNewFloor("");
//     setNewTotalBeds("");
//   };

//   const filteredRooms = rooms.filter((room) => {
//     const matchesSearch = room.roomNumber.includes(searchQuery);
//     const matchesFilter = filter === "All" || room.status === filter;
//     return matchesSearch && matchesFilter;
//   });

//   const renderRoom = ({ item }: { item: Room }) => (
//     <TouchableOpacity
//       style={styles.cardWrapper}
//       onPress={() => router.push(`/room-details/${item.id}`)}
//     >
//       <Card style={styles.roomCard}>
//         <Card.Content>
//           <View style={styles.cardHeader}>
//             <DoorOpen
//               color={item.status === "Full" ? "#64748B" : "#4F46E5"}
//               size={28}
//             />
//             <Badge
//               style={[
//                 styles.badge,
//                 {
//                   backgroundColor:
//                     item.status === "Full" ? "#EF4444" : "#10B981",
//                 },
//               ]}
//             >
//               {item.status}
//             </Badge>
//           </View>
//           <Text style={styles.roomNum}>Room {item.roomNumber}</Text>
//           <Text style={styles.floorText}>{item.floor}</Text>
//           <View style={styles.statsRow}>
//             <Users size={14} color="#64748B" />
//             <Text style={styles.statsText}>
//               {item.occupiedBeds}/{item.totalBeds} Beds
//             </Text>
//           </View>
//         </Card.Content>
//       </Card>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Manage Rooms</Text>
//         <Searchbar
//           placeholder="Search Room..."
//           onChangeText={setSearchQuery}
//           value={searchQuery}
//           style={styles.searchBar}
//           iconColor="#4F46E5"
//         />
//         <View style={styles.filterRow}>
//           {["All", "Available", "Full"].map((type) => (
//             <Chip
//               key={type}
//               selected={filter === type}
//               onPress={() => setFilter(type as any)}
//               style={[
//                 styles.chip,
//                 filter === type && { backgroundColor: "#4F46E5" },
//               ]}
//               textStyle={{ color: filter === type ? "#FFF" : "#64748B" }}
//               showSelectedCheck={false}
//             >
//               {type}
//             </Chip>
//           ))}
//         </View>
//       </View>

//       <FlatList
//         data={filteredRooms}
//         renderItem={renderRoom}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//       />

//       {/* ADD ROOM MODAL */}
//       <Portal>
//         <Modal
//           visible={isModalVisible}
//           onDismiss={() => setIsModalVisible(false)}
//           contentContainerStyle={styles.modalContent}
//         >
//           <Text style={styles.modalTitle}>Add New Room</Text>
//           <Divider style={styles.divider} />

//           <TextInput
//             label="Room Number"
//             mode="outlined"
//             placeholder="e.g. 301"
//             value={newRoomNum}
//             onChangeText={setNewRoomNum}
//             style={styles.input}
//             left={
//               <TextInput.Icon
//                 icon={() => <DoorOpen size={20} color="#64748B" />}
//               />
//             }
//           />

//           <TextInput
//             label="Floor Level"
//             mode="outlined"
//             placeholder="e.g. 3rd Floor"
//             value={newFloor}
//             onChangeText={setNewFloor}
//             style={styles.input}
//             left={
//               <TextInput.Icon
//                 icon={() => <Layers size={20} color="#64748B" />}
//               />
//             }
//           />

//           <TextInput
//             label="Total Beds"
//             mode="outlined"
//             keyboardType="numeric"
//             placeholder="e.g. 4"
//             value={newTotalBeds}
//             onChangeText={setNewTotalBeds}
//             style={styles.input}
//             left={
//               <TextInput.Icon
//                 icon={() => <Users size={20} color="#64748B" />}
//               />
//             }
//           />

//           <View style={styles.modalButtons}>
//             <Button
//               mode="outlined"
//               onPress={() => setIsModalVisible(false)}
//               style={styles.btn}
//             >
//               Cancel
//             </Button>
//             <Button
//               mode="contained"
//               onPress={handleAddRoom}
//               style={[styles.btn, { backgroundColor: "#4F46E5" }]}
//             >
//               Create Room
//             </Button>
//           </View>
//         </Modal>
//       </Portal>

//       <FAB
//         icon="plus"
//         label="New Room"
//         style={styles.fab}
//         onPress={() => setIsModalVisible(true)}
//         color="#FFF"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 20,
//     backgroundColor: "#FFF",
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     elevation: 4,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#1E293B",
//     marginBottom: 15,
//   },
//   searchBar: {
//     backgroundColor: "#F1F5F9",
//     borderRadius: 12,
//     elevation: 0,
//     height: 45,
//   },
//   filterRow: { flexDirection: "row", marginTop: 15, gap: 8 },
//   chip: { borderRadius: 20, backgroundColor: "#E2E8F0" },
//   listContainer: { padding: 10, paddingTop: 20 },
//   cardWrapper: { flex: 1, margin: 8 },
//   roomCard: { borderRadius: 20, backgroundColor: "#FFF", elevation: 2 },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   badge: { color: "#FFF", fontWeight: "bold" },
//   roomNum: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
//   floorText: { fontSize: 13, color: "#64748B", marginBottom: 8 },
//   statsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
//   statsText: { fontSize: 11, color: "#64748B", fontWeight: "600" },
//   fab: {
//     position: "absolute",
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#4F46E5",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 25,
//     margin: 20,
//     borderRadius: 25,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: "#1E293B",
//     marginBottom: 10,
//   },
//   divider: { marginBottom: 20 },
//   input: { marginBottom: 15, backgroundColor: "#FFF" },
//   modalButtons: { flexDirection: "row", gap: 10, marginTop: 10 },
//   btn: { flex: 1, borderRadius: 10 },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Card,
  FAB,
  Searchbar,
  Chip,
  Portal,
  Modal,
  TextInput,
  Button,
  Divider,
  Surface,
  ProgressBar,
} from "react-native-paper";
import { DoorOpen, Users, Layers, Search, Filter } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Room {
  id: string;
  roomNumber: string;
  floor: string;
  occupiedBeds: number;
  totalBeds: number;
  status: "Available" | "Full";
}

export default function RoomsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Available" | "Full">("All");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form States
  const [newRoomNum, setNewRoomNum] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [newTotalBeds, setNewTotalBeds] = useState("");

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "101",
      roomNumber: "101",
      floor: "1st Floor",
      occupiedBeds: 4,
      totalBeds: 6,
      status: "Available",
    },
    {
      id: "102",
      roomNumber: "102",
      floor: "1st Floor",
      occupiedBeds: 6,
      totalBeds: 6,
      status: "Full",
    },
    {
      id: "201",
      roomNumber: "201",
      floor: "2nd Floor",
      occupiedBeds: 0,
      totalBeds: 6,
      status: "Available",
    },
  ]);

  const handleAddRoom = () => {
    if (!newRoomNum || !newTotalBeds) return;
    const newRoom: Room = {
      id: newRoomNum,
      roomNumber: newRoomNum,
      floor: newFloor || "1st Floor",
      occupiedBeds: 0,
      totalBeds: parseInt(newTotalBeds),
      status: "Available",
    };
    setRooms([...rooms, newRoom]);
    setIsModalVisible(false);
    setNewRoomNum("");
    setNewFloor("");
    setNewTotalBeds("");
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNumber.includes(searchQuery);
    const matchesFilter = filter === "All" || room.status === filter;
    return matchesSearch && matchesFilter;
  });

  const renderRoom = ({ item }: { item: Room }) => {
    const occupancyRatio = item.occupiedBeds / item.totalBeds;
    const isFull = item.status === "Full";

    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => router.push(`/room-details/${item.id}`)}
        activeOpacity={0.7}
      >
        <Surface style={styles.roomCard} elevation={1}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isFull ? "#F1F5F9" : "#EEF2FF" },
              ]}
            >
              <DoorOpen
                color={isFull ? "#94A3B8" : "#6366F1"}
                size={22}
                strokeWidth={2.5}
              />
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isFull ? "#FEE2E2" : "#DCFCE7" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: isFull ? "#EF4444" : "#10B981" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>

          <Text style={styles.roomNum}>Room {item.roomNumber}</Text>
          <Text style={styles.floorText}>{item.floor}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.occupancyLabel}>Occupancy</Text>
              <Text style={styles.occupancyValue}>
                {item.occupiedBeds}/{item.totalBeds}
              </Text>
            </View>
            <ProgressBar
              progress={occupancyRatio}
              color={isFull ? "#EF4444" : "#6366F1"}
              style={styles.progressBar}
            />
          </View>
        </Surface>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* --- MODERN HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Manage Rooms</Text>
          </View>
        </View>

        <Searchbar
          placeholder="Search Room Number..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6366F1"
          placeholderTextColor="#94A3B8"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {["All", "Available", "Full"].map((type) => (
            <Chip
              key={type}
              selected={filter === type}
              onPress={() => setFilter(type as any)}
              style={[styles.chip, filter === type && styles.chipSelected]}
              textStyle={[
                styles.chipText,
                filter === type && styles.chipTextSelected,
              ]}
              showSelectedCheck={false}
            >
              {type}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredRooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* --- ADD ROOM MODAL --- */}
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>New Unit Entry</Text>
          <Text style={styles.modalSub}>
            Fill in the details for the new unit.
          </Text>

          <TextInput
            label="Room Number"
            mode="outlined"
            value={newRoomNum}
            onChangeText={setNewRoomNum}
            style={styles.input}
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <TextInput
            label="Floor Level"
            mode="outlined"
            value={newFloor}
            onChangeText={setNewFloor}
            style={styles.input}
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <TextInput
            label="Total Beds"
            mode="outlined"
            keyboardType="numeric"
            value={newTotalBeds}
            onChangeText={setNewTotalBeds}
            style={styles.input}
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
          />

          <View style={styles.modalButtons}>
            <Button
              mode="text"
              onPress={() => setIsModalVisible(false)}
              textColor="#64748B"
              style={styles.modalBtn}
            >
              Discard
            </Button>
            <Button
              mode="contained"
              onPress={handleAddRoom}
              style={[styles.modalBtn, { backgroundColor: "#6366F1" }]}
            >
              Add Unit
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        label="Add Unit"
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
        color="#FFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFF" },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: "#FFF",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6366F1",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  searchBar: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    elevation: 0,
    height: 50,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  searchInput: { fontSize: 14, fontWeight: "600", color: "#1E293B" },

  filterScroll: { marginTop: 15 },
  chip: {
    marginRight: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    borderWidth: 0,
  },
  chipSelected: { backgroundColor: "#6366F1" },
  chipText: { fontSize: 13, fontWeight: "700", color: "#64748B" },
  chipTextSelected: { color: "#FFF" },

  listContainer: { padding: 15, paddingBottom: 100 },
  cardWrapper: { flex: 1, margin: 8 },
  roomCard: {
    borderRadius: 24,
    backgroundColor: "#FFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" },

  roomNum: { fontSize: 18, fontWeight: "900", color: "#1E293B" },
  floorText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 15,
  },

  progressContainer: { marginTop: 5 },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  occupancyLabel: { fontSize: 10, fontWeight: "700", color: "#94A3B8" },
  occupancyValue: { fontSize: 10, fontWeight: "800", color: "#1E293B" },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: "#F1F5F9" },

  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#6366F1",
    borderRadius: 16,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 25,
    margin: 20,
    borderRadius: 30,
  },
  modalTitle: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
  modalSub: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 20,
    fontWeight: "500",
  },
  input: { marginBottom: 15, backgroundColor: "#FFF" },
  modalButtons: { flexDirection: "row", gap: 10, marginTop: 15 },
  modalBtn: { flex: 1, borderRadius: 12, paddingVertical: 4 },
});
