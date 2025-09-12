
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
const shareOnXBtn = document.getElementById(
  'share-on-x-btn',
) as HTMLButtonElement;

const clickSound = document.getElementById('click-sound') as HTMLAudioElement;
const successSound = document.getElementById(
  'success-sound',
) as HTMLAudioElement;
const errorSound = document.getElementById('error-sound') as HTMLAudioElement;
const backgroundMusic = document.getElementById(
  'background-music',
) as HTMLAudioElement;

// Modal elements
const termsLink = document.getElementById('terms-link') as HTMLAnchorElement;
const privacyLink = document.getElementById('privacy-link') as HTMLAnchorElement;
const modalOverlay = document.getElementById('modal-overlay') as HTMLDivElement;
const modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
const modalBody = document.getElementById('modal-body') as HTMLDivElement;
const modalCloseBtn = document.getElementById(
  'modal-close-btn',
) as HTMLButtonElement;

const termsContent = `
<h3>WEBSITE TERMS OF USE</h3>
<p><strong>Goofy Bears</strong><br>Last revised on September 12, 2025</p>
<p>The website located at https://goofy.bears (the “Site”) is a copyrighted work belonging to Goofy Bears, Inc. (“Company”, “us”, “our”, and “we”). Certain features of the Site may be subject to additional guidelines, terms, or rules, which will be posted on the Site in connection with such features. All such additional terms, guidelines, and rules are incorporated by reference into these Terms.</p>
<p>THESE TERMS OF USE (THESE “TERMS”) SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE SITE. BY ACCESSING OR USING THE SITE, YOU ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT). YOU MAY NOT ACCESS OR USE THE SITE OR ACCEPT THE TERMS IF YOU ARE NOT AT LEAST 18 YEARS OLD. IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF THESE TERMS, DO NOT ACCESS AND/OR USE THE SITE.</p>
<p>PLEASE BE AWARE THAT SECTION 8.2 CONTAINS PROVISIONS GOVERNING HOW TO RESOLVE DISPUTES BETWEEN YOU AND COMPANY. AMONG OTHER THINGS, SECTION 8.2 INCLUDES AN AGREEMENT TO ARBITRATE WHICH REQUIRES, WITH LIMITED EXCEPTIONS, THAT ALL DISPUTES BETWEEN YOU AND US SHALL BE RESOLVED BY BINDING AND FINAL ARBITRATION. SECTION 8.2 ALSO CONTAINS A CLASS ACTION AND JURY TRIAL WAIVER. PLEASE READ SECTION 8.2 CAREFULLY.</p>
<p>UNLESS YOU OPT OUT OF THE AGREEMENT TO ARBITRATE WITHIN 30 DAYS: (1) YOU WILL ONLY BE PERMITTED TO PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF AGAINST US ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION; AND (2) YOU ARE WAIVING YOUR RIGHT TO PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL.</p>
<hr>
<h3>1. Accounts</h3>
<p><strong>1.1 Account Creation.</strong> In order to use certain features of the Site, you may need to register for an account (“Account”) and provide certain information about yourself as prompted by the account registration form. You represent and warrant that: (a) all required registration information you submit is truthful and accurate; (b) you will maintain the accuracy of such information. You may delete your Account at any time, for any reason, by following the instructions on the Site. Company may suspend or terminate your Account in accordance with Section 7.</p>
<p><strong>1.2 Account Responsibilities.</strong> You are responsible for maintaining the confidentiality of your Account login information and are fully responsible for all activities that occur under your Account. You agree to immediately notify Company of any unauthorized use, or suspected unauthorized use of your Account or any other breach of security. Company cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.</p>
<hr>
<h3>2. Access to the Site</h3>
<p><strong>2.1 License.</strong> Subject to these Terms, Company grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Site solely for your own personal, noncommercial use.</p>
<p><strong>2.2 Certain Restrictions.</strong> The rights granted to you in these Terms are subject to the following restrictions: (a) you shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site, whether in whole or in part, or any content displayed on the Site; (b) you shall not modify, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Site; (c) you shall not access the Site in order to build a similar or competitive website, product, or service; and (d) except as expressly stated herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means. Unless otherwise indicated, any future release, update, or other addition to functionality of the Site shall be subject to these Terms. All copyright and other proprietary notices on the Site (or on any content displayed on the Site) must be retained on all copies thereof.</p>
<p><strong>2.3 Modification.</strong> Company reserves the right, at any time, to modify, suspend, or discontinue the Site (in whole or in part) with or without notice to you. You agree that Company will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Site or any part thereof.</p>
<p><strong>2.4 No Support or Maintenance.</strong> You acknowledge and agree that Company will have no obligation to provide you with any support or maintenance in connection with the Site.</p>
<p><strong>2.5 Ownership.</strong> You acknowledge that all the intellectual property rights, including copyrights, patents, trade marks, and trade secrets, in the Site and its content are owned by Company or Company’s suppliers. Neither these Terms (nor your access to the Site) transfers to you or any third party any rights, title or interest in or to such intellectual property rights, except for the limited access rights expressly set forth in Section 2.1. Company and its suppliers reserve all rights not granted in these Terms. There are no implied licenses granted under these Terms.</p>
<p><strong>2.6 Feedback.</strong> If you provide Company with any feedback or suggestions regarding the Site (“Feedback”), you hereby assign to Company all rights in such Feedback and agree that Company shall have the right to use and fully exploit such Feedback and related information in any manner it deems appropriate. Company will treat any Feedback you provide to Company as non-confidential and non-proprietary. You agree that you will not submit to Company any information or ideas that you consider to be confidential or proprietary.</p>
<p><strong>2.7 Acceptable Use.</strong> You agree not to post, upload, publish, submit, or transmit any content that: (a) involves or promotes illegal activity; (b) depicts or encourages self-harm, suicide, or violence; (c) contains hate speech, harassment, or doxxing of any individual; (d) makes reference to drugs or other controlled substances; (e) infringes or violates the rights of others; or (f) otherwise violates these Terms. Goofy Bears uses AI moderation to review all user-generated content, and we enforce a zero-tolerance policy toward hate speech, doxxing, illegal activities, and other prohibited content. We reserve the right to remove or restrict any content that, in our judgment, violates these Terms, is unsafe, or is otherwise inappropriate for the platform.</p>
<hr>
<h3>3. Indemnification</h3>
<p>You agree to indemnify and hold Company (and its officers, employees, and agents) harmless, including costs and attorneys' fees, from any claim or demand made by any third party due to or arising out of (a) your use of the Site, (b) your violation of these Terms or (c) your violation of applicable laws or regulations. Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of these claims. You agree not to settle any matter without the prior written consent of Company. Company will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it. This includes any claims arising from dares you post or participate in, including any physical injury, harm, or damages resulting from such dares.</p>
<hr>
<p><strong>8.7 Contact Information:</strong><br>Please reach our support team at<br>Email: contact@goofy.bears</p>
`;

