/** @format */

import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../components/Colors";
import ListExpenses from "../components/ListExpenses";
import { Searchbar } from "react-native-paper";
import { useContext } from "react";
import { ExpenseContext } from "../store/ExpensesContext";
import RecentExpensesFunction from "../utils/FilterRecents";
import { getAllExpenses } from "../utils/Http.";
import LoadingOverlay from "../uı/LoadingOverlay";
import ErrorOverlay from "../uı/ErrorOverlay";

const RecentExpenses = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [expError, setExpError] = useState("");

  const ExpenseCntxt = useContext(ExpenseContext);

  const filteredExpenses = ExpenseCntxt.expenses.filter((expense) => {
    const today = new Date();
    const dateToRetrun = RecentExpensesFunction(today, 7);
    return expense.date >= dateToRetrun;
  });

  useEffect(() => {
    //that func is important, useEffect func shouldn't return an async func itself
    const getExpenses = async () => {
      setLoading(true); //use loading state in async func
      try {
        const response = await getAllExpenses();
        console.log("Result from firestore data", response);
        ExpenseCntxt.getExpenses(response);
      } catch (error) {
        setExpError("could not fetch expenses, please try agin later");
      }
      setLoading(false); //put loading staate false , at the and of the async func
    };

    getExpenses();
  }, []);

  const onChangeSearch = (query) => setSearchQuery(query);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (expError && !loading) {
    return (
      <ErrorOverlay message={expError} onPressError={() => setExpError("")} />
    );
  }

  const expensesSum = filteredExpenses.reduce((sum, expense) => {
    return sum + expense.price;
  }, 0);
  console.log("sum expenses", expensesSum);

  return (
    <View style={styles.continer}>
      <View>
        <ListExpenses data={filteredExpenses} />
      </View>
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
