'use client'

import React, { useRef } from 'react'

import WorkHero from '@/components/page-components/project/Hero'
import WorkObjective from '@/components/page-components/project/Objective'
import WorkSolution from '@/components/page-components/project/Solution'
import { WorkArr } from '@/utils/data/work'
import { notFound } from 'next/navigation'

type Props = {
    params: {
        slug: string
    }
}

const ProjectPage = ({ params }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)

    // Find the project data based on the slug
    const project = WorkArr.find(work => work.slug === params.slug)

    // If project is not found, return 404
    if (!project) {
        notFound()
    }

    return (
        <div id={`work-details`} ref={containerRef} className='work-detail min-h-screen project-page' >
            <WorkHero project={project} />
            <WorkObjective project={project} />
            <WorkSolution project={project} />
            <div className='h-screen'></div>
        </div>
    )
}

export default ProjectPage
