export function authMenuHeader(id) {
    return [
        {
            label: 'Профиль',
            href: `/profile/${id}`
        },
        {
            label: 'Выписать рецепт',
            href: '/make_recipe'
        },
        {
            label: 'Созданные рецепты',
            href: '/my_recipes'
        },
        {
            label: 'Открыть рецепт',
            href: '/recipe'
        },
        {
            label: 'Выйти',
            href: '/signout'
        }
    ]
}

export function notAuthMenuHeader() {
    return [
        {
            label: 'Вход',
            href: '/signin'
        },
        {
            label: 'Регистрация',
            href: '/signup'
        },
        {
            label: 'Открыть рецепт',
            href: '/recipe'
        }
    ]
}