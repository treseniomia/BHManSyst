import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  IconButton,
  Portal,
  Modal,
  TextInput,
  Surface,
} from "react-native-paper";
import {
  ChevronLeft,
  MapPin,
  Phone,
  LogOut,
  History as HistoryIcon,
  UserPlus,
  CheckCircle2,
  MoreVertical,
} from "lucide-react-native";

export default function TenantProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- LOGIC STATES ---
  const [isVacant, setIsVacant] = useState(true);
  const [showCheckIn, setShowCheckIn] = useState(false);

  // Form States
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputDate, setInputDate] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );

  // Tenant Data State
  const [tenant, setTenant] = useState({
    name: "",
    room: "104",
    bed: "Bed 1-Top",
    phone: "",
    moveInDate: "",
    status: "Active",
    paymentHistory: [
      { id: "1", date: "Feb 03, 2026", amount: "2,500", method: "GCash" },
    ],
  });

  const handleCheckIn = () => {
    if (!inputName || !inputPhone) {
      Alert.alert(
        "Required Fields",
        "Boss, pakilagay ang pangalan at number para professional tayo! 📋"
      );
      return;
    }

    setTenant((prev) => ({
      ...prev,
      name: inputName,
      phone: inputPhone,
      moveInDate: inputDate,
    }));

    setIsVacant(false);
    setShowCheckIn(false);
    Alert.alert(
      "System Updated",
      "Successfully registered " + inputName + " to " + tenant.bed
    );
  };

  const processMoveOut = () => {
    Alert.alert(
      "Confirm Move-out",
      "Sigurado ka bang i-process ang move-out para kay " + tenant.name + "?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            setIsVacant(true);
            setInputName("");
            setInputPhone("");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- ELITE CUSTOM HEADER --- */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color="#1E293B" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {isVacant ? "Unit Availability" : "Tenant Portfolio"}
          </Text>
          <Text style={styles.headerSubtitle}>
            Room {tenant.room} • {tenant.bed}
          </Text>
        </View>

        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isVacant ? (
          /* --- MODERN VACANT STATE --- */
          <View style={styles.vacantWrapper}>
            <Surface style={styles.vacantIconBox} elevation={0}>
              <UserPlus size={42} color="#6366F1" strokeWidth={1.5} />
            </Surface>
            <Text style={styles.vacantMainTitle}>Ready for Check-in</Text>
            <Text style={styles.vacantDescription}>
              This unit is currently unoccupied and sanitized for the next
              tenant.
            </Text>

            <Button
              mode="contained"
              style={styles.mainCheckInBtn}
              onPress={() => setShowCheckIn(true)}
              labelStyle={styles.btnLabel}
              contentStyle={{ height: 56 }}
            >
              Check-in New Tenant
            </Button>
          </View>
        ) : (
          /* --- MODERN OCCUPIED STATE --- */
          <>
            <View style={styles.profileSection}>
              <Surface style={styles.avatarWrapper} elevation={2}>
                <Avatar.Text
                  size={84}
                  label={tenant.name.substring(0, 1).toUpperCase()}
                  style={styles.avatar}
                  labelStyle={styles.avatarLabel}
                />
                <View style={styles.statusIndicator} />
              </Surface>
              <Text style={styles.tenantNameDisplay}>{tenant.name}</Text>
              <View style={styles.activeBadge}>
                <CheckCircle2 size={12} color="#10B981" />
                <Text style={styles.activeBadgeText}>{tenant.status}</Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <Surface style={styles.statsCard} elevation={0}>
                <MapPin size={18} color="#6366F1" />
                <Text style={styles.statsLabel}>Location</Text>
                <Text style={styles.statsValue}>{tenant.bed}</Text>
              </Surface>
              <Surface style={styles.statsCard} elevation={0}>
                <Phone size={18} color="#10B981" />
                <Text style={styles.statsLabel}>Contact</Text>
                <Text style={styles.statsValue}>{tenant.phone}</Text>
              </Surface>
            </View>

            <Text style={styles.sectionLabelText}>Contract Details</Text>
            <Surface style={styles.infoSurface} elevation={0}>
              <View style={styles.infoRow}>
                <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoRowLabel}>Lease Commenced</Text>
                  <Text style={styles.infoRowValue}>{tenant.moveInDate}</Text>
                </View>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.infoRow}>
                <View style={[styles.dot, { backgroundColor: "#64748B" }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoRowLabel}>Monthly Billing</Text>
                  <Text style={styles.infoRowValue}>₱2,500.00</Text>
                </View>
              </View>
            </Surface>

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabelText}>Payment History</Text>
              <TouchableOpacity>
                <Text style={styles.textBtn}>View Ledger</Text>
              </TouchableOpacity>
            </View>

            {tenant.paymentHistory.map((item) => (
              <Surface key={item.id} style={styles.paymentCard} elevation={0}>
                <View style={styles.iconCircle}>
                  <HistoryIcon size={18} color="#64748B" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.paymentDate}>{item.date}</Text>
                  <Text style={styles.paymentMethod}>
                    Settled via {item.method}
                  </Text>
                </View>
                <Text style={styles.paymentAmount}>₱{item.amount}</Text>
              </Surface>
            ))}

            <Button
              mode="outlined"
              onPress={processMoveOut}
              style={styles.moveOutAction}
              textColor="#EF4444"
              contentStyle={{ height: 50 }}
              icon={() => <LogOut size={18} color="#EF4444" />}
            >
              End Tenant Contract
            </Button>
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* --- REGISTRATION MODAL --- */}
      <Portal>
        <Modal
          visible={showCheckIn}
          onDismiss={() => setShowCheckIn(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Tenant Check-in</Text>
          <Text style={styles.modalSubtitle}>
            Assigning to Room {tenant.room} • {tenant.bed}
          </Text>

          <TextInput
            label="Full Name"
            mode="outlined"
            value={inputName}
            onChangeText={setInputName}
            style={styles.modalInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
            outlineStyle={{ borderRadius: 14 }}
          />

          <TextInput
            label="Phone Number"
            mode="outlined"
            keyboardType="phone-pad"
            value={inputPhone}
            onChangeText={setInputPhone}
            style={styles.modalInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
            outlineStyle={{ borderRadius: 14 }}
          />

          <TextInput
            label="Check-in Date"
            mode="outlined"
            value={inputDate}
            onChangeText={setInputDate}
            style={styles.modalInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#6366F1"
            outlineStyle={{ borderRadius: 14 }}
          />

          <View style={styles.modalActions}>
            <Button
              mode="text"
              onPress={() => setShowCheckIn(false)}
              textColor="#64748B"
              style={{ flex: 1 }}
            >
              Discard
            </Button>
            <Button
              mode="contained"
              onPress={handleCheckIn}
              style={styles.modalSubmitBtn}
            >
              Save Tenant
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFF" },

  /* Header Styles */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#FFF",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitleContainer: {
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1E293B",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  moreBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: { paddingHorizontal: 24, paddingTop: 10 },

  /* Vacant Styles */
  vacantWrapper: { alignItems: "center", marginTop: 60 },
  vacantIconBox: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  vacantMainTitle: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
  vacantDescription: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 20,
  },
  mainCheckInBtn: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "#6366F1",
    elevation: 4,
  },
  btnLabel: { fontSize: 16, fontWeight: "800", letterSpacing: 0.2 },

  /* Occupied Styles */
  profileSection: { alignItems: "center", marginVertical: 25 },
  avatarWrapper: { borderRadius: 32, padding: 5, backgroundColor: "#FFF" },
  avatar: { backgroundColor: "#EEF2FF" },
  avatarLabel: { fontWeight: "900", color: "#6366F1" },
  statusIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10B981",
    borderWidth: 4,
    borderColor: "#FFF",
  },
  tenantNameDisplay: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E293B",
    marginTop: 15,
  },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    gap: 6,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#10B981",
    textTransform: "uppercase",
  },

  statsGrid: { flexDirection: "row", gap: 12, marginBottom: 30 },
  statsCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  statsLabel: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  statsValue: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1E293B",
    marginTop: 3,
  },

  sectionLabelText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1E293B",
    marginBottom: 15,
  },
  infoSurface: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 30,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  verticalDivider: {
    width: 1.5,
    height: 18,
    backgroundColor: "#F1F5F9",
    marginLeft: 3,
    marginVertical: 4,
  },
  infoRowLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  infoRowValue: { fontSize: 14, fontWeight: "900", color: "#1E293B" },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBtn: { fontSize: 13, fontWeight: "800", color: "#6366F1" },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentDate: { fontSize: 14, fontWeight: "900", color: "#1E293B" },
  paymentMethod: { fontSize: 12, color: "#94A3B8", fontWeight: "600" },
  paymentAmount: { fontSize: 15, fontWeight: "900", color: "#1E293B" },

  moveOutAction: {
    marginTop: 30,
    borderRadius: 16,
    borderColor: "#FEE2E2",
    borderWidth: 1.5,
    backgroundColor: "#FFF",
  },

  /* Modal UI */
  modalContainer: {
    backgroundColor: "white",
    padding: 28,
    margin: 20,
    borderRadius: 32,
  },
  modalTitle: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
  modalSubtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 25,
    fontWeight: "600",
  },
  modalInput: { marginBottom: 16, backgroundColor: "#FFF" },
  modalActions: { flexDirection: "row", gap: 12, marginTop: 10 },
  modalSubmitBtn: { flex: 2, borderRadius: 14, backgroundColor: "#6366F1" },
});
