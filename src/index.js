import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("kaiwaai");

// Retrieve the custom attribute values
const headerColor = container.getAttribute("headerColor");
const headerValue = container.getAttribute("data-header-value");
const top= container.getAttribute("top")
const bottom= container.getAttribute("bottom")
const right= container.getAttribute("right")
const left= container.getAttribute("left")
const name=container.getAttribute("name")



// Now you can use these values directly in your index.js file
// For example, you could set some global configuration or perform some actions based on these values

const root = ReactDOM.createRoot(container);
root.render(<App  headerName={headerColor} kaiwaPosition={{top,bottom,right,left}} name={name}/>); // You don't need to pass the attributes to App if you only need them in index.js
