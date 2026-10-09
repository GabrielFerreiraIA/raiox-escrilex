const pillarButtons = [...document.querySelectorAll('.pillar-toggle')];

pillarButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const article = button.closest('[data-pillar]');
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const willOpen = !article.classList.contains('is-open');
    article.classList.toggle('is-open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
    panel.hidden = !willOpen;
  });
});

const setAllPillars = (open) => {
  pillarButtons.forEach((button) => {
    const article = button.closest('[data-pillar]');
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    article.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  });
};

document.querySelector('#expandAllPillars')?.addEventListener('click', () => setAllPillars(true));
document.querySelector('#collapseAllPillars')?.addEventListener('click', () => setAllPillars(false));

const modeButtons = [...document.querySelectorAll('[data-reading-mode]')];
const applyReadingMode = (mode) => {
  const normalized = mode === 'essential' ? 'essential' : 'complete';
  document.body.classList.toggle('mode-essential', normalized === 'essential');
  modeButtons.forEach((button) => {
    const active = button.dataset.readingMode === normalized;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('raiox-reading-mode', normalized); } catch {}
};

modeButtons.forEach((button) => button.addEventListener('click', () => applyReadingMode(button.dataset.readingMode)));
let savedMode = 'complete';
try { savedMode = localStorage.getItem('raiox-reading-mode') || 'complete'; } catch {}
applyReadingMode(savedMode);

const mapContent = {
  time: {
    title: 'O time atual permite enxergar com clareza o ponto de partida.',
    text: 'Um vendedor e um SDR formam a estrutura comercial atual. A conversa conectou o crescimento futuro à escolha de perfil e à existência de um caminho de evolução — sem definir ainda como isso será implementado.',
  },
  visao: {
    title: 'A ambição existe; o horizonte ainda precisa ganhar forma.',
    text: 'Murilo declarou a intenção de dobrar para R$ 30 milhões, mas respondeu que ainda não há prazo. Também apresentou R$ 100 milhões em cinco anos como uma visão que, neste momento, ainda é dele.',
  },
  remuneracao: {
    title: 'A remuneração foi descrita como aderente à média do mercado.',
    text: 'O ponto da conversa não foi reduzir a importância do dinheiro, mas mostrar que remuneração, sozinha, não cria a visão de futuro usada para atrair e reter um perfil empreendedor.',
  },
  reconhecimento: {
    title: 'A primeira oportunidade concreta apareceu durante a própria reunião.',
    text: 'Ao contar que o vendedor já havia batido a meta anual em outubro, Murilo identificou a reunião mensal como espaço para começar a reconhecer publicamente esse resultado.',
  },
  operacao: {
    title: 'A principal tensão da Escrilex Contabilidade não foi resolvida nesta conversa.',
    text: 'Murilo explicou que a operação percebe o novo cliente como fardo, enquanto a margem fica mais apertada. Maycon reconheceu que o próximo passo precisa explicar o “como” dentro do contexto da contabilidade.',
  },
};

const mapDetail = document.querySelector('#mapDetail');
document.querySelectorAll('.map-item').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.map-item').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const item = mapContent[button.dataset.map];
    mapDetail.innerHTML = `<span>CONEXÃO OBSERVADA</span><h4>${item.title}</h4><p>${item.text}</p>`;
    mapDetail.animate([{ opacity: .45, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
  });
});

const progressBar = document.querySelector('#readingProgress');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const navLinks = [...document.querySelectorAll('.chapter-track a')];
const observedSections = [...document.querySelectorAll('[data-observe]')];
const chapterLabels = ['Momento', 'Pergunta central', 'Base', 'Quatro pilares', 'Cultura', 'Fechamento'];
const guideDock = document.querySelector('#guideDock');
const previousChapter = document.querySelector('#previousChapter');
const nextChapter = document.querySelector('#nextChapter');
const currentChapterCount = document.querySelector('#currentChapterCount');
const currentChapterName = document.querySelector('#currentChapterName');
let currentChapterIndex = 0;

const updateGuide = (index) => {
  currentChapterIndex = Math.max(0, Math.min(index, observedSections.length - 1));
  currentChapterCount.textContent = `${String(currentChapterIndex + 1).padStart(2, '0')} / ${String(observedSections.length).padStart(2, '0')}`;
  currentChapterName.textContent = chapterLabels[currentChapterIndex];
  previousChapter.disabled = currentChapterIndex === 0;
  nextChapter.disabled = currentChapterIndex === observedSections.length - 1;
};

const goToChapter = (index) => {
  const target = observedSections[index];
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

previousChapter?.addEventListener('click', () => goToChapter(currentChapterIndex - 1));
nextChapter?.addEventListener('click', () => goToChapter(currentChapterIndex + 1));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.section === entry.target.id));
    updateGuide(observedSections.indexOf(entry.target));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
observedSections.forEach((section) => sectionObserver.observe(section));

const updateGuideVisibility = () => {
  const hero = document.querySelector('.hero');
  guideDock.hidden = window.scrollY < hero.offsetHeight * .72;
};
window.addEventListener('scroll', updateGuideVisibility, { passive: true });
updateGuide(0);
updateGuideVisibility();

document.querySelector('#printSummary').addEventListener('click', () => window.print());
