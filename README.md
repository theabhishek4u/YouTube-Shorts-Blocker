# 🚫 YouTube Shorts & Playables Blocker - Pro Edition

A powerful, next-generation Chrome extension that actively blocks YouTube Shorts and Playables, returning your focus to long-form, meaningful videos. Designed with a sleek, state-of-the-art UI and optimal performance.

## ✨ Features

- **Advanced Shorts Blocking**: Seamlessly hides YouTube Shorts from your homepage, sidebar, and recommendations.
- **Search Result Filtration**: Removes Shorts shelves from search results without breaking page layouts.
- **Playables Remover**: Annoyed by mini-games? This extension elegantly hides the Playables section.
- **Auto-Redirect Protocol**: Intercepts direct links to Shorts (`/shorts/xyz`) and redirects you to the YouTube homepage instantly.
- **Next-Level UI**: A gorgeous, glassmorphic toggle dashboard built with high-performance CSS animations.
- **One-Click Toggle**: Enable or disable the blocker dynamically without losing your current activity string (just reload!).

## 🚀 Installation Guide

1. **Download & Extract**: Download this repository as a `.zip` file and extract it to a folder on your PC.
2. **Access Chrome Extensions**: Open your Google Chrome browser and navigate to:
   ```text
   chrome://extensions/
   ```
3. **Enable Developer Mode**: Turn on "Developer mode" using the toggle in the top-right corner of the Extensions page.
4. **Load the Extension**: Click **Load unpacked** in the top-left area and select the folder you extracted in Step 1.
5. **Pin & Enjoy**: Click the puzzle piece icon 🧩 in Chrome (top right extension menu), pin the Shorts Blocker, and savor your distraction-free YouTube experience.

## 🛠️ Usage

- Click the new professional icon in your Chrome toolbar.
- Toggle the **Shield Active** switch ON or OFF.
- If you change the settings, **reload your active YouTube tab** for the changes to take effect immediately.

## 📁 Technical Architecture
| Component | Functionality |
|------|--------------|
| `manifest.json` | Extension configuration and permissions definition (Manifest V3). |
| `content.js` | Advanced MutationObserver script that purges dynamic Shorts elements in real-time. |
| `styles.css` | High-priority CSS injection designed for robust, layout-safe node hiding. |
| `popup.*` | State-of-the-art Glassmorphic UI dashboard handling user toggles via Chrome Sync API. |
| `icons/` | Custom-designed minimalist vector icons in 16x16, 48x48, and 128x128 formats. |

## 👨‍💻 Credits

**Developed by Abhishek**  
Crafted with ❤️ and a passion for deep, focused work free from infinite scrolling.
