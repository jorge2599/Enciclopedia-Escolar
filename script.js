const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const navigation = document.getElementById('navigation');
const menuToggle = document.getElementById('menuToggle');

sections.forEach(section => {
  const blossoms = document.createElement('div');
  blossoms.className = 'blossom-animation';
  blossoms.setAttribute('aria-hidden', 'true');
  blossoms.innerHTML = '<span>✿</span><span>❀</span><span>✿</span><span>❀</span><span>✿</span>';
  section.prepend(blossoms);
});

function showSection(id) {
  sections.forEach(section => section.classList.toggle('active', section.id === id));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === id));
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => link.addEventListener('click', () => showSection(link.dataset.section)));
document.querySelectorAll('[data-go], [data-section]').forEach(button => {
  if (!button.classList.contains('nav-link')) {
    button.addEventListener('click', event => {
      const target = event.currentTarget.dataset.go || event.currentTarget.dataset.section;
      if (target) showSection(target);
    });
  }
});

menuToggle.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

const filters = document.querySelectorAll('.filter');
const searchInput = document.getElementById('plantSearch');
const cards = document.querySelectorAll('.plant-card');
const emptyState = document.getElementById('emptyState');
let activeFilter = 'todas';

function filterPlants() {
  const term = searchInput.value.trim().toLocaleLowerCase('es');
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = activeFilter === 'todas' || card.dataset.category === activeFilter;
    const matchesText = card.dataset.name.toLocaleLowerCase('es').includes(term);
    const show = matchesCategory && matchesText;
    card.hidden = !show;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle('active', item === button));
  filterPlants();
}));
searchInput.addEventListener('input', filterPlants);

