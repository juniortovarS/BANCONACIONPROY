// ===== LOGIN =====
function renderLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-screen">
      <img src="assets/fondo.png" class="logo">
      <div class="card">
        <input type="text" id="dni" placeholder="DNI">
        <input type="password" id="clave" placeholder="Clave de internet">
        <span class="link-blue">¡La olvidé!</span>
        <button id="loginBtn">Ingresar</button>
        <button class="btn-secondary">Generar tu clave de internet</button>
      </div>
      <div class="bottom-icons">
      </div>
    </div>
  `;

  const dni = document.getElementById('dni');
  const clave = document.getElementById('clave');
  const btn = document.getElementById('loginBtn');

  function validar() {
    if (dni.value.trim() && clave.value.trim()) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }

  dni.addEventListener('input', validar);
  clave.addEventListener('input', validar);

  btn.addEventListener('click', () => {
    if (dni.value.trim() && clave.value.trim()) {
      renderDashboard();
    } else {
      alert('Completa los campos');
    }
  });
}

// ===== DASHBOARD MÓVIL =====
function renderDashboard() {
  document.getElementById('app').innerHTML = `
    <div class="dashboard-mobile">

      <!-- TOP BAR -->
      <div class="topbar">
        <div id="menuBtn">☰</div>
        <h3>Banco de la Nación</h3>
      </div>

      <!-- CONTENIDO -->
      <div class="content">
        <h2>Bienvenido</h2>
        <p class="nombre">José Luis Calla Eusebio</p>

        <div class="saldo-box">
          <p>Saldo disponible</p>
          <h1>S/ 7423.86</h1>
        </div>

        <div class="movimientos">
          <div id="toggleMov">▼ Mis últimos movimientos</div>
          <div id="listaMov" class="hidden">
            <p>+ S/ 500.00 Depósito</p>
            <p>- S/ 120.00 Pago servicio</p>
            <p>- S/ 50.00 Recarga</p>
          </div>
        </div>
      </div>

      <!-- MENÚ LATERAL -->
      <div id="sidebar" class="sidebar">
        <div class="perfil">
          <div class="avatar">J</div>
          <div>
            <strong>BIENVENIDO!</strong><br>
            JOSÉ LUIS CALLA EUSEBIO
          </div>
        </div>

        <ul>
          <li>🏠 Mis cuentas</li>
          <li>🔄 Actualizar información</li>
          <li>💸 Transferir a cuentas</li>
          <li>📤 Giros</li>
          <li>📱 Pagos y recargas</li>
          <li>🏧 Retiro sin tarjeta</li>
          <li>💼 Préstamos</li>
          <li>⚙️ Configuración</li>
          <li>📍 Ubícanos</li>
          <li>🔐 Cambiar clave</li>
          <li id="logout">🚪 Cerrar sesión</li>
        </ul>
      </div>

      <!-- OVERLAY -->
      <div id="overlay" class="overlay"></div>

    </div>
  `;

  const toggleMov = document.getElementById('toggleMov');
  const listaMov = document.getElementById('listaMov');
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  // Toggle movimientos
  toggleMov.onclick = () => {
    listaMov.classList.toggle('hidden');
  };

  // Abrir / cerrar sidebar
  menuBtn.onclick = (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
  };

  // Cerrar sidebar tocando fuera
  overlay.onclick = () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  };

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== menuBtn) {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
    }
  });

  // Logout
  document.getElementById('logout').onclick = () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    renderLogin();
  };
}

// ===== INICIO =====
renderLogin();