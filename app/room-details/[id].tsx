import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  Card,
  Badge,
  Portal,
  Modal,
  TextInput,
  Button,
  Divider,
  IconButton,
} from "react-native-paper";
import {
  Bed as BedIcon,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  X,
  User,
  DollarSign,
  AlertCircle,
  Calendar,
} from "lucide-react-native";

interface Bed {
  id: string;
  label: string;
  status: "vacant" | "occupied" | "overdue" | "advance"; // Added "advance"
  tenant?: string;
  phone?: string;
  dueDate?: string;
  lastPaymentDate?: string;
  lastPaymentAmount?: string;
}

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams();
  const [beds, setBeds] = useState<Bed[]>([
    {
      id: "1",
      label: "1-Top",
      status: "occupied",
      tenant: "Juan Dela Cruz",
      phone: "09123456789",
      dueDate: "Feb 15",
      lastPaymentDate: "Jan 15",
      lastPaymentAmount: "2,500",
    },
    {
      id: "2",
      label: "1-Bottom",
      status: "overdue",
      tenant: "Pedro Penduko",
      phone: "09987654321",
      dueDate: "Feb 01",
      lastPaymentDate: "Jan 01",
      lastPaymentAmount: "2,500",
    },
    {
      id: "3",
      label: "2-Top",
      status: "advance",
      tenant: "Sisa",
      phone: "09120000000",
      dueDate: "Mar 20",
      lastPaymentDate: "Feb 01",
      lastPaymentAmount: "5,000",
    },
    { id: "4", label: "2-Bottom", status: "vacant" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDue, setEditDue] = useState("");
  const [editPayDate, setEditPayDate] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [currentStatus, setCurrentStatus] = useState<Bed["status"]>("vacant");

  const handleOpenDetails = (bed: Bed) => {
    setSelectedBed(bed);
    setEditName(bed.tenant || "");
    setEditPhone(bed.phone || "");
    setEditDue(bed.dueDate || "");
    setEditPayDate(bed.lastPaymentDate || "");
    setEditAmount(bed.lastPaymentAmount || "");
    setCurrentStatus(bed.status);
    setIsModalVisible(true);
  };

  const handleSaveChanges = () => {
    if (!selectedBed) return;
    const updatedBeds = beds.map((b) => {
      if (b.id === selectedBed.id) {
        return {
          ...b,
          tenant: editName,
          phone: editPhone,
          dueDate: editDue,
          lastPaymentDate: editPayDate,
          lastPaymentAmount: editAmount,
          status: editName ? currentStatus : "vacant",
        };
      }
      return b;
    });
    setBeds(updatedBeds as Bed[]);
    setIsModalVisible(false);
    Alert.alert("Success", "Record updated!");
  };

  const cycleStatus = () => {
    const statusOrder: Bed["status"][] = ["occupied", "overdue", "advance"];
    const currentIndex = statusOrder.indexOf(currentStatus as any);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    setCurrentStatus(statusOrder[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Room ${id}`,
          headerShown: true,
          headerBackTitle: "",
          headerTitleStyle: { fontWeight: "900" },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#F8FAFC" },
        }}
      />

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Room {id} Layout</Text>
        <Text style={styles.infoSub}>
          Tap a bed to manage tenant or toggle payment status
        </Text>
      </View>

      <FlatList
        data={beds}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleOpenDetails(item)}
          >
            <Card
              style={[
                styles.bedCard,
                item.status === "overdue" && styles.overdueCard,
                item.status === "advance" && styles.advanceCard,
              ]}
            >
              <Card.Content style={styles.cardContent}>
                <BedIcon
                  size={26}
                  color={
                    item.status === "overdue"
                      ? "#EF4444"
                      : item.status === "advance"
                      ? "#10B981"
                      : item.status === "vacant"
                      ? "#94A3B8"
                      : "#4F46E5"
                  }
                />
                <Text style={styles.label}>Bed {item.label}</Text>
                <Text style={styles.tenantName} numberOfLines={1}>
                  {item.status === "vacant" ? "Vacant" : item.tenant}
                </Text>
                {item.status !== "vacant" && (
                  <Badge
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          item.status === "overdue"
                            ? "#EF4444"
                            : item.status === "advance"
                            ? "#10B981"
                            : "#4F46E5",
                      },
                    ]}
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                )}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          {selectedBed && (
            <View>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Bed {selectedBed.label}</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>

              <Divider style={styles.divider} />

              <View style={styles.statusToggleRow}>
                <Text style={styles.sectionLabel}>PAYMENT STATUS:</Text>
                <TouchableOpacity
                  onPress={cycleStatus}
                  style={[
                    styles.statusToggleBtn,
                    {
                      backgroundColor:
                        currentStatus === "overdue"
                          ? "#FEE2E2"
                          : currentStatus === "advance"
                          ? "#DCFCE7"
                          : "#EEF2FF",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusToggleText,
                      {
                        color:
                          currentStatus === "overdue"
                            ? "#EF4444"
                            : currentStatus === "advance"
                            ? "#10B981"
                            : "#4F46E5",
                      },
                    ]}
                  >
                    {currentStatus === "overdue"
                      ? "UNPAID"
                      : currentStatus === "advance"
                      ? "ADVANCE"
                      : "PAID"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  value={editName}
                  onChangeText={setEditName}
                  style={styles.input}
                  left={
                    <TextInput.Icon
                      icon={() => <User size={18} color="#64748B" />}
                    />
                  }
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#4F46E5"
                />
                <TextInput
                  label="Phone Number"
                  mode="outlined"
                  value={editPhone}
                  onChangeText={setEditPhone}
                  keyboardType="phone-pad"
                  style={styles.input}
                  left={
                    <TextInput.Icon
                      icon={() => <Phone size={18} color="#64748B" />}
                    />
                  }
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#4F46E5"
                />
              </View>

              <View style={styles.paymentContainer}>
                <View style={styles.paymentRow}>
                  <TextInput
                    label="Next Due"
                    mode="outlined"
                    value={editDue}
                    onChangeText={setEditDue}
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Feb 15"
                    outlineColor="#E2E8F0"
                  />
                  <TextInput
                    label="Rent Amount"
                    mode="outlined"
                    value={editAmount}
                    onChangeText={setEditAmount}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="numeric"
                    left={<TextInput.Affix text="₱" />}
                    outlineColor="#E2E8F0"
                  />
                </View>
                <TextInput
                  label="Last Payment Date"
                  mode="outlined"
                  value={editPayDate}
                  onChangeText={setEditPayDate}
                  style={styles.input}
                  placeholder="Jan 20"
                  left={
                    <TextInput.Icon
                      icon={() => <Calendar size={18} color="#64748B" />}
                    />
                  }
                  outlineColor="#E2E8F0"
                />
              </View>

              <View style={styles.actionGrid}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => Linking.openURL(`tel:${editPhone}`)}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#EEF2FF" }]}
                  >
                    <Phone size={20} color="#4F46E5" />
                  </View>
                  <Text style={styles.actionLabel}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => Linking.openURL(`sms:${editPhone}`)}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#ECFDF5" }]}
                  >
                    <MessageSquare size={20} color="#10B981" />
                  </View>
                  <Text style={styles.actionLabel}>SMS</Text>
                </TouchableOpacity>
              </View>

              <Button
                mode="contained"
                onPress={handleSaveChanges}
                style={styles.saveBtn}
                contentStyle={{ height: 50 }}
              >
                Save Changes
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  infoSection: { padding: 20 },
  infoTitle: { fontSize: 24, fontWeight: "900", color: "#1E293B" },
  infoSub: { color: "#64748B", fontSize: 13 },
  list: { padding: 12 },
  bedCard: {
    flex: 1,
    margin: 8,
    borderRadius: 24,
    backgroundColor: "#FFF",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  overdueCard: { borderColor: "#FEE2E2", backgroundColor: "#FFFDFD" },
  advanceCard: { borderColor: "#DCFCE7", backgroundColor: "#F7FFF9" },
  cardContent: { alignItems: "center", paddingVertical: 25 },
  label: { fontWeight: "900", fontSize: 16, color: "#1E293B", marginTop: 8 },
  tenantName: { fontSize: 12, color: "#64748B", marginTop: 2 },
  statusBadge: { marginTop: 10, borderRadius: 8 },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    margin: 15,
    borderRadius: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "900" },
  divider: { marginVertical: 15, backgroundColor: "#F1F5F9" },
  statusToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 15,
  },
  sectionLabel: { fontSize: 12, fontWeight: "800", color: "#94A3B8" },
  statusToggleBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  statusToggleText: { fontWeight: "900", fontSize: 13 },
  inputGroup: { gap: 4, marginBottom: 15 },
  input: { backgroundColor: "#FFF", fontSize: 14 },
  paymentContainer: { marginBottom: 20 },
  paymentRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 25,
  },
  actionBtn: { alignItems: "center" },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  actionLabel: { fontSize: 12, fontWeight: "800" },
  saveBtn: { backgroundColor: "#4F46E5", borderRadius: 15 },
});
