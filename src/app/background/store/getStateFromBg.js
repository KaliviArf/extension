import { connect } from 'crossmessaging';

export default function (configure, callback) {
  let store;
  const connection = connect(true);

  connection.postMessage({ name: 'init' });

  connection.onMessage.addListener((message) => {
    if (message.name === 'init') {
      store = configure(message.state);
      callback(store);
    }
  });
}
