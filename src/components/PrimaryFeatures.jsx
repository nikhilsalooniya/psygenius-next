'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'

import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'

const features = [
  {
    name: 'Quizmodus',
    description:
      'KI-generierte Multiple-Choice-Fragen mit 5 Antwortmöglichkeiten wie in deinen Klausuren– inklusive kurzer Erklärungen.',
    icon: IconQuiz,
    image: '/img-4.png',
  },
  {
    name: 'Probeklausuren',
    description:
      'Trainiere unter realistischen Bedingungen mit Zeitlimit und Fragenpaketen.',
    icon: IconExam,
    image: '/img-3.png',
  },
  {
    name: 'KI-Fragen-Antwort',
    description:
      'Lass dir alles von der KI erklären, was du noch nicht verstanden hast.',
    icon: IconAI,
    image: '/img-1.png',
  },
]

// Quizmodus — clipboard checklist (Heroicons outline)
function IconQuiz(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#7059C7"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
      />
    </svg>
  )
}

// Probeklausuren — clock / timed exam (Heroicons outline)
function IconExam(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#7059C7"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

// KI-Fragen-Antwort — sparkles / AI (Heroicons outline)
function IconAI(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#7059C7"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  )
}

function FeaturesDesktop() {
  let [selectedIndex, setSelectedIndex] = useState(0)

  let onChange = useDebouncedCallback(
    (index) => setSelectedIndex(index),
    100,
    { leading: true },
  )

  return (
    <TabGroup
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      {/* Left: switching screenshot */}
      <div className="relative col-span-6 flex justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#8b5cf6" className="animate-spin-slower" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={selectedIndex}
            src={features[selectedIndex].image}
            alt={features[selectedIndex].name}
            className="relative z-10 mx-auto w-full max-w-[340px] drop-shadow-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      {/* Right: feature cards */}
      <TabList className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl border border-gray-200 bg-white transition-colors hover:bg-gray-50 cursor-pointer"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 rounded-2xl bg-gray-50 ring-1 ring-violet-200 shadow-sm"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <feature.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-gray-900">
                <Tab className="text-left data-selected:not-data-focus:outline-hidden">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </TabList>
    </TabGroup>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef(null)
  let slideRefs = useRef([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => {
              if (ref) {
                slideRefs.current[featureIndex] = ref
              }
            }}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-white px-5 py-6 ring-1 ring-gray-200">
              <img
                src={feature.image}
                alt={feature.name}
                className="mx-auto w-full max-w-[220px] drop-shadow-lg"
              />
              <div className="mt-6">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                <h3 className="mt-3 text-sm font-semibold text-gray-900 sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-50 py-12 sm:py-20 lg:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-gray-900">
            Dein KI-gestützter Lernbegleiter für Uni-Prüfungen.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            MentoraGenius nutzt KI, um deine Lernlücken zu erkennen, prüfungsnahe Fragen zu generieren und dir verständliche Erklärungen zu liefern – jederzeit und individuell.
          </p>
        </div>
      </Container>
      <div className="mt-8 sm:mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
