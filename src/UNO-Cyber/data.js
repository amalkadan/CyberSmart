      export const SOURCES = {
        cisa: {
          name: "CISA · Cyber safety essentials",
          url: "https://www.cisa.gov/resources-tools/resources/four-cybersecurity-essentials-sltts",
        },
        ransomware: {
          name: "CISA · Ransomware guide",
          url: "https://www.cisa.gov/stopransomware/ransomware-guide",
        },
        malware: {
          name: "Microsoft · Threat protection",
          url: "https://support.microsoft.com/en-us/windows/security/threat-malware-protection/virus-and-threat-protection-in-the-windows-security-app",
        },
        firewall: {
          name: "Microsoft · Firewall",
          url: "https://support.microsoft.com/en-us/windows/security/windows-security/firewall-and-network-protection-in-the-windows-security-app",
        },
        privacy: {
          name: "eSafety · Privacy",
          url: "https://www.esafety.gov.au/parents/issues-and-advice/privacy-child",
        },
        consent: {
          name: "eSafety · Photo consent",
          url: "https://www.esafety.gov.au/young-people/consent-sharing-photos-videos",
        },
        accounts: {
          name: "Microsoft · User accounts",
          url: "https://support.microsoft.com/en-us/windows/security/identity-signin/manage-user-accounts-in-windows",
        },
        linux: {
          name: "Ubuntu · Linux desktop",
          url: "https://ubuntu.com/desktop",
        },
        macos: {
          name: "Apple · macOS",
          url: "https://www.apple.com/os/macos/",
        },
        ios: { name: "Apple · iOS", url: "https://www.apple.com/os/ios/" },
        android: {
          name: "Google · Android",
          url: "https://www.android.com/why-android/",
        },
      };
      // Stable topic-scoped IDs, rather than colors, labels or shuffled positions, decide a match.
      export const games = {
        red: {
          name: "Red Team",
          short: "RED TEAM",
          color: "red",
          art: 2,
          description: "Recognize an attack by what it does.",
          badge: "Threat Detective",
          cards: [
            {
              id: "red-guesses",
              name: "Many password guesses",
              art: 2,
              meaning: "trying different passwords to enter an account",
            },
            {
              id: "red-bait",
              name: "A fake sign-in message",
              art: 0,
              meaning:
                "a deceptive message that lures someone into sharing login details",
            },
            {
              id: "red-harm",
              name: "Harmful software",
              art: 1,
              meaning:
                "the general category of software designed to harm or misuse a device",
            },
            {
              id: "red-copycat",
              name: "A copycat app",
              art: 3,
              meaning: "an app pretending to be a trusted app",
            },
            {
              id: "red-ransom",
              name: "Locked files + a payment demand",
              icon: "🔐",
              meaning: "files being locked or encrypted to demand a ransom",
            },
            {
              id: "red-identity",
              name: "A false identity",
              icon: "🎭",
              meaning:
                "someone pretending to be a person or organization you trust",
            },
            {
              id: "red-spy",
              name: "Secretly watching activity",
              icon: "👁️",
              meaning:
                "software secretly collecting activity or personal information",
            },
          ],
          challenges: [
            {
              id: "red-password",
              title: "Password attack",
              prompt:
                "Someone tries many possible passwords to get into another person’s account. Which description matches this attack?",
              answer: "red-guesses",
              art: 2,
              lesson:
                "Password guessing tries different passwords to gain access. Use a long, unique password and enable extra sign-in verification (MFA).",
              source: "cisa",
            },
            {
              id: "red-phishing",
              title: "Phishing",
              prompt:
                "A message sends you to a fake login page and asks for your game password. Match the most specific description.",
              answer: "red-bait",
              art: 0,
              lesson:
                "Phishing uses deceptive messages or sites to trick people into sharing information. Open the real service yourself and report the suspicious message.",
              source: "cisa",
            },
            {
              id: "red-malware",
              title: "Malware",
              prompt:
                "Match the general meaning of malware. It is an umbrella term, not just one particular type of attack.",
              answer: "red-harm",
              art: 1,
              lesson:
                "Malware means malicious software. Ransomware and spyware are more specific types of malware.",
              source: "malware",
            },
            {
              id: "red-fake-app",
              title: "Fake app",
              prompt:
                "An unofficial download copies a popular game’s name and appearance so students will install it. Which description fits?",
              answer: "red-copycat",
              art: 3,
              lesson:
                "A fake app imitates a trusted one. Check the real developer and use a trusted download source; ask an adult if you are unsure.",
              source: "malware",
            },
            {
              id: "red-ransomware",
              title: "Ransomware",
              prompt:
                "Files will no longer open, and a note demands payment to unlock them. Choose the most specific description.",
              answer: "red-ransom",
              icon: "🔐",
              lesson:
                "Ransomware can encrypt files and demand payment. Stop using the affected device and tell a trusted adult or school IT staff.",
              source: "ransomware",
            },
            {
              id: "red-impersonation",
              title: "Impersonation",
              prompt:
                "An account pretends to be your teacher even though it belongs to a stranger. What is the defining trick?",
              answer: "red-identity",
              icon: "🎭",
              lesson:
                "Impersonation means pretending to be someone else. Verify unusual requests through a separate channel you already trust.",
              source: "cisa",
            },
            {
              id: "red-spyware",
              title: "Spyware",
              prompt:
                "A hidden program collects what someone does on a device without their knowledge. Choose its specific behavior.",
              answer: "red-spy",
              icon: "👁️",
              lesson:
                "Spyware secretly collects information or activity. Trusted security tools can help detect it; ask a trusted adult for help.",
              source: "malware",
            },
          ],
        },
        blue: {
          name: "Blue Team",
          short: "BLUE TEAM",
          color: "blue",
          art: 5,
          description: "Choose the defense that fits the situation.",
          badge: "Defense Guardian",
          cards: [
            {
              id: "blue-mfa",
              name: "Multi-factor authentication",
              icon: "🔑",
              meaning: "adding another type of proof when signing in",
            },
            {
              id: "blue-firewall",
              name: "Firewall",
              icon: "🧱",
              meaning: "allowing or blocking network traffic using rules",
            },
            {
              id: "blue-backup",
              name: "Backup",
              icon: "💾",
              meaning: "keeping an extra copy so lost files can be restored",
            },
            {
              id: "blue-updates",
              name: "Software updates",
              icon: "🔄",
              meaning:
                "installing fixes for software problems and known security flaws",
            },
            {
              id: "blue-scan",
              name: "Security scan",
              art: 5,
              meaning: "checking files and software for known threats",
            },
            {
              id: "blue-lock",
              name: "Lock the screen",
              icon: "🔒",
              meaning: "protecting a signed-in device while you step away",
            },
            {
              id: "blue-verify",
              name: "Verify the sender",
              art: 4,
              meaning:
                "checking who really sent a message through a trusted channel",
            },
          ],
          challenges: [
            {
              id: "blue-extra-proof",
              title: "Beyond a password",
              prompt:
                "You want sign-in to require another type of proof, such as an authenticator code, as well as your password. Which defense does that?",
              answer: "blue-mfa",
              icon: "🔑",
              lesson:
                "MFA adds another type of proof at sign-in. It helps protect an account if its password is stolen. Never share verification codes.",
              source: "cisa",
            },
            {
              id: "blue-network",
              title: "Guard the network gate",
              prompt:
                "You need a defense that uses rules to allow or block network traffic to a computer. Which card matches?",
              answer: "blue-firewall",
              icon: "🌐",
              lesson:
                "A firewall filters network traffic using rules. It is one layer of protection, not a replacement for safe choices or other security tools.",
              source: "firewall",
            },
            {
              id: "blue-rescue",
              title: "Recover your project",
              prompt:
                "Your school project was accidentally deleted. Which preparation gives you another copy to restore?",
              answer: "blue-backup",
              icon: "📁",
              lesson:
                "A backup is an extra copy of your files. Keep backups separate and protected so you can recover files when something goes wrong.",
              source: "ransomware",
            },
            {
              id: "blue-fixes",
              title: "A security fix is ready",
              prompt:
                "An app developer has released a fix for a known security flaw. Which action installs that fix?",
              answer: "blue-updates",
              icon: "🛠️",
              lesson:
                "Software updates can fix known security flaws. Install them through the app or device’s official update settings.",
              source: "cisa",
            },
            {
              id: "blue-check-files",
              title: "Check for harmful files",
              prompt:
                "School IT wants a trusted security tool to examine the computer for malware. Which card describes this check?",
              answer: "blue-scan",
              art: 5,
              lesson:
                "A security scan checks for threats. It can help find malware, but no scan guarantees that a device is completely safe.",
              source: "malware",
            },
            {
              id: "blue-step-away",
              title: "Back in a minute",
              prompt:
                "You are leaving your computer for a short break and will return to the same session. What stops someone from using your open session?",
              answer: "blue-lock",
              icon: "💻",
              lesson:
                "Lock your screen when you step away. Use a secure sign-in method to unlock it when you return.",
              source: "accounts",
            },
            {
              id: "blue-message",
              title: "Is it really your teacher?",
              prompt:
                "An unusual message claims to be from your teacher. Before acting, you want to check its origin using the school’s usual contact method. Which card fits?",
              answer: "blue-verify",
              art: 4,
              lesson:
                "Verify an unusual request through a separate trusted channel. A display name or profile picture alone does not prove who sent it.",
              source: "cisa",
            },
          ],
        },
        yellow: {
          name: "Privacy",
          short: "PRIVACY",
          color: "yellow",
          art: 8,
          description: "Protect your information and other people.",
          badge: "Privacy Protector",
          cards: [
            {
              id: "privacy-profile",
              name: "Private profile",
              art: 8,
              meaning: "limiting who can see your profile or posts",
            },
            {
              id: "privacy-consent",
              name: "Ask before sharing",
              art: 9,
              meaning: "getting permission before sharing someone else’s photo",
            },
            {
              id: "privacy-data",
              name: "Keep personal details private",
              art: 10,
              meaning:
                "keeping identifying details such as your home address out of public posts",
            },
            {
              id: "privacy-permissions",
              name: "Review app permissions",
              art: 11,
              meaning:
                "checking whether an app really needs access to your camera, contacts or microphone",
            },
            {
              id: "privacy-location",
              name: "Turn off public location sharing",
              icon: "📍",
              meaning: "stopping your live location from being shared publicly",
            },
            {
              id: "privacy-signout",
              name: "Sign out",
              icon: "🚪",
              meaning: "ending your account session on a shared device",
            },
            {
              id: "privacy-block",
              name: "Block and report",
              icon: "🚫",
              meaning:
                "stopping unwanted contact and reporting it to the service",
            },
          ],
          challenges: [
            {
              id: "privacy-audience",
              title: "Who can see your posts?",
              prompt:
                "Your profile is visible to everyone. Which setting helps limit the audience for your posts?",
              answer: "privacy-profile",
              art: 8,
              lesson:
                "Privacy settings help control your audience. Even private posts can be copied or shared, so still think carefully before posting.",
              source: "privacy",
            },
            {
              id: "privacy-photo",
              title: "Your friend is in the photo",
              prompt:
                "You want to post a group photo. What should you do before sharing a photo of your friend?",
              answer: "privacy-consent",
              art: 9,
              lesson:
                "Ask for permission before sharing someone’s photo. Respect their answer and remove the photo if they later ask you to.",
              source: "consent",
            },
            {
              id: "privacy-address",
              title: "A public profile asks too much",
              prompt:
                "You are writing a public game bio. It asks you to include your home address and phone number. Which card protects those details?",
              answer: "privacy-data",
              art: 10,
              lesson:
                "Keep private identifying details out of public posts. Share sensitive information only when needed and with people or services you trust.",
              source: "privacy",
            },
            {
              id: "privacy-microphone",
              title: "Why does it need your microphone?",
              prompt:
                "A simple drawing app asks to use your microphone and contacts. Which card helps you check and restrict these requests?",
              answer: "privacy-permissions",
              art: 11,
              lesson:
                "Review what an app can access and allow only what it needs. If a request seems unnecessary, deny it and ask a trusted adult.",
              source: "privacy",
            },
            {
              id: "privacy-map",
              title: "Everyone can see your live location",
              prompt:
                "A social map is broadcasting your live location publicly. Which card directly stops that broadcast?",
              answer: "privacy-location",
              icon: "📍",
              lesson:
                "Avoid sharing your live location publicly. Review location sharing and app settings with a trusted adult.",
              source: "privacy",
            },
            {
              id: "privacy-library",
              title: "Finished on a shared computer",
              prompt:
                "You have finished using your school account on a library computer. Which card ends your session before the next person uses it?",
              answer: "privacy-signout",
              icon: "🚪",
              lesson:
                "Sign out when you finish using a shared device. Simply closing a browser window may leave your account signed in.",
              source: "accounts",
            },
            {
              id: "privacy-stranger",
              title: "Unwanted messages keep arriving",
              prompt:
                "A stranger keeps pressuring you to send private information. Which card stops their contact and alerts the service?",
              answer: "privacy-block",
              icon: "🚫",
              lesson:
                "Block and report unwanted contact. Do not send private information, and tell a trusted adult if someone makes you uncomfortable.",
              source: "privacy",
            },
          ],
        },
        green: {
          name: "Operating Systems",
          short: "SYSTEMS",
          color: "green",
          art: 13,
          description: "Know your devices and keep their systems safe.",
          badge: "System Explorer",
          cards: [
            {
              id: "os-windows",
              name: "Windows",
              art: 12,
              meaning: "Microsoft’s operating system for PCs",
            },
            {
              id: "os-linux",
              name: "Linux",
              art: 13,
              meaning:
                "the basis of open-source operating systems such as Ubuntu",
            },
            {
              id: "os-macos",
              name: "macOS",
              art: 14,
              meaning: "Apple’s operating system for Mac computers",
            },
            {
              id: "os-android",
              name: "Android",
              art: 15,
              meaning:
                "an operating system used by many phone and tablet brands",
            },
            {
              id: "os-ios",
              name: "iOS",
              icon: "📱",
              meaning: "Apple’s operating system for iPhone",
            },
            {
              id: "os-update",
              name: "System update",
              icon: "🔄",
              meaning:
                "installing fixes and improvements for the operating system",
            },
            {
              id: "os-standard",
              name: "Standard user account",
              icon: "👤",
              meaning:
                "an everyday account with fewer permissions than an administrator",
            },
          ],
          challenges: [
            {
              id: "os-microsoft",
              title: "The Microsoft PC",
              prompt:
                "Which card names Microsoft’s operating system used on many desktop and laptop computers?",
              answer: "os-windows",
              icon: "💻",
              lesson:
                "Windows is a Microsoft operating system for PCs. Keep the system and its security protections up to date.",
              source: "accounts",
            },
            {
              id: "os-ubuntu",
              title: "The open-source family",
              prompt:
                "Ubuntu belongs to this operating-system family, often represented by a penguin. Which card matches?",
              answer: "os-linux",
              icon: "🐧",
              lesson:
                "Ubuntu is a Linux-based operating system. Linux-based systems are used on computers and servers, and they need security updates too.",
              source: "linux",
            },
            {
              id: "os-mac",
              title: "An Apple laptop",
              prompt:
                "Which operating system is designed for Apple Mac computers, such as a MacBook?",
              answer: "os-macos",
              icon: "💻",
              lesson:
                "macOS is the operating system for Apple Mac computers. It is different from the system used on an iPhone.",
              source: "macos",
            },
            {
              id: "os-phone-brands",
              title: "Many phone brands, one system",
              prompt:
                "Which operating system is used on Google Pixel and many Samsung phones?",
              answer: "os-android",
              icon: "📱",
              lesson:
                "Android is used on phones and tablets from several manufacturers. Get apps and system updates from trusted sources.",
              source: "android",
            },
            {
              id: "os-iphone",
              title: "Inside an iPhone",
              prompt: "Which operating system runs on Apple’s iPhone?",
              answer: "os-ios",
              icon: "📱",
              lesson:
                "iOS is Apple’s operating system for iPhone. Install its updates through the device’s official settings.",
              source: "ios",
            },
            {
              id: "os-security-fix",
              title: "Fix the system",
              prompt:
                "The device maker has released an operating-system fix for a security flaw. Which card describes installing it?",
              answer: "os-update",
              icon: "🛠️",
              lesson:
                "System updates can repair known security flaws and improve the device. Use official settings and ask the device owner before making changes.",
              source: "cisa",
            },
            {
              id: "os-permissions",
              title: "Everyday work, fewer permissions",
              prompt:
                "Which account type lets you do everyday schoolwork without giving you full administrator permissions?",
              answer: "os-standard",
              icon: "👤",
              lesson:
                "A standard account has fewer permissions than an administrator account. Use extra permissions only when they are needed and approved.",
              source: "accounts",
            },
          ],
        },
      };
      // Each scenario has the same explicit answer key and learning source as its concept.
      // These are authored classroom examples, not accounts of real incidents.
      const questionVariants = {
        red: {
          "red-password": [
            [
              "The login counter",
              "A school account shows 200 failed sign-ins in a minute, each with a different password. Which behavior is taking place?",
            ],
            [
              "Common words, repeated attempts",
              "Someone tries a list of common words against a game account until one lets them in. Which card describes this attempt?",
            ],
            [
              "Trying every combination",
              "A program keeps testing different character combinations at a login screen. It has no permission from the account owner. Which description fits?",
            ],
          ],
          "red-phishing": [
            [
              "The tournament invitation",
              "An unexpected tournament email says you must sign in on a look-alike website to keep your place. The page sends your password to a stranger. Which card best describes the trick?",
            ],
            [
              "Your account will close today",
              "A text message pressures you to follow a link and enter your password on a fake account page. Match this message-based trick.",
            ],
            [
              "Free coins, stolen login",
              "A chat message promises game coins if you enter your account details on its fake sign-in page. Which behavior is the best match?",
            ],
          ],
          "red-malware": [
            [
              "A tool built to cause harm",
              "A downloaded program was deliberately created to damage a computer and misuse its resources. Choose the general category it belongs to.",
            ],
            [
              "One umbrella term",
              "A teacher groups several malicious programs together, including ones that damage files or steal information. Which card describes their broad category?",
            ],
            [
              "The unsafe download",
              "A supposed homework helper installs software designed to harm the device. No specific kind is identified. Which general description is the best match?",
            ],
          ],
          "red-fake-app": [
            [
              "Almost the same logo",
              "A download page offers an app with your school app’s logo, but it is made by an unrelated developer pretending to be the school. Which card fits?",
            ],
            [
              "The unofficial game installer",
              "An installer copies the name and design of a popular game, but it is not from the real developer. What kind of deception is this?",
            ],
            [
              "A pretend messaging app",
              "A stranger shares an app that imitates your usual messaging service. Its copied branding makes it look official. Choose the most specific description.",
            ],
          ],
          "red-ransomware": [
            [
              "The locked class folder",
              "All files in a class project folder become encrypted. A note asks for money before they can be opened again. What is the most specific match?",
            ],
            [
              "Pay to recover your photos",
              "A computer’s photos become unreadable and a demand for payment appears. Which card describes the attack’s defining behavior?",
            ],
            [
              "A ransom note on the desktop",
              "After an infection, documents are locked and a message asks for payment to restore access. Choose the most specific description, rather than the broad software category.",
            ],
          ],
          "red-impersonation": [
            [
              "The copied classmate",
              "An account copies your classmate’s name and photo and joins a group pretending to be them. What is the defining deception?",
            ],
            [
              "A pretend school technician",
              "A stranger in a voice chat claims to be the school technician, but has no connection to the school. Which card describes this false claim?",
            ],
            [
              "The fake team captain",
              "A new profile copies the team captain’s identity to gain the group’s trust. There is no login link or app involved. Which card fits best?",
            ],
          ],
          "red-spyware": [
            [
              "A hidden activity recorder",
              "A program silently records the websites visited on a device and sends that information away without the user’s knowledge. Which specific behavior fits?",
            ],
            [
              "Someone is collecting your keystrokes",
              "Hidden software secretly records what a student types. Which card describes this monitoring behavior?",
            ],
            [
              "Watching from the background",
              "A program secretly collects details about a user’s activity while running out of sight. It does not demand a payment. Choose the most specific description.",
            ],
          ],
        },
        blue: {
          "blue-extra-proof": [
            [
              "The password was exposed",
              "You want an extra sign-in check so knowing your password alone is not enough. Which defense adds a second type of proof?",
            ],
            [
              "A code from your authenticator",
              "Your account asks for a password and then a code from an authenticator app. Which card names this added protection?",
            ],
            [
              "Two kinds of proof",
              "A student enables sign-in with a password plus a separate security key. Which defense describes using more than one factor?",
            ],
          ],
          "blue-network": [
            [
              "Only approved connections",
              "School IT sets rules that allow approved network connections and block unwanted ones. Which defense applies those traffic rules?",
            ],
            [
              "An incoming connection is blocked",
              "A computer rejects an incoming network connection because a security rule does not allow it. Which card explains that protection?",
            ],
            [
              "Rules for network traffic",
              "You need a tool that filters traffic entering or leaving a device, rather than scanning its files. Which card matches that job?",
            ],
          ],
          "blue-rescue": [
            [
              "The laptop stops working",
              "A student’s laptop breaks before a project deadline. Which preparation lets them recover their saved project on another device?",
            ],
            [
              "An accidental overwrite",
              "A student replaces a finished document with an empty one. Which protection could provide a saved earlier copy?",
            ],
            [
              "A separate copy survives",
              "An infection damages files on a computer, but a protected copy was kept separately. Which card names the preparation that helps restore the files?",
            ],
          ],
          "blue-fixes": [
            [
              "Repair the browser flaw",
              "The browser maker releases a repair for a known security weakness. Which action brings that repair onto the device?",
            ],
            [
              "An official update notification",
              "A trusted app’s own settings offer a new security fix. Which card describes installing it?",
            ],
            [
              "An old app needs a patch",
              "School IT says a program contains a known flaw and the developer has already fixed it. Which card addresses the outdated program?",
            ],
          ],
          "blue-check-files": [
            [
              "Examine the downloaded folder",
              "A trusted security tool is asked to check a folder for known malicious files. Which card names this action?",
            ],
            [
              "Check a suspicious computer",
              "School IT wants to inspect files and installed programs for malware using approved protection software. Which check should it run?",
            ],
            [
              "Looking for threats on disk",
              "A security tool examines the computer’s stored files and reports detected threats. Which card describes what the tool is doing?",
            ],
          ],
          "blue-step-away": [
            [
              "A quick water break",
              "You leave your desk for a minute and want to keep your work open without letting others use your session. Which card fits?",
            ],
            [
              "Leaving the classroom briefly",
              "Your account is signed in and you are going to speak to the teacher outside. Which immediate action protects the open session until you return?",
            ],
            [
              "The shared desk",
              "You will return to your computer soon, but other people are nearby. Which card makes them authenticate before they can use your existing session?",
            ],
          ],
          "blue-message": [
            [
              "A new address claims to be school IT",
              "An email from an unfamiliar address asks you to act urgently. You decide to call the school IT number you already know. Which card describes that step?",
            ],
            [
              "Check outside the chat",
              "A message claims to come from a friend and makes an unusual request. You contact the friend using their saved number to check. Which defense are you using?",
            ],
            [
              "Confirm the request first",
              "A supposed teacher asks for account information. You use the school’s usual contact channel to confirm who made the request. Which card matches?",
            ],
          ],
        },
        yellow: {
          "privacy-audience": [
            [
              "Only approved followers",
              "You want future posts to be visible to approved followers instead of everyone. Which card controls that audience?",
            ],
            [
              "A profile strangers can browse",
              "People you do not know can view all your public profile posts. Which card helps restrict profile visibility?",
            ],
            [
              "A smaller audience for your posts",
              "You review who can see the content on your social profile and choose a more restricted audience. Which card describes this choice?",
            ],
          ],
          "privacy-photo": [
            [
              "The team celebration",
              "Your teammate appears in a celebration photo you want to upload. What should you do before sharing their image?",
            ],
            [
              "Before posting the video",
              "A classmate is clearly visible in a video you recorded. Which card helps you respect their choice before uploading it?",
            ],
            [
              "A funny picture of a friend",
              "You think a photo of your friend is funny, but you do not know whether they want it online. What should happen before you post it?",
            ],
          ],
          "privacy-address": [
            [
              "Your phone number in a public comment",
              "A public giveaway asks you to post your phone number in the comments. Which card protects that identifying detail?",
            ],
            [
              "A profile shows your home address",
              "You are about to add your full home address to a public gaming profile. Which card is the best response?",
            ],
            [
              "A photo includes a personal document",
              "You notice that a photo you plan to post shows a document with your address and phone number. Which card helps you protect those details?",
            ],
          ],
          "privacy-microphone": [
            [
              "A calculator wants your contacts",
              "A calculator app requests access to your contacts. Which card helps you check whether that access is necessary?",
            ],
            [
              "Check the camera request",
              "An app asks to turn on your camera for a feature you are not using. Which card lets you review and restrict what it can access?",
            ],
            [
              "More access than the game needs",
              "A simple puzzle app asks for microphone and contact access. Which card helps you decide what to allow or deny?",
            ],
          ],
          "privacy-map": [
            [
              "Your live position is public",
              "A social app’s public map lets strangers follow your current location. Which card directly stops this location broadcast?",
            ],
            [
              "A game broadcasts where you are",
              "A social game is sharing your live position with everyone. Which card specifically ends the public location sharing?",
            ],
            [
              "Check the live map audience",
              "You discover that your live location is set to public instead of limited to trusted people. Which card switches off that public sharing?",
            ],
          ],
          "privacy-library": [
            [
              "The next student is waiting",
              "You have finished your school email on a classroom computer. Which card ends your account session before you hand over the device?",
            ],
            [
              "Finished on a borrowed laptop",
              "You used a borrowed laptop to open your personal account and will not be using it again today. Which action ends that signed-in session?",
            ],
            [
              "Leaving the computer lab",
              "Your work is saved and you are leaving the shared computer for the day. Which card makes sure the next student does not inherit your logged-in account?",
            ],
          ],
          "privacy-stranger": [
            [
              "Repeated unwanted contact",
              "An unfamiliar account keeps sending unwanted messages asking for personal details. Which card stops contact and tells the platform about it?",
            ],
            [
              "Pressure in a game chat",
              "Another account repeatedly pressures you to share private information. Which card combines stopping their messages with reporting the behavior?",
            ],
            [
              "The messages continue",
              "You do not want further contact from an account that keeps demanding personal information. Which card stops the contact and alerts the service?",
            ],
          ],
        },
        green: {
          "os-microsoft": [
            [
              "A Microsoft operating system",
              "The school buys PCs with an operating system developed by Microsoft. Which card names that system?",
            ],
            [
              "Choose the right installation guide",
              "A guide is specifically for Microsoft’s desktop operating system. Which operating-system card belongs with it?",
            ],
            [
              "Identify the PC software",
              "The device information says its operating system is from Microsoft. It is a school desktop computer. Which card is the match?",
            ],
          ],
          "os-ubuntu": [
            [
              "A classroom running Ubuntu",
              "A school computer runs Ubuntu. Which card names the operating-system family Ubuntu belongs to?",
            ],
            [
              "An open-source computer project",
              "Students explore an open-source operating-system family that includes Ubuntu and uses a penguin as its familiar mascot. Which card fits?",
            ],
            [
              "The penguin on the system guide",
              "A guide explains Linux-based distributions, including Ubuntu. Which card matches this operating-system family?",
            ],
          ],
          "os-mac": [
            [
              "Choose a guide for a MacBook",
              "You need the operating-system guide for an Apple MacBook, rather than an iPhone. Which card should you choose?",
            ],
            [
              "An Apple desktop computer",
              "A student uses an Apple iMac. Which card names the operating system designed for this Mac computer?",
            ],
            [
              "The Mac system settings",
              "A teacher opens system settings on an Apple Mac computer. Which operating-system card belongs to that device?",
            ],
          ],
          "os-phone-brands": [
            [
              "A Google Pixel phone",
              "A student uses a Google Pixel phone. Which card names its mobile operating system?",
            ],
            [
              "The green robot",
              "A mobile operating system associated with a green robot is used by many phone manufacturers. Which card matches it?",
            ],
            [
              "A Samsung smartphone",
              "A teacher prepares a guide for a Samsung Galaxy smartphone. Which mobile operating-system card fits this phone?",
            ],
          ],
          "os-iphone": [
            [
              "The Apple phone update",
              "An Apple iPhone offers an update to its operating system. Which card names that phone’s system?",
            ],
            [
              "A guide for an iPhone",
              "You are looking for the operating-system instructions for an iPhone rather than a MacBook. Which card is correct?",
            ],
            [
              "Identify Apple’s phone system",
              "A student asks which operating system runs on Apple’s iPhone. Choose the phone-system card, not the Mac computer-system card.",
            ],
          ],
          "os-security-fix": [
            [
              "A repair from the device maker",
              "The official device settings offer a fix for a weakness in the operating system itself. Which card describes installing that fix?",
            ],
            [
              "Keeping the operating system current",
              "School IT approves the manufacturer’s latest security repairs for the device’s operating system. Which action applies them?",
            ],
            [
              "An operating-system patch",
              "The device maker publishes a patch for a known system vulnerability. Which card names the action that brings the patch onto the device?",
            ],
          ],
          "os-permissions": [
            [
              "Schoolwork without administrator rights",
              "A student needs to write documents and use approved apps but should not have full administrator permissions. Which account type fits?",
            ],
            [
              "The everyday account",
              "A family uses an account with limited permissions for daily computer work and reserves administrator access for approved changes. Which card describes the daily account?",
            ],
            [
              "A separate administrator account",
              "School IT manages system-wide changes. Students use accounts with fewer permissions for lessons. Which card names the student account type?",
            ],
          ],
        },
      };
      for (const [topicId, game] of Object.entries(games)) {
        game.challenges = game.challenges.flatMap((base) => [
          base,
          ...questionVariants[topicId][base.id].map(
            ([title, prompt], index) => ({
              ...base,
              id: base.id + "-v" + (index + 2),
              title,
              prompt,
            }),
          ),
        ]);
      }

