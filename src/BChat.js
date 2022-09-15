import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './AppRoutes'
import BChatContextContainer from './components/Context/BChatContextContainer'

// Create a client
const queryClient = new QueryClient()

function BChat() {
    return (
        <QueryClientProvider client={queryClient}>
            <BChatContextContainer>
                <AppRoutes />
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </BChatContextContainer>
        </QueryClientProvider>
    )
}

export default BChat