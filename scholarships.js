const form = document.getElementById('scholarshipForm');
const results = document.getElementById('estimateResults');
const amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
document.getElementById('currentYear').textContent = new Date().getFullYear();

async function loadScholarshipRules() {
  const response = await fetch('/data/scholarships.json');
  if (!response.ok) throw new Error('Scholarship details are unavailable right now. Please use the official college links below.');
  return response.json();
}

function calculatePcm() {
  const data = new FormData(form);
  const marks = ['physics', 'chemistry', 'mathematics'].map(subject => {
    const got = Number(data.get(subject));
    const max = Number(data.get(subject + 'Max'));
    if (!Number.isFinite(got) || !Number.isFinite(max) || max <= 0 || got < 0 || got > max) return null;
    return got / max * 100;
  });
  return marks.every(mark => mark !== null) ? marks.reduce((sum, mark) => sum + mark, 0) / marks.length : null;
}

function formatBand(average, bands) {
  return bands.find(band => average >= band.min && average <= band.max) || null;
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const error = document.getElementById('scholarshipError');
  const pcmAverage = calculatePcm();
  if (pcmAverage === null) {
    error.textContent = 'Enter valid marks for Physics, Chemistry and Mathematics. Marks must be between zero and the maximum.';
    results.hidden = true;
    return;
  }
  error.textContent = '';
  try {
    const rules = await loadScholarshipRules();
    const board = form.elements.board.value;
    const course = rules.hindustan.courses[form.elements.course.value];
    const boardThresholds = rules.hindustan.pcmThresholds[board];
    const slabIndex = boardThresholds.findIndex(threshold => pcmAverage >= threshold);
    const pcmDisplay = pcmAverage.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + '%';
    document.getElementById('pcmAverage').textContent = pcmDisplay;

    if (slabIndex >= 0) {
      const slab = rules.hindustan.bands[slabIndex];
      const scholarship = course.amounts[slabIndex];
      document.getElementById('hindustanResultTitle').textContent = amount.format(scholarship);
      document.getElementById('hindustanResultText').textContent = 'Estimated Hindustan ' + slab + ' slab for ' + course.label + ' · tuition-fee award per year, subject to college confirmation.';
    } else {
      document.getElementById('hindustanResultTitle').textContent = 'No PCM band matched';
      document.getElementById('hindustanResultText').textContent = 'The published PCM merit bands start at ' + boardThresholds[boardThresholds.length - 1] + '% for the selected board group. Other eligibility routes may be available.';
    }

    const glaBand = formatBand(pcmAverage, rules.gla.pcmBands);
    if (glaBand) {
      document.getElementById('glaResultTitle').textContent = amount.format(glaBand.amount);
      document.getElementById('glaResultText').textContent = 'Estimated GLA University B.Tech merit scholarship per year for ' + glaBand.min + '–' + glaBand.max + '% PCM.';
    } else {
      document.getElementById('glaResultTitle').textContent = 'No PCM band matched';
      document.getElementById('glaResultText').textContent = 'The published GLA B.Tech PCM merit bands start at 80%. Other scholarship routes may apply.';
    }

    const sanskritiBand = formatBand(pcmAverage, rules.sanskriti.pcmBands);
    if (sanskritiBand) {
      document.getElementById('sanskritiResultTitle').textContent = sanskritiBand.percent + '% tuition waiver';
      document.getElementById('sanskritiResultText').textContent = 'Sanskriti University B.Tech first-year tuition percentage listed for ' + sanskritiBand.min + '–' + sanskritiBand.max + '% PCM. Its regulations PDF differs for one band; verify the approved amount.';
    } else {
      document.getElementById('sanskritiResultTitle').textContent = 'No PCM band matched';
      document.getElementById('sanskritiResultText').textContent = 'The current B.Tech admission page lists PCM tuition awards from 70%. Other scholarship routes may apply.';
    }
    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (err) {
    error.textContent = err.message;
    results.hidden = true;
  }
});
