import chalk from 'chalk'
import gradient from 'gradient-string'
import figlet from 'figlet'

const winner = () => {
    figlet(`Congrats , ${player.name}`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n')
        console.log(chalk.green(`Programming isn't about what you know; it's about making the command line look cool`))
        process.exit(0)
    })
}
