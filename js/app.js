const form = document.querySelector("#formulario");
const result = document.querySelector("#resultado");

window.onload = () => {
  form.addEventListener("submit", validar);
};

function validar(e) {
  e.preventDefault();
  const search = document.querySelector("#busqueda").value;

  if (search === "") {
    mostrarMsj("Añade mas información");
    return;
  }

  consultarAPI(search);
}

function consultarAPI(search) {
  const jobsUrl = `https://jobs.github.com/positions.json?search=${search}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(jobsUrl)}`;

  mostrarSpinner();

  axios.get(url)
    .then((response) => mostrarVacantes(JSON.parse(response.data.contents)));
}

function mostrarMsj(msj) {
  if (!form.querySelector(".alerta")) {
    const div = document.createElement("div");
    div.classList.add("alerta", "bg-yellow-400", "p-3", "text-center", "mt-5");
    div.textContent = msj;

    form.appendChild(div);

    setTimeout(() => div.remove(), 3000);
  }
}

function mostrarVacantes(vacantes){ 
  while(result.firstChild)
    result.removeChild(result.firstChild);

  if(vacantes.length > 0){
    result.classList.add('grid');

    vacantes.forEach(vacante => {
      const {company, type, url, title} = vacante;

      result.innerHTML += `
	<div class="shadow bg-white p-6 rounded">
	  <h2 class="text-2xl font-light mb-4">${title}</h2>
	  <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
          <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
	  <a class="bg-gray-800 hover:bg-gray-700 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
	</div>`
    })
  }
  else{
    mostrarMsj("No hay vacantes, intenta hacer otra busqueda");
  }
}

function mostrarSpinner(){
   while(result.firstChild)
    result.removeChild(result.firstChild);

  result.classList.remove('grid');
  const spinner = document.createElement('div');
  spinner.classList.add('sk-cube-grid');
  spinner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
  `;

  result.appendChild(spinner);
}
