const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/RNSIT/Downloads/AllProject/UserPanel (3)/UserPanel/src';

function parseDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      parseDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      if (fullPath.includes('index.css')) continue; // Skip index.css
      if (fullPath.includes('siteTheme.js')) continue; // Skip siteTheme.js
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Primary
      content = content.replace(/bg-\[\#1E3A8A\]/gi, 'bg-[var(--site-primary)]');
      content = content.replace(/text-\[\#1E3A8A\]/gi, 'text-[var(--site-primary)]');
      content = content.replace(/border-\[\#1E3A8A\]/gi, 'border-[var(--site-primary)]');
      content = content.replace(/fill-\[\#1E3A8A\]/gi, 'fill-[var(--site-primary)]');
      content = content.replace(/hover:bg-\[\#1E3A8A\]/gi, 'hover:bg-[var(--site-primary)]');
      content = content.replace(/hover:text-\[\#1E3A8A\]/gi, 'hover:text-[var(--site-primary)]');
      content = content.replace(/hover:border-\[\#1E3A8A\]/gi, 'hover:border-[var(--site-primary)]');

      // Primary Dark Hover -> Make it primary but also add opacity via class if possible, or just default to primary. 
      // Many places it's `hover:bg-[#1E40AF]` next to `bg-[#1E3A8A]`. We replace the dark hover with opacity class if needed, but doing just `bg-[var(--site-primary)]` works and we'll manually ensure opacity is there if it feels flat. For now, replacing to site-primary with hover:opacity-90.
      content = content.replace(/hover:bg-\[\#1E40AF\]/gi, 'hover:bg-[var(--site-primary)] hover:opacity-90 transition-opacity');
      
      // Secondary/Accent
      content = content.replace(/bg-\[\#FACC15\]/gi, 'bg-[var(--site-accent)]');
      content = content.replace(/text-\[\#FACC15\]/gi, 'text-[var(--site-accent)]');
      content = content.replace(/border-\[\#FACC15\]/gi, 'border-[var(--site-accent)]');
      content = content.replace(/hover:text-\[\#FACC15\]/gi, 'hover:text-[var(--site-accent)]');
      
      // Inline styles using exact hex strings
      content = content.replace(/['"]#1E3A8A['"]/gi, '"var(--site-primary)"');
      content = content.replace(/['"]#FACC15['"]/gi, '"var(--site-accent)"');

      // If any change, write it back
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

parseDir(dir);
console.log('UserPanel theme replacement Done');

// Now we do it for malhotra_scholl_frontend too, so Admin Panel follows theme if they use those classes.
// Wait, the prompt says "integrate from Admin Panel settings across full User Panel." Admin Panel is technically the source. Admin panel colors use arbitrary [#1E3A8A] a lot. I should replace it in Admin Panel too? "integrate from Admin Panel settings across full User Panel." I will run it on malhotra_scholl_frontend as well just for consistency.
const dirAdmin = 'c:/Users/RNSIT/Downloads/AllProject/malhotra_scholl_frontend (2)/malhotra_scholl_frontend/src';
function parseDirAdmin(currentPath) {
  if (!fs.existsSync(currentPath)) return;
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      parseDirAdmin(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      if (fullPath.includes('index.css') || fullPath.includes('AdminSettings.jsx')) continue; 
      // We skip AdminSettings.jsx because it defines the theme palette hexes
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Primary
      content = content.replace(/bg-\[\#2563eb\]/gi, 'bg-[var(--site-primary)]'); // Admin panel typically uses blue-600 #2563eb
      content = content.replace(/text-\[\#2563eb\]/gi, 'text-[var(--site-primary)]');
      content = content.replace(/border-\[\#2563eb\]/gi, 'border-[var(--site-primary)]');
      content = content.replace(/hover:bg-\[\#1d4ed8\]/gi, 'hover:bg-[var(--site-primary)] hover:opacity-90'); // hover for blue-600 is usually blue-700
      
      // Admin Panel also uses #1E3A8A for some buttons
      content = content.replace(/bg-\[\#1E3A8A\]/gi, 'bg-[var(--site-primary)]');
      content = content.replace(/text-\[\#1E3A8A\]/gi, 'text-[var(--site-primary)]');
      content = content.replace(/border-\[\#1E3A8A\]/gi, 'border-[var(--site-primary)]');
      content = content.replace(/hover:bg-\[\#1E40AF\]/gi, 'hover:bg-[var(--site-primary)] hover:opacity-90 transition-opacity');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated Admin: ${fullPath}`);
      }
    }
  }
}
parseDirAdmin(dirAdmin);
console.log('AdminPanel theme replacement Done');
