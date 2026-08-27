# LAB04 Notes

## useState - CounterPanel

The `useState` hook is used to manage the counter value. The CounterPanel
allows the user to increment, decrement, and reset the count.

## useReducer - FilterList

The `useReducer` hook is used to manage the list state and its filter.
The reducer handles three actions: adding an item, toggling an item's
completed status, and changing the current filter.

## useEffect - ClockLabel

The `useEffect` hook is used to create a timer that updates the current
time every second. The interval is cleared during cleanup to prevent the
timer from continuing after the component is unmounted.