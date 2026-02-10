// import React, { useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StatusBar,
//   TextInput as RNTextInput,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   Portal,
//   Modal,
//   Button,
//   FAB,
//   TextInput,
//   Surface,
// } from "react-native-paper";
// import {
//   Receipt,
//   Calendar,
//   User,
//   ArrowDownLeft,
//   CheckCircle2,
//   Share2,
//   Clock,
//   Camera,
//   Search,
//   XCircle,
//   Image as ImageIcon,
//   LayoutGrid,
// } from "lucide-react-native";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// interface PaymentRecord {
//   id: string;
//   tenant: string;
//   amount: string;
//   datePaid: string;
//   nextDueDate: string;
//   room: string;
//   bed: string;
//   method: "GCash" | "Cash";
//   reference: string;
//   proofImage?: string;
// }

// export default function HistoryScreen() {
//   const insets = useSafeAreaInsets();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState<"All" | "GCash" | "Cash">("All");
//   const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(
//     null
//   );
//   const [showAddModal, setShowAddModal] = useState(false);

//   // QUICK PAY FORM STATES
//   const [newName, setNewName] = useState("");
//   const [newAmount, setNewAmount] = useState("");
//   const [newRoom, setNewRoom] = useState("");
//   const [newBed, setNewBed] = useState("");
//   const [newMethod, setNewMethod] = useState<"Cash" | "GCash">("Cash");
//   const [tempImage, setTempImage] = useState<string | null>(null);

//   const [history, setHistory] = useState<PaymentRecord[]>([
//     {
//       id: "TXN-8821",
//       tenant: "Juan Dela Cruz",
//       amount: "2,500",
//       datePaid: "Feb 01, 2026",
//       nextDueDate: "Mar 01, 2026",
//       room: "101",
//       bed: "TOP",
//       method: "GCash",
//       reference: "9021-332-11",
//       proofImage:
//         "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=500",
//     },
//   ]);

//   const filteredHistory = useMemo(() => {
//     return history.filter((item) => {
//       const matchesSearch =
//         item.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.room.includes(searchQuery);
//       const matchesFilter = filterType === "All" || item.method === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   }, [searchQuery, filterType, history]);

//   const handlePickImage = () => {
//     const mockImage =
//       "https://images.unsplash.com/photo-1621348123761-030556f68047?q=80&w=500";
//     setTempImage(mockImage);
//   };

//   const handleAddPayment = () => {
//     if (!newName || !newAmount || !newRoom) {
//       Alert.alert("Error", "Fill up all required fields.");
//       return;
//     }

//     const newRecord: PaymentRecord = {
//       id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
//       tenant: newName,
//       amount: Number(newAmount).toLocaleString(),
//       datePaid: new Date().toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//       nextDueDate: "Mar 04, 2026",
//       room: newRoom,
//       bed: newBed || "N/A",
//       method: newMethod,
//       reference: newMethod === "GCash" ? "REF-AUTO" : "N/A",
//       proofImage: tempImage || undefined,
//     };

//     setHistory([newRecord, ...history]);
//     setShowAddModal(false);
//     setNewName("");
//     setNewAmount("");
//     setNewRoom("");
//     setNewBed("");
//     setTempImage(null);
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>History</Text>
//           <Text style={styles.subTitle}>
//             Total {filteredHistory.length} transactions
//           </Text>
//         </View>
//         <Surface style={styles.headerIcon} elevation={1}>
//           <Receipt size={24} color="#4F46E5" />
//         </Surface>
//       </View>

//       {/* SEARCH BOX */}
//       <View style={styles.searchContainer}>
//         <Surface style={styles.modernSearchBox} elevation={2}>
//           <Search size={20} color="#94A3B8" />
//           <RNTextInput
//             placeholder="Search tenant or room..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             style={styles.modernSearchInput}
//             placeholderTextColor="#94A3B8"
//           />
//         </Surface>