const privacyContent = `
<h3>PRIVACY NOTICE</h3>
<p><strong>Goofy Bears</strong><br>Last revised on September 12, 2025</p>
<p>This Privacy Notice explains how Goofy Bears, Inc. (“Company,” “we,” “us,” or “our”) collects, stores, uses, and shares your personal information when you access or use our services, including our website at https://goofybears.com or any related platforms (together, the “Services”). By using our Services, you consent to the practices described in this Privacy Notice.</p>
<h3>Information We Collect</h3>
<p>We collect information you voluntarily provide, such as when you register for an account, connect a social media profile, participate in activities, or contact us. This may include:</p>
<ul>
    X name, email address, and phone number
    Social media usernames for accounts linked to our Services
    Financial information provided for payments or transactions
    Social login information, such as TikTok open_id, profile details, and session tokens
</ul>
<p>We also automatically collect certain technical and usage information, such as your IP address, device type, browser, operating system, language preferences, location data, and usage patterns. Cookies and similar technologies may be used to enhance your experience and analyze site performance.</p>
<h3>How We Use Your Information</h3>
<p>Your information is processed to:</p>
<ul>
   Facilitate account creation, authentication, and management
    Provide and improve our Services, including order fulfillment
    Respond to inquiries and provide support
    Communicate administrative information about updates, policies, and changes
    Enable user-to-user interactions and feedback requests
    Protect the security and integrity of our Services
    Understand usage trends and improve marketing or promotional efforts
    Authenticate accounts and manage login sessions
</ul>
<h3>Sharing Your Information</h3>
<p>We only share personal information with trusted third-party providers necessary for our Services, such as authentication providers or social login platforms. We do not sell your information. All third-party providers are contractually obligated to protect your data and use it solely as instructed by us.</p>
<h3>Third-Party Websites</h3>
<p>Our Services may link to third-party websites, applications, or ads. We are not responsible for the privacy practices or content of these third parties. Please review their policies before sharing personal information.</p>
<h3>Social Logins</h3>
<p>If you log in using social media accounts, we receive profile information as allowed by the provider. This information is used solely to facilitate authentication, account creation, and management.</p>
<h3>Security</h3>
<p>We implement reasonable measures to protect personal data, but no system is completely secure. Use of our Services is at your own risk, and we recommend accessing our Services from secure environments.</p>
<h3>Children’s Privacy</h3>
<p>Our Services are not intended for children under 18. We do not knowingly collect information from minors. If we learn that information from a child under 18 has been collected, we will delete it promptly.</p>
<h3>Do-Not-Track</h3>
<p>We currently do not respond to browser Do-Not-Track signals, but will update this notice if applicable standards change.</p>
<h3>Updates to This Notice</h3>
<p>We may update this Privacy Notice periodically. Material changes will be highlighted with a revised date or notification.</p>
<h3>Contact Us</h3>
<p>For questions or requests, including deletion of your account and personal data, contact us at contact@goofybears.com. Verified requests will be processed in accordance with applicable laws.</p>
`;

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
const SHARE_TEXTS = [
  'I’ve just joined the @BearsGoofy waitlist! 🐻  Excited for what’s coming next. ✨ #GoofyBearsNFT',
  'Made it onto the @BearsGoofy waitlist 🐻 Can’t wait for the journey ahead! 🔥 #GoofyBearsNFT',
  'Signed up for the @BearsGoofy waitlist 🐻  Who’s ready to join the fun? ✅ #GoofyBearsNFT',
  'I’m officially on the @BearsGoofy waitlist! 🐻  Big things are coming… 🚀 #GoofyBearsNFT',
  'Excited to announce I’ve joined the @BearsGoofy waitlist 🐻 Let’s go! 💫 #GoofyBearsNFT',
  'Can’t wait! I’m now on the @BearsGoofy waitlist 🐻 Who else is joining? ✨ #GoofyBearsNFT',
  'Just secured my spot on the @BearsGoofy waitlist! 🐻 Adventure begins soon. 🔥 #GoofyBearsNFT',
  'I’ve hopped onto the @BearsGoofy waitlist 🐻 Ready for the fun! 💥 #GoofyBearsNFT',
  'Excited to be part of the @BearsGoofy waitlist! 🐻 Can’t wait for what’s next! ✨ #GoofyBearsNFT',
  'Joined the @BearsGoofy waitlist today! 🐻 Who’s ready for the ride? 🚀 #GoofyBearsNFT',
];

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
    alert('Please enter your EVM wallet address.');
    return;
  }

  if (!wallet.startsWith('0x')) {
    playSound(errorSound);
    alert('Your EVM wallet address must start with "0x".');
    walletInput.classList.add('invalid');
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

// MODAL LOGIC
function openModal(title: string, content: string) {
  if (modalTitle) modalTitle.textContent = title;
  if (modalBody) modalBody.innerHTML = content;
  if (modalOverlay) modalOverlay.classList.add('active');
}

function closeModal() {
  if (modalOverlay) modalOverlay.classList.remove('active');
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

if (walletInput) {
  walletInput.addEventListener('input', () => {
    const value = walletInput.value.trim();
    if (value && !value.startsWith('0x')) {
      walletInput.classList.add('invalid');
      if (taskSubmitBtn) {
        taskSubmitBtn.disabled = true;
      }
    } else {
      walletInput.classList.remove('invalid');
      if (taskSubmitBtn) {
        taskSubmitBtn.disabled = false;
      }
    }
  });
}

if (shareOnXBtn) {
  shareOnXBtn.addEventListener('click', () => {
    playSound(clickSound);
    const randomIndex = Math.floor(Math.random() * SHARE_TEXTS.length);
    const randomShareText = SHARE_TEXTS[randomIndex];
    const twitterIntentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      randomShareText,
    )}`;
    window.open(twitterIntentUrl, '_blank');
  });
}

// Modal Listeners
if (termsLink) {
  termsLink.addEventListener('click', e => {
    e.preventDefault();
    playSound(clickSound);
    openModal('Terms of Use', termsContent);
  });
}

if (privacyLink) {
  privacyLink.addEventListener('click', e => {
    e.preventDefault();
    playSound(clickSound);
    openModal('Privacy Policy', privacyContent);
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', () => {
    playSound(clickSound);
    closeModal();
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      playSound(clickSound);
      closeModal();
    }
  });
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', () => playSound(clickSound));
});

showStep(0);

export {};
