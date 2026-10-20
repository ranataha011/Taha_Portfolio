import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Shell from "@/components/Shell";
import { Experience, Skills, Agency, Footer } from "@/components/Sections";

export default function Page() {
  return (
    <Shell>
      <Navbar />
      <main><Hero /><Projects /><Experience /><Skills /><Agency /></main>
      <Footer />
    </Shell>
  );
}
