const input = document.getElementById("password");
const entropyText = document.getElementById("entropy");
const strengthText = document.getElementById("strength");
const crackTimeText = document.getElementById("crackTime");

input.addEventListener("input", () => {
  const password = input.value;

  if (password.length === 0) {
    entropyText.textContent = "";
    strengthText.textContent = "";
    crackTimeText.textContent = "";
    updateChecklist(password);
    return;
  }

  const charsetSize = detectCharsetSize(password);

  const bits = password.length * Math.log2(charsetSize);
  entropyText.textContent = `Entropy: ${bits.toFixed(2)} bits`;

  strengthText.textContent = getStrength(bits);

  const guessesPerHour = 1e11; 
  const totalCombinations = Math.pow(charsetSize, password.length);
  const secondsToCrack = totalCombinations / guessesPerHour * 3600;
  crackTimeText.textContent = `Estimated crack time: ${formatTime(secondsToCrack)}`;

  updateChecklist(password);
});

function detectCharsetSize(password) {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^a-zA-Z0-9]/.test(password)) size += 23;
  return size || 1;
}

function getStrength(bits) {
  if (bits < 28) return "Very Weak";
  if (bits < 36) return "Weak";
  if (bits < 60) return "Reasonable";
  if (bits < 128) return "Strong";
  return "Very Strong";
}

function formatTime(seconds) {
  if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${minutes.toFixed(2)} minutes`;
  const hours = minutes / 60;
  if (hours < 24) return `${hours.toFixed(2)} hours`;
  const days = hours / 24;
  if (days < 365) return `${days.toFixed(2)} days`;
  const years = days / 365;
  if (years < 100) return `${years.toFixed(2)} years`;
  return "Very long time (centuries+)";
}

function updateChecklist(password) {
  document.getElementById("lowercase").classList.toggle("complete", /[a-z]/.test(password));
  document.getElementById("uppercase").classList.toggle("complete", /[A-Z]/.test(password));
  document.getElementById("numbers").classList.toggle("complete", /[0-9]/.test(password));
  document.getElementById("symbols").classList.toggle("complete", /[^a-zA-Z0-9]/.test(password));
}