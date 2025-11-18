import React, { useState } from "react";
import {View,Text,FlatList,TouchableOpacity,Modal,TextInput,StyleSheet,Alert,Platform,
} from "react-native";
import useResponsive from "../hooks/useResponsive";

export default function DashboardScreen() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(15000);

  const transactions = [
    { id: "1", title: "Transfer to John", amount: -2000 },
    { id: "2", title: "Airtime Purchase", amount: -500 },
    { id: "3", title: "Salary Credit", amount: +25000 },
  ];

  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const sendMoney = () => {
    if (!receiver || !amount) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Error", "Enter a valid amount!");
      return;
    }

    if (Number(amount) > balance) {
      Alert.alert("Error", "Insufficient balance!");
      return;
    }

    setBalance(balance - Number(amount));
    setReceiver("");
    setAmount("");
    setModalVisible(false);

    Alert.alert("Success", "Money sent successfully!");
  };

  return (
    <View style={isDesktop ? styles.desktopWrapper : styles.mobileWrapper}>
      
      <View style={isDesktop ? styles.leftColumn : null}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Your Balance</Text>
          <Text style={styles.balanceAmount}>₦{balance.toLocaleString()}</Text>
        </View>

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.sendBtnText}>Send Money</Text>
        </TouchableOpacity>
      </View>

    
      <View style={isDesktop ? styles.rightColumn : null}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transTitle}>{item.title}</Text>
              <Text
                style={[
                  styles.transAmount,
                  { color: item.amount < 0 ? "red" : "green" },
                ]}
              >
                {item.amount < 0 ? "-" : "+"}₦
                {Math.abs(item.amount).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>

      
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              isDesktop && styles.desktopModalBox,
            ]}
          >
            <Text style={styles.modalTitle}>Send Money</Text>

            <TextInput
              style={styles.input}
              placeholder="Receiver Name"
              value={receiver}
              onChangeText={setReceiver}
            />

            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <TouchableOpacity style={styles.modalBtn} onPress={sendMoney}>
              <Text style={styles.modalBtnText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  mobileWrapper: {
    flex: 1,
    padding: 20,
  },

  desktopWrapper: {
    flex: 1,
    flexDirection: "row",
    padding: 40,
    gap: 40,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },


  leftColumn: {
    flex: 1,
    maxWidth: 350,
  },
  rightColumn: {
    flex: 2,
    maxWidth: 600,
  },

  balanceCard: {
    backgroundColor: "darkgreen",
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
  },
  balanceTitle: { color: "#fff", fontSize: 18 },
  balanceAmount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 8,
  },


  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transTitle: { fontSize: 16 },
  transAmount: { fontSize: 16, fontWeight: "bold" },

  
  sendBtn: {
    backgroundColor: "darkgreen",
    padding: 16,
    borderRadius: 10,
  },
  sendBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight:'bold'
  },

  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 15,
    padding: 20,
  },
  desktopModalBox: {
    maxWidth: 400,
    padding: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
  },


  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },

  
  modalBtn: {
    backgroundColor: "darkgreen",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  modalBtnText: { color: "#fff", textAlign: "center", fontSize: 18,fontWeight:'bold' },

  modalCancel: { padding: 12, borderRadius: 8, marginTop: 10 },
  modalCancelText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
