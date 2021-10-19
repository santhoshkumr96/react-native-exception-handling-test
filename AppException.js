import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";

export class ExposedToJava {
  nameOfJsMethod(message) {

    console.log("exposed to java call")
    
    axios.create({
        baseURL: '',
        headers: {'Content-Type': 'application/json'}
      }).get('http://10.0.2.2:3000/test/')
      .then(
        (e) => {
          console.log(e);
        }
    );

    alert(message);
  }
}

const exposedToJava = new ExposedToJava();
BatchedBridge.registerCallableModule("JavaScriptVisibleToJava", exposedToJava);