//         <View style={styles.chipRow}>
//           {["All", "GCash", "Cash"].map((type) => (
//             <TouchableOpacity
//               key={type}
//               onPress={() => setFilterType(type as any)}
//               style={[styles.chip, filterType === type && styles.activeChip]}
//             >
//               <Text
//                 style={[
//                   styles.chipText,
//                   filterType === type && styles.activeChipText,
//                 ]}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* LIST */}
//       <FlatList
//         data={filteredHistory}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => setSelectedReceipt(item)}
//           >
//             <Surface style={styles.historyCard} elevation={0}>
//               <View
//                 style={[
//                   styles.iconCircle,
//                   {
//                     backgroundColor:
//                       item.method === "GCash" ? "#EEF2FF" : "#F0FDF4",
//                   },
//                 ]}
//               >
//                 <ArrowDownLeft
//                   size={20}
//                   color={item.method === "GCash" ? "#4F46E5" : "#10B981"}
//                 />
//               </View>
//               <View style={styles.textMain}>
//                 <Text style={styles.tenantName}>{item.tenant}</Text>
//                 <Text style={styles.details}>
//                   RM {item.room}-{item.bed} • {item.datePaid}
//                 </Text>
//               </View>
//               <View style={styles.amountContainer}>
//                 <Text style={styles.amountText}>₱{item.amount}</Text>
//                 <Text
//                   style={[
//                     styles.methodText,
//                     { color: item.method === "GCash" ? "#6366F1" : "#22C55E" },
//                   ]}
//                 >
//                   {item.method}
//                 </Text>
//               </View>
//             </Surface>
//           </TouchableOpacity>
//         )}
//       />

//       <FAB
//         icon="plus"
//         label="Quick Pay"
//         style={[styles.fab, { bottom: insets.bottom + 20 }]}
//         onPress={() => setShowAddModal(true)}
//       />

//       {/* QUICK PAY MODAL - FIXED OVERFLOW */}
//       <Portal>
//         <Modal
//           visible={showAddModal}
//           onDismiss={() => setShowAddModal(false)}
//           contentContainerStyle={styles.modalScrollWrapper}
//         >
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.modalContentPadding}
//           >
//             <View style={styles.modalIndicator} />
//             <Text style={styles.addTitle}>Log Payment</Text>

//             <TextInput
//               label="Tenant Name"
//               mode="outlined"
//               value={newName}
//               onChangeText={setNewName}
//               style={styles.input}
//               activeOutlineColor="#4F46E5"
//             />

//             <View style={styles.modalRowInputs}>
//               <TextInput
//                 label="Room"
//                 mode="outlined"
//                 value={newRoom}
//                 onChangeText={setNewRoom}
//                 style={{ flex: 1 }}
//                 activeOutlineColor="#4F46E5"
//               />
//               <TextInput
//                 label="Bed (e.g. TOP)"
//                 mode="outlined"
//                 value={newBed}
//                 onChangeText={setNewBed}
//                 style={{ flex: 1, marginLeft: 10 }}
//                 activeOutlineColor="#4F46E5"
//               />
//             </View>

//             <TextInput
//               label="Amount (₱)"
//               keyboardType="numeric"
//               mode="outlined"
//               value={newAmount}
//               onChangeText={setNewAmount}
//               style={[styles.input, { marginTop: 12 }]}
//               activeOutlineColor="#4F46E5"
//             />

//             <Text style={styles.labelSmall}>PAYMENT METHOD</Text>
//             <View style={styles.methodToggleRow}>
//               {["Cash", "GCash"].map((m) => (
//                 <TouchableOpacity
//                   key={m}
//                   style={[
//                     styles.methodBtn,
//                     newMethod === m && styles.methodBtnActive,
//                   ]}
//                   onPress={() => setNewMethod(m as any)}
//                 >
//                   <Text
//                     style={[
//                       styles.methodBtnText,
//                       newMethod === m && styles.methodBtnTextActive,
//                     ]}
//                   >
//                     {m}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <Text style={styles.labelSmall}>PROOF OF PAYMENT</Text>
//             <TouchableOpacity
//               style={styles.imagePickerBox}
//               onPress={handlePickImage}
//             >
//               {tempImage ? (
//                 <Image source={{ uri: tempImage }} style={styles.previewImg} />
//               ) : (
//                 <View style={styles.pickerPlaceholder}>
//                   <Camera size={24} color="#94A3B8" />
//                   <Text style={styles.pickerText}>Tap to Upload</Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             <View style={styles.modalActionRow}>
//               <Button
//                 mode="outlined"
//                 onPress={() => setShowAddModal(false)}
//                 style={styles.flexBtn}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 mode="contained"
//                 onPress={handleAddPayment}
//                 style={[styles.flexBtn, { backgroundColor: "#4F46E5" }]}
//               >
//                 Confirm
//               </Button>
//             </View>
//           </ScrollView>
//         </Modal>
//       </Portal>

