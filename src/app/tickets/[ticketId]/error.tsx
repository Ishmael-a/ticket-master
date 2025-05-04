'use client'

import { NotFound } from '@/components/not-found'
import React from 'react'

const Error = ({error}: { error: Error }) => {
  return <NotFound label={error.message || 'Something Went Wrong!'}/>
}

export default Error
