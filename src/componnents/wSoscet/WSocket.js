const socketCreate = () => new WebSocket("wss://wssproxy.herokuapp.com/");

export default socketCreate;