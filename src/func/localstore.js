import { persisted } from 'svelte-persisted-store'

export const preferences = persisted('owbalancer-dashboard.styles', {
    theme: 'dark',
})
