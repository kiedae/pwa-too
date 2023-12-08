const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  const promptEvent = deferredPrompt;

  if (promptEvent) {
    promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation prompt');
    } else {
      console.log('User dismissed the installation prompt');
    }

    deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
  }
});

window.addEventListener('appinstalled', (event) => {
  deferredPrompt = null;
});
