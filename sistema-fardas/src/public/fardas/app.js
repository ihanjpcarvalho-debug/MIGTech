let fardas = [];

function limpar() {
  document.getElementById("camisa").value = "";
  document.getElementById("short").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("entrega").value = "";
  document.getElementById("indice").value = "";
}

async function carregarFardas() {
  const resposta = await fetch("/fardamentos/api");
  fardas = await resposta.json();
  atualizarTabela();
}

async function salvar() {
  const payload = {
    camisa: document.getElementById("camisa").value,
    short: document.getElementById("short").value,
    tamanho: document.getElementById("tamanho").value,
    quantidade: Number(document.getElementById("quantidade").value),
    entrega: document.getElementById("entrega").value,
  };

  const indice = document.getElementById("indice").value;

  if (indice === "") {
    await fetch("/fardamentos/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(`/fardamentos/api/${fardas[Number(indice)].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  await carregarFardas();
  limpar();
}

function atualizarTabela() {
  const tabela = document.getElementById("lista");
  tabela.innerHTML = "";

  fardas.forEach((item, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${item.camisa}</td>
        <td>${item.short}</td>
        <td>${item.tamanho}</td>
        <td>${item.quantidade}</td>
        <td>${item.entrega}</td>
        <td>
          <button class="editar" onclick="editar(${index})">Editar</button>
          <button class="excluir" onclick="excluir(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editar(i) {
  document.getElementById("camisa").value = fardas[i].camisa;
  document.getElementById("short").value = fardas[i].short;
  document.getElementById("tamanho").value = fardas[i].tamanho;
  document.getElementById("quantidade").value = fardas[i].quantidade;
  document.getElementById("entrega").value = fardas[i].entrega;
  document.getElementById("indice").value = i;
}

async function excluir(i) {
  if (!confirm("Deseja realmente excluir esta farda?")) return;

  const id = fardas[i].id;
  await fetch(`/fardamentos/api/${id}`, { method: "DELETE" });
  await carregarFardas();
}

carregarFardas();