//       {/* RECEIPT MODAL - FIXED OVERFLOW */}
//       <Portal>
//         <Modal
//           visible={!!selectedReceipt}
//           onDismiss={() => setSelectedReceipt(null)}
//           contentContainerStyle={styles.modalScrollWrapper}
//         >
//           {selectedReceipt && (
//             <ScrollView
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.modalContentPadding}
//             >
//               <View style={styles.modalIndicator} />
//               <View style={styles.receiptHeader}>
//                 <Surface style={styles.checkBadge} elevation={2}>
//                   <CheckCircle2 size={30} color="#FFF" />
//                 </Surface>
//                 <Text style={styles.modalMainTitle}>Payment Receipt</Text>
//                 <Text style={styles.refCode}>{selectedReceipt.id}</Text>
//               </View>

//               <View style={styles.modalTotalBox}>
//                 <Text style={styles.totalLabel}>TOTAL PAID</Text>
//                 <Text style={styles.totalValue}>₱{selectedReceipt.amount}</Text>
//               </View>

//               <View style={styles.infoGrid}>
//                 <InfoRow
//                   icon={<User size={16} color="#94A3B8" />}
//                   label="Tenant"
//                   value={selectedReceipt.tenant}
//                 />
//                 <InfoRow
//                   icon={<LayoutGrid size={16} color="#94A3B8" />}
//                   label="Unit"
//                   value={`RM ${selectedReceipt.room}-${selectedReceipt.bed}`}
//                 />
//                 <InfoRow
//                   icon={<Calendar size={16} color="#94A3B8" />}
//                   label="Date"
//                   value={selectedReceipt.datePaid}
//                 />
//                 <InfoRow
//                   icon={<Clock size={16} color="#F43F5E" />}
//                   label="Due"
//                   value={selectedReceipt.nextDueDate}
//                   highlight
//                 />
//               </View>

//               {selectedReceipt.proofImage && (
//                 <View style={styles.proofSection}>
//                   <Text style={styles.proofLabel}>Proof of Payment</Text>
//                   <Image
//                     source={{ uri: selectedReceipt.proofImage }}
//                     style={styles.proofImgDetail}
//                     resizeMode="cover"
//                   />
//                 </View>
//               )}

//               <View style={styles.modalActionRow}>
//                 <TouchableOpacity
//                   style={styles.secondaryAction}
//                   onPress={() => setSelectedReceipt(null)}
//                 >
//                   <Text style={styles.secondaryActionText}>Close</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.primaryAction}
//                   onPress={() => Alert.alert("Shared!")}
//                 >
//                   <Share2 size={20} color="#FFF" />
//                   <Text style={styles.primaryActionText}>Share</Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           )}
//         </Modal>
//       </Portal>
//     </View>
//   );
// }

// const InfoRow = ({ icon, label, value, highlight }: any) => (
//   <View style={styles.infoRow}>
//     <View style={styles.infoLabelGroup}>
//       {icon}
//       <Text style={styles.infoLabel}>{label}</Text>
//     </View>
//     <Text style={[styles.infoValue, highlight && { color: "#F43F5E" }]}>
//       {value}
//     </Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FDFDFF" },
//   header: {
//     paddingHorizontal: 25,
//     paddingVertical: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: { fontSize: 32, fontWeight: "900", color: "#1E293B" },
//   subTitle: { fontSize: 13, color: "#94A3B8", fontWeight: "600" },
//   headerIcon: {
//     width: 45,
//     height: 45,
//     borderRadius: 12,
//     backgroundColor: "#FFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   searchContainer: { paddingHorizontal: 20, marginBottom: 15 },
//   modernSearchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     height: 56,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 12,
//   },
//   modernSearchInput: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#1E293B",
//   },

