/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// IMPORTANT: A Google Apps Script is required to receive form submissions.
// The URL for the deployed web app should be placed here.
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzy6f_JKtKS_i5KAyDk9CeOfHsj2EPev60b7vaTpFoYPrjIJxkBSNLTHr9ClViFjNT89g/exec';

const steps: NodeListOf<HTMLElement> = document.querySelectorAll('.step');
const startButton = document.getElementById(
  'start-quest-button',
) as HTMLDivElement;
const logoHeader = document.getElementById('logo-header') as HTMLElement;

const passwordForm = document.getElementById('password-form') as HTMLFormElement;
const passwordInput = document.getElementById(
  'password-input',
) as HTMLInputElement;

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const likeRetweetBtn = document.getElementById(
  'like-retweet-btn',
) as HTMLButtonElement;
const taskCheckbox = document.getElementById(
  'task-checkbox',
) as HTMLInputElement;
const usernameInput = document.getElementById(
  'username-input',
) as HTMLInputElement;
const walletInput = document.getElementById('wallet-input') as HTMLInputElement;
const taskSubmitBtn = taskForm
  ? (taskForm.querySelector('button[type="submit"]') as HTMLButtonElement)
  : null;


const clickSound = document.getElementById('click-sound') as HTMLAudioElement;
const successSound = document.getElementById(
  'success-sound',
) as HTMLAudioElement;
const errorSound = document.getElementById('error-sound') as HTMLAudioElement;
const backgroundMusic = document.getElementById(
  'background-music',
) as HTMLAudioElement;


function playSound(sound: HTMLAudioElement | null) {
  if (sound && sound.src) {
    sound.currentTime = 0; 
    sound.play().catch(error => {
      
      console.error('Error playing sound:', error);
    });
  }
}

const SECRET_PASSWORD = 'goofy'; 
const TWITTER_URL = 'https://x.com/BearsGoofy';

function showStep(stepIndex: number) {
  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}

function handlePasswordSubmit(event: Event) {
  event.preventDefault();
  if (passwordInput.value.toLowerCase() === SECRET_PASSWORD) {
    playSound(successSound);
    showStep(2);
  } else {
    playSound(errorSound);
    passwordForm.classList.add('shake');
    passwordInput.value = '';
    setTimeout(() => {
      passwordForm.classList.remove('shake');
    }, 500);
  }
}

async function handleTaskSubmit(event: Event) {
  event.preventDefault();
  if (!taskCheckbox.checked) {
    playSound(errorSound);
    alert('Please confirm you have liked and retweeted.');
    return;
  }
  const username = usernameInput.value.trim();
  const wallet = walletInput.value.trim();

  if (!username) {
    playSound(errorSound);
    alert('Please enter your username.');
    return;
  }
  if (!wallet) {
    playSound(errorSound);
    alert('Please enter your wallet address.');
    return;
  }

  
  if (GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
    console.error(
      'Placeholder URL is being used. Please update the GOOGLE_SCRIPT_URL.',
    );
    alert(
      'The application is not configured correctly. Please follow the setup instructions.',
    );
    return;
  }

  if (taskSubmitBtn) {
    taskSubmitBtn.disabled = true;
    taskSubmitBtn.textContent = 'SUBMITTING...';
  }

  const payload = {
    username: username,
    wallet: wallet,
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const result = await response.json();
      if (result.result !== 'success') {
        throw new Error(result.message || 'Submission failed on the server.');
      }
    } else if (!response.ok) {
      
      const textResponse = await response.text();
      console.error('Received non-JSON error response:', textResponse);
      throw new Error(
        'An unexpected error occurred. The server response was not in the expected format.',
      );
    }

    playSound(successSound);
    showStep(3);
  } catch (error) {
    console.error('Error submitting form:', error);
    playSound(errorSound);
    alert(
      `Submission failed. Please check your connection and try again. Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  } finally {
    if (taskSubmitBtn) {
      taskSubmitBtn.disabled = false;
      taskSubmitBtn.textContent = 'SUBMIT';
    }
  }
}


if (logoHeader) {
  logoHeader.addEventListener('click', () => {
    
    if (!steps[0].classList.contains('active')) {
      playSound(clickSound);
      showStep(0);
    }
  });
}

if (startButton) {
  startButton.addEventListener('click', () => {
    playSound(clickSound);
    if (backgroundMusic) {
      backgroundMusic.volume = 0.3; 
      backgroundMusic.play().catch(error => {
        console.error('Background music failed to play:', error);
      });
    }

    startButton.classList.add('zooming');

    setTimeout(() => {
      showStep(1);
      
      startButton.classList.remove('zooming');
    }, 600); 
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', handlePasswordSubmit);
}

if (likeRetweetBtn) {
  likeRetweetBtn.addEventListener('click', () => {
    
    if (likeRetweetBtn.classList.contains('like-retweet-animate')) {
      return;
    }
    likeRetweetBtn.classList.add('like-retweet-animate');

    window.open(TWITTER_URL, '_blank');

    
    setTimeout(() => {
      likeRetweetBtn.classList.remove('like-retweet-animate');
    }, 600); 
  });
}

if (taskForm) {
  taskForm.addEventListener('submit', handleTaskSubmit);
}


document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', () => playSound(clickSound));
});

// Initialize
showStep(0);

export {};
