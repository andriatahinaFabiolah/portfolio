const DEV_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const projects = [
  {
    id: 1, number: "01",
    title: "Gestion de Matériel",
    category: "Full Stack",
    badge: "Stage · Ministère des Transports",
    icon: "💻",
    tech: ["React", "Node.js", "Express", "MySQL"],
    description: "Application de suivi en temps réel du matériel informatique — affectation aux directions, automatisation des processus internes et optimisation de la gestion des équipements.",
    accent: "#6366f1",
    link: "https://github.com/andriatahinaFabiolah/gestion-materiel",
    images: ["/project-materiel.PNG", "/project-materiel-2.PNG", "/project-materiel-3.PNG"],
  },
  {
    id: 2, number: "02",
    title: "Banking App",
    category: "Backend",
    badge: null,
    icon: "🏦",
    tech: ["PHP", "MySQL", "Triggers"],
    description: "Supervision des virements bancaires automatisés via triggers MySQL. Interfaces distinctes admin & client avec historique complet des transactions et journal d'audit.",
    accent: "#0ea5e9",
    link: "https://github.com/andriatahinaFabiolah/Banking_app",
    images: ["/project-banking-3.PNG", "/project-banking-2.PNG", "/project-banking.PNG"],
  },
  {
    id: 3, number: "03",
    title: "Knapsack DP",
    category: "Algorithmique",
    badge: null,
    icon: "🎒",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Visualisation interactive de l'algorithme du sac à dos — programmation dynamique O(n·W). Outil pédagogique pour explorer les fondamentaux algorithmiques étape par étape.",
    accent: "#f59e0b",
    link: "https://github.com/andriatahinaFabiolah/knapsack-problem",
    images: ["/project-knapsack-2.PNG", "/project-knapsack.PNG"],
  },
];

export { DEV_CDN };