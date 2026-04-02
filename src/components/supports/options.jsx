import { MotionConfig, motion } from "framer-motion";

const Testimonial = ({ imgSrc, name, title, company, content }) => (
  <MotionConfig transition={{ duration: 0.2, ease: "easeInOut" }}>
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -8 }}
      exit={{ y: 0 }}
      className="w-full overflow-hidden rounded-lg border-2 border-zinc-900 bg-white p-8 md:p-12"
    >
      <div className="mb-6 flex items-center gap-6">
        <div className="rounded-lg bg-zinc-900">
          <motion.img
            initial={{ rotate: "0deg", opacity: 0 }}
            animate={{ rotate: "3deg", opacity: 1 }}
            exit={{ rotate: "0deg", opacity: 0 }}
            src={imgSrc}
            alt="avatar"
            className="size-24 rounded-lg border-2 border-zinc-900 bg-indigo-200"
          />
        </div>
        <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
          <span className="mb-1.5 block text-3xl font-medium">{name}</span>
          <span className="text-zinc-600">{title} – <span className="text-indigo-600">{company}</span></span>
        </motion.div>
      </div>
      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        className="text-xl leading-relaxed"
      >
        {content}
      </motion.p>
    </motion.div>
  </MotionConfig>
);

export const OPTIONS = [
  {
    title: "Marketers",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Sarah"
        name="Sarah K."
        title="Marketing Lead"
        company="GrowthLoop"
        content="I used to spend 45 minutes writing a single email sequence. Now I grab a prompt, paste it into Claude, customize it in 5 minutes, and it's done. PromptVault paid for itself in the first week."
      />
    ),
  },
  {
    title: "Founders",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Marcus"
        name="Marcus T."
        title="Solo Founder"
        company="LaunchFast"
        content="The vibe coding prompts are insane. I'm non-technical and I built and shipped my SaaS in 3 weeks using the build sequence prompt. It told me exactly what to say to Cursor at each step."
      />
    ),
  },
  {
    title: "Freelancers",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Priya"
        name="Priya R."
        title="Freelance Copywriter"
        company="@priya_writes"
        content="The sales and marketing prompts have doubled my output. I deliver better work in half the time. My clients don't know I use AI — they just keep saying my copy has gotten sharper."
      />
    ),
  },
  {
    title: "Students",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Jake"
        name="Jake M."
        title="Graduate Student"
        company="UCLA"
        content="The essay outline prompt literally saved my semester. I go from blank page to structured outline in 10 minutes now. I use the study plan prompts every Sunday to plan my week."
      />
    ),
  },
  {
    title: "HR Teams",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Linda"
        name="Linda F."
        title="HR Manager"
        company="TechCorp"
        content="We onboarded PromptVault for our whole HR team. Writing job descriptions used to take our recruiter half a day. Now it's 20 minutes. We've also been using the performance review prompts — game changer."
      />
    ),
  },
  {
    title: "Creators",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Dani"
        name="Dani L."
        title="YouTube Creator"
        company="@danibuilds"
        content="I batch 4 video scripts in one afternoon now. The YouTube script prompt gives me a full hook, structure, and CTA — I just fill in my take. My watch time is up 40% since I started using it."
      />
    ),
  },
];
