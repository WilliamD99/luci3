import React from 'react'
import { Metadata } from 'next'

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

// Generate dynamic metadata based on the project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = WorkArr.find(work => work.slug === params.slug)

    if (!project) {
        return {
            title: 'Project Not Found'
        }
    }

    return {
        title: project.title,
        description: project.subTitle
    }
}

const ProjectPage = ({ params }: Props) => {
    // Find the project data based on the slug
    const project = WorkArr.find(work => work.slug === params.slug)

    // If project is not found, return 404
    if (!project) {
        notFound()
    }

    return (
        <div id={`work-details`} className='work-detail min-h-screen project-page' >
            <WorkHero project={project} />
            <WorkObjective project={project} />
            <WorkSolution project={project} />
            <div className='h-screen'></div>
        </div>
    )
}

export default ProjectPage
