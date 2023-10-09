class Validates {
    static validDate(date) {
        const dateFormated = new Date(date.split('/').reverse().join('-'))
        return dateFormated.toString() !== 'Invalid Date' && dateFormated <= new Date();
    }

    static validHour(hour) {
        const hourFormated = hour.split(':');
        return hourFormated.length === 3 &&
            hourFormated[0] <= 24 &&
            hourFormated[0] >= 0 &&
            hourFormated[1] < 60 &&
            hourFormated[1] >= 0 &&
            hourFormated[2] < 60 &&
            hourFormated[2] >= 0;
    }
}

module.exports = { Validates };
