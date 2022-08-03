import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printForecast, printHelp, printSuccess } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

// #!/usr/bin/env node

const saveToken = async (token) => {
    if (!token.length) {
        printError(new Error('Token is empty.'));
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved!')
    } catch (error) {
        printError(error);
    }
}

const getForecast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICTIONARY.city);
        if (!city) printError(new Error('City is empty. Call it with argument -c [CITY]'));
        const weather = await getWeather(city);
        printForecast(weather);
    } catch (error) {
        if (error?.response?.status == 404) {
            printError(new Error('404: city is invalid'));
        } else if (error?.response?.status == 401) {
            printError(new Error('401: token is invalid'));
        } else {
            printError(error);
        }
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError(new Error('City is empty.'));
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved!')
    } catch (error) {
        printError(error);
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.c) {
        await saveCity(args.c);
    }
    if (args.t) {
        await saveToken(args.t);
    }
    await getForecast();
};

initCLI();