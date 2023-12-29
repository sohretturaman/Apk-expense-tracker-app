/** @format */

import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ListExpenses = ({ data }) => {
  const expensesSum = data.reduce((sum, expense) => {
    return sum + expense.price;
  }, 0);
  console.log("sum expenses expensesSum.toFixed(2)", expensesSum);
  const renderItem = ({ item }) => {
    return (
      <View>
        <ExpenseItem data={item} />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.amountWrapper}>
        <Text style={styles.amount}>Toplam Gider :</Text>
        <Text style={{ paddingRight: 5 }}> {expensesSum.toFixed(2)} TL</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListExpenses;

const styles = StyleSheet.create({
  amount: {
    fontSize: 16,
    color: "black",
  },
  amountWrapper: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
});
