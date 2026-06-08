export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
};

export const defaultProjects: Project[] = [
{
  slug: "Chatbot",
  title: "JK Police Chatbot",
  year: "2026",
  summary: "An AI-powered legal assistance and information retrieval platform for police services.",
  description:
    "A Retrieval-Augmented Generation (RAG) chatbot designed to assist users with police-related queries, legal information, complaint guidance, and procedural assistance. The system combines semantic search through vector databases with knowledge graph relationships to retrieve accurate and context-aware responses from police manuals, legal documents, and departmental records. Built with a scalable microservices architecture, it supports intelligent document retrieval, conversational AI, citation-backed responses, and real-time query processing.",
  tech: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Qdrant",
    "Ontotext GraphDB",
    "MySQL",
    "FastAPI",
    "LangChain",
    "OpenAI",
    "Docker"
  ],
  // live: "https://example.com",
},
{
  slug: "CarRental",
  title: "Car-Rental Platform",
  year: "2025-2026",
  summary: "A full-stack car rental platform that allows users to browse vehicles, make bookings, manage reservations, and complete secure online payments.",
  description:
    "A scalable car rental booking system built with a modern MERN architecture. Users can search available cars, view detailed vehicle information, create and manage bookings, upload and serve optimized car images through ImageKit, and make secure payments using Razorpay. The backend is designed with separate modules for authentication, vehicle management, and booking services, enabling easier maintenance and future scalability.",
  tech: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "ImageKit",
    "Razorpay",
    "JWT Authentication",
    "REST API",
    "Tailwind CSS"
  ],
  // repo: "https://github.com",
},
{
  slug: "EcommercePlatform",
  title: "Distributed E-commerce Platform",
  year: "2026",
  summary: "A microservices-based e-commerce platform designed for scalability, reliability, and high-volume transaction processing.",
  description:
    "A production-ready e-commerce platform built using a distributed microservices architecture. The system decomposes core business domains into independent services including authentication, product catalog, order management, and payment processing. An Nginx-based API Gateway provides centralized routing, security, and request management, while RabbitMQ/Kafka enables asynchronous inter-service communication for improved scalability and fault tolerance. PostgreSQL serves as the primary transactional datastore, Redis accelerates product and session access through caching, and JWT-based authentication secures user interactions. The platform implements distributed transaction patterns to maintain data consistency across services during complex order and payment workflows, while Docker ensures portable deployment and simplified orchestration.",
  tech: [
    "Node.js",
    "PostgreSQL",
    "Redis",
    "RabbitMQ",
    "Kafka",
    "Docker",
    "Nginx",
    "JWT",
    "Microservices",
    "API Gateway",
    "Distributed Transactions",
    "REST API"
  ],
},
{
  slug: "URLShortener",
  title: "Distributed URL Shortener",
  year: "2026",
  summary: "A highly scalable URL shortening platform designed for billions of redirects and real-time analytics.",
  description:
    "A production-grade distributed URL shortener built to handle high traffic and read-heavy workloads. The system generates compact short links using Base62 encoding and leverages Redis caching to serve redirects with minimal latency. Designed with horizontal scaling in mind, it employs consistent hashing for efficient data distribution and reduced cache rebalancing during node additions or removals. PostgreSQL serves as the primary datastore, while Docker and Nginx enable containerized deployment and load balancing. The platform also includes a React-based analytics dashboard that visualizes click trends, geographic usage patterns, and time-series aggregated metrics in real time.",
  tech: [
    "React",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Nginx",
    "REST API",
    "Base62 Encoding",
    "Consistent Hashing",
    "Time-Series Analytics"
  ],
},
];
