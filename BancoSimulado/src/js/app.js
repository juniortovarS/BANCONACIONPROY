// ===== LOADER POPUP ROJO =====
function mostrarLoaderPopup(texto, tiempo, callback) {
  const loader = document.createElement('div');
  loader.className = 'loader-popup';
  loader.innerHTML = `
    <div class="loader-circle"></div>
    <p>${texto}</p>
  `;
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.remove();
    if (callback) callback();
  }, tiempo);
}

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
    </div>
  `;

  const dni = document.getElementById('dni');
  const clave = document.getElementById('clave');
  const btn = document.getElementById('loginBtn');

  function validar() {
    if (dni.value.trim() && clave.value.trim()) btn.classList.add('active');
    else btn.classList.remove('active');
  }

  dni.addEventListener('input', validar);
  clave.addEventListener('input', validar);

  btn.addEventListener('click', () => {
    if (dni.value.trim() && clave.value.trim()) {
      mostrarLoaderPopup("Verificando credenciales...", 2000, renderDashboard);
    } else alert('Completa los campos');
  });
}

// ===== DASHBOARD =====
function renderDashboard() {
  document.getElementById('app').innerHTML = `
    <div class="dashboard-mobile">
      <div class="topbar">
        <div id="menuBtn">☰</div>
        <h3>BANCO DE LA NACIÓN</h3>
      </div>

      <div class="content">
        <h2>BIENVENIDO</h2>
        <p class="nombre">JOSÉ LUIS CALLA EUSEBIO</p>

        <div class="saldo-box">
          <h2>SALDO DISPONIBLE</h2>
          <h1 id="saldoActual">•••••••</h1>
          <button id="toggleSaldo" class="btn-ocultar-saldo">Mostrar/Ocultar</button>
        </div>

        <div class="movimientos">
          <button id="toggleMov" class="movimientos-toggle-btn">Mis últimos movimientos ▼</button>
          <div id="listaMov" class="movimientos-list hidden">
            <p>+ S/ 500.00 Depósito</p>
            <p>- S/ 120.00 Pago servicio</p>
            <p>- S/ 50.00 Recarga</p>
          </div>
        </div>
      </div>

      <div id="sidebar" class="sidebar">
        <div class="perfil">
          <div class="avatar">J</div>
          <div>
            <strong>BIENVENIDO!</strong><br>
            JOSÉ LUIS CALLA EUSEBIO
          </div>
        </div>

        <ul>
          <li>Mis cuentas</li>
          <li>Actualizar información</li>
          <li id="transferir">Transferir a cuentas</li>
          <li>Giros</li>
          <li>Pagos y recargas</li>
          <li>Retiro sin tarjeta</li>
          <li>Préstamos</li>
          <li>Configuración</li>
          <li>Ubícanos</li>
          <li>Cambiar clave</li>
          <li id="logout">Cerrar sesión</li>
        </ul>
      </div>

      <div id="overlay" class="overlay"></div>
    </div>
  `;

  // Saldo oculto
  const toggleSaldo = document.getElementById('toggleSaldo');
  const saldoActual = document.getElementById('saldoActual');
  let saldoVisible = false;
  toggleSaldo.onclick = () => {
    saldoVisible = !saldoVisible;
    saldoActual.textContent = saldoVisible ? "S/ 7423.86" : "•••••••";
  };

  // Movimientos colapsables
  const toggleMov = document.getElementById('toggleMov');
  const listaMov = document.getElementById('listaMov');
  toggleMov.onclick = () => listaMov.classList.toggle('hidden');

  // Sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  document.getElementById('menuBtn').onclick = (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
  };
  overlay.onclick = () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  };

  // Logout
  document.getElementById('logout').onclick = () => {
    mostrarLoaderPopup("Cerrando sesión...", 2000, renderLogin);
  };

  // Transferir
  document.getElementById('transferir').onclick = () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    mostrarLoaderPopup("Cargando módulo...", 2000, renderTransferencia);
  };
}

// ===== TRANSFERENCIA =====
function renderTransferencia() {
  document.getElementById('app').innerHTML = `
    <div class="dashboard-mobile">
      <div class="topbar">
        <div id="backBtn">←</div>
        <h3>Transferencia</h3>
      </div>

      <div class="content">
        <p><strong>Cuenta destino (CCI)</strong></p>
        <input type="text" id="cci" placeholder="Ingresa CCI">

        <p><strong>Nombre del beneficiario</strong></p>
        <input type="text" id="nombre" disabled placeholder="Se autocompletará">

        <p><strong>Monto</strong></p>
        <input type="text" id="monto" placeholder="S/ 0.00">

        <button id="validarBtn">Validar cuenta</button>
        <button id="pagarBtn" class="hidden">Realizar transferencia</button>
      </div>
    </div>
  `;

  const cci = document.getElementById('cci');
  const nombre = document.getElementById('nombre');
  const monto = document.getElementById('monto');
  const pagarBtn = document.getElementById('pagarBtn');

  document.getElementById('backBtn').onclick = renderDashboard;

  // Formato moneda
  monto.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (!value) return (e.target.value = '');
    let numero = parseFloat(value) / 100;
    e.target.value = "S/ " + numero.toLocaleString('es-PE', { minimumFractionDigits: 2 });
  });

  // Validar CCI
  document.getElementById('validarBtn').onclick = () => {
    mostrarLoaderPopup("Validando cuenta...", 2000, () => {
      if (cci.value.length >= 10) {
        nombre.value = "ANGIE ALEXIA ZAMORANO PINEDO";
        pagarBtn.classList.remove('hidden');
      } else alert("CCI inválido");
    });
  };

  // Realizar transferencia con loader rojo 4 segundos
  pagarBtn.onclick = () => {
    if (!monto.value) return alert("Ingresa un monto");

    mostrarLoaderPopup("Procesando transferencia...", 4000, () => {
      renderVoucherProfesional(monto.value, cci.value, nombre.value);
    });
  };
}

// ===== VOUCHER =====
function renderVoucherProfesional(monto, cci, beneficiario) {
  const now = new Date();
  const fecha = now.toLocaleDateString();
  const hora = now.toLocaleTimeString();

  document.getElementById('app').innerHTML = `
    <div class="dashboard-mobile">
      <div class="topbar">
        <h3>Operación Exitosa</h3>
      </div>

      <div class="content">
        <div class="voucher-box">
          <div class="voucher-header">
            ✔ Transferencia exitosa
            <span>${fecha} ${hora}</span>
          </div>

          <div class="voucher-row blue">
            <span>Monto transferido</span>
            <span>${monto}</span>
          </div>

          <div class="voucher-row gray">
            <span>Comisión ITF</span>
            <span>S/ 0.00</span>
          </div>

          <div class="voucher-row blue">
            <span>Cargo en cuenta</span>
            <span>${monto}</span>
          </div>

          <div class="voucher-info gray">Desde mi cuenta 0495654</div>
          <div class="voucher-info blue">002 ${cci}</div>
          <div class="voucher-info gray">BCP</div>
          <div class="voucher-info blue">${beneficiario}</div>
          <div class="voucher-info green">000000000000964239</div>
          <div class="voucher-info darkblue">N° Operación 612866</div>
        </div>

        <button id="volverInicio">Volver</button>
      </div>
    </div>
  `;

  document.getElementById('volverInicio').onclick = renderDashboard;
}

// ===== INICIO =====
renderLogin();