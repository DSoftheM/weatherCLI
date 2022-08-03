import chalk from 'chalk';
import dedent from 'dedent-js';


const printError = (error) => {
    console.log(chalk.bgRed(error.message));
}
const printSuccess = (message) => {
    console.log(chalk.bgGreen(message));
}
const printHelp = (message) => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `
    );
}
const printForecast = (forecast) => {
    console.log(
        dedent`

        Город: ${chalk.bgBlue(` ${forecast.name} `)}
        Описание: ${chalk.bgGray(` ${forecast.weather[0].description} `)}
        Температура: ${chalk.bgGreenBright(` ${forecast.main.temp} `)} мм рт.ст.
        Давление: ${chalk.bgMagenta(` ${forecast.main.pressure} `)}
        Скорость ветра: ${chalk.bgYellowBright(` ${forecast.wind.speed} `)} м/с
        ${chalk.grey(`Погода на ${new Date().toLocaleDateString()}`)}

    `);
};

export { printError, printSuccess, printHelp, printForecast };