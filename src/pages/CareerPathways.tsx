import React, { useMemo, useState } from "react";
import {Button} from '../Components/ui/button'

import { Card,CardContent } from "../Components/ui/card";
import { Badge } from "../Components/ui/badge";
import { Input } from "../Components/ui/input";
import { Slider } from "../Components/ui/slider";
import { Checkbox } from "../Components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../Components/ui/dialog";
import {
  MapPin,
  DollarSign,
  Clock,
  SlidersHorizontal,
  TrendingUp,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";



type Career = {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  durationToAchieve: string; // e.g., "6-12 months"
  summary: string;
  requiredSkills: string[];
  matchPercent: number; // 0 - 100
  category: "Frontend" | "Project Management" | "Data" | "Backend" | "Design" | "Security";
  remote?: boolean;
};

// -----------------------------
// Mock Data
// -----------------------------

const CAREERS: Career[] = [
  {
    id: "frontend-dev",
    title: "Front-end Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    salaryRange: "$80,000 - $110,000",
    durationToAchieve: "6-12 months",
    summary: "Develop and maintain user interfaces for web apps using modern JavaScript frameworks.",
    requiredSkills: ["JavaScript", "React", "HTML/CSS", "UI/UX Design"],
    matchPercent: 85,
    category: "Frontend",
    remote: true,
  },
  {
    id: "project-manager",
    title: "Project Manager",
    company: "Global Innovations",
    location: "Johannesburg",
    salaryRange: "$70,000 - $95,000",
    durationToAchieve: "12-18 months",
    summary: "Lead cross-functional teams to deliver projects on time, within scope and budget.",
    requiredSkills: ["Communication", "Project Management", "Agile Methodology", "Risk Management"],
    matchPercent: 70,
    category: "Project Management",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    company: "Atlas DataWorks",
    location: "Cape Town",
    salaryRange: "$95,000 - $135,000",
    durationToAchieve: "9-15 months",
    summary: "Design, build and optimize scalable data pipelines and lakehouse architectures.",
    requiredSkills: ["Python", "SQL", "ETL", "Airflow", "Spark", "Data Modeling"],
    matchPercent: 78,
    category: "Data",
  },
  {
    id: "backend-dev",
    title: "Backend Engineer",
    company: "Nimbus Cloud",
    location: "Remote",
    salaryRange: "$90,000 - $125,000",
    durationToAchieve: "8-14 months",
    summary: "Build resilient APIs and services with Node.js and cloud-native patterns.",
    requiredSkills: ["Node.js", "REST/GraphQL", "PostgreSQL", "Docker", "Kubernetes"],
    matchPercent: 66,
    category: "Backend",
    remote: true,
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    company: "PixelCraft Studio",
    location: "Nairobi",
    salaryRange: "$65,000 - $90,000",
    durationToAchieve: "6-10 months",
    summary: "Create intuitive experiences through research, prototyping, and iterative design.",
    requiredSkills: ["Figma", "User Research", "Prototyping", "Information Architecture"],
    matchPercent: 62,
    category: "Design",
  },
  {
    id: "security-analyst",
    title: "Cybersecurity Analyst",
    company: "Sentinel Labs",
    location: "Remote",
    salaryRange: "$85,000 - $120,000",
    durationToAchieve: "10-16 months",
    summary: "Monitor threats, harden systems, and automate incident response playbooks.",
    requiredSkills: ["SIEM", "Threat Modeling", "Networking", "Scripting"],
    matchPercent: 73,
    category: "Security",
    remote: true,
  },
];



function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground bg-muted/40">
      {children}
    </span>
  );
}

function Stat({ icon: Icon, value, label }: { icon: any; value: string; label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span>{value}</span>
      {label ? <span className="ml-1">{label}</span> : null}
    </div>
  );
}

// -----------------------------
// Main Component
// -----------------------------

export default function CareerPathways() {
  const [query, setQuery] = useState("");
  const [minMatch, setMinMatch] = useState<number[]>([0]);
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [categories, setCategories] = useState<Record<Career["category"], boolean>>({
    Frontend: true,
    "Project Management": true,
    Data: true,
    Backend: true,
    Design: true,
    Security: true,
  });
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return CAREERS.filter((c) => {
      const categoryAllowed = categories[c.category];
      const matchesQuery = !q
        || c.title.toLowerCase().includes(q)
        || c.company.toLowerCase().includes(q)
        || c.requiredSkills.some((s) => s.toLowerCase().includes(q))
        || c.location.toLowerCase().includes(q);
      const matchesRemote = onlyRemote ? c.remote : true;
      const matchesScore = c.matchPercent >= (minMatch?.[0] ?? 0);
      return categoryAllowed && matchesQuery && matchesRemote && matchesScore;
    });
  }, [categories, minMatch, onlyRemote, query]);

  const toggleBookmark = (id: string) =>
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Career Pathways</h1>
            <p className="text-muted-foreground">Explore career opportunities that match your skills and interests.</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for careers, companies, or skills"
                className="pl-9 rounded-xl"
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="rounded-xl"><SlidersHorizontal className="mr-2 h-4 w-4"/>Filters</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Minimum match</label>
                    <div className="px-2">
                      <Slider value={minMatch} max={100} step={1} onValueChange={setMinMatch} />
                      <div className="mt-2 text-sm text-muted-foreground">{minMatch[0]}%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="remote" checked={onlyRemote} onCheckedChange={(v: boolean) => setOnlyRemote(!!v)} />
                    <label htmlFor="remote" className="text-sm">Remote only</label>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium">Categories</div>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {(Object.keys(categories) as Career["category"][]).map((k) => (
                        <label key={k} className="flex items-center gap-2 rounded-xl border p-2">
                          <Checkbox
                            checked={categories[k]}
                            onCheckedChange={(v: boolean) => setCategories((prev) => ({ ...prev, [k]: !!v }))}
                          />
                          <span className="text-sm">{k}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-8">
        {filtered.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                {/* Top row */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{c.title}</h3>
                    <div className="text-muted-foreground">{c.company}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      <TrendingUp className="mr-1 h-3.5 w-3.5" /> {c.matchPercent}% Match
                    </Badge>
                    <Button variant="outline" className="rounded-full" onClick={() => toggleBookmark(c.id)}>
                      {bookmarks[c.id] ? (
                        <><BookmarkCheck className="mr-2 h-4 w-4"/>Saved</>
                      ) : (
                        <><Bookmark className="mr-2 h-4 w-4"/>Save</>
                      )}
                    </Button>
                  </div>
                </div>

            
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <Stat icon={MapPin} value={c.location} />
                  <Stat icon={DollarSign} value={c.salaryRange} />
                  <Stat icon={Clock} value={c.durationToAchieve} label="to achieve" />
                </div>

                <p className="mt-4 text-sm text-muted-foreground max-w-3xl">{c.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.requiredSkills.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>

            
                <div className="mt-6 flex items-center justify-end">
                  <Button className="rounded-xl bg-blue-600">
                    <Briefcase className="mr-2 h-4 w-4" /> View Career Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border p-8 text-center text-muted-foreground">
            No results. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
}
