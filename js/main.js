const copyButton = document.getElementById('copyButton');
const copyStatus = document.getElementById('copyStatus');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

copyButton.onclick = async () => {
  await navigator.clipboard.writeText('n36.joinserver.xyz:25940');
  copyButton.classList.add('copied');
  copyStatus.classList.add('show');
  setTimeout(() => {
    copyButton.classList.remove('copied');
    copyStatus.classList.remove('show');
  }, 2000);
};

async function checkServerStatus() {
  try {
    const res = await fetch('https://api.mcstatus.io/v2/status/java/n36.joinserver.xyz/25940');
    const data = await res.json();
    if (data.online) {
      statusDot.className = 'status-dot online';
      statusText.textContent = `Online • ${data.players.online}/${data.players.max} players`;
    } else {
      statusDot.className = 'status-dot offline';
      statusText.textContent = 'Offline';
    }
  } catch {
    statusDot.className = 'status-dot offline';
    statusText.textContent = 'Error';
  }
}

checkServerStatus();
setInterval(checkServerStatus, 60000);
