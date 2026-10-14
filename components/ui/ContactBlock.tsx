'use client'

import { motion } from 'framer-motion'

export type ContactLink = {
  label: string
  href: string
  text: string
  external?: boolean
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:asherdelman@gmail.com',
    text: 'asherdelman@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+13238237888',
    text: '323-823-7888',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/asher-delman',
    text: 'linkedin.com/in/asher-delman',
    external: true,
  },
]

export default function ContactBlock({
  heading = 'Contact',
  links = contactLinks,
}: {
  heading?: string
  links?: ContactLink[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full min-w-0 max-w-[40rem]"
    >
      <h2 className="mb-8 font-['Helvetica'] text-3xl font-bold text-white md:text-4xl">
        {heading}
      </h2>
      <div className="space-y-8 font-['Helvetica'] md:space-y-10">
        {links.map((link) => (
          <div key={link.label} className="min-w-0">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
              {link.label}
            </p>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="inline-flex min-h-11 w-fit max-w-full items-center py-1 text-xl leading-relaxed text-gray-300 transition-colors duration-200 hover:text-white [overflow-wrap:anywhere]"
            >
              {link.text}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