//   chipRow: { flexDirection: "row", gap: 8 },
//   chip: {
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 12,
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   activeChip: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
//   chipText: { fontSize: 12, fontWeight: "700", color: "#64748B" },
//   activeChipText: { color: "#FFF" },

//   list: { paddingHorizontal: 20, paddingBottom: 100 },
//   historyCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 20,
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     borderColor: "#F8FAFC",
//   },
//   iconCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textMain: { flex: 1, marginLeft: 12 },
//   tenantName: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
//   details: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
//   amountContainer: { alignItems: "flex-end" },
//   amountText: { fontSize: 16, fontWeight: "900", color: "#1E293B" },
//   methodText: { fontSize: 10, fontWeight: "800", marginTop: 4 },

//   fab: {
//     position: "absolute",
//     right: 20,
//     backgroundColor: "#1E293B",
//     borderRadius: 16,
//   },

//   // MODAL FIXES
//   modalScrollWrapper: {
//     backgroundColor: "white",
//     margin: 20,
//     borderRadius: 28,
//     maxHeight: SCREEN_HEIGHT * 0.85, // Sinisiguro na hindi lalampas sa screen
//     overflow: "hidden",
//   },
//   modalContentPadding: { padding: 24, paddingBottom: 40 },
//   modalIndicator: {
//     width: 30,
//     height: 4,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 10,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   addTitle: { fontSize: 22, fontWeight: "900", marginBottom: 15 },
//   input: { marginBottom: 10, backgroundColor: "#FFF" },
//   modalRowInputs: { flexDirection: "row" },
//   labelSmall: {
//     fontSize: 10,
//     fontWeight: "800",
//     color: "#94A3B8",
//     marginTop: 15,
//     marginBottom: 10,
//     letterSpacing: 1,
//   },

//   // METHOD TOGGLE
//   methodToggleRow: { flexDirection: "row", gap: 10, marginBottom: 5 },
//   methodBtn: {
//     flex: 1,
//     height: 45,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   methodBtnActive: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
//   methodBtnText: { fontWeight: "700", color: "#64748B" },
//   methodBtnTextActive: { color: "#FFF" },

//   imagePickerBox: {
//     width: "100%",
//     height: 140,
//     borderRadius: 16,
//     backgroundColor: "#F8FAFC",
//     borderStyle: "dashed",
//     borderWidth: 2,
//     borderColor: "#CBD5E1",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   pickerPlaceholder: { alignItems: "center" },
//   pickerText: {
//     fontSize: 11,
//     color: "#94A3B8",
//     fontWeight: "700",
//     marginTop: 5,
//   },
//   previewImg: { width: "100%", height: "100%" },

//   modalActionRow: { flexDirection: "row", gap: 10, marginTop: 25 },
//   flexBtn: { flex: 1, borderRadius: 12 },

//   receiptHeader: { alignItems: "center", marginBottom: 15 },
//   checkBadge: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#10B981",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   modalMainTitle: { fontSize: 20, fontWeight: "900" },
//   refCode: { fontSize: 11, color: "#94A3B8" },
//   modalTotalBox: {
//     marginVertical: 15,
//     alignItems: "center",
//     paddingVertical: 15,
//     backgroundColor: "#F8FAFC",
//     borderRadius: 16,
//   },
//   totalLabel: { fontSize: 10, color: "#94A3B8", fontWeight: "900" },
//   totalValue: { fontSize: 32, fontWeight: "900" },
//   infoGrid: { gap: 10 },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   infoLabelGroup: { flexDirection: "row", alignItems: "center", gap: 8 },
//   infoLabel: { fontSize: 13, color: "#64748B", fontWeight: "700" },
//   infoValue: { fontSize: 13, fontWeight: "800" },

//   proofSection: { marginTop: 15 },
//   proofLabel: { fontSize: 13, fontWeight: "800", marginBottom: 8 },
//   proofImgDetail: { width: "100%", height: 180, borderRadius: 16 },

