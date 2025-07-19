import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3NHMsA8hWcqSLrwFjctnLbxTcd-qFJpc",
  authDomain: "sakuramicu-c781e.firebaseapp.com",
  projectId: "sakuramicu-c781e",
  storageBucket: "sakuramicu-c781e.appspot.com",
  messagingSenderId: "1009061010630",
  appId: "1:1009061010630:web:ea6521a024bb118f968bc7",
  measurementId: "G-FJ9G8Q6WRB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginFormHTML = `
  <h2>Вход</h2>
  <input type="email" id="loginEmail" placeholder="Email" />
  <input type="password" id="loginPassword" placeholder="Пароль" />
  <button id="loginBtn">Войти</button>
  <hr/>
  <h2>Регистрация</h2>
  <input type="email" id="regEmail" placeholder="Email" />
  <input type="password" id="regPassword" placeholder="Пароль" />
  <button id="regBtn">Зарегистрироваться</button>
  <hr/>
  <button id="googleBtn">Войти через Google</button>
  <hr/>
  <div id="userInfo"></div>
  <button id="logoutBtn" style="display:none;">Выйти</button>
`;

document.body.innerHTML = loginFormHTML;

document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .catch(e => alert("Ошибка входа: " + e.message));
};

document.getElementById("regBtn").onclick = () => {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  createUserWithEmailAndPassword(auth, email, password)
    .catch(e => alert("Ошибка регистрации: " + e.message));
};

document.getElementById("googleBtn").onclick = () => {
  signInWithPopup(auth, provider)
    .catch(e => alert("Ошибка входа через Google: " + e.message));
};

document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  if (user) {
    userInfo.textContent = `Вы вошли как: ${user.email}`;
    logoutBtn.style.display = "block";
  } else {
    userInfo.textContent = "";
    logoutBtn.style.display = "none";
  }
});
