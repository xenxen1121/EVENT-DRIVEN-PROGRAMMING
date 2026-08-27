console.log("A-sync");
document.getElementById("btn").addEventListener("click", () => {
    console.log("B-click");
    setTimeout(() => console.log ("C-timeout"), 0 );
    Promise.resolve().then(() => console.log("D-microtask));"))
});
console.log("E-sync");
