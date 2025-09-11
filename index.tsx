/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- ÖNEMLİ KURULUM TALİMATLARI ---
// Form gönderimlerini alabilmek için kendi Google Apps Script'inizi oluşturmanız gerekir.
// Şu adımları izleyin:
// 1. Google E-Tablolar'a gidin (sheets.google.com) ve yeni bir boş e-tablo oluşturun.
// 2. E-tabloya "Quest Gönderimleri" gibi bir isim verin.
// 3. Menüden "Uzantılar" > "Apps Script" yolunu izleyin.
// 4. Yeni bir script düzenleyici açılacaktır. `Code.gs` içindeki mevcut kodları silin.
// 5. Aşağıdaki kodu kopyalayıp `Code.gs` içine yapıştırın:
//
//    function doPost(e) {
//      try {
//        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//        var data = JSON.parse(e.postData.contents);
//
//        // E-tablo boşsa başlıkları oluştur
//        if (sheet.getLastRow() === 0) {
//          sheet.appendRow(["Zaman Damgası", "Kullanıcı Adı", "Cüzdan"]);
//        }
//
//        // Yeni veriyi ekle
//        sheet.appendRow([new Date(), data.username, data.wallet]);
//
//        return ContentService
//          .createTextOutput(JSON.stringify({ "result": "success", "message": "Veri alındı" }))
//          .setMimeType(ContentService.MimeType.JSON);
//      } catch (error) {
//        return ContentService
//          .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
//          .setMimeType(ContentService.MimeType.JSON);
//      }
//    }
//
// 6. Script'i kaydedin (Dosya > Projeyi kaydet).
// 7. Sağ üstteki "Dağıt" düğmesine tıklayın ve "Yeni dağıtım" seçeneğini seçin.
// 8. "Tür seçin" yanındaki dişli simgesine tıklayın ve "Web uygulaması" seçeneğini seçin.
// 9. Yapılandırmada:
//    - "Şu şekilde yürüt": "Ben" olarak seçin.
//    - "Kimler erişebilir": "Herkes" olarak seçin. **Bu çok önemli!**
// 10. "Dağıt" düğmesine tıklayın.
// 11. İstendiğinde izinleri yetkilendirin.
// 12. Dağıtımdan sonra bir "Web uygulaması URL'si" verilecektir. Bu URL'yi kopyalayın.
// 13. Kopyaladığınız URL'yi aşağıdaki satıra yapıştırarak 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' kısmını değiştirin.
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzy6f_JKtKS_i5KAyDk9CeOfHsj2EPev60b7vaTpFoYPrjIJxkBSNLTHr9ClViFjNT89g/exec';

const steps: NodeListOf<HTMLElement> = document.querySelectorAll('.step');
const startButton = document.getElementById(
  'start-quest-button',
) as HTMLDivElement;

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

// --- Sound Effects ---
const clickSound = document.getElementById('click-sound') as HTMLAudioElement;
const successSound = document.getElementById(
  'success-sound',
) as HTMLAudioElement;
const errorSound = document.getElementById('error-sound') as HTMLAudioElement;
const backgroundMusic = document.getElementById(
  'background-music',
) as HTMLAudioElement;

/**
 * Plays a sound effect, handling potential playback errors.
 * @param sound The HTMLAudioElement to play.
 */
function playSound(sound: HTMLAudioElement | null) {
  if (sound && sound.src) {
    sound.currentTime = 0; // Rewind to start to allow playing again quickly
    sound.play().catch(error => {
      // Autoplay is often restricted by browsers, log error for debugging.
      console.error('Error playing sound:', error);
    });
  }
}

const SECRET_PASSWORD = 'kumo'; // You can change this password
const TWITTER_URL = 'https://x.com/kumoxworld';

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

  // Check if the script URL is the placeholder
  if (GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
    console.error(
      'Placeholder URL is being used. Please update the GOOGLE_SCRIPT_URL.',
    );
    alert(
      'The application is not configured correctly. Please follow the setup instructions in index.tsx.',
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
        // HATA DÜZELTME: 'application/json' yerine 'text/plain' kullanmak,
        // Google Apps Script ile CORS ön kontrol (preflight) sorunlarını önler.
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    // Google Apps Script web uygulamaları bazen JSON yerine HTML döndürebilir.
    // Yanıtı JSON olarak ayrıştırmadan önce kontrol etmek daha güvenlidir.
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const result = await response.json();
      if (result.result !== 'success') {
        throw new Error(result.message || 'Submission failed on the server.');
      }
    } else if (!response.ok) {
      // JSON değilse ve yanıt 'ok' değilse (örn. 4xx, 5xx),
      // bu bir sunucu hatası olabilir.
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

// Event Listeners
if (startButton) {
  startButton.addEventListener('click', () => {
    playSound(clickSound);
    if (backgroundMusic) {
      backgroundMusic.volume = 0.3; // Lower volume for background music
      backgroundMusic.play().catch(error => {
        console.error('Background music failed to play:', error);
      });
    }

    // Add class to trigger zoom animation
    startButton.classList.add('zooming');

    // Wait for animation to finish before showing the next step
    setTimeout(() => {
      showStep(1);
      // Clean up class after transition
      startButton.classList.remove('zooming');
    }, 600); // This duration should match the CSS transition time
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', handlePasswordSubmit);
}

if (likeRetweetBtn) {
  likeRetweetBtn.addEventListener('click', () => {
    // Prevent re-triggering while animation is running
    if (likeRetweetBtn.classList.contains('like-retweet-animate')) {
      return;
    }
    likeRetweetBtn.classList.add('like-retweet-animate');

    window.open(TWITTER_URL, '_blank');

    // Remove the class after the animation finishes so it can be re-triggered
    setTimeout(() => {
      likeRetweetBtn.classList.remove('like-retweet-animate');
    }, 600); // Must match animation duration in CSS
  });
}

if (taskForm) {
  taskForm.addEventListener('submit', handleTaskSubmit);
}

// Add generic click sound to all buttons on mousedown
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', () => playSound(clickSound));
});

// Initialize
showStep(0);

export {};
