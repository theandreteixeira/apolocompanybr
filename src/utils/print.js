export const print = (value) => {
  const isLocalhost = Boolean(window.location.hostname === "localhost");
  if (isLocalhost) {
    console.log(value)
  }
}