//   primaryAction: {
//     flex: 1.5,
//     height: 50,
//     backgroundColor: "#4F46E5",
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   primaryActionText: { color: "#FFF", fontWeight: "800" },
//   secondaryAction: {
//     flex: 1,
//     height: 50,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   secondaryActionText: { color: "#64748B", fontWeight: "800" },
// });

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  TextInput as RNTextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Portal,
  Modal,
  Button,
  FAB,
  TextInput,
  Surface,
} from "react-native-paper";
import {
  Receipt,
  Calendar,
  User,
  ArrowDownLeft,
  CheckCircle2,
  Save,
  Clock,
  Camera,
  Search,
  XCircle,
  LayoutGrid,
  Pencil,
} from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface PaymentRecord {
  id: string;
  tenant: string;
  amount: string;
  datePaid: string;
  nextDueDate: string;
  room: string;
  bed: string;
  method: "GCash" | "Cash";
  reference: string;
  proofImage?: string;
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "GCash" | "Cash">("All");

  // MODAL STATES
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(
    null
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // FORM STATES
  const [currentId, setCurrentId] = useState("");
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newBed, setNewBed] = useState("");
  const [newMethod, setNewMethod] = useState<"Cash" | "GCash">("Cash");
  const [tempImage, setTempImage] = useState<string | null>(null);

  const [history, setHistory] = useState<PaymentRecord[]>([
    {
      id: "TXN-8821",
      tenant: "Juan Dela Cruz",
      amount: "2,500",
      datePaid: "Feb 01, 2026",
      nextDueDate: "Mar 01, 2026",
      room: "101",
      bed: "TOP",
      method: "GCash",
      reference: "9021-332-11",
      proofImage:
        "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=500",
    },
  ]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.room.includes(searchQuery);
      const matchesFilter = filterType === "All" || item.method === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType, history]);

  const resetForm = () => {
    setNewName("");
    setNewAmount("");
    setNewRoom("");
    setNewBed("");
    setTempImage(null);
    setNewMethod("Cash");
    setIsEditing(false);
    setCurrentId("");
  };

  const handleEditPress = (item: PaymentRecord) => {
    setSelectedReceipt(null); // Close view modal
    setIsEditing(true);
    setCurrentId(item.id);
    setNewName(item.tenant);
    setNewAmount(item.amount.replace(/,/g, ""));
    setNewRoom(item.room);
    setNewBed(item.bed);
    setNewMethod(item.method);
    setTempImage(item.proofImage || null);
    setShowFormModal(true);
  };

  const handleSavePayment = () => {
    if (!newName || !newAmount || !newRoom) {
      Alert.alert("Error", "Required fields are missing.");
      return;
    }

    const formattedAmount = Number(newAmount).toLocaleString();

    if (isEditing) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === currentId
            ? {
                ...item,
                tenant: newName,
                amount: formattedAmount,
                room: newRoom,
                bed: newBed,
                method: newMethod,
                proofImage: tempImage || undefined,
              }
            : item
        )
      );
      Alert.alert("Updated", "Payment details saved successfully.");
    } else {
      const newRecord: PaymentRecord = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        tenant: newName,
        amount: formattedAmount,
        datePaid: "Feb 04, 2026",
        nextDueDate: "Mar 04, 2026",
        room: newRoom,
        bed: newBed || "N/A",
        method: newMethod,
        reference: newMethod === "GCash" ? "REF-AUTO" : "N/A",
        proofImage: tempImage || undefined,
      };
      setHistory([newRecord, ...history]);
      Alert.alert("Success", "New payment added.");
    }

    setShowFormModal(false);
    resetForm();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subTitle}>Managed Transactions</Text>
        </View>
        <Surface style={styles.headerIcon} elevation={1}>
          <Receipt size={24} color="#4F46E5" />
        </Surface>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Surface style={styles.modernSearchBox} elevation={2}>
          <Search size={20} color="#94A3B8" />
          <RNTextInput
            placeholder="Search tenant..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.modernSearchInput}
          />
        </Surface>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedReceipt(item)}
          >
            <Surface style={styles.historyCard} elevation={0}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor:
                      item.method === "GCash" ? "#EEF2FF" : "#F0FDF4",
                  },
                ]}
              >
                <ArrowDownLeft
                  size={20}
                  color={item.method === "GCash" ? "#4F46E5" : "#10B981"}
                />
              </View>
              <View style={styles.textMain}>
                <Text style={styles.tenantName}>{item.tenant}</Text>
                <Text style={styles.details}>
                  RM {item.room}-{item.bed} • {item.datePaid}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>₱{item.amount}</Text>
                <TouchableOpacity
                  onPress={() => handleEditPress(item)}
                  style={styles.editSmallBtn}
                >
                  <Pencil size={14} color="#6366F1" />
                </TouchableOpacity>
              </View>
            </Surface>
          </TouchableOpacity>
        )}
      />

      <FAB
        icon="plus"
        label="Add Payment"
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        color="white"
        onPress={() => {
          resetForm();
          setShowFormModal(true);
        }}
      />

      {/* FORM MODAL (ADD & EDIT) */}
      <Portal>
        <Modal
          visible={showFormModal}
          onDismiss={() => setShowFormModal(false)}
          contentContainerStyle={styles.modalScrollWrapper}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalContentPadding}
          >
            <View style={styles.modalIndicator} />
            <Text style={styles.addTitle}>
              {isEditing ? "Edit Payment" : "Add Payment"}
            </Text>

            <TextInput
              label="Tenant Name"
              mode="outlined"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
              activeOutlineColor="#4F46E5"
            />

            <View style={styles.modalRowInputs}>
              <TextInput
                label="Room"
                mode="outlined"
                value={newRoom}
                onChangeText={setNewRoom}
                style={{ flex: 1 }}
                activeOutlineColor="#4F46E5"
              />
              <TextInput
                label="Bed"
                mode="outlined"
                value={newBed}
                onChangeText={setNewBed}
                style={{ flex: 1, marginLeft: 10 }}
                activeOutlineColor="#4F46E5"
              />
            </View>

            <TextInput
              label="Amount (₱)"
              keyboardType="numeric"
              mode="outlined"
              value={newAmount}
              onChangeText={setNewAmount}
              style={[styles.input, { marginTop: 12 }]}
              activeOutlineColor="#4F46E5"
            />

            <Text style={styles.labelSmall}>PAYMENT METHOD</Text>
            <View style={styles.methodToggleRow}>
              {["Cash", "GCash"].map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.methodBtn,
                    newMethod === m && styles.methodBtnActive,
                  ]}
                  onPress={() => setNewMethod(m as any)}
                >
                  <Text
                    style={[
                      styles.methodBtnText,
                      newMethod === m && styles.methodBtnTextActive,
                    ]}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.labelSmall}>PROOF OF PAYMENT</Text>
            <TouchableOpacity
              style={styles.imagePickerBox}
              onPress={() =>
                setTempImage(
                  "https://images.unsplash.com/photo-1621348123761-030556f68047?q=80&w=500"
                )
              }
            >
              {tempImage ? (
                <Image source={{ uri: tempImage }} style={styles.previewImg} />
              ) : (
                <View style={styles.pickerPlaceholder}>
                  <Camera size={24} color="#94A3B8" />
                  <Text style={styles.pickerText}>Upload Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.modalActionRow}>
              <Button
                mode="outlined"
                onPress={() => setShowFormModal(false)}
                style={styles.flexBtn}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSavePayment}
                style={[styles.flexBtn, { backgroundColor: "#4F46E5" }]}
              >
                Save Payment
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      {/* VIEW RECEIPT MODAL */}
      <Portal>
        <Modal
          visible={!!selectedReceipt}
          onDismiss={() => setSelectedReceipt(null)}
          contentContainerStyle={styles.modalScrollWrapper}
        >
          {selectedReceipt && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContentPadding}
            >
              <View style={styles.modalIndicator} />
              <View style={styles.receiptHeader}>
                <Surface style={styles.checkBadge} elevation={2}>
                  <CheckCircle2 size={30} color="#FFF" />
                </Surface>
                <Text style={styles.modalMainTitle}>Payment Receipt</Text>
              </View>

              <View style={styles.modalTotalBox}>
                <Text style={styles.totalLabel}>TOTAL PAID</Text>
                <Text style={styles.totalValue}>₱{selectedReceipt.amount}</Text>
              </View>

              <View style={styles.infoGrid}>
                <InfoRow
                  icon={<User size={16} color="#94A3B8" />}
                  label="Tenant"
                  value={selectedReceipt.tenant}
                />
                <InfoRow
                  icon={<LayoutGrid size={16} color="#94A3B8" />}
                  label="Unit"
                  value={`RM ${selectedReceipt.room}-${selectedReceipt.bed}`}
                />
                <InfoRow
                  icon={<Calendar size={16} color="#94A3B8" />}
                  label="Date"
                  value={selectedReceipt.datePaid}
                />
              </View>

              {selectedReceipt.proofImage && (
                <View style={styles.proofSection}>
                  <Text style={styles.proofLabel}>Proof Image</Text>
                  <Image
                    source={{ uri: selectedReceipt.proofImage }}
                    style={styles.proofImgDetail}
                    resizeMode="cover"
                  />
                </View>
              )}

              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  style={styles.secondaryAction}
                  onPress={() => setSelectedReceipt(null)}
                >
                  <Text style={styles.secondaryActionText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.primaryAction, { backgroundColor: "#1E293B" }]}
                  onPress={() => handleEditPress(selectedReceipt)}
                >
                  <Pencil size={18} color="#FFF" />
                  <Text style={styles.primaryActionText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const InfoRow = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLabelGroup}>
      {icon}
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFF" },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 32, fontWeight: "900", color: "#1E293B" },
  subTitle: { fontSize: 13, color: "#94A3B8", fontWeight: "600" },
  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: { paddingHorizontal: 20, marginBottom: 15 },
  modernSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderRadius: 20,
    height: 56,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  modernSearchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F8FAFC",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textMain: { flex: 1, marginLeft: 12 },
  tenantName: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  details: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  amountContainer: { alignItems: "flex-end" },
  amountText: { fontSize: 16, fontWeight: "900", color: "#1E293B" },
  editSmallBtn: { marginTop: 4, padding: 4 },
  fab: {
    position: "absolute",
    right: 20,
    backgroundColor: "#4F46E5",
    borderRadius: 16,
  },
  modalScrollWrapper: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 28,
    maxHeight: SCREEN_HEIGHT * 0.85,
    overflow: "hidden",
  },
  modalContentPadding: { padding: 24, paddingBottom: 40 },
  modalIndicator: {
    width: 30,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  addTitle: { fontSize: 22, fontWeight: "900", marginBottom: 15 },
  input: { marginBottom: 10, backgroundColor: "#FFF" },
  modalRowInputs: { flexDirection: "row" },
  labelSmall: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    marginTop: 15,
    marginBottom: 10,
    letterSpacing: 1,
  },
  methodToggleRow: { flexDirection: "row", gap: 10, marginBottom: 5 },
  methodBtn: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  methodBtnActive: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  methodBtnText: { fontWeight: "700", color: "#64748B" },
  methodBtnTextActive: { color: "#FFF" },
  imagePickerBox: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pickerPlaceholder: { alignItems: "center" },
  pickerText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 5,
  },
  previewImg: { width: "100%", height: "100%" },
  modalActionRow: { flexDirection: "row", gap: 10, marginTop: 25 },
  flexBtn: { flex: 1, borderRadius: 12 },
  receiptHeader: { alignItems: "center", marginBottom: 15 },
  checkBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  modalMainTitle: { fontSize: 20, fontWeight: "900" },
  modalTotalBox: {
    marginVertical: 15,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  totalLabel: { fontSize: 10, color: "#94A3B8", fontWeight: "900" },
  totalValue: { fontSize: 32, fontWeight: "900" },
  infoGrid: { gap: 10 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabelGroup: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoLabel: { fontSize: 13, color: "#64748B", fontWeight: "700" },
  infoValue: { fontSize: 13, fontWeight: "800" },
  proofSection: { marginTop: 15 },
  proofLabel: { fontSize: 13, fontWeight: "800", marginBottom: 8 },
  proofImgDetail: { width: "100%", height: 180, borderRadius: 16 },
  primaryAction: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryActionText: { color: "#FFF", fontWeight: "800" },
  secondaryAction: {
    flex: 1,
    height: 50,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionText: { color: "#64748B", fontWeight: "800" },
});

// NaN pa din ang amount kapag nag save ng edit.
