import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import {
  Search,
  Filter,
  Phone,
  MessageSquare,
  XCircle,
} from "lucide-react-native";

export default function TenantListScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "overdue">(
    "all"
  );

  const tenants = [
    {
      id: "1",
      name: "Juan Dela Cruz",
      room: "101",
      bed: "1-Top",
      status: "paid",
    },
    {
      id: "2",
      name: "Pedro Penduko",
      room: "102",
      bed: "1-Bottom",
      status: "overdue",
    },
    {
      id: "3",
      name: "Sisa Dela Cruz",
      room: "201",
      bed: "2-Bottom",
      status: "paid",
    },
    {
      id: "4",
      name: "Maria Clara",
      room: "105",
      bed: "3-Top",
      status: "overdue",
    },
  ];

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch =
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.room.includes(searchQuery);
      const matchesFilter =
        filterStatus === "all" ? true : tenant.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  const toggleFilter = () => {
    if (filterStatus === "all") setFilterStatus("paid");
    else if (filterStatus === "paid") setFilterStatus("overdue");
    else setFilterStatus("all");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Master List</Text>
          <Text style={styles.subTitle}>
            Showing {filteredTenants.length} of {tenants.length} tenants
          </Text>
        </View>
        {filterStatus !== "all" && (
          <View style={styles.activeFilterChip}>
            <Text style={styles.activeFilterText}>
              {filterStatus.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            placeholder="Search tenant or room..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <XCircle size={18} color="#CBD5E1" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterStatus !== "all" && styles.filterBtnActive,
          ]}
          onPress={toggleFilter}
        >
          <Filter
            size={20}
            color={filterStatus !== "all" ? "#FFF" : "#4F46E5"}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTenants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={styles.tenantCard}>
            <Card.Content style={styles.cardContent}>
              <Avatar.Text
                size={45}
                label={item.name.substring(0, 1)}
                style={styles.avatar}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.roomInfo}>
                  Room {item.room} • Bed {item.bed}
                </Text>
              </View>
              <View style={styles.actions}>
                {/* FIXED: Ginamit ang View at Text para iwas red line sa TypeScript */}
                <View
                  style={[
                    styles.statusChip,
                    {
                      backgroundColor:
                        item.status === "paid" ? "#DCFCE7" : "#FEE2E2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: item.status === "paid" ? "#10B981" : "#EF4444" },
                    ]}
                  >
                    {item.status.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.iconRow}>
                  <IconButton icon="phone" size={18} iconColor="#4F46E5" />
                  <IconButton icon="message" size={18} iconColor="#10B981" />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    paddingHorizontal: 25,
    paddingTop: 60,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "900", color: "#1E293B" },
  subTitle: { fontSize: 13, color: "#64748B" },
  activeFilterChip: {
    backgroundColor: "#4F46E5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  activeFilterText: { color: "#FFF", fontWeight: "800", fontSize: 10 },
  searchSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 50,
    elevation: 1,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  filterBtnActive: { backgroundColor: "#4F46E5" },
  tenantCard: {
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: "#FFF",
    elevation: 1,
  },
  cardContent: { flexDirection: "row", alignItems: "center" },
  avatar: { backgroundColor: "#E0E7FF" },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  roomInfo: { fontSize: 12, color: "#64748B", marginTop: 2 },
  actions: { alignItems: "flex-end" },
  statusChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontWeight: "800", fontSize: 10 },
  iconRow: { flexDirection: "row", marginTop: 5 },
});
