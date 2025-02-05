import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'

interface Breadcrumb {
  label: string
  href?: string // href is optional for the current page
}

interface BreadcrumbsComponentProps {
  links: Breadcrumb[] // An array of breadcrumb links
  size: number
}

const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({
  links,
  size = 12
}) => {
  return (
    <Breadcrumbs aria-label='breadcrumb' sx={{ marginBottom: '16px' }}>
      {links.map((link, index) =>
        index === links.length - 1 ? (
          <Typography color='textPrimary' key={index} sx={{ fontSize: size,fontWeight:550 }}>
            {link.label}
          </Typography>
        ) : (
          <Link
            key={index}
            underline='hover'
            color='inherit'
            href={link.href}
            sx={{ fontSize: size }}
          >
            {link.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  )
}

export default BreadcrumbsComponent
