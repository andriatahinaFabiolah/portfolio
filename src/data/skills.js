const DEV_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const skills = {
  "Frontend": [
    { name: "React.js",     icon: `${DEV_CDN}/react/react-original.svg` },
    { name: "JavaScript",   icon: `${DEV_CDN}/javascript/javascript-original.svg` },
    { name: "HTML5",        icon: `${DEV_CDN}/html5/html5-original.svg` },
    { name: "CSS3",         icon: `${DEV_CDN}/css3/css3-original.svg` },
    { name: "Tailwind CSS", icon: `${DEV_CDN}/tailwindcss/tailwindcss-original.svg` },
  ],
  "Backend": [
    { name: "Node.js",    icon: `${DEV_CDN}/nodejs/nodejs-original.svg` },
    { name: "Express.js", icon: `${DEV_CDN}/express/express-original.svg`, invertOnDark: true },
    { name: "PHP",        icon: `${DEV_CDN}/php/php-original.svg` },
    { name: "Symfony",    icon: `${DEV_CDN}/symfony/symfony-original.svg`, invertOnDark: true },
  ],
  "Base de données": [
    { name: "MySQL",      icon: `${DEV_CDN}/mysql/mysql-original.svg` },
    { name: "PostgreSQL", icon: `${DEV_CDN}/postgresql/postgresql-original.svg` },
  ],
  "Outils": [
    { name: "Git",      icon: `${DEV_CDN}/git/git-original.svg` },
    { name: "GitHub",   icon: `${DEV_CDN}/github/github-original.svg`, invertOnDark: true },
    { name: "VS Code",  icon: `${DEV_CDN}/vscode/vscode-original.svg` },
    { name: "Postman",  icon: `${DEV_CDN}/postman/postman-original.svg` },
    { name: "Eclipse",  icon: `${DEV_CDN}/eclipse/eclipse-original.svg` },
  ],
};