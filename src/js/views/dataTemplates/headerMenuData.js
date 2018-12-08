export function authMenuHeader(id) {
    return [
        {
            label: 'Создать рецепт',
            href: '/create'
        },
        {
            label: 'Открыть рецепт',
            href: '/open'
        }
    ]
}

export function notAuthMenuHeader() {
    return [
        {
            label: 'Создать рецепт',
            href: '/create'
        },
        {
            label: 'Открыть рецепт',
            href: '/open'
        }
    ]
}