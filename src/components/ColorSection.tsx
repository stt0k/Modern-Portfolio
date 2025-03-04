import React from "react";
import {
  FileText,
  Layers,
  PenTool,
  Brush,
  Code,
  Bug,
  Upload,
  BarChart,
  RefreshCcw,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// Componente para elementos animados
const AnimatedSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Determinar si el elemento está saliendo por la parte superior
  const isExitingTop = entry && !inView && entry.boundingClientRect.top < 0;

  return (
    <div
      ref={ref}
      className={`${className} slide-in ${
        inView ? "visible" : isExitingTop ? "exit" : ""
      }`}
    >
      {children}
    </div>
  );
};

// Componente para tarjetas animadas
const AnimatedCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Determinar si el elemento está saliendo por la parte superior
  const isExitingTop = entry && !inView && entry.boundingClientRect.top < 0;

  return (
    <div
      ref={ref}
      className={`slide-in ${
        inView ? "visible" : isExitingTop ? "exit" : ""
      } mt-4 first:mt-0`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white text-black p-8 rounded-lg">{children}</div>
    </div>
  );
};

// Componente para una sección con cards
const CardSection = ({
  title,
  number,
  description,
  cards,
  bgColor,
  textColor = "text-black",
  rounded,
}: {
  title: string;
  number: string;
  description?: string;
  cards: React.ReactNode[];
  bgColor: string;
  textColor?: string;
  rounded?: string;
}) => {
  return (
    <div
      className={`w-full ${bgColor} ${textColor} ${rounded} p-8 flex flex-col md:flex-row gap-8 mb-4`}
    >
      <AnimatedSection className="md:w-1/2">
        <div className="mb-4">
          <span className="text-xl font-bold">{number}</span>
        </div>
        <h2
          className="text-5xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && <p className="text-xl">{description}</p>}
      </AnimatedSection>
      <div className="md:w-1/2">{cards}</div>
    </div>
  );
};

function ColorSection() {
  // Cards para cada sección
  const selfManagedCards = [
    <>
      <AnimatedCard delay={100}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Project Brief & Research:</h3>
          </div>
          <div className="ml-auto">
            <FileText size={24} />
          </div>
        </div>
        <p className="text-lg">
          Defining objectives, target audience, and technical requirements for
          an effective plan.
        </p>
      </AnimatedCard>
      <AnimatedCard delay={200}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Tech Stack & Architecture:</h3>
          </div>
          <div className="ml-auto">
            <Layers size={24} />
          </div>
        </div>
        <p className="text-lg">
          Selecting the right technologies and outlining the project's
          architecture.
        </p>
      </AnimatedCard>
      <AnimatedCard delay={200}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Wireframing & Prototyping:</h3>
          </div>
          <div className="ml-auto">
            <PenTool size={24} />
          </div>
        </div>
        <p className="text-lg">
          Creating visual structures and prototypes to validate the user
          experience.
        </p>
      </AnimatedCard>
    </>,
  ];

  const managedCards = [
    <>
      <AnimatedCard delay={100}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">UI/UX Design:</h3>
          </div>
          <div className="ml-auto">
            <Brush size={24} />
          </div>
        </div>
        <p className="text-lg">
          Crafting an intuitive and visually appealing user experience. .
        </p>
      </AnimatedCard>
      <AnimatedCard delay={200}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Frontend & Backend Development:</h3>
          </div>
          <div className="ml-auto">
            <Code size={24} />
          </div>
        </div>
        <p className="text-lg">
          Building reusable components and developing a robust API.
        </p>
      </AnimatedCard>
      <AnimatedCard delay={200}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Testing & Debugging:</h3>
          </div>
          <div className="ml-auto">
            <Bug size={24} />
          </div>
        </div>
        <p className="text-lg">
          Performing functionality, performance, and security tests to ensure
          quality.
        </p>
      </AnimatedCard>
    </>,
  ];

  const recruitmentCards = [
    <>
      <AnimatedCard delay={100}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Deployment & Optimization:</h3>
          </div>
          <div className="ml-auto">
            <Upload size={24} />
          </div>
        </div>
        <p className="text-lg">
          Setting up servers, optimizing code, and conducting performance
          audits.
        </p>
      </AnimatedCard>
      <AnimatedCard delay={200}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold">Monitoring & Analytics:</h3>
          </div>
          <div className="ml-auto">
            <BarChart size={24} />
          </div>
        </div>
        <p className="text-lg">
          Implementing monitoring tools and analyzing key metrics to improve the
          product.
        </p>
      </AnimatedCard>
      <AnimatedCard delay={200}>
        <div className="flex items-start mb-4">
          <div className="mr-2">
            <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold"> Continuous Improvements:</h3>
          </div>
          <div className="ml-auto">
            <RefreshCcw size={24} />
          </div>
        </div>
        <p className="text-lg">
          Updating technologies, adding new features, and enhancing security.
        </p>
      </AnimatedCard>
    </>,
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col rounded-t-3xl">
      {/* Header */}
      <AnimatedSection className="w-full py-16 px-8">
        <h1 className="text-5xl font-bold leading-tight">
          MY
          <br />
          DEVELOPMENT PROCESS{" "}
        </h1>
      </AnimatedSection>

      <div className="mx-10">
        {/* Seccion 1 */}
        <CardSection
          title="DISCOVERY & PLANNING"
          number="(01)"
          description="Before writing a single line of code, I ensure a deep understanding of the project. I analyze requirements, define technologies, and create a clear strategy to achieve efficient results."
          cards={selfManagedCards}
          bgColor="bg-zinc-900"
          textColor="text-white"
          rounded="rounded-xl"
        />

        {/* Seccion 3 */}
        <CardSection
          title="DESIGN & DEVELOPMENT"
          number="(02)"
          description="I transform concepts into interactive interfaces and efficient systems. With a focus on performance, accessibility, and scalability, I develop modern solutions that adapt to users' needs."
          cards={managedCards}
          bgColor="bg-[#fadaa3]"
          rounded="rounded-xl"
        />

        {/* Seccion 3 */}
        <CardSection
          title="DEPLOYMENT & SUPPORT"
          number="(03)"
          description="I ensure each project is properly deployed, optimizing servers and enhancing performance. Additionally, I provide maintenance and continuous improvements to guarantee long-term success."
          cards={recruitmentCards}
          bgColor="bg-[#ffc157]"
          rounded="rounded-xl"
        />
      </div>
    </div>
  );
}

export default ColorSection;
