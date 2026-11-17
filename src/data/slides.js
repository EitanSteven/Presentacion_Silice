export const slidesData = [
  {
    id: 0,
    type: 'waiting',
    tag: 'Sala de Espera',
    title: 'SILICIO, SÍLICE, CUARZO & INDUSTRIA',
    student: 'Estudiante: Eitan Steven Gil',
    date: 'Fecha: 17/11',
    teacher: 'Profesora: Natalia Callegaro',
    images: [
      './images/00 - Espera/Espera 01.png',
      './images/00 - Espera/Espera 02.png',
      './images/00 - Espera/Espera 03.png'
    ],
    intervalMs: 2800
  },
  {
    id: 1,
    type: 'cover',
    tag: 'Introducción',
    title: 'DEL CUARZO AL MICROPROCESADOR',
    subtitle: 'De la extracción minera a la industria electrónica',
    keywords: ['Silicio', 'Metalurgia', 'Purificación', 'Microelectrónica'],
    backgroundImage: './images/remote/01-cuarzo-portada.jpg',
    imageFit: 'cover',
    accent: 'cyan'
  },
  {
    id: 2,
    type: 'bottom-panel',
    tag: '01 · Materia Prima',
    title: 'La materia prima: el cuarzo',
    highlightLabel: 'Composición',
    highlightValue: 'SiO₂',
    points: [
      { label: 'Mineral', text: 'Cuarzo' },
      { text: 'Fuente mineral de silicio' },
      { text: 'La pureza condiciona sus aplicaciones' }
    ],
    backgroundImage: './images/remote/02-cuarzo-bruto.jpg',
    imageFit: 'cover',
    accent: 'cyan'
  },
  {
    id: 3,
    type: 'bottom-panel',
    tag: '02 · Minería',
    title: 'Extracción y preparación mineral',
    points: [
      { text: 'Extracción en canteras' },
      { text: 'Trituración y clasificación' },
      { text: 'Lavado y separación de impurezas' },
      { text: 'Concentración del cuarzo' }
    ],
    backgroundImage: './images/remote/03-cantera.jpg',
    imageFit: 'cover',
    accent: 'amber'
  },
  {
    id: 4,
    type: 'formula-panel',
    tag: '03 · Metalurgia',
    title: 'Reducción carbotérmica',
    equation: {
      reactants: 'SiO₂ + 2C',
      products: 'Si + 2CO'
    },
    metrics: [
      { label: 'Temperatura aproximada', value: '2.000 °C' },
      { label: 'Producto', value: 'Silicio metalúrgico' }
    ],
    backgroundImage: './images/remote/04-horno-arco.jpg',
    imageFit: 'cover',
    accent: 'orange'
  },
  {
    id: 5,
    type: 'bottom-panel',
    tag: '04 · Refinado Químico',
    title: 'Purificación química',
    points: [
      { text: 'Conversión a triclorosilano' },
      { text: 'Destilación fraccionada' },
      { text: 'Deposición química' },
      { text: 'Silicio ultrapuro' }
    ],
    backgroundImage: './images/remote/05-reactor-siemens.jpg',
    imageFit: 'contain-upper',
    lightBacking: true,
    accent: 'cyan'
  },
  {
    id: 6,
    type: 'czochralski',
    tag: '05 · Monocristal y Obleas',
    title: 'Cristalización y fabricación de obleas',
    points: [
      { text: 'Método Czochralski' },
      { text: 'Formación de un monocristal' },
      { text: 'Corte del lingote' },
      { text: 'Obleas de silicio (wafers)' }
    ],
    backgroundImage: './images/remote/06-czochralski.jpg',
    insetImage: './images/remote/06-monocristal.jpg',
    insetCaption: 'Monocristal de silicio',
    imageFit: 'contain-full',
    lightBacking: true,
    accent: 'indigo'
  },
  {
    id: 7,
    type: 'carousel-panel',
    tag: '06 · Microelectrónica',
    title: 'Fabricación del microprocesador',
    points: [
      { text: 'Dopaje (Boro o Fósforo)' },
      { text: 'Fotolitografía' },
      { text: 'Grabado y deposición' },
      { text: 'Transistores y circuitos integrados' }
    ],
    images: [
      './images/07 - Fabricación de Microprocesadores/07 - 1.png',
      './images/07 - Fabricación de Microprocesadores/07 - 2.png',
      './images/07 - Fabricación de Microprocesadores/07 - 3.png',
      './images/07 - Fabricación de Microprocesadores/07 - 4.png',
      './images/07 - Fabricación de Microprocesadores/07 - 5.png',
      './images/07 - Fabricación de Microprocesadores/07 - 6.png',
      './images/07 - Fabricación de Microprocesadores/07 - 7.png'
    ],
    intervalMs: 2600,
    accent: 'amber'
  },
  {
    id: 8,
    type: 'table-panel',
    tag: '07 · Producción Nacional',
    title: 'Argentina: producción de cuarzo y sílice',
    subtitle: 'Principales regiones productoras',
    rows: [
      { province: 'Córdoba', share: '+60 % del cuarzo' },
      { province: 'San Luis', share: '~20 % del cuarzo' },
      { province: 'San Juan', share: '~10 % del cuarzo' },
      { province: 'Entre Ríos', share: '+75 % de la arena silícea' }
    ],
    footnote: 'Datos de producción de 2017 recopilados en una investigación publicada en 2025. No representan estadísticas actuales.',
    backgroundImage: './images/remote/08-pablo-acosta.png',
    imageFit: 'contain-upper',
    lightBacking: true,
    accent: 'emerald'
  },
  {
    id: 9,
    type: 'case-panel',
    tag: '08 · Estudio Regional',
    title: 'Un caso cercano: cuarzo en Azul, Buenos Aires',
    subtitle: 'Pablo Acosta — Partido de Azul',
    highlightLabel: 'Muestras analizadas',
    highlightValue: '95–97 % de SiO₂',
    points: [
      { text: 'Cuarzo de alta pureza' },
      { text: 'Potencial para aplicaciones industriales' },
      { text: 'Cercanía regional con Olavarría' }
    ],
    footnote: 'Aclaración breve: El contenido de SiO₂ no equivale a pureza electrónica.',
    backgroundImage: './images/09 - Mapa Argentina/Mapa.png',
    imageFit: 'cover',
    lightBacking: false,
    accent: 'cyan'
  },
  {
    id: 10,
    type: 'references',
    tag: '09 · Referencias',
    title: 'Fuentes y bibliografía',
    backgroundImage: './images/00 - Espera/Espera 02.png',
    sources: [
      {
        title: 'Oportunidades tecnológicas para la industria fotovoltaica en Argentina (2025)',
        url: 'https://www.frontiersin.org/journals/energy-research/articles/10.3389/fenrg.2025.1610359/full'
      },
      {
        title: 'Caracterización geoquímica y tecnológica del depósito de cuarzo de Pablo Acosta, Azul',
        url: 'https://ingenio.frlp.utn.edu.ar/index.php/ingenio/article/view/29'
      },
      {
        title: 'Producción de silicio mediante hornos eléctricos',
        url: 'https://www.mks.com/n/silicon-wafer-production'
      },
      {
        title: 'Proceso Siemens para la producción de silicio policristalino',
        url: 'https://de.mersen.com/de/produkte/isolationsmaterialien-fuer-den-hochtemperaturbereich/isolation-herstellung-von'
      },
      {
        title: 'Proceso Czochralski — Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Czochralski_Process.svg'
      },
      {
        title: 'Estadísticas mineras — INDEC',
        url: 'https://biblioteca.indec.gob.ar/bases/minde/4si28_2.pdf'
      }
    ]
  }
];

export const ALL_PRESENTATION_IMAGES = Array.from(
  new Set(
    slidesData.flatMap((slide) => {
      const urls = [];
      if (slide.backgroundImage) urls.push(slide.backgroundImage);
      if (slide.insetImage) urls.push(slide.insetImage);
      if (Array.isArray(slide.images)) urls.push(...slide.images);
      return urls;
    })
  )
);
