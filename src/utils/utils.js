import chalk from 'chalk'
import gradient from 'gradient-string'
import figlet from 'figlet'
import nanospinner from 'nanospinner'


// backup functions 
async function handleAnswer(isCorrect) {
    const spinner = nanospinner.createSpinner('Checking answer...').start()
    await sleep()

    if (isCorrect) {
        spinner.success({ text: `success` })
    } else {
        spinner.error({ text: `nop ;(` })
        process.exit(1)
    }
}

const winner = () => {
    figlet(`Congrats , ${player.name}`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n')
        console.log(chalk.green(`Programming isn't about what you know; it's about making the command line look cool`))
        process.exit(0)
    })
}
