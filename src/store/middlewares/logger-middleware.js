import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addExpenseAction, setIncomeAction } from "store/expense/expense-slice";

export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({
    // predicate: (action) => {
    //     return (
    //         action.type === "expenseSlice/addExpenseAction" ||
    //         action.type === "expenseSlice/setIncomeAction"
    //     );
    // },
    matcher: isAnyOf(setIncomeAction, addExpenseAction),
    effect: async (action, listenerAPI) => {
        console.log("Action ", action);
        console.log("New store value ", listenerAPI.getState());
    },
});
