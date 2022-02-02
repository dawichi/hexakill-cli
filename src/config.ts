interface configInterface {
    base: {
        health: number
        ad: number
        ap: number
        armor: number
        mr: number
        speed: number
    }
}

export const config: configInterface = {
    base: {
        health: 150,
        ad: 15,
        ap: 20,
        armor: 8,
        mr: 8,
        speed: 5,
    },
}
