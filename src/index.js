import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import render from './App';
import * as serviceWorker from './serviceWorker';

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();