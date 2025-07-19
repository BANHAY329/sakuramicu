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

document.getElementById('auth-root').innerHTML = '
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 30px auto;
      padding: 10px;
      background: #fff9f5;
      border-radius: 8px;
      box-shadow: 0 0 10px #ccc;
      text-align: center;
    }
    input {
      display: block;
      width: 90%;
      padding: 10px;
      margin: 10px auto;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      margin: 10px 5px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background: #d89683;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #b56e5b;
    }
    #message {
      color: red;
      min-height: 20px;
      margin-top: 10px;
    }
    #logoutBtn {
      background: #888;
    }
  </style>

  <div id="authContainer">
    <div id="loginForm">
      <h2>Вход</h2>
      <input type="email" id="loginEmail" placeholder="Email" />
      <input type="password" id="loginPassword" placeholder="Пароль" />
      <button id="loginBtn">Войти</button>
      <p>Нет аккаунта? <a href="#" id="showRegister">Зарегистрироваться</a></p>
    </div>

    <div id="registerForm" style="display:none;">
      <h2>Регистрация</h2>
      <input type="email" id="regEmail" placeholder="Email" />
      <input type="password" id="regPassword" placeholder="Пароль" />
      <button id="regBtn">Зарегистрироваться</button>
      <p>Уже есть аккаунт? <a href="#" id="showLogin">Войти</a></p>
    </div>

    <button id="googleBtn">Войти через Google</button>

    <div id="message"></div>
  </div>

  <div id="userInfo" style="display:none;">
    <h3>Вы вошли как: <span id="userEmail"></span></h3>
    <button id="logoutBtn">Выйти</button>
  </div>
`;

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const messageEl = document.getElementById("message");
const authContainer = document.getElementById("authContainer");
const userInfo = document.getElementById("userInfo");
const userEmailSpan = document.getElementById("userEmail");

document.getElementById("showRegister").onclick = (e) => {
  e.preventDefault();
  messageEl.textContent = "";
  loginForm.style.display = "none";
  registerForm.style.display = "block";
};

document.getElementById("showLogin").onclick = (e) => {
  e.preventDefault();
  messageEl.textContent = "";
  registerForm.style.display = "none";
  loginForm.style.display = "block";
};

document.getElementById("loginBtn").onclick = () => {
  messageEl.textContent = "";
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  if (!email || !password) {
    messageEl.textContent = "Введите email и пароль";
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .catch(e => {
      if (e.code === "auth/user-not-found") {
        messageEl.textContent = "Пользователь не найден";
      } else if (e.code === "auth/wrong-password") {
        messageEl.textContent = "Неверный пароль";
      } else {
        messageEl.textContent = "Ошибка входа: " + e.message;
      }
    });
};

document.getElementById("regBtn").onclick = () => {
  messageEl.textContent = "";
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  if (!email || !password) {
    messageEl.textContent = "Введите email и пароль";
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      messageEl.style.color = "green";
      messageEl.textContent = "Регистрация прошла успешно! Теперь войдите.";
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    })
    .catch(e => {
      if (e.code === "auth/email-already-in-use") {
        messageEl.textContent = "Этот email уже зарегистрирован. Попробуйте войти.";
      } else if (e.code === "auth/invalid-email") {
        messageEl.textContent = "Неверный формат email";
      } else if (e.code === "auth/weak-password") {
        messageEl.textContent = "Пароль должен быть минимум 6 символов";
      } else {
        messageEl.textContent = "Ошибка регистрации: " + e.message;
      }
    });
};

document.getElementById("googleBtn").onclick = () => {
  messageEl.textContent = "";
  signInWithPopup(auth, provider)
    .catch(e => {
      messageEl.textContent = "Ошибка входа через Google: " + e.message;
    });
};

document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  if (user) {
    authContainer.style.display = "none";
    userInfo.style.display = "block";
    userEmailSpan.textContent = user.email || user.phoneNumber || "Пользователь";
    messageEl.textContent = "";
  } else {
    authContainer.style.display = "block";
    userInfo.style.display = "none";
  }
});