const plantData = {
  ruda: {title:'Ruda',description:'Planta aromática perenne de aroma intenso, cultivada también como ornamental. No debe ingerirse ni utilizarse como remedio: puede ser tóxica y causar reacciones graves.',light:'Pleno sol; tolera semisombra ligera.',water:'Escaso a moderado. Dejar secar la superficie del sustrato entre riegos; el exceso de agua puede pudrir las raíces.',soil:'Ligero, incluso pobre, con excelente drenaje.',temp:'Templada; proteger de heladas intensas.',extra:{botany:'Subarbusto de base leñosa que suele alcanzar entre 20 y 90 cm. Tiene hojas divididas, carnosas y verde azuladas; sus flores pequeñas son amarillas y aparecen en primavera y verano. Contiene aceites esenciales, flavonoides como la rutina y alcaloides; algunos compuestos contribuyen a su toxicidad.',cultivation:'Crece mejor a pleno sol, aunque tolera semisombra ligera. Prefiere suelo ligero y muy drenante y resiste la sequía una vez establecida. Puede propagarse por semillas en primavera o por esquejes semileñosos, usando guantes y evitando el contacto de la savia con la piel.',uses:'Se cultiva como ornamental y se planta a veces en bordes de huertas por su aroma; no se debe confiar en ella como método comprobado para controlar plagas. En la medicina popular se le han atribuido usos digestivos y menstruales, pero su eficacia y seguridad no están establecidas y no se recomienda consumirla. En Argentina y Paraguay forma parte de tradiciones del 1 de agosto, como la caña con ruda; la tradición no hace segura su ingestión.',safety:'La ingesta puede provocar intoxicación grave y daño en órganos. No consumirla ni preparar infusiones; está especialmente contraindicada durante el embarazo y debe evitarse también durante la lactancia y en niños. La savia sobre la piel, seguida de exposición al sol, puede causar fitofotodermatitis con enrojecimiento, ampollas y manchas. Manipular con guantes, lavarse las manos y mantenerla lejos de niños y mascotas. Si alguien la ingiere o presenta síntomas, contactar de inmediato a emergencias o a un centro de toxicología.'}},
  menta: {
    title: 'Menta',
    description: 'Aromática de crecimiento expansivo y hojas aromáticas. Conviene cultivarla en una maceta propia para controlar sus raíces y evitar que invada otras plantas.',
    light: 'Semisombra o sol suave. También puede crecer cerca de una ventana con luz indirecta abundante.',
    water: 'Frecuente y moderado. Mantener el sustrato ligeramente húmedo, sin dejar agua estancada.',
    soil: 'Fresco, fértil y rico en materia orgánica, con buen drenaje.',
    temp: 'Templada; evitar el sol extremo, las heladas fuertes y la sequedad prolongada.',
    extra: {
      botany: 'Perteneciente al género Mentha, es una planta herbácea perenne con tallos cuadrados, hojas opuestas y aroma intenso. Sus tallos rastreros o subterráneos producen raíces y nuevos brotes.',
      cultivation: 'Puede sembrarse o dividirse en macetas. Conviene cortar los brotes superiores para favorecer el crecimiento y renovar ejemplares antiguos. Retirar flores si se busca conservar mejor el sabor de las hojas.',
      uses: 'Sus hojas frescas se usan en infusiones, agua aromatizada, comidas y postres. También se cultiva como planta aromática y ornamental.',
      safety: 'Lavar las hojas antes de consumirlas. El aceite esencial concentrado no debe ingerirse ni aplicarse sin indicación profesional, especialmente en bebés y mascotas.'
    }
  },
  mandarina: {
    title: 'Mandarina',
    description: 'Fruto del mandarino, un árbol cítrico. La fruta aporta vitamina C, fibra y agua; puede disfrutarse fresca como parte de una alimentación variada.',
    light: 'Sol directo abundante, idealmente seis a ocho horas al día.',
    water: 'Regular, aumentando la frecuencia en épocas cálidas; mantener el sustrato húmedo sin encharcar.',
    soil: 'Fértil, ligeramente ácido y con buen drenaje.',
    temp: 'Clima templado a cálido; proteger el árbol y las flores de las heladas.',
    extra: {
      botany: 'El mandarino es un árbol perennifolio de porte mediano, perteneciente al género Citrus. Tiene hojas persistentes, flores aromáticas blancas y frutos pequeños de piel fácil de pelar.',
      cultivation: 'Necesita un recipiente amplio con buen drenaje y puede cultivarse a partir de semillas o plantas injertadas. El injerto permite conservar las características de variedades seleccionadas y suele producir frutos antes.',
      uses: 'Sus frutos se consumen frescos, en jugos o preparaciones culinarias. Las hojas y flores también son aromáticas, y el árbol puede utilizarse como ejemplar frutal ornamental.',
      safety: 'Lavar bien los frutos antes de consumirlos, especialmente si tienen tratamientos superficiales. Las personas con alergia a los cítricos deben evitar su ingesta y consultar ante una reacción adversa.'
    }
  },
  celosia: {
    title: 'Celosia argentea',
    description: 'Planta herbácea anual ornamental, conocida por sus inflorescencias densas y llamativas con forma de cresta, plumero o espiga.',
    light: 'Sol directo abundante; al menos seis horas de luz diaria.',
    water: 'Regular. Mantener el sustrato ligeramente húmedo sin encharcar.',
    soil: 'Fértil, suelto y bien drenado.',
    temp: 'Cálida a templada; sensible al frío y las heladas.',
    extra: {
      botany: 'Pertenece a la familia Amaranthaceae. Sus flores pequeñas forman inflorescencias grandes y brillantes. Las hojas son simples y alternas.',
      cultivation: 'Puede sembrarse en semillero o directamente en el suelo después del frío. Trasplantar con cuidado y mantener distancia entre ejemplares.',
      uses: 'Se cultiva principalmente como planta ornamental de jardín y maceta. Sus flores cortadas pueden secarse para decoración.',
      safety: 'No ingerir la planta sin una identificación segura y una recomendación confiable.'
    }
  },
  kalanchoe: {
    title: 'Kalanchoe laxiflora',
    description: 'Suculenta perenne de Madagascar que alcanza aproximadamente 50 cm y produce pequeñas plántulas en los bordes dentados de sus hojas.',
    light: 'Sol suave o luz brillante, adaptándola gradualmente para evitar quemaduras.',
    water: 'Moderado y espaciado. Dejar secar bien el sustrato entre riegos.',
    soil: 'Sustrato poroso para cactus y suculentas, con excelente drenaje.',
    temp: 'Templada a cálida; proteger de las heladas.',
    extra: {
      botany: 'Es una suculenta perenne con hojas opuestas, carnosas y verde azulado, bordes dentados y propágulos en sus márgenes.',
      cultivation: 'Usar maceta con agujeros y riego limitado. Puede propagarse por esquejes o por las pequeñas plántulas de las hojas.',
      uses: 'Se utiliza como planta ornamental en macetas y jardines secos.',
      safety: 'Los Kalanchoe pueden ser tóxicos si se ingieren, especialmente para mascotas.'
    }
  },
  cebollin: {
    title: 'Cebollín',
    description: 'Hierba perenne de hojas largas, delgadas y huecas. Es fácil de cultivar y aporta un sabor suave a cebolla.',
    light: 'Sol directo o semisombra luminosa.',
    water: 'Frecuente y moderado. Mantener el sustrato húmedo sin encharcar.',
    soil: 'Fértil, suelto y con buen drenaje.',
    temp: 'Templada a fresca; tolera frío suave.',
    extra: {
      botany: 'Es una hierba perenne del género Allium con hojas cilíndricas y huecas que forman matas.',
      cultivation: 'Sembrar directamente o trasplantar plantines. Cortar las hojas externas cerca de la base para favorecer nuevos brotes.',
      uses: 'Las hojas frescas se usan picadas en ensaladas, huevos, sopas y sándwiches.',
      safety: 'Lavar las hojas antes de consumirlas. Las especies de Allium pueden ser tóxicas para perros y gatos.'
    }
  },
  almendroIndio: {
    title: 'Almendro indio',
    description: 'Árbol caduco de gran porte y copa amplia, con hojas que pueden adquirir tonos rojizos y dorados.',
    light: 'Exterior y pleno sol, con suficiente espacio para la copa.',
    water: 'Moderado durante el establecimiento; luego ajustar según las lluvias y el clima.',
    soil: 'Fértil y con buen drenaje.',
    temp: 'Climas tropicales y cálidos; proteger ejemplares jóvenes del frío intenso.',
    extra: {
      botany: 'Pertenece a la familia Combretaceae. Tiene tronco leñoso, ramas dispuestas en niveles y hojas grandes reunidas en los extremos de las ramas.',
      cultivation: 'Necesita mucho espacio exterior y no es adecuada para una maceta pequeña. Mantener riego regular sin encharcar durante los primeros años.',
      uses: 'Se usa como árbol ornamental y de sombra. Sus hojas cambian de color estacionalmente.',
      safety: 'Considerar su tamaño adulto y la caída de hojas y frutos. No consumir sus semillas sin una identificación confiable.'
    }
  },
  morron: {
    title: 'Morrón',
    description: 'Planta anual de huerta que produce frutos grandes, crujientes y coloridos. Se cultiva como un pimiento dulce y necesita calor, luz y riego regular.',
    light: 'Sol directo abundante, preferentemente varias horas durante el día.',
    water: 'Regular y moderado. Mantener el sustrato húmedo sin encharcar y aumentar el riego durante el calor.',
    soil: 'Fértil, suelto y bien drenado, enriquecido con materia orgánica.',
    temp: 'Cálida a templada. Protege los plantines del frío y las heladas.',
    extra: {
      botany: 'Es una planta herbácea anual de la familia Solanaceae. Posee tallos ramificados, hojas simples y frutos huecos que pueden ser verdes, amarillos, naranjas o rojos según su madurez y variedad.',
      cultivation: 'Se inicia normalmente por semillas en almácigo y luego se trasplanta al alcanzar varios pares de hojas. Conviene separarlos con suficiente espacio, tutorar si hace falta y mantener la humedad constante sin dejar agua acumulada.',
      uses: 'Sus frutos se consumen frescos en ensaladas, asados, rellenos y preparaciones cocidas. También puede conservarse en frascos, congelarse o utilizarse seco según la variedad.',
      safety: 'Lavar bien los frutos antes de consumirlos. Las personas alérgicas deben evitarlo si presentan síntomas y consultar ante una reacción adversa.'
    }
  },
  lechuga: {
    title: 'Lechuga',
    description: 'Hortaliza de hojas tiernas que crece rápidamente y puede cultivarse en macetas o huertas. Requiere humedad constante y protección de calor intenso.',
    light: 'Sol suave o semisombra luminosa. En clima cálido conviene evitar varias horas de sol directo.',
    water: 'Frecuente y moderado. Mantener el sustrato húmedo sin encharcar, revisando la tierra con frecuencia.',
    soil: 'Fértil, suelto y rico en materia orgánica, con buen drenaje.',
    temp: 'Templada a fresca. El calor fuerte puede producir endurecimiento o floración anticipada.',
    extra: {
      botany: 'Es una planta herbácea anual de la familia Asteraceae. Forma una roseta de hojas verdes y puede presentar coloraciones claras o rojizas según la variedad.',
      cultivation: 'Puede sembrarse directamente o en semillero y luego trasplantarse al desarrollar varias hojas verdaderas. Conviene espaciar las plantas según su tamaño adulto y realizar riegos frecuentes sin mojar demasiado las hojas.',
      uses: 'Sus hojas tiernas se consumen generalmente crudas en ensaladas, sándwiches y acompañamientos. Algunas variedades también pueden cocerse ligeramente.',
      safety: 'Lavar bien las hojas antes de consumirlas y descartarlas si aparecen pudriciones o olores extraños.'
    }
  },
};

