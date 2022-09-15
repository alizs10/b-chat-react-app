import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import AppRoutes from './AppRoutes'
import BChatContextContainer from './components/Context/BChatContextContainer'

// Create a client
const queryClient = new QueryClient()

function BChat() {
    return (
        <QueryClientProvider client={queryClient}>
            <BChatContextContainer>
                <AppRoutes />
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </BChatContextContainer>
        </QueryClientProvider>
    )
}

export default BChat