import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import AppRoutes from './AppRoutes'

// Create a client
const queryClient = new QueryClient()

function BChat() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    )
}

export default BChat