const modal = document.getElementById('plantModal');
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', () => {
    const data = plantData[button.dataset.plant];
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalLight').textContent = data.light;
    document.getElementById('modalWater').textContent = data.water;
    document.getElementById('modalSoil').textContent = data.soil;
    document.getElementById('modalTemp').textContent = data.temp;
    const extra = document.getElementById('modalExtra');
    extra.hidden = !data.extra;
    if (data.extra) {
      document.getElementById('modalBotany').textContent = data.extra.botany;
      document.getElementById('modalCultivation').textContent = data.extra.cultivation;
      document.getElementById('modalUses').textContent = data.extra.uses;
      document.getElementById('modalSafety').textContent = data.extra.safety;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});


// Cambio de tema claro/oscuro con preferencia guardada en el navegador.
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');

function applyTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-theme', dark);
  themeIcon.textContent = dark ? '☀' : '☾';
  themeLabel.textContent = dark ? 'Modo claro' : 'Modo oscuro';
  themeToggle.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  themeToggle.setAttribute('aria-pressed', String(dark));
  try { localStorage.setItem('verde-botanico-theme', theme); } catch (error) {}
}

let savedTheme = 'light';
try { savedTheme = localStorage.getItem('verde-botanico-theme') || 'light'; } catch (error) {}
applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
  applyTheme(document.body.classList.contains('dark-theme') ? 'light' : 'dark');
});

// Tarjeta interactiva de la materia TIC
const ticCredit = document.querySelector('.subject-button[data-subject="tic"]') || document.getElementById('ticCredit');
const ticModal = document.getElementById('ticModal');

function openTicModal() {
  ticModal.classList.add('open');
  ticModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  ticModal.querySelector('.subject-card-close').focus();
}

function closeTicModal() {
  ticModal.classList.remove('open');
  ticModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (ticCredit && ticModal) {
  ticCredit.addEventListener('click', openTicModal);
  document.querySelectorAll('[data-close-tic]').forEach(control => control.addEventListener('click', closeTicModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && ticModal.classList.contains('open')) closeTicModal();
  });
}

