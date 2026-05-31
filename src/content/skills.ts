export type SkillGroup = { category: string; items: string[] };

export const defaultSkills: SkillGroup[] = [
  {
    category: "Programming",
    items: ["C++", "Python", "JavaScript", "SQL"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "GraphQL",
    ],
  },
  // {
  //   category: "Machine Learning",
  //   items: [
  //     "NumPy",
  //     "Pandas",
  //     "Matplotlib",
  //     "Seaborn",
  //     "Scikit-Learn",
  //     "XGBoost",
  //     "Cross Validation",
  //     "Grid Search CV",
  //     "Random Search CV",
  //     "Model Evaluation",
  //   ],
  // },
  {
    category: "DevOps & Infrastructure",
    items: [
      "Docker",
      "Nginx",
      "Git",
      "GitHub",
      "Streamlit",
      "Google Colab",
      "Jupyter Notebook",
    ],
  },
];