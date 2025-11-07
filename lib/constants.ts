export type EventItem = {
  title: string;
  image: string; // path under public/images
  slug: string; // url-friendly unique identifier
  location: string; // City, Country or Online
  date: string; // human-readable date or range
  time: string; // local time or timezone info
};

// A curated list of real and popular developer events. Images should exist under public/images.
// If you don’t have matching images yet, add them to /public/images or change the paths to ones that do exist.
export const events: EventItem[] = [
  {
    title: "AWS re:Invent 2025",
    image: "/images/event1.png",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, USA",
    date: "Dec 1–5, 2025",
    time: "All day • PST",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2025",
    image: "/images/event2.png",
    slug: "kubecon-na-2025",
    location: "Austin, USA",
    date: "Nov 18–21, 2025",
    time: "08:30–18:00 CST",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event3.png",
    slug: "microsoft-build-2026",
    location: "Seattle, USA + Online",
    date: "May 2026 (TBA)",
    time: "TBA • PDT",
  },
  {
    title: "Google Cloud Next 2026",
    image: "/images/event4.png",
    slug: "google-cloud-next-2026",
    location: "San Francisco, USA",
    date: "Apr 2026 (TBA)",
    time: "TBA • PT",
  },
  {
    title: "React Conf 2026",
    image: "/images/event5.png",
    slug: "react-conf-2026",
    location: "USA (TBA) + Online",
    date: "2026 (TBA)",
    time: "TBA",
  },
  {
    title: "Next.js Conf 2025",
    image: "/images/event6.png",
    slug: "nextjs-conf-2025",
    location: "Los Angeles, USA + Online",
    date: "Nov 2025 (TBA)",
    time: "TBA • PT",
  },
  {
    title: "JSNation 2026",
    image: "/images/event-full.png",
    slug: "jsnation-2026",
    location: "Amsterdam, Netherlands + Online",
    date: "Jun 2026 (TBA)",
    time: "TBA • CEST",
  },
  {
    title: "HackZurich 2026",
    image: "/images/event1.png",
    slug: "hackzurich-2026",
    location: "Zurich, Switzerland",
    date: "Sep 2026 (TBA)",
    time: "48h Hackathon • CEST",
  },
  {
    title: "Web Summit 2025",
    image: "/images/event2.png",
    slug: "web-summit-2025",
    location: "Lisbon, Portugal",
    date: "Nov 10–13, 2025",
    time: "All day • WET",
  },
  {
    title: "FOSDEM 2026",
    image: "/images/event3.png",
    slug: "fosdem-2026",
    location: "Brussels, Belgium",
    date: "Feb 1–2, 2026",
    time: "09:00–18:00 CET",
  },
];

export default events;
