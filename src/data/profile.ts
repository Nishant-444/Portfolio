import { CERTIFICATIONS, ACHIEVEMENTS } from "./credentials";
import { EDUCATION } from "./education";
import { EXPERIENCE } from "./experience";
import { PROJECTS, FEATURED_PROJECTS, OPEN_SOURCE } from "./projects";
import { SKILLS, ALL_SKILLS } from "./skills";

export const PROFILE = {
	name: "Nishant Sharma",
	handle: "Nishant-444",
	role: "Full Stack & Systems Engineer",
	subRole:
		"Backend Architecture · RAG & AI Systems · High-Performance Web Applications",
	location: "Jaipur, Rajasthan, India",
	status: "Open for Full-Time Roles & Internships",
	bio: "Full Stack Developer with a strong foundation in high-concurrency backend services, database design, and AI/RAG integrations. Twiced recommended by the Indian Air Force SSB (leadership & decision-making under pressure), and active open-source contributor to top AI engineering repositories.",

	// Contacts & Socials
	contacts: {
		email: "business.nishant777@gmail.com",
		github: "https://github.com/Nishant-444",
		linkedin: "https://www.linkedin.com/in/nishant-developer",
		twitter: "https://x.com/_nishant4712",
		calCom: "https://cal.com/nishantsharma/15min",
		resumeUrl: "/assets/Nishant_Sharma_Resume.pdf",
		website: "https://nishantsharma.vercel.app",
	},

	// Key stats for high recruiter scanability
	stats: [
		{
			label: "Algorithmic Problems",
			value: "300+",
			detail: "LeetCode, Codeforces & HackerRank",
		},
		{
			label: "Open Source Merged",
			value: "1.4k+ lines",
			detail: "7k+ ⭐ llm_engineering",
		},
		{
			label: "Marketplace Endpoints",
			value: "106 APIs",
			detail: "18 DB Models at Zytexa",
		},
		{
			label: "SSB Recommended",
			value: "2x Cleared",
			detail: "Indian Air Force 5-Day Assessment",
		},
	],
};

export {
	CERTIFICATIONS,
	ACHIEVEMENTS,
	EDUCATION,
	EXPERIENCE,
	PROJECTS,
	FEATURED_PROJECTS,
	OPEN_SOURCE,
	SKILLS,
	ALL_SKILLS,